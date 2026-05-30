import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const metadata = {
  title: '注文完了 | ぱんのいえ',
  description: 'ご注文ありがとうございます。',
}

export default function CheckoutCompletePage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-8 pb-8">
          <CheckCircle className="h-16 w-16 mx-auto text-primary mb-6" aria-hidden="true" />
          <h1 className="text-2xl font-bold text-foreground mb-2">ご注文ありがとうございます</h1>
          <p className="text-muted-foreground mb-6">
            ご注文を承りました。<br />
            確認メールをお送りしましたので、ご確認ください。
          </p>
          
          <div className="bg-muted rounded-lg p-4 mb-6 text-left">
            <h2 className="font-semibold text-foreground mb-2">注文番号</h2>
            <p className="text-lg font-mono text-primary">
              #{String(Date.now()).slice(-8)}
            </p>
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
