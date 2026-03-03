export interface AuthUser {
  email: string,
  role: 'ADMIN' | 'OWNER' | 'CUSTOMER' | 'VISITOR'
}

export interface AuthResponse {
  token: string
  user: AuthUser
}
