
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://iwqlbvlwxcekihliyayn.supabase.co'
const supabaseKey = 'sb_publishable_njkxTThfS8jqZCBBLAUkOQ_owd-P03H'

export const supabase = createClient(supabaseUrl, supabaseKey)
