'use client'

import { Suspense, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { TopNav } from '@/components/client/top-nav'
import { SiteFooter } from '@/components/client/site-footer'
import { DESTINATIONS, type ServiceKey } from '@/data/destinations'
import { useCurrencyStore } from '@/stores/currency-store'
import { useT } from '@/i18n/use-t'
import { useDestLocale } from '@/hooks/use-dest-locale'
import { AIRPORT_CODES, airportCity } from '@/lib/airport-cities'
import { useLocaleStore } from '@/stores/locale-store'

type ServiceFilter = ServiceKey | 'all'
type Sort = 'recommended' | 'priceAsc' | 'priceDesc'

export default function DestinationsIndexPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <Inner />
    </Suspense>
  )
}

function Inner() {
  const t = useT()
  const L = useDestLocale()
  const locale = useLocaleStore((s) => s.locale)
  const params = useSearchParams()
  const formatFromVnd = useCurrencyStore((s) => s.formatFromVnd)
  useCurrencyStore((s) => s.currency)

  const initialService = (params.get('service') as ServiceFilter) || 'all'
  const [service, setService] = useState<ServiceFilter>(initialService as ServiceFilter)
  const [stars, setStars] = useState<number[]>([])
  const [airports, setAirports] = useState<string[]>([])
  const [maxPrice, setMaxPrice] = useState(3_000_000)
  const [sort, setSort] = useState<Sort>('recommended')

  const results = useMemo(() => {
    let rows = DESTINATIONS.slice()
    if (service !== 'all') {
      const svc = service === 'pickup' ? 'pickup' : service === 'fastTrack' ? 'fastTrack' : service === 'hotels' ? 'hotels' : service === 'tours' ? 'tours' : null
      if (svc) rows = rows.filter((d) => Boolean(d.services[svc as ServiceKey]))
    }
    if (stars.length) rows = rows.filter((d) => stars.includes(d.stars))
    if (airports.length) rows = rows.filter((d) => airports.includes(d.airportCode))
    rows = rows.filter((d) => {
      const fromPrice = Math.min(...Object.values(d.services).map((s) => s.priceVnd))
      return fromPrice <= maxPrice
    })
    const withPrice = rows.map((d) => ({
      d,
      fromPrice: Math.min(...Object.values(d.services).map((s) => s.priceVnd)),
    }))
    switch (sort) {
      case 'priceAsc': withPrice.sort((a, b) => a.fromPrice - b.fromPrice); break
      case 'priceDesc': withPrice.sort((a, b) => b.fromPrice - a.fromPrice); break
    }
    return withPrice
  }, [service, stars, airports, maxPrice, sort])

  function toggleStar(n: number) { setStars((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n])) }
  function toggleAirport(a: string) { setAirports((p) => (p.includes(a) ? p.filter((x) => x !== a) : [...p, a])) }
  function clearAll() { setService('all'); setStars([]); setAirports([]); setMaxPrice(3_000_000) }

  const serviceFilterOptions: [ServiceFilter, string][] = L.vi
    ? [['all', 'Tất cả'], ['pickup', 'Đưa đón'], ['fastTrack', 'Fast-track'], ['hotels', 'Khách sạn'], ['tours', 'Tour']]
    : [['all', 'All'], ['pickup', 'Pickup'], ['fastTrack', 'Fast-track'], ['hotels', 'Hotels'], ['tours', 'Tours']]

  return (
    <div className="bg-vg-bg min-h-screen flex flex-col">
      <TopNav />

      <div className="bg-vg-surface-muted border-b border-vg-border px-6 md:px-10 py-6">
        <div className="max-w-[1280px] mx-auto">
          <nav className="text-xs text-vg-text-muted mb-2">
            <Link href="/" className="hover:underline">{t.destination.home}</Link>
            <span className="mx-1.5">›</span>
            <span className="text-vg-text">{t.nav.destinations}</span>
          </nav>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-vg-text">
            {t.filters.resultsCount(results.length)}
          </h1>
        </div>
      </div>

      <main className="flex-1 px-6 md:px-10 py-6 md:py-8 max-w-[1280px] w-full mx-auto">
        <div className="grid md:grid-cols-[260px_1fr] gap-6 md:gap-8">
          <aside className="h-fit md:sticky md:top-20">
            <div className="bg-white rounded-xl border border-vg-border p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-vg-text text-[15px]">{t.filters.title}</h2>
                <button type="button" onClick={clearAll} className="text-xs font-semibold text-vg-cta hover:underline">
                  {t.filters.clearAll}
                </button>
              </div>

              <FilterBlock title={t.filters.serviceType}>
                {serviceFilterOptions.map(([v, l]) => (
                  <Radio key={v} label={l} checked={service === v} onChange={() => setService(v as ServiceFilter)} />
                ))}
              </FilterBlock>

              <FilterBlock title={t.filters.priceRange}>
                <div className="text-xs text-vg-text-muted mb-2">
                  {t.listing.upTo} <span className="font-bold text-vg-text">{formatFromVnd(maxPrice)}</span>
                </div>
                <input type="range" min={500_000} max={3_000_000} step={100_000} value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full" />
              </FilterBlock>

              <FilterBlock title={t.filters.starRating}>
                {[5, 4, 3].map((n) => (
                  <Check key={n} label={'★'.repeat(n)} checked={stars.includes(n)} onChange={() => toggleStar(n)} />
                ))}
              </FilterBlock>

              <FilterBlock title={t.filters.airport} last>
                {AIRPORT_CODES.map((a) => (
                  <Check key={a} label={airportCity(a, locale)} checked={airports.includes(a)} onChange={() => toggleAirport(a)} />
                ))}
              </FilterBlock>
            </div>
          </aside>

          <div>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div className="text-sm text-vg-text-muted">{t.filters.resultsCount(results.length)}</div>
              <label className="flex items-center gap-2 text-sm">
                <span className="text-vg-text-muted">{t.filters.sortBy}:</span>
                <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}
                  className="h-9 px-3 rounded-lg border border-vg-border-strong bg-white text-vg-text font-semibold text-sm focus:outline-none focus:border-vg-cta">
                  <option value="recommended">{t.filters.sortRecommended}</option>
                  <option value="priceAsc">{t.filters.sortPriceAsc}</option>
                  <option value="priceDesc">{t.filters.sortPriceDesc}</option>
                </select>
              </label>
            </div>

            <div className="flex flex-col gap-4">
              {results.map(({ d, fromPrice }) => (
                <Link key={d.slug} href={`/destinations/${d.slug}`}
                  className="group grid grid-cols-1 sm:grid-cols-[240px_1fr] bg-white rounded-xl border border-vg-border overflow-hidden hover:shadow-[0_8px_24px_rgba(16,24,40,0.1)] transition-shadow">
                  <div className="aspect-[4/3] sm:aspect-auto sm:min-h-[200px] bg-cover bg-center" style={{ backgroundImage: `url('${d.photo}')` }} />
                  <div className="p-5 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-xl font-bold text-vg-cta group-hover:underline">{L.name(d)}</h3>
                          <div className="text-yellow-500 text-sm mt-0.5 leading-none">
                            {'★'.repeat(d.stars)}<span className="text-vg-border-strong">{'☆'.repeat(5 - d.stars)}</span>
                          </div>
                          <div className="text-xs text-vg-text-muted mt-1.5">
                            <span className="underline">{L.airportName(d)}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-vg-text-muted mt-3 line-clamp-3">{L.description(d)}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        <Chip>✓ {t.filters.verified}</Chip>
                        <Chip accent>{t.filters.freeCancel}</Chip>
                        <Chip accent>{t.filters.noPrepayment}</Chip>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3 border-t md:border-t-0 md:border-l border-vg-border pt-4 md:pt-0 md:pl-4">
                      <div className="text-right mt-auto">
                        <div className="text-[11px] text-vg-text-muted">{t.filters.fromPrice}</div>
                        <div className="font-display text-xl font-bold text-vg-text tabular-nums">{formatFromVnd(fromPrice)}</div>
                      </div>
                      <span className="inline-flex items-center h-10 px-4 rounded-lg bg-vg-cta group-hover:bg-vg-cta-hover text-white font-semibold text-sm">
                        {t.filters.viewServices} →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
              {results.length === 0 && (
                <div className="bg-white rounded-xl border border-vg-border p-10 text-center text-vg-text-muted">
                  {t.listing.noResults}{' '}
                  <button type="button" onClick={clearAll} className="text-vg-cta font-semibold hover:underline">
                    {t.listing.clearFilters}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

function FilterBlock({ title, children, last }: { title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={`${last ? '' : 'border-b border-vg-border pb-4 mb-4'}`}>
      <div className="text-xs font-bold text-vg-text uppercase tracking-wide mb-2">{title}</div>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  )
}

function Radio({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 text-sm text-vg-text cursor-pointer">
      <input type="radio" checked={checked} onChange={onChange} className="accent-vg-cta" />{label}
    </label>
  )
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 text-sm text-vg-text cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="accent-vg-cta w-4 h-4" />{label}
    </label>
  )
}

function Chip({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${accent ? 'bg-vg-accent/10 text-vg-accent' : 'bg-vg-surface-muted text-vg-text-muted'}`}>
      {children}
    </span>
  )
}
