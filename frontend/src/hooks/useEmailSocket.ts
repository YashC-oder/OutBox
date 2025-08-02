import { addEmail } from "@/store/slices/emails-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function useEmailSocket(account: string | null) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!account) return;

    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "subscribe", account }));
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "new-email") {
          dispatch(addEmail(message.payload));
        }
      } catch (err) {
        console.error("WebSocket message error:", err);
      }
    };

    return () => socket.close();
  }, [account]);
}
