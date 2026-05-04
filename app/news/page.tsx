import Link from 'next/link'
import { newsList } from '@/data/news'

export const metadata = {
  title: 'お知らせ | ぱんのいえ',
  description: 'ぱんのいえからのお知らせ一覧です。新商品情報やイベント情報をお届けします。',
}

const categoryColors: Record<string, string> = {
  'お知らせ': 'bg-secondary text-secondary-foreground',
  '新商品': 'bg-accent/10 text-accent border border-accent/30',
  'イベント': 'bg-primary/10 text-primary border border-primary/30',
  '臨時休業': 'bg-destructive/10 text-destructive border border-destructive/30',
}

export default function NewsPage() {
  return (
    <div className="py-8 md:py-16 px-4">
      <div className="mx-auto max-w-4xl">
        {/* ページヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">お知らせ</h1>
          <p className="text-muted-foreground mt-2">最新情報をお届けします</p>
        </div>

        {/* お知らせ一覧 */}
        <div className="space-y-6">
          {newsList.map((news) => (
            <article
              key={news.id}
              className="bg-card rounded-2xl p-6 md:p-8 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <time className="text-sm text-muted-foreground">{news.date}</time>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${categoryColors[news.category] || categoryColors['お知らせ']}`}>
                  {news.category}
                </span>
              </div>
              <h2 className="font-bold text-xl text-foreground mb-3">{news.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{news.content}</p>
            </article>
          ))}
        </div>

        {/* トップへ戻る */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            ← トップページに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
