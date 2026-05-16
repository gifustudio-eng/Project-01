import { AuthButton } from "@/components/auth-button";
import { LoginForm } from "@/components/login-form";
import { SignUpForm } from "@/components/sign-up-form";
import { createClient } from "@/lib/supabase/server";

async function getUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  return data?.claims ?? null;
}

export default async function Page() {
  const user = await getUser();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10 sm:px-10">
        <div className="mb-10 flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-lg shadow-slate-200/40 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-black/20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600 dark:text-sky-400">
                Supabase Auth Demo
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                Simple login + signup with Supabase
              </h1>
              <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
                Use this page to sign in, sign up, or confirm your current session. If
                you&apos;re already authenticated, your email and session details appear below.
              </p>
            </div>
            <div className="flex items-center justify-end">
              <AuthButton />
            </div>
          </div>

          {user ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
              <h2 className="text-xl font-semibold">You are signed in</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Welcome back, <strong>{user.email}</strong>.
              </p>
              <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-900 p-4 text-xs text-slate-100 dark:bg-slate-800">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
                <h2 className="text-2xl font-semibold">Sign in</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Enter your email and password to access the protected dashboard.
                </p>
                <div className="mt-6">
                  <LoginForm />
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
                <h2 className="text-2xl font-semibold">Create an account</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  New users can sign up with their email and password. After signing up,
                  you will be able to access protected pages.
                </p>
                <div className="mt-6">
                  <SignUpForm />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
