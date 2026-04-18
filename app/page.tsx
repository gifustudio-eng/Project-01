import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans bg-white dark:bg-black w-screen h-screen ">
      <h1 className="justify-left font-bold text-3xl text-black dark:text-zinc-50">X/Twitter Dashboard</h1>
      <main className="flex flex-1 flex-col pt-5 bg-cover">
        <table className="table-auto pt-20 border w-5/6 justify-center mx-auto">
          <thead className="text-2xl py-2 h-20">
            <tr>
              <th className="border text-center">Tweet ID</th>
              <th className="border text-center">Tweet</th>
              <th className="border text-center">Replies</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border text-center">1234567890</td>
              <td className="border text-center">This is a sample tweet.</td>
              <td className="border text-center">Sounds interesting!</td>
            </tr>
            <tr>
              <td className="border text-center">0987654321</td>
              <td className="border text-center">Another example of a tweet.</td>
              <td className="border text-center">Ok</td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
}