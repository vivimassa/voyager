'use client'

/**
 * Brand settings modal — opened from the gear icon in TopNav.
 *
 * Lets the user rename the product, swap the 1-2 letter mark, and customise
 * the hero tagline without touching code. All values are per-browser
 * (localStorage via the brand-store). Clearing a field falls back to the
 * corresponding NEXT_PUBLIC_BRAND_* env default.
 *
 * Intentional scope:
 *   • Not synced between devices (future: DB-backed /brand endpoint).
 *   • Doesn't affect SSR <title> on first paint, but after mount the
 *     top-nav, hero, and auth modal all re-render with the new name.
 *   • Doesn't change server SMS body — server reads its own BRAND_NAME env.
 */

import { useEffect, useRef, useState } from 'react'
import { useBrandStore } from '@/stores/brand-store'
import { BRAND_DEFAULTS } from '@/lib/brand'

export function BrandSettingsModal() {
  const isOpen = useBrandStore((s) => s.isSettingsOpen)
  const closeSettings = useBrandStore((s) => s.closeSettings)
  const nameOverride = useBrandStore((s) => s.nameOverride)
  const markOverride = useBrandStore((s) => s.markOverride)
  const taglineOverride = useBrandStore((s) => s.taglineOverride)
  const setOverride = useBrandStore((s) => s.setOverride)
  const reset = useBrandStore((s) => s.reset)

  // Local draft state — only commit to the store on Save. Cancelling discards.
  const [name, setName] = useState('')
  const [mark, setMark] = useState('')
  const [tagline, setTagline] = useState('')

  // Seed the draft from current store values every time the modal opens.
  useEffect(() => {
    if (isOpen) {
      setName(nameOverride ?? '')
      setMark(markOverride ?? '')
      setTagline(taglineOverride ?? '')
    }
  }, [isOpen, nameOverride, markOverride, taglineOverride])

  const firstFieldRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (isOpen) firstFieldRef.current?.focus()
  }, [isOpen])

  // Esc closes.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSettings()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, closeSettings])

  if (!isOpen) return null

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // Empty strings are normalised to null (= use default) in the store.
    setOverride({ name, mark, tagline })
    closeSettings()
  }

  const handleResetToDefaults = () => {
    reset()
    setName('')
    setMark('')
    setTagline('')
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="brand-settings-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={closeSettings}
        className="absolute inset-0 bg-black/70 backdrop-blur-[6px]"
      />

      {/* Panel */}
      <form
        onSubmit={handleSave}
        className="relative w-full max-w-md rounded-[20px] bg-vg-surface border border-vg-border shadow-[0_30px_80px_rgba(0,0,0,0.55)] overflow-hidden"
      >
        {/* Header */}
        <div className="px-7 pt-7 pb-5 border-b border-vg-border flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="grid place-items-center w-8 h-8 rounded-[8px] bg-vg-accent text-white font-display font-bold">
                {mark || BRAND_DEFAULTS.mark}
              </span>
              <span className="text-xs font-medium tracking-[0.14em] text-white/50 uppercase">
                {name || BRAND_DEFAULTS.name}
              </span>
            </div>
            <h2
              id="brand-settings-title"
              className="font-display text-2xl font-semibold text-white"
            >
              Brand settings
            </h2>
            <p className="text-sm text-white/55 mt-1">
              Rename the product, swap the logo mark, or tweak the tagline.
              Saved only on this browser.
            </p>
          </div>
          <button
            type="button"
            onClick={closeSettings}
            aria-label="Close"
            className="w-9 h-9 grid place-items-center rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-7 py-6 space-y-5">
          <Field
            label="Product name"
            value={name}
            onChange={setName}
            placeholder={BRAND_DEFAULTS.name}
            hint={`Default: ${BRAND_DEFAULTS.name}`}
            inputRef={firstFieldRef}
            maxLength={40}
          />
          <Field
            label="Logo mark"
            value={mark}
            onChange={setMark}
            placeholder={BRAND_DEFAULTS.mark}
            hint="1–2 letters shown in the square tile next to the name."
            maxLength={2}
            widthClass="w-24"
          />
          <Field
            label="Tagline"
            value={tagline}
            onChange={setTagline}
            placeholder={BRAND_DEFAULTS.tagline}
            hint="Shown under the hero headline on the home page."
            maxLength={120}
          />
        </div>

        {/* Actions */}
        <div className="px-7 py-4 bg-black/20 border-t border-vg-border flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetToDefaults}
            className="text-sm text-white/55 hover:text-white transition-colors"
          >
            Reset to defaults
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={closeSettings}
              className="px-4 py-2 rounded-full text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-vg-accent text-white text-sm font-semibold hover:bg-vg-accent-hover transition-colors shadow-[0_6px_18px_rgba(14,165,95,0.35)]"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

// ─── helpers ───

function Field({
  label,
  value,
  onChange,
  placeholder,
  hint,
  maxLength,
  inputRef,
  widthClass,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  hint?: string
  maxLength?: number
  inputRef?: React.RefObject<HTMLInputElement | null>
  widthClass?: string
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium tracking-[0.08em] text-white/65 uppercase mb-1.5">
        {label}
      </span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`${widthClass ?? 'w-full'} px-3.5 py-2.5 rounded-[10px] bg-black/30 border border-vg-border text-white placeholder:text-white/30 focus:outline-none focus:border-vg-accent focus:ring-1 focus:ring-vg-accent transition-colors`}
      />
      {hint && <span className="block text-xs text-white/40 mt-1.5">{hint}</span>}
    </label>
  )
}
