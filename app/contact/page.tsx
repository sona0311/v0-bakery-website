'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Send, Phone, MapPin, Clock } from 'lucide-react'
import { shopInfo } from '@/data/shop'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 実際の送信処理はここに実装してください
    setIsSubmitted(true)
  }

  return (
    <div className="py-8 md:py-16 px-4">
      <div className="mx-auto max-w-4xl">
        {/* ページヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">お問い合わせ</h1>
          <p className="text-muted-foreground mt-2">ご質問・ご要望をお聞かせください</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* お問い合わせフォーム */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    お問い合わせありがとうございます
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    内容を確認の上、2〜3営業日以内にご返信いたします。
                  </p>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href="/">トップページに戻る</Link>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">お名前 <span className="text-destructive">*</span></Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="山田 太郎"
                        required
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">メールアドレス <span className="text-destructive">*</span></Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        required
                        className="rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">電話番号</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="03-1234-5678"
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">件名 <span className="text-destructive">*</span></Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="お問い合わせの件名"
                      required
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">お問い合わせ内容 <span className="text-destructive">*</span></Label>
                    <Textarea
                      id="message"
                      placeholder="お問い合わせ内容をご記入ください"
                      rows={6}
                      required
                      className="rounded-lg resize-none"
                    />
                  </div>

                  <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">
                    <p>
                      ※ご入力いただいた個人情報は、お問い合わせへの対応にのみ使用し、他の目的には使用いたしません。
                    </p>
                  </div>

                  <Button type="submit" size="lg" className="w-full rounded-full">
                    <Send className="w-4 h-4 mr-2" />
                    送信する
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* サイドバー */}
          <div className="space-y-6">
            {/* 電話でのお問い合わせ */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                お電話でのお問い合わせ
              </h2>
              <a
                href={`tel:${shopInfo.phone}`}
                className="text-2xl font-bold text-primary hover:underline"
              >
                {shopInfo.phone}
              </a>
              <p className="text-sm text-muted-foreground mt-2">
                営業時間内にお電話ください
              </p>
            </div>

            {/* 営業時間 */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                営業時間
              </h2>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">平日</dt>
                  <dd className="text-foreground">{shopInfo.businessHours.weekday}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">土日祝</dt>
                  <dd className="text-foreground">{shopInfo.businessHours.weekend}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">定休日</dt>
                  <dd className="text-foreground">{shopInfo.closedDays}</dd>
                </div>
              </dl>
            </div>

            {/* 住所 */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                所在地
              </h2>
              <p className="text-sm text-muted-foreground">
                {shopInfo.address.postalCode}<br />
                {shopInfo.address.full}
              </p>
              <Link
                href="/shop"
                className="inline-block mt-3 text-sm text-primary hover:underline"
              >
                店舗情報を見る →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
