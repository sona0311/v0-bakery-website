import { breads } from '@/data/breads'
import { BreadCard } from '@/components/bread-card'

export const metadata = {
  title: 'パン一覧 | ぱんのいえ',
  description: 'ぱんのいえのパン一覧です。クロワッサン、あんぱん、メロンパンなど、毎日焼きたての手作りパンをご用意しています。',
}

export default function BreadsPage() {
  return (
    <div className="py-12 md:py-16 px-4">
      <div className="mx-auto max-w-6xl">
        {/* ページヘッダー */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">パン一覧</h1>
          <p className="text-muted-foreground mt-2">毎日心を込めて焼き上げています</p>
        </header>

        {/* パン一覧グリッド */}
        <section aria-label="パン商品一覧">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {breads.map((bread) => (
              <BreadCard key={bread.id} bread={bread} showDetails />
            ))}
          </div>
        </section>

        {/* 注意事項 */}
        <aside className="mt-12 p-6 bg-card rounded-lg border border-border">
          <h2 className="font-bold text-foreground mb-3">ご注文について</h2>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>在庫状況はリアルタイムで更新されています。</li>
            <li>店舗受け取りの場合、ご希望の日時をお選びいただけます。</li>
            <li>配送の場合、焼きたての状態でお届けできるよう梱包いたします。</li>
            <li>アレルギー情報は各商品詳細ページでご確認ください。</li>
          </ul>
        </aside>
      </div>
    </div>
  )
}
