import Link from 'next/link'
import { CheckCircle, Store, Calendar, Clock } from 'lucide-react'
import { shopInfo } from '@/data/shop'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const metadata = {
  title: '店舗受け取り注文完了 | ぱんのいえ',
  description: 'ご注文ありがとうございます。店舗にてお受け取りください。',
}

export default function PickupCompletePage() {
  // ダミーの受け取り情報
  const pickupInfo = {
    orderNumber: `#${String(Date.now()).slice(-8)}`,
    store: shopInfo.name + ' 本店',
    address: shopInfo.address.full,
    date: '受け取り日時は確認メールをご確認ください',
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardContent className="pt-8 pb-8 text-center">
          <CheckCircle className="h-16 w-16 mx-auto text-primary mb-6" aria-hidden="true" />
          <h1 className="text-2xl font-bold text-foreground mb-2">ご注文ありがとうございます</h1>
          <p className="text-muted-foreground mb-6">
            店舗受け取りのご予約を承りました。<br />
            確認メールをお送りしましたので、ご確認ください。
          </p>
          
          <div className="bg-muted rounded-lg p-4 mb-6 text-left space-y-4">
            <div>
              <h2 className="font-semibold text-foreground mb-1">注文番号</h2>
              <p className="text-lg font-mono text-primary">{pickupInfo.orderNumber}</p>
            </div>
            
            <div className="flex items-start gap-3">
              <Store className="h-5 w-5 text-muted-foreground mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-medium text-foreground">受け取り店舗</h3>
                <p className="text-sm text-muted-foreground">{pickupInfo.store}</p>
                <p className="text-sm text-muted-foreground">{pickupInfo.address}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-medium text-foreground">受け取り日時</h3>
                <p className="text-sm text-muted-foreground">{pickupInfo.date}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4 mb-6 text-left">
            <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" aria-hidden="true" />
              ご注意事項
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>ご予約時間にご来店ください</li>
              <li>注文番号をスタッフにお伝えください</li>
              <li>お支払いは店舗にて承ります</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/">ホームに戻る</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/breads">他のパンを見る</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
