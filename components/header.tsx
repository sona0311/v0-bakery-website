'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, ShoppingCart, User, LogOut } from 'lucide-react'
import { shopInfo } from '@/data/shop'
import { useAuth } from '@/context/auth-context'
import { useCart } from '@/context/cart-context'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'ホーム', href: '/' },
  { name: 'パン一覧', href: '/breads' },
  { name: 'オンライン注文', href: '/order' },
  { name: '店舗情報', href: '/shop' },
  { name: 'お知らせ', href: '/news' },
  { name: 'お問い合わせ', href: '/contact' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuth()
  const { totalItems } = useCart()

  const isCurrentPage = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header role="banner" className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* ロゴ */}
          <Link href="/" className="flex items-center gap-3" aria-label={`${shopInfo.name} ホームへ`}>
            <span className="text-2xl font-bold text-primary tracking-wide">{shopInfo.name}</span>
          </Link>

          {/* デスクトップナビゲーション */}
          <nav role="navigation" aria-label="メインナビゲーション" className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => {
              const isCurrent = isCurrentPage(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isCurrent ? 'page' : undefined}
                  aria-disabled={isCurrent}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isCurrent
                      ? 'bg-primary/10 text-primary cursor-default pointer-events-none'
                      : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                  }`}
                  onClick={(e) => {
                    if (isCurrent) e.preventDefault()
                  }}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* ユーザーアクション */}
          <div className="flex items-center gap-2">
            {/* カートボタン */}
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="relative"
              aria-label={`カート ${totalItems}点`}
            >
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </Button>

            {/* 認証ボタン（デスクトップ） */}
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-muted-foreground px-2">
                    {user?.name}さん
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    aria-label="ログアウト"
                  >
                    <LogOut className="h-4 w-4 mr-1" aria-hidden="true" />
                    ログアウト
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/login">ログイン</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/register">新規会員登録</Link>
                  </Button>
                </>
              )}
            </div>

            {/* モバイルメニューボタン */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* モバイルナビゲーション */}
        {isMenuOpen && (
          <nav
            id="mobile-menu"
            role="navigation"
            aria-label="モバイルナビゲーション"
            className="lg:hidden py-4 border-t border-border"
          >
            <ul className="flex flex-col gap-1">
              {navigation.map((item) => {
                const isCurrent = isCurrentPage(item.href)
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      aria-current={isCurrent ? 'page' : undefined}
                      aria-disabled={isCurrent}
                      className={`block py-3 px-4 rounded-md font-medium transition-colors ${
                        isCurrent
                          ? 'bg-primary/10 text-primary cursor-default'
                          : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                      }`}
                      onClick={(e) => {
                        if (isCurrent) {
                          e.preventDefault()
                        } else {
                          setIsMenuOpen(false)
                        }
                      }}
                    >
                      {item.name}
                    </Link>
                  </li>
                )
              })}
              {/* モバイル認証リンク */}
              <li className="border-t border-border mt-2 pt-2">
                {isAuthenticated ? (
                  <div className="px-4 py-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      {user?.name}さんでログイン中
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                      }}
                      className="w-full"
                    >
                      <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                      ログアウト
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 px-4 py-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        <User className="h-4 w-4 mr-2" aria-hidden="true" />
                        ログイン
                      </Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                        新規会員登録
                      </Link>
                    </Button>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
