import { useEffect,useState } from "react";
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
  
    return tweets;
  }