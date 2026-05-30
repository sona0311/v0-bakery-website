'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Store, Calendar, Clock } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { useAuth } from '@/context/auth-context'
import { shopInfo } from '@/data/shop'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// 店舗リスト（複数店舗がある場合を想定）
const stores = [
  {
    id: 'main',
    name: shopInfo.name + ' 本店',
    address: shopInfo.address.full,
    phone: shopInfo.phone,
    businessHours: shopInfo.businessHours,
  },
]

// 受け取り可能時間スロット
const timeSlots = [
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00',
]

// 今日から7日間の日付を生成
function getAvailableDates() {
  const dates = []
  const today = new Date()
  for (let i = 1; i <= 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    dates.push({
      value: date.toISOString().split('T')[0],
      label: `${date.getMonth() + 1}/${date.getDate()}(${['日', '月', '火', '水', '木', '金', '土'][date.getDay()]})`,
    })
  }
  return dates
}

export default function PickupPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  
  const [pickupData, setPickupData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    storeId: stores[0].id,
    date: '',
    time: '',
  })

  const availableDates = getAvailableDates()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setPickupData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // ダミーの注文処理
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    clearCart()
    router.push('/checkout/pickup/complete')
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
          <h1 className="text-3xl font-bold text-foreground">店舗受け取り注文</h1>
          <p className="text-muted-foreground mt-1">受け取り店舗と日時を選択してください</p>
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
            {/* 受け取り情報入力フォーム */}
            <section className="lg:col-span-2 space-y-6">
              {/* お客様情報 */}
              <Card>
                <CardHeader>
                  <CardTitle>お客様情報</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">お名前</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={pickupData.name}
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
                        value={pickupData.phone}
                        onChange={handleChange}
                        required
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 店舗選択 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Store className="h-5 w-5" aria-hidden="true" />
                    受け取り店舗
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stores.map((store) => (
                      <label
                        key={store.id}
                        className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                          pickupData.storeId === store.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="storeId"
                          value={store.id}
                          checked={pickupData.storeId === store.id}
                          onChange={handleChange}
                          className="mt-1"
                        />
                        <div>
                          <p className="font-medium text-foreground">{store.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">{store.address}</p>
                          <p className="text-sm text-muted-foreground">Tel: {store.phone}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 日時選択 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" aria-hidden="true" />
                    受け取り日時
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">受け取り日</Label>
                    <select
                      id="date"
                      name="date"
                      value={pickupData.date}
                      onChange={handleChange}
                      required
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground"
                    >
                      <option value="">日付を選択</option>
                      {availableDates.map((date) => (
                        <option key={date.value} value={date.value}>
                          {date.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time">受け取り時間</Label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {timeSlots.map((time) => (
                        <label
                          key={time}
                          className={`flex items-center justify-center p-2 rounded-md border cursor-pointer text-sm transition-colors ${
                            pickupData.time === time
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="time"
                            value={time}
                            checked={pickupData.time === time}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
                          {time}
                        </label>
                      ))}
                    </div>
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
                  
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>合計</span>
                      <span className="text-primary">&yen;{totalPrice.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      店舗受け取りのため送料無料
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading || !pickupData.date || !pickupData.time}
                  >
                    {isLoading ? '処理中...' : '注文を確定する'}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    お支払いは店舗にて承ります
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
