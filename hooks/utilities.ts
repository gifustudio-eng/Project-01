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
};

export function useDeleteReply() {
    const deleteReply = async (replyId: string) => {
        const supabase = createClient();

        const { error } = await supabase
            .from("replies")
            .delete()
            .eq("id", replyId);

        if (error) {
            console.error("Error deleting reply:", error);
            return false;
        }
        return true;
    };
    return { deleteReply };
};

export function useDeleteTweet() {
    const deleteTweet = async (Id: string) => {
        const supabase = createClient();

        const { error } = await supabase
        .from("tweets")
        .delete()
        .eq("id", Id);

        if (error) {
            console.error("Error deleting tweet:", error);
            return false;
        }
        return true;
    };
    return { deleteTweet };
};

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

export function useInsertKeyword(){
    const introduceKeyword = async (keyword: string) => {
        const supabase = createClient();
        const { data, error: selectError } = await supabase.from('keyword').select('*').limit(1);

        if (selectError) {
            console.error("Error checking keyword table:", selectError);
            return;
        }

        if (data && data.length === 0) {
            const { error: insertError } = await supabase.from('keyword').insert({ id: 1, name: keyword });
            if (insertError) {
                console.error("Error inserting keyword:", insertError);
            }
        } else {
            const { error: updateError } = await supabase.from('keyword').update({ name: keyword }).eq('id', 1);
            if (updateError) {
                console.error("Error updating keyword:", updateError);
            }
        }
    };
    return { introduceKeyword };
};