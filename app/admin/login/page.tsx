'use client'

import { useState, FormEvent, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const router = useRouter()
  const search = useSearchParams()
  const next = search.get('next') || '/admin/orders'
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Login failed')
      }
      router.push(next)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Login failed'
      setError(msg)
      setLoading(false)
    }
  }

  return (
    <main className="admin-login-wrap">
      <form onSubmit={onSubmit} className="admin-login">
        <div className="admin-login-brand">
          <h1 className="serif">CiCi</h1>
          <div className="kicker">Admin</div>
        </div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          autoFocus
        />
        {error && <div className="form-error">{error}</div>}
        <button type="submit" className="btn admin-login-submit" disabled={loading}>
          {loading ? 'Signing in...' : 'SIGN IN →'}
        </button>
      </form>
    </main>
  )
}

export default function AdminLogin() {
  return (
    <Suspense fallback={<div />}>
      <LoginForm />
    </Suspense>
  )
}
