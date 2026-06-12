import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    "https://vrrjtrftnowimthovhfi.supabase.co",
    "sb_publishable_qTOZHuVZwHbIVFBXIps9LA_4JluKo0x",
  );
}
