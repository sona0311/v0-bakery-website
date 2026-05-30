import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, Phone, ChevronRight } from 'lucide-react'
import { getRecommendedBreads } from '@/data/breads'
import { shopInfo } from '@/data/shop'
import { BreadCard } from '@/components/bread-card'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  const recommendedBreads = getRecommendedBreads()

  return (
    <div className="flex flex-col">
      {/* ヒーローセクション */}
      <section aria-labelledby="hero-heading" className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        <Image
          src="/images/hero.jpg"
          alt="焼きたてパン"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/60" />
        <div className="relative z-10 text-center px-4">
          <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance text-foreground">
            {shopInfo.catchphrase}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {shopInfo.description}
          </p>
        </div>
      </section>

      {/* おすすめパン一覧 */}
      <section aria-labelledby="recommended-heading" className="py-16 md:py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 id="recommended-heading" className="text-3xl md:text-4xl font-bold text-foreground">おすすめパン</h2>
            <p className="text-muted-foreground mt-2">毎日心を込めて焼き上げています</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedBreads.map((bread) => (
              <BreadCard key={bread.id} bread={bread} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link href="/breads">
                すべてのパンを見る
                <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 店舗紹介 */}
      <section aria-labelledby="about-heading" className="py-16 md:py-24 px-4 bg-muted">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/shop.jpg"
                alt="店舗外観"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 id="about-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {shopInfo.name}について
              </h2>
              <Button asChild size="lg">
                <Link href="/shop">店舗情報を見る</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* アクセス情報 */}
      <section aria-labelledby="access-heading" className="py-16 md:py-24 px-4 bg-muted">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 id="access-heading" className="text-3xl md:text-4xl font-bold text-foreground">アクセス</h2>
            <p className="text-muted-foreground mt-2">お気軽にお立ち寄りください</p>
          </div>
          <div className="bg-card rounded-lg p-8 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
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
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" aria-hidden="true" />
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
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">電話番号</h3>
                    <p className="text-muted-foreground text-sm mt-1">{shopInfo.phone}</p>
                  </div>
                </div>
              </div>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Googleマップ埋め込みエリア</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section aria-labelledby="cta-heading" className="py-16 md:py-24 px-4 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl text-center">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-4">
            オンラインでもご注文いただけます
          </h2>
          <p className="opacity-90 mb-8 max-w-2xl mx-auto">
            店舗受け取り、ご自宅への配送、どちらも承っております。焼きたてパンをお楽しみください。
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/order">オンライン注文へ</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
