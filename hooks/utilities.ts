import  { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useFetchTweets() {
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
  
    return {tweets, setTweets};
  }

export function useApproval() {
    const [showApprovedPopup, setShowApprovedPopup] = useState(false);

    const updateApprovalStatus = async (replyId: string) => {
        const supabase = createClient();

    const { error } = await supabase
        .from("replies")
        .update({ approval_status: true })
        .eq("id", replyId);

    if (error) {
        console.error("Error updating approval status:", error);
        return;
    }

   setShowApprovedPopup(true);
};
    return {updateApprovalStatus, showApprovedPopup, setShowApprovedPopup};
}


export function useEdit() {
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [editText, setEditText] = useState("");
    const [selectedReplyId, setSelectedReplyId] = useState<string | null>(null);
    
    const editReply = async (replyId: string, newText: string) => {
    const supabase = createClient();
  
    const { error } = await supabase
        .from("replies")
        .update({ reply_text: newText })
        .eq("id", replyId);

    if (error){
        console.error("Error updating reply:", error);
        return;
    }
    setShowEditPopup(false);
};
    return { editReply };
}