'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Bread } from '@/data/breads'

export type CartItem = {
  bread: Bread
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addToCart: (bread: Bread, quantity?: number) => void
  removeFromCart: (breadId: string) => void
  updateQuantity: (breadId: string, quantity: number) => void
  getItemQuantity: (breadId: string) => number
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = useCallback((bread: Bread, quantity = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.bread.id === bread.id)
      
      if (existingItem) {
        return currentItems.map((item) =>
          item.bread.id === bread.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      
      return [...currentItems, { bread, quantity }]
    })
  }, [])

  const removeFromCart = useCallback((breadId: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.bread.id !== breadId))
  }, [])

  const updateQuantity = useCallback((breadId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((currentItems) => currentItems.filter((item) => item.bread.id !== breadId))
      return
    }
    
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.bread.id === breadId ? { ...item, quantity } : item
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const getItemQuantity = useCallback((breadId: string) => {
    const item = items.find((item) => item.bread.id === breadId)
    return item ? item.quantity : 0
  }, [items])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.bread.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        getItemQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
