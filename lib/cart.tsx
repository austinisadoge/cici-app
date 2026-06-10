'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { products, Product } from './products'

export type CartItem = {
  productId: string
  quantity: number
  variants?: Record<string, string>
}

interface CartContextValue {
  items: CartItem[]
  itemCount: number
  add: (productId: string, quantity?: number) => void
  remove: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clear: () => void
  subtotal: { twd: number; myr: number }
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const Ctx = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'cici-cart-v1'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setItems(parsed)
      }
    } catch {}
    setHydrated(true)
  }, [])

  // Persist
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {}
  }, [items, hydrated])

  const add = (productId: string, quantity = 1) => {
    setItems(curr => {
      const existing = curr.find(i => i.productId === productId)
      if (existing) {
        return curr.map(i =>
          i.productId === productId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [...curr, { productId, quantity }]
    })
  }

  const remove = (productId: string) => {
    setItems(curr => curr.filter(i => i.productId !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      remove(productId)
      return
    }
    setItems(curr =>
      curr.map(i => (i.productId === productId ? { ...i, quantity } : i))
    )
  }

  const clear = () => setItems([])

  const subtotal = items.reduce(
    (acc, item) => {
      const p = products.find(p => p.id === item.productId)
      if (!p) return acc
      return {
        twd: acc.twd + p.price.twd * item.quantity,
        myr: acc.myr + p.price.myr * item.quantity,
      }
    },
    { twd: 0, myr: 0 }
  )

  const itemCount = items.reduce((acc, i) => acc + i.quantity, 0)

  return (
    <Ctx.Provider
      value={{
        items,
        itemCount,
        add,
        remove,
        updateQuantity,
        clear,
        subtotal,
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        toggle: () => setIsOpen(o => !o),
      }}
    >
      {children}
    </Ctx.Provider>
  )
}

export function useCart() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useCart must be used within CartProvider')
  return c
}

export function findProduct(id: string): Product | undefined {
  return products.find(p => p.id === id)
}
