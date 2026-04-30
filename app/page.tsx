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
import { useN8nTrigger } from "@/hooks/n8nAPI";
import { useFetchTweets } from "@/hooks/fetch_tweets";

export default function Home() {
  useN8nTrigger();
  const tweets = useFetchTweets();

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
                    <div key={reply.id} className="border-b p-2 flex justify-between items-center">
                      {reply.reply_text}
                      <div className="flex flex-col justify-evenly items-center">
                        <svg viewBox="0 0 507.506 507.506" className="w-5 h-5 dark:text-zinc-50 cursor-pointer" fill="currentColor">
                          	<path d="M163.865,436.934c-14.406,0.006-28.222-5.72-38.4-15.915L9.369,304.966c-12.492-12.496-12.492-32.752,0-45.248l0,0   c12.496-12.492,32.752-12.492,45.248,0l109.248,109.248L452.889,79.942c12.496-12.492,32.752-12.492,45.248,0l0,0   c12.492,12.496,12.492,32.752,0,45.248L202.265,421.019C192.087,431.214,178.271,436.94,163.865,436.934z"/>
                        </svg>
                        <svg viewBox="0 0 24 24" className="w-5 h-5 dark:text-zinc-50 cursor-pointer" fill="currentColor">
                            <path d="M18.656.93,6.464,13.122A4.966,4.966,0,0,0,5,16.657V18a1,1,0,0,0,1,1H7.343a4.966,4.966,0,0,0,3.535-1.464L23.07,5.344a3.125,3.125,0,0,0,0-4.414A3.194,3.194,0,0,0,18.656.93Zm3,3L9.464,16.122A3.02,3.02,0,0,1,7.343,17H7v-.343a3.02,3.02,0,0,1,.878-2.121L20.07,2.344a1.148,1.148,0,0,1,1.586,0A1.123,1.123,0,0,1,21.656,3.93Z"/>
                            <path d="M23,8.979a1,1,0,0,0-1,1V15H18a3,3,0,0,0-3,3v4H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2h9.042a1,1,0,0,0,0-2H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H16.343a4.968,4.968,0,0,0,3.536-1.464l2.656-2.658A4.968,4.968,0,0,0,24,16.343V9.979A1,1,0,0,0,23,8.979ZM18.465,21.122a2.975,2.975,0,0,1-1.465.8V18a1,1,0,0,1,1-1h3.925a3.016,3.016,0,0,1-.8,1.464Z"/>
                        </svg>
                        <svg viewBox="0 0 507.506 507.506" className="w-5 h-5 dark:text-zinc-50 cursor-pointer" fill="currentColor">
                          	<path d="M301.258,256.01L502.645,54.645c12.501-12.501,12.501-32.769,0-45.269c-12.501-12.501-32.769-12.501-45.269,0l0,0   L256.01,210.762L54.645,9.376c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.762,256.01L9.376,457.376   c-12.501,12.501-12.501,32.769,0,45.269s32.769,12.501,45.269,0L256.01,301.258l201.365,201.387   c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.258,256.01z"/>
                        </svg>
                      </div>
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