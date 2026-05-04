import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, Phone } from 'lucide-react'
import { breads, getRecommendedBreads } from '@/data/breads'
import { shopInfo } from '@/data/shop'
import { getLatestNews } from '@/data/news'
import { BreadCard } from '@/components/bread-card'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  const recommendedBreads = getRecommendedBreads()
  const latestNews = getLatestNews(3)

  return (
    <div className="flex flex-col">
      {/* ヒーローセクション */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        <Image
          src="/images/hero.jpg"
          alt="焼きたてパン"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="relative z-10 text-center text-card px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
            {shopInfo.catchphrase}
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            {shopInfo.description}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="#breads">パンを見る</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 bg-card/10 border-card text-card hover:bg-card hover:text-foreground">
              <Link href="/contact">お問い合わせ</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* おすすめパン一覧 */}
      <section id="breads" className="py-16 md:py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">おすすめパン</h2>
            <p className="text-muted-foreground mt-2">毎日心を込めて焼き上げています</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedBreads.map((bread) => (
              <BreadCard key={bread.id} bread={bread} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/shop">すべてのパンを見る →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 店舗紹介 */}
      <section className="py-16 md:py-24 px-4 bg-muted">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/shop.jpg"
                alt="店舗外観"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {shopInfo.name}について
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-6">
                私たちは小さな町のパン屋さんです。毎朝早くから生地を仕込み、一つ一つ丁寧にパンを焼き上げています。
                素材にこだわり、添加物をできるだけ使わない、体にやさしいパン作りを心がけています。
              </p>
              <p className="text-foreground/80 leading-relaxed mb-8">
                お店に一歩入ると、焼きたてパンの香ばしい香りに包まれます。
                ぜひ一度、私たちのパンを味わってみてください。
              </p>
              <Button asChild size="lg" className="rounded-full">
                <Link href="/shop">店舗情報を見る</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* お知らせ */}
      <section className="py-16 md:py-24 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">お知らせ</h2>
            <p className="text-muted-foreground mt-2">最新情報をお届けします</p>
          </div>
          <div className="space-y-4">
            {latestNews.map((news) => (
              <article
                key={news.id}
                className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <time className="text-sm text-muted-foreground">{news.date}</time>
                  <span className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                    {news.category}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-foreground">{news.title}</h3>
                <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{news.content}</p>
              </article>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/news">お知らせ一覧 →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* アクセス情報 */}
      <section className="py-16 md:py-24 px-4 bg-muted">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">アクセス</h2>
            <p className="text-muted-foreground mt-2">お気軽にお立ち寄りください</p>
          </div>
          <div className="bg-card rounded-2xl p-8 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">住所</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {shopInfo.address.postalCode}<br />
                      {shopInfo.address.full}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">営業時間</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      平日: {shopInfo.businessHours.weekday}<br />
                      土日祝: {shopInfo.businessHours.weekend}<br />
                      定休日: {shopInfo.closedDays}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">電話番号</h3>
                    <p className="text-muted-foreground text-sm mt-1">{shopInfo.phone}</p>
                  </div>
                </div>
              </div>
              <div className="aspect-video bg-muted rounded-xl overflow-hidden">
                {/* Googleマップ埋め込みエリア */}
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                  Googleマップ埋め込みエリア
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-16 md:py-24 px-4 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            お気軽にお問い合わせください
          </h2>
          <p className="opacity-90 mb-8 max-w-2xl mx-auto">
            ご予約、ご質問、パン教室のお申し込みなど、お気軽にお問い合わせください。
          </p>
          <Button asChild size="lg" variant="secondary" className="rounded-full px-8">
            <Link href="/contact">お問い合わせはこちら</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
