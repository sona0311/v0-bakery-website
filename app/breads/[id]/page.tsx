import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Wheat, AlertTriangle, Star } from 'lucide-react'
import { breads, getBreadById } from '@/data/breads'
import { Button } from '@/components/ui/button'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return breads.map((bread) => ({
    id: bread.id,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const bread = getBreadById(id)
  
  if (!bread) {
    return { title: 'パンが見つかりません | ぱんのいえ' }
  }

  return {
    title: `${bread.name} | ぱんのいえ`,
    description: bread.description,
  }
}

export default async function BreadDetailPage({ params }: Props) {
  const { id } = await params
  const bread = getBreadById(id)

  if (!bread) {
    notFound()
  }

  return (
    <div className="py-8 md:py-16 px-4">
      <div className="mx-auto max-w-4xl">
        {/* 戻るボタン */}
        <Button asChild variant="ghost" className="mb-6 -ml-2">
          <Link href="/#breads">
            <ArrowLeft className="w-4 h-4 mr-2" />
            トップページに戻る
          </Link>
        </Button>

        <div className="bg-card rounded-2xl overflow-hidden border border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* パン画像 */}
            <div className="relative aspect-square bg-muted">
              <Image
                src={bread.image}
                alt={bread.name}
                fill
                className="object-cover"
                priority
              />
              {bread.isRecommended && (
                <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-sm font-medium px-4 py-2 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  おすすめ
                </span>
              )}
            </div>

            {/* パン情報 */}
            <div className="p-6 md:p-8 flex flex-col">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {bread.name}
                </h1>
                <p className="text-2xl md:text-3xl font-bold text-primary mt-2">
                  ¥{bread.price.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground ml-1">(税込)</span>
                </p>
                
                <p className="text-foreground/80 leading-relaxed mt-6">
                  {bread.description}
                </p>

                {/* 原材料 */}
                <div className="mt-8">
                  <h2 className="font-bold text-foreground flex items-center gap-2 mb-3">
                    <Wheat className="w-5 h-5 text-primary" />
                    原材料
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {bread.ingredients.map((ingredient) => (
                      <span
                        key={ingredient}
                        className="bg-secondary text-secondary-foreground text-sm px-3 py-1 rounded-full"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                {/* アレルギー情報 */}
                <div className="mt-6">
                  <h2 className="font-bold text-foreground flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-accent" />
                    アレルギー情報
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {bread.allergens.map((allergen) => (
                      <span
                        key={allergen}
                        className="bg-accent/10 text-accent border border-accent/30 text-sm px-3 py-1 rounded-full font-medium"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>

                {/* おすすめポイント */}
                <div className="mt-6 bg-muted rounded-xl p-4">
                  <h2 className="font-bold text-foreground flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-primary" />
                    おすすめポイント
                  </h2>
                  <p className="text-foreground/80 text-sm leading-relaxed">
                    {bread.recommendation}
                  </p>
                </div>
              </div>

              {/* アクション */}
              <div className="mt-8 pt-6 border-t border-border">
                <Button asChild size="lg" className="w-full rounded-full">
                  <Link href="/contact">このパンについて問い合わせる</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 他のパン */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">他のパンも見る</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {breads
              .filter((b) => b.id !== bread.id)
              .slice(0, 4)
              .map((otherBread) => (
                <Link
                  key={otherBread.id}
                  href={`/breads/${otherBread.id}`}
                  className="group"
                >
                  <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-colors">
                    <div className="relative aspect-square bg-muted">
                      <Image
                        src={otherBread.image}
                        alt={otherBread.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                        {otherBread.name}
                      </h3>
                      <p className="text-primary font-bold text-sm mt-1">
                        ¥{otherBread.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
