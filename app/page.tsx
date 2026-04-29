"use client";
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
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Home() {
  const [tweets, setTweets] = useState<any[]>([]);

  useEffect(() => {
  const fetchTweets = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("tweets") 
      .select("id, tweet, replies (id, reply_text)")
      .eq("relevant", true);

    if (!error) {
      setTweets(data || []);
    }
  };

  fetchTweets();
}, []);

  return (
    <div className="flex min-h-screen min-w-screen flex-col bg-white font-sans text-black dark:bg-black dark:text-zinc-50">
      <h1 className="font-bold text-3xl text-black dark:text-zinc-50">X/Twitter Dashboard</h1>
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
             {tweets.map((tweet) => (
              <tr key={tweet.id}>
                <td className="border text-center">{tweet.id}</td>
                <td className="border text-center">{tweet.tweet}</td>
                <td className="border text-center">
                  {tweet.replies?.map((reply:any) => (
                    <div key={reply.id} className="border-b p-2">
                      {reply.reply_text}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}