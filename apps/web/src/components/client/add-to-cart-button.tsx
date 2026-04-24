'use client'

import { useState } from 'react'
import { useCartStore, type CartItem } from '@/stores/cart-store'

type Props = {
  item: Omit<CartItem, 'qty'>
  label?: string
  addedLabel?: string
  variant?: 'primary' | 'outline'
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

  const base = 'inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg text-sm font-bold transition-colors'
  const style =
    variant === 'primary'
      ? 'bg-vg-accent hover:bg-vg-accent-hover text-white'
      : 'border border-vg-accent text-vg-accent hover:bg-vg-accent/5'

  return (
    <button type="button" onClick={onClick} className={`${base} ${style} ${className}`} aria-live="polite">
      {justAdded ? addedLabel : label}
    </button>
  )
}
