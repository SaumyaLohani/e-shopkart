import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://uexpkvyhppcpxuhgbjxw.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDY2NTExOCwiZXhwIjoxOTU2MjQxMTE4fQ.fgq8i0jvMRB0ppyPoLdIA8ga4YikAJoC1oV56ZY8ciE'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)