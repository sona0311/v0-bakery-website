'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, AlertCircle, Plus, Minus, Check } from 'lucide-react'
import type { Bread } from '@/data/breads'
import { useCart } from '@/context/cart-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

type BreadCardProps = {
  bread: Bread
  showDetails?: boolean
}

export function BreadCard({ bread, showDetails = false }: BreadCardProps) {
  const { addToCart, getItemQuantity, updateQuantity } = useCart()
  const isOutOfStock = bread.stock === 0
  const cartQuantity = getItemQuantity(bread.id)
  const [showAdded, setShowAdded] = useState(false)

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(bread, 1)
      setShowAdded(true)
      setTimeout(() => setShowAdded(false), 1500)
    }
  }

  const handleIncrement = () => {
    if (!isOutOfStock) {
      addToCart(bread, 1)
    }
  }

  const handleDecrement = () => {
    if (cartQuantity > 1) {
      updateQuantity(bread.id, cartQuantity - 1)
    }
  }

  return (
    <Card className="group overflow-hidden bg-card border-border hover:border-primary/30 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={bread.image}
          alt={bread.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <span className="text-destructive font-bold text-lg">売り切れ</span>
          </div>
        )}
        {bread.isRecommended && !isOutOfStock && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
            おすすめ
          </span>
        )}
        {/* カート内数量バッジ */}
        {cartQuantity > 0 && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-sm font-bold px-2 py-1 rounded-full min-w-[28px] text-center">
            {cartQuantity}
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg text-foreground mb-1">{bread.name}</h3>
        <p className="text-xl font-bold text-primary">&yen;{bread.price.toLocaleString()}</p>
        
        {showDetails && (
          <>
            <p className="text-sm text-muted-foreground mt-3 line-clamp-3">
              {bread.description}
            </p>
            
            {/* 在庫表示 */}
            <div className="mt-3 flex items-center gap-2">
              {isOutOfStock ? (
                <span className="flex items-center gap-1 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  在庫切れ
                </span>
              ) : bread.stock <= 5 ? (
                <span className="text-sm text-accent">残り{bread.stock}点</span>
              ) : (
                <span className="text-sm text-muted-foreground">在庫あり</span>
              )}
            </div>

            {/* カート内の数量表示 */}
            {cartQuantity > 0 && (
              <div className="mt-2 text-sm text-primary font-medium">
                カートに {cartQuantity} 点
              </div>
            )}
          </>
        )}
      </CardContent>
      
      {showDetails && (
        <CardFooter className="p-4 pt-0 flex flex-col gap-2">
          {cartQuantity > 0 ? (
            <>
              {/* 数量調整UI */}
              <div className="w-full flex items-center justify-between bg-muted rounded-lg p-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleDecrement}
                  disabled={cartQuantity <= 1}
                  aria-label={`${bread.name}の数量を減らす`}
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </Button>
                <span className="font-bold text-foreground" aria-label={`数量: ${cartQuantity}`}>
                  {cartQuantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleIncrement}
                  aria-label={`${bread.name}の数量を増やす`}
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
              {/* 注文へ進むボタン */}
              <Button asChild variant="secondary" className="w-full">
                <Link href="/cart">注文へ進む</Link>
              </Button>
            </>
          ) : (
            <Button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="w-full relative"
              aria-label={`${bread.name}をカートに追加`}
            >
              {showAdded ? (
                <>
                  <Check className="h-4 w-4 mr-2" aria-hidden="true" />
                  追加しました
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" aria-hidden="true" />
                  カートに追加
                </>
              )}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
