import { useEffect } from "react";

export function useN8nTrigger() {
  useEffect(() => {
    const trigger = async () => {
      await fetch("/api/n8n", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "test" }),
      });
    };

    trigger();
  }, []);
}