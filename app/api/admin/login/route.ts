import { loginAdmin } from '@/lib/admin-auth'

export async function POST(req: Request) {
  const { password } = await req.json()
  return loginAdmin(password)
}
