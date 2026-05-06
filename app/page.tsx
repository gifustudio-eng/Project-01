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
import AcceptedModal from "@/components/popups/modals";
import { useFetchTweets, useApproval, useEdit } from "@/hooks/utilities";

export default function Home() {
  /*useN8nTrigger();*/
  const {tweets, setTweets} = useFetchTweets();
  const [text, setText] = useState("");
  
  const {
    updateApprovalStatus,
    showApprovedPopup,
    setShowApprovedPopup,
  } = useApproval();

  /*
  const {
  openEditModal,
  saveEdit,
  showEditPopup,
  setEditText,
  editText,
} = useEdit();
  */
 
  const deleteReply = async (replyId: string) => {
    const supabase = createClient();

    const { error } = await supabase
      .from("replies")
      .delete()
      .eq("id", replyId);

    if (error) {
      console.error("Error deleting reply:", error);
      return;
    }

    setTweets((prev) =>
      prev.map((tweet) => ({
        ...tweet,
        replies: tweet.replies.filter((r: any) => r.id !== replyId),
      }))
    );
};

const deleteTweet = async (Id: string) => {
    const supabase = createClient();

    const { error } = await supabase
      .from("tweets")
      .delete()
      .eq("id", Id);

    if (error) {
      console.error("Error deleting tweet:", error);
      return;
    }

  setTweets((prev) => prev.filter((tweet) => tweet.id !== Id));
};

  return (
    <div className="flex min-h-screen min-w-screen flex-col bg-white font-sans text-black dark:bg-black dark:text-zinc-50">
      <h1 className="font-bold text-3xl text-black dark:text-zinc-50">X/Twitter Dashboard</h1>
      <main className="flex flex-1 flex-col pt-5 bg-cover">
        <div className="relative w-full flex justify-center">
          <input type="text" placeholder="Input keyword" className="border p-2 pr-10 w-1/3 rounded-md mb-8" />
          <svg viewBox="0 0 513.749 513.749" className="w-5 h-5 dark:text-zinc-50 cursor-pointer absolute right-[34%] top-1/4 transform -translate-y-1/2" fill="currentColor">
            <path d="M504.352,459.061l-99.435-99.477c74.402-99.427,54.115-240.344-45.312-314.746S119.261-9.277,44.859,90.15   S-9.256,330.494,90.171,404.896c79.868,59.766,189.565,59.766,269.434,0l99.477,99.477c12.501,12.501,32.769,12.501,45.269,0   c12.501-12.501,12.501-32.769,0-45.269L504.352,459.061z M225.717,385.696c-88.366,0-160-71.634-160-160s71.634-160,160-160   s160,71.634,160,160C385.623,314.022,314.044,385.602,225.717,385.696z"/>
          </svg>
        </div>
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
                <td className="border text-center">{tweet.id}
                  <div className="flex flex-col justify-center items-center">
                    <svg viewBox="0 0 512 512" className="w-5 h-5 dark:text-zinc-50 cursor-pointer" fill="currentColor" onClick={() => deleteTweet(tweet.id)}>
                      <path d="M490.667,96c0-17.673-14.327-32-32-32h-80.555C364.632,25.757,328.549,0.13,288,0h-64   c-40.549,0.13-76.632,25.757-90.112,64H53.333c-17.673,0-32,14.327-32,32l0,0c0,17.673,14.327,32,32,32H64v266.667   C64,459.468,116.532,512,181.333,512h149.333C395.468,512,448,459.468,448,394.667V128h10.667   C476.34,128,490.667,113.673,490.667,96z M384,394.667C384,424.122,360.122,448,330.667,448H181.333   C151.878,448,128,424.122,128,394.667V128h256V394.667z"/>
	                    <path d="M202.667,384c17.673,0,32-14.327,32-32V224c0-17.673-14.327-32-32-32s-32,14.327-32,32v128   C170.667,369.673,184.994,384,202.667,384z"/>
	                    <path d="M309.333,384c17.673,0,32-14.327,32-32V224c0-17.673-14.327-32-32-32s-32,14.327-32,32v128   C277.333,369.673,291.66,384,309.333,384z"/>
                    </svg>
                  </div>
                </td>
                <td className="border text-center">{tweet.tweet}</td>
                <td className="border text-center">
                  {tweet.replies?.map((reply:any) => (
                    <div key={reply.id} className="border-b p-2 flex justify-between items-center">
                      {reply.reply_text}
                      <div className="flex flex-col justify-evenly items-center">
                        <svg viewBox="0 0 507.506 507.506" className="w-5 h-5 dark:text-zinc-50 cursor-pointer" fill="currentColor" onClick={() => updateApprovalStatus(reply.id)}>
                          	<path d="M163.865,436.934c-14.406,0.006-28.222-5.72-38.4-15.915L9.369,304.966c-12.492-12.496-12.492-32.752,0-45.248l0,0   c12.496-12.492,32.752-12.492,45.248,0l109.248,109.248L452.889,79.942c12.496-12.492,32.752-12.492,45.248,0l0,0   c12.492,12.496,12.492,32.752,0,45.248L202.265,421.019C192.087,431.214,178.271,436.94,163.865,436.934z"/>
                        </svg>
                        <svg viewBox="0 0 24 24" className="w-5 h-5 dark:text-zinc-50 cursor-pointer" fill="currentColor">
                            <path d="M18.656.93,6.464,13.122A4.966,4.966,0,0,0,5,16.657V18a1,1,0,0,0,1,1H7.343a4.966,4.966,0,0,0,3.535-1.464L23.07,5.344a3.125,3.125,0,0,0,0-4.414A3.194,3.194,0,0,0,18.656.93Zm3,3L9.464,16.122A3.02,3.02,0,0,1,7.343,17H7v-.343a3.02,3.02,0,0,1,.878-2.121L20.07,2.344a1.148,1.148,0,0,1,1.586,0A1.123,1.123,0,0,1,21.656,3.93Z"/>
                            <path d="M23,8.979a1,1,0,0,0-1,1V15H18a3,3,0,0,0-3,3v4H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2h9.042a1,1,0,0,0,0-2H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H16.343a4.968,4.968,0,0,0,3.536-1.464l2.656-2.658A4.968,4.968,0,0,0,24,16.343V9.979A1,1,0,0,0,23,8.979ZM18.465,21.122a2.975,2.975,0,0,1-1.465.8V18a1,1,0,0,1,1-1h3.925a3.016,3.016,0,0,1-.8,1.464Z"/>
                        </svg>
                        <svg viewBox="0 0 507.506 507.506" className="w-5 h-5 dark:text-zinc-50 cursor-pointer" fill="currentColor" onClick={() => deleteReply(reply.id)}>
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
        {showApprovedPopup && (<AcceptedModal onClose={() => setShowApprovedPopup(false)} />  )}
      </main>
    </div>
  );
}