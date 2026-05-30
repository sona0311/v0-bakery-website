'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth, type RegisterData } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    phone: '',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    securityCode: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const success = await register(formData)
      if (success) {
        router.push('/')
      } else {
        setError('登録に失敗しました。もう一度お試しください。')
      }
    } catch {
      setError('登録に失敗しました。もう一度お試しください。')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">新規会員登録</CardTitle>
          <CardDescription>
            アカウントを作成して、便利な機能をご利用ください
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <div role="alert" className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
                {error}
              </div>
            )}
            
            {/* 基本情報 */}
            <section aria-labelledby="basic-info-heading">
              <h2 id="basic-info-heading" className="text-lg font-semibold text-foreground mb-4">基本情報</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">お名前</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="山田 太郎"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">パスワード</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="8文字以上で入力"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    autoComplete="new-password"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">電話番号</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="090-1234-5678"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    autoComplete="tel"
                  />
                </div>
              </div>
            </section>

            {/* クレジットカード情報 */}
            <section aria-labelledby="card-info-heading">
              <h2 id="card-info-heading" className="text-lg font-semibold text-foreground mb-4">クレジットカード情報</h2>
              <p className="text-sm text-muted-foreground mb-4">
                オンライン決済にご利用いただけます（ダミー実装）
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">カード番号</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                    maxLength={19}
                    autoComplete="cc-number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cardHolder">カード名義</Label>
                  <Input
                    id="cardHolder"
                    name="cardHolder"
                    type="text"
                    placeholder="TARO YAMADA"
                    value={formData.cardHolder}
                    onChange={handleChange}
                    required
                    autoComplete="cc-name"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">有効期限</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required
                      maxLength={5}
                      autoComplete="cc-exp"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="securityCode">セキュリティコード</Label>
                    <Input
                      id="securityCode"
                      name="securityCode"
                      type="text"
                      placeholder="123"
                      value={formData.securityCode}
                      onChange={handleChange}
                      required
                      maxLength={4}
                      autoComplete="cc-csc"
                    />
                  </div>
                </div>
              </div>
            </section>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? '登録中...' : '会員登録する'}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              すでにアカウントをお持ちの方は{' '}
              <Link href="/login" className="text-primary hover:underline">
                ログイン
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
