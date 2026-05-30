'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" aria-hidden="true" />
          <h1 className="text-2xl font-bold text-foreground mb-2">カートは空です</h1>
          <p className="text-muted-foreground mb-6">美味しいパンを探しに行きましょう</p>
          <Button asChild>
            <Link href="/breads">パン一覧を見る</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 md:py-16 px-4">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">カート</h1>
          <p className="text-muted-foreground mt-1">{totalItems}点の商品</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* カートアイテム一覧 */}
          <section aria-label="カート内の商品" className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.bread.id} className="overflow-hidden">
                <div className="flex">
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <Image
                      src={item.bread.image}
                      alt={item.bread.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <h2 className="font-bold text-foreground">{item.bread.name}</h2>
                      <p className="text-primary font-bold">&yen;{item.bread.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.bread.id, item.quantity - 1)}
                          aria-label={`${item.bread.name}の数量を減らす`}
                        >
                          <Minus className="h-4 w-4" aria-hidden="true" />
                        </Button>
                        <span className="w-8 text-center font-medium" aria-label={`数量: ${item.quantity}`}>
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.bread.id, item.quantity + 1)}
                          aria-label={`${item.bread.name}の数量を増やす`}
                        >
                          <Plus className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeFromCart(item.bread.id)}
                        aria-label={`${item.bread.name}をカートから削除`}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </section>

          {/* 注文サマリー */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>ご注文内容</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.bread.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.bread.name} x {item.quantity}
                      </span>
                      <span className="text-foreground">
                        &yen;{(item.bread.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>合計</span>
                    <span className="text-primary">&yen;{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button asChild className="w-full">
                  <Link href="/checkout">購入手続きへ</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/checkout/pickup">店舗受け取りで注文</Link>
                </Button>
              </CardFooter>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}
