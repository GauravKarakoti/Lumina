import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

interface AuthUser {
  id: number
  email: string
  role: 'USER' | 'ADMIN'
}

interface AuthContextType {
  user: AuthUser | null
  token: string | null
  login: (token: string, user: AuthUser) => void
  logout: () => void
  isAuthenticated: () => boolean
  isAdmin: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const getStoredUser = (): AuthUser | null => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      // Try to parse the stored user
      return JSON.parse(storedUser) as AuthUser;
    } catch (e) {
      // If parsing fails, remove the invalid item
      console.error("Failed to parse user from localStorage", e);
      localStorage.removeItem('user');
      return null;
    }
  }
  return null;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Initialize user state directly from localStorage
  const [user, setUser] = useState<AuthUser | null>(getStoredUser())
  
  // Initialize token state directly from localStorage
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  )

  const login = (newToken: string, newUser: AuthUser) => {
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  const isAuthenticated = () => !!token && !!user
  console.log('User role:', user)
  const isAdmin = () => !!token && user?.role === 'ADMIN'
  console.log('Is Admin:', isAdmin())

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}