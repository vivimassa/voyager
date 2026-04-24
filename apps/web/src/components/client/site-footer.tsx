'use client'

import Link from 'next/link'
import { useBrand } from '@/hooks/use-brand'
import { useT } from '@/i18n/use-t'

export function SiteFooter() {
  const brand = useBrand()
  const t = useT()
  return (
    <footer className="bg-slate-900 text-white/90 px-6 md:px-10 py-12 mt-auto border-t border-vg-border relative">
      <div className="h-0.5 bg-vg-accent absolute top-0 left-0 right-0" />
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="grid place-items-center w-9 h-9 rounded-[10px] bg-vg-accent text-white font-display font-bold text-lg">
              {brand.mark}
            </span>
            <span className="font-display font-semibold text-xl text-white">{brand.name}</span>
          </div>
          <p className="text-sm text-white/70 max-w-[380px] leading-relaxed">{brand.tagline}</p>
        </div>
        <div>
          <div className="font-semibold text-white mb-3 text-sm">{t.footer.exploreTitle}</div>
          <ul className="space-y-2 text-sm text-white/75">
            <li><Link href="/destinations" className="hover:text-white">{t.footer.destinations}</Link></li>
            <li><Link href="/services" className="hover:text-white">{t.footer.services}</Link></li>
            <li><Link href="/deals" className="hover:text-white">{t.footer.deals}</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white mb-3 text-sm">{t.footer.supportTitle}</div>
          <ul className="space-y-2 text-sm text-white/75">
            <li><Link href="/help" className="hover:text-white">{t.footer.helpCentre}</Link></li>
            <li><Link href="/help" className="hover:text-white">{t.footer.faq}</Link></li>
            <li><Link href="/help" className="hover:text-white">{t.footer.contactUs}</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto mt-10 pt-6 border-t border-white/15 text-xs text-white/50 flex flex-wrap items-center justify-between gap-3">
        <span>© {new Date().getFullYear()} {brand.name}. {t.footer.rights}</span>
        <div className="flex items-center gap-4">
          <Link
            href="/agent/login"
            className="text-white/30 hover:text-white/70 transition-colors"
          >
            {t.footer.agentLogin}
          </Link>
          <span className="text-white/20">·</span>
          <span>{t.footer.tagline}</span>
        </div>
      </div>
    </footer>
  )
}
