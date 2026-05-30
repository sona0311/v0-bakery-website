'use client'

import Link from 'next/link'
import { Store, Truck, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function OrderPage() {
  return (
    <div className="py-12 md:py-16 px-4">
      <div className="mx-auto max-w-4xl">
        {/* ページヘッダー */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">オンライン注文</h1>
          <p className="text-muted-foreground mt-2">
            店舗受け取り、ご自宅への配送、どちらも承っております
          </p>
        </header>

        {/* 注文方法選択 */}
        <section aria-label="注文方法を選択" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* 店舗受け取り */}
          <Card className="relative overflow-hidden hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Store className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <CardTitle>店舗受け取り</CardTitle>
              <CardDescription>
                ご来店時に焼きたてパンをお渡しします
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                <li>受け取り日時を指定可能</li>
                <li>焼きたての状態でお渡し</li>
                <li>送料無料</li>
              </ul>
              <Button asChild className="w-full">
                <Link href="/breads">
                  パンを選ぶ
                  <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* 配送 */}
          <Card className="relative overflow-hidden hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <CardTitle>ご自宅へ配送</CardTitle>
              <CardDescription>
                ご指定の住所までお届けします
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                <li>全国配送対応</li>
                <li>丁寧に梱包してお届け</li>
                <li>送料500円</li>
              </ul>
              <Button asChild className="w-full">
                <Link href="/breads">
                  パンを選ぶ
                  <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* 注意事項 */}
        <aside className="bg-card rounded-lg p-6 border border-border">
          <h2 className="font-bold text-foreground mb-3">ご注文について</h2>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>在庫状況はリアルタイムで更新されています。</li>
            <li>店舗受け取りの場合、ご希望の日時をお選びいただけます。</li>
            <li>配送の場合、焼きたての状態でお届けできるよう梱包いたします。</li>
            <li>お支払いは店頭でのお支払い、またはクレジットカードをご利用いただけます。</li>
          </ul>
        </aside>
      </div>
    </div>
  )
}
