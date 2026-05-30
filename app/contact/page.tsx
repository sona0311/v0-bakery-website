'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Send, Phone, MapPin, Clock } from 'lucide-react'
import { shopInfo } from '@/data/shop'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <div className="py-12 md:py-16 px-4">
      <div className="mx-auto max-w-4xl">
        {/* ページヘッダー */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">お問い合わせ</h1>
          <p className="text-muted-foreground mt-2">ご質問・ご要望をお聞かせください</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* お問い合わせフォーム */}
          <section aria-labelledby="contact-form-heading" className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle id="contact-form-heading" className="sr-only">お問い合わせフォーム</CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-primary" aria-hidden="true" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground mb-2">
                      お問い合わせありがとうございます
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      内容を確認の上、2〜3営業日以内にご返信いたします。
                    </p>
                    <Button asChild variant="outline">
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
                          name="name"
                          type="text"
                          placeholder="山田 太郎"
                          required
                          autoComplete="name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">メールアドレス <span className="text-destructive">*</span></Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="example@email.com"
                          required
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">電話番号</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="03-1234-5678"
                        autoComplete="tel"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">件名 <span className="text-destructive">*</span></Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="お問い合わせの件名"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">お問い合わせ内容 <span className="text-destructive">*</span></Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="お問い合わせ内容をご記入ください"
                        rows={6}
                        required
                      />
                    </div>

                    <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">
                      <p>
                        ご入力いただいた個人情報は、お問い合わせへの対応にのみ使用し、他の目的には使用いたしません。
                      </p>
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                      送信する
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </section>

          {/* サイドバー */}
          <aside className="space-y-6">
            {/* 電話でのお問い合わせ */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" aria-hidden="true" />
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
              </CardContent>
            </Card>

            {/* 営業時間 */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" aria-hidden="true" />
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
              </CardContent>
            </Card>

            {/* 住所 */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
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
                  店舗情報を見る
                </Link>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}
