import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, Phone, Train } from 'lucide-react'
import { shopInfo } from '@/data/shop'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: '店舗情報 | ぱんのいえ',
  description: `${shopInfo.name}の店舗情報。住所、営業時間、アクセス方法をご案内します。`,
}

export default function ShopPage() {
  return (
    <div className="py-12 md:py-16 px-4">
      <div className="mx-auto max-w-6xl">
        {/* ページヘッダー */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">店舗情報</h1>
          <p className="text-muted-foreground mt-2">アクセス・営業時間のご案内</p>
        </header>

        {/* 店舗情報カード */}
        <section aria-labelledby="shop-info-heading" className="bg-card rounded-lg overflow-hidden border border-border mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* 店舗画像 */}
            <div className="relative aspect-[4/3] lg:aspect-auto bg-muted">
              <Image
                src="/images/shop.jpg"
                alt="店舗外観"
                fill
                className="object-cover"
              />
            </div>

            {/* 店舗情報 */}
            <div className="p-6 md:p-8">
              <h2 id="shop-info-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                {shopInfo.name}
              </h2>

              <dl className="space-y-6">
                {/* 住所 */}
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="font-bold text-foreground">住所</dt>
                    <dd className="text-muted-foreground mt-1">
                      {shopInfo.address.postalCode}<br />
                      {shopInfo.address.full}
                    </dd>
                  </div>
                </div>

                {/* 営業時間 */}
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="font-bold text-foreground">営業時間</dt>
                    <dd className="text-muted-foreground mt-1">
                      <div className="space-y-1">
                        <p>平日: {shopInfo.businessHours.weekday}</p>
                        <p>土日祝: {shopInfo.businessHours.weekend}</p>
                        <p className="text-sm text-primary">{shopInfo.businessHours.note}</p>
                      </div>
                    </dd>
                  </div>
                </div>

                {/* 定休日 */}
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="font-bold text-foreground">定休日</dt>
                    <dd className="text-muted-foreground mt-1">{shopInfo.closedDays}</dd>
                  </div>
                </div>

                {/* 電話番号 */}
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="font-bold text-foreground">電話番号</dt>
                    <dd className="text-muted-foreground mt-1">
                      <a href={`tel:${shopInfo.phone}`} className="hover:text-primary transition-colors">
                        {shopInfo.phone}
                      </a>
                    </dd>
                  </div>
                </div>

                {/* アクセス */}
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <Train className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="font-bold text-foreground">アクセス</dt>
                    <dd className="text-muted-foreground mt-1">
                      <ul className="space-y-1">
                        {shopInfo.access.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Googleマップ */}
        <section aria-labelledby="map-heading" className="bg-card rounded-lg overflow-hidden border border-border mb-12">
          <div className="p-6 md:p-8">
            <h2 id="map-heading" className="text-xl font-bold text-foreground mb-4">地図</h2>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" aria-hidden="true" />
                  <p>Googleマップ埋め込みエリア</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
