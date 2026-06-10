import { createClient, SupabaseClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''

// Browser/RSC client — RLS enforced
let _browser: SupabaseClient | null = null
export function getBrowserClient(): SupabaseClient {
  if (!url || !anonKey) {
    throw new Error('Supabase URL / anon key missing in env vars')
  }
  if (_browser) return _browser
  _browser = createClient(url, anonKey)
  return _browser
}

// Server-only client — bypasses RLS, only use in API routes
let _service: SupabaseClient | null = null
export function getServiceClient(): SupabaseClient {
  const serviceKey = process.env.SUPABASE_SERVICE_KEY || ''
  if (!url || !serviceKey) {
    throw new Error('Supabase URL / service key missing in env vars')
  }
  if (_service) return _service
  _service = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return _service
}
