'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/cart-context'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  
  const [shippingData, setShippingData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    postalCode: '',
    prefecture: '',
    city: '',
    address: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // ダミーの注文処理
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    clearCart()
    router.push('/checkout/complete')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">カートに商品がありません</h1>
          <p className="text-muted-foreground mb-6">商品をカートに追加してください</p>
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
          <h1 className="text-3xl font-bold text-foreground">ご購入手続き</h1>
          <p className="text-muted-foreground mt-1">配送先情報を入力してください</p>
        </header>

        {!isAuthenticated && (
          <div className="mb-6 p-4 bg-muted rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              <Link href="/login" className="text-primary hover:underline">ログイン</Link>
              すると、登録情報を自動入力できます。
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 配送先入力フォーム */}
            <section aria-labelledby="shipping-heading" className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle id="shipping-heading">配送先情報</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">お名前</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={shippingData.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">電話番号</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={shippingData.phone}
                        onChange={handleChange}
                        required
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">郵便番号</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      placeholder="123-4567"
                      value={shippingData.postalCode}
                      onChange={handleChange}
                      required
                      autoComplete="postal-code"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="prefecture">都道府県</Label>
                      <Input
                        id="prefecture"
                        name="prefecture"
                        type="text"
                        value={shippingData.prefecture}
                        onChange={handleChange}
                        required
                        autoComplete="address-level1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">市区町村</Label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        value={shippingData.city}
                        onChange={handleChange}
                        required
                        autoComplete="address-level2"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">番地・建物名</Label>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      value={shippingData.address}
                      onChange={handleChange}
                      required
                      autoComplete="street-address"
                    />
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 注文サマリー */}
            <aside className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>ご注文内容</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.bread.id} className="flex gap-3">
                        <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={item.bread.image}
                            alt={item.bread.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.bread.name}</p>
                          <p className="text-sm text-muted-foreground">
                            &yen;{item.bread.price.toLocaleString()} x {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">小計</span>
                      <span>&yen;{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">送料</span>
                      <span>&yen;500</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                      <span>合計</span>
                      <span className="text-primary">&yen;{(totalPrice + 500).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? '処理中...' : '注文を確定する'}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    注文確定で利用規約に同意したものとみなされます
                  </p>
                </CardContent>
              </Card>
            </aside>
          </div>
        </form>
      </div>
    </div>
  )
}
