import Link from 'next/link'
import { shopInfo } from '@/data/shop'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 店舗情報 */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span role="img" aria-label="パン">🍞</span>
              {shopInfo.name}
            </h3>
            <p className="text-sm opacity-90 leading-relaxed">
              {shopInfo.description}
            </p>
          </div>

          {/* リンク */}
          <div>
            <h3 className="font-bold text-lg mb-4">メニュー</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link href="/" className="opacity-90 hover:opacity-100 transition-opacity">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/shop" className="opacity-90 hover:opacity-100 transition-opacity">
                  店舗情報
                </Link>
              </li>
              <li>
                <Link href="/news" className="opacity-90 hover:opacity-100 transition-opacity">
                  お知らせ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="opacity-90 hover:opacity-100 transition-opacity">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>

          {/* 営業情報 */}
          <div>
            <h3 className="font-bold text-lg mb-4">営業時間</h3>
            <dl className="text-sm space-y-2">
              <div>
                <dt className="opacity-75">平日</dt>
                <dd>{shopInfo.businessHours.weekday}</dd>
              </div>
              <div>
                <dt className="opacity-75">土日祝</dt>
                <dd>{shopInfo.businessHours.weekend}</dd>
              </div>
              <div>
                <dt className="opacity-75">定休日</dt>
                <dd>{shopInfo.closedDays}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm opacity-75">
          <p>&copy; {new Date().getFullYear()} {shopInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
