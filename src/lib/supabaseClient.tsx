import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and Anon Key must be defined in the environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

let requestCount = 0;
const MAX_REQUESTS = 100; // 例: 1セッションで最大100回のリクエストに制限

export const limitedSupabase = new Proxy(supabase, {
    get(target, prop: keyof SupabaseClient) {
        if (requestCount >= MAX_REQUESTS) {
            throw new Error("API request limit reached. Please try again later.");
        }
        requestCount++;
        return target[prop]; // prop の型が `keyof SupabaseClient` に限定されるためエラーが発生しない
    },
});
