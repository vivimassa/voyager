'use client'

/**
 * AddToCartButton — single-responsibility client component.
 * Pops a transient "Added ✓" confirmation; wiring real toasts can come later.
 * The parent page passes in the full CartItem payload so this button stays dumb.
 */
import { useState } from 'react'
import { useCartStore, type CartItem } from '@/stores/cart-store'

type Props = {
  item: Omit<CartItem, 'qty'>
  label?: string
  addedLabel?: string
  /** Visual variant — 'primary' uses Voyager CTA blue, 'ghost' is outlined. */
  variant?: 'primary' | 'ghost'
  className?: string
}

export function AddToCartButton({
  item,
  label = 'Add to cart',
  addedLabel = 'Added ✓',
  variant = 'primary',
  className = '',
}: Props) {
  const add = useCartStore((s) => s.add)
  const [justAdded, setJustAdded] = useState(false)

  const onClick = () => {
    add({ ...item, qty: 1 })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1400)
  }

  const base =
    'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all'
  const style =
    variant === 'primary'
      ? 'bg-vg-cta hover:bg-vg-cta-hover text-white shadow-[0_6px_20px_rgba(29,78,216,0.35)] hover:-translate-y-px'
      : 'border border-white/25 text-white/90 hover:bg-white/10 hover:border-white/45'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${style} ${className}`}
      aria-live="polite"
    >
      {justAdded ? addedLabel : label}
    </button>
  )
}
