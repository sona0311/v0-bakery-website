'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type User = {
  id: string
  name: string
  email: string
  phone: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
}

export type RegisterData = {
  name: string
  email: string
  password: string
  phone: string
  cardNumber: string
  cardHolder: string
  expiryDate: string
  securityCode: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// ダミーユーザーデータ（実際の実装ではバックエンドAPIを使用）
const DUMMY_USERS: (User & { password: string })[] = [
  {
    id: '1',
    name: 'テストユーザー',
    email: 'test@example.com',
    password: 'password123',
    phone: '090-1234-5678',
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // ダミー認証（実際の実装ではAPIを呼び出す）
    const foundUser = DUMMY_USERS.find(
      (u) => u.email === email && u.password === password
    )
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      return true
    }
    return false
  }, [])

  const register = useCallback(async (userData: RegisterData): Promise<boolean> => {
    // ダミー登録（実際の実装ではAPIを呼び出す）
    const newUser: User = {
      id: String(Date.now()),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
    }
    setUser(newUser)
    return true
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
