'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import type { Product } from './products'

// 快照式購物車：加入當下記住名稱／價格／圖片，
// 商品來源（Supabase）變動或下架，購物袋仍能正常顯示結帳。
export type CartItem = {
  productId: string // slug
  quantity: number
  name: { zh: string; en: string }
  meta: { zh: string; en: string }
  price: { twd: number; myr: number }
  image: string
}

interface CartContextValue {
  items: CartItem[]
  itemCount: number
  add: (product: Product, quantity?: number) => void
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
const STORAGE_KEY = 'cici-cart-v2'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          setItems(parsed.filter(i => i?.productId && i?.price))
        }
      }
    } catch {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {}
  }, [items, hydrated])

  const add = (product: Product, quantity = 1) => {
    setItems(curr => {
      const existing = curr.find(i => i.productId === product.id)
      if (existing) {
        return curr.map(i =>
          i.productId === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [
        ...curr,
        {
          productId: product.id,
          quantity,
          name: product.name,
          meta: product.meta,
          price: product.price,
          image: product.image,
        },
      ]
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
    (acc, item) => ({
      twd: acc.twd + item.price.twd * item.quantity,
      myr: acc.myr + item.price.myr * item.quantity,
    }),
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
