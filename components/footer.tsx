import Link from 'next/link'
import { shopInfo } from '@/data/shop'

const footerNavigation = {
  shop: [
    { name: 'ホーム', href: '/' },
    { name: 'パン一覧', href: '/breads' },
    { name: '店舗情報', href: '/shop' },
    { name: 'お知らせ', href: '/news' },
    { name: 'お問い合わせ', href: '/contact' },
  ],
  account: [
    { name: 'ログイン', href: '/login' },
    { name: '新規会員登録', href: '/register' },
    { name: 'カート', href: '/cart' },
  ],
}

export function Footer() {
  return (
    <footer role="contentinfo" className="bg-card border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 店舗情報 */}
          <div className="md:col-span-2">
            <h2 className="font-bold text-xl text-primary mb-4">
              {shopInfo.name}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {shopInfo.description}
            </p>
            <address className="not-italic text-sm text-muted-foreground">
              <p>{shopInfo.address.postalCode}</p>
              <p>{shopInfo.address.full}</p>
              <p className="mt-2">Tel: {shopInfo.phone}</p>
            </address>
          </div>

          {/* ショップメニュー */}
          <nav aria-label="フッターショップメニュー">
            <h3 className="font-bold text-foreground mb-4">メニュー</h3>
            <ul className="flex flex-col gap-2 text-sm">
              {footerNavigation.shop.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* アカウントメニュー */}
          <nav aria-label="フッターアカウントメニュー">
            <h3 className="font-bold text-foreground mb-4">アカウント</h3>
            <ul className="flex flex-col gap-2 text-sm">
              {footerNavigation.account.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* 営業時間 */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">営業時間:</span>{' '}
              平日 {shopInfo.businessHours.weekday} / 土日祝 {shopInfo.businessHours.weekend}
              <span className="mx-2">|</span>
              <span className="font-medium text-foreground">定休日:</span>{' '}
              {shopInfo.closedDays}
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {shopInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
