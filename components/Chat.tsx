import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Card, TextInput } from "flowbite-react";
import { useCurrentUser } from "../hooks/auth/useCurrentUser";
import { webSocketService } from "../services/webSocketService";

const colors = new Map<number, string>();

const Chat = () => {
  const ulRef = useRef<HTMLUListElement>(null);
  const { user } = useCurrentUser();
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<any>>([]);

  const sendMsg = () => {
    if (!message.length) return;

    webSocketService.emit("newMessage", message);
    setMessage("");
  };

  useEffect(() => {
    if (!user) return;

    colors.set(user.id, "ff3660");

    webSocketService.on("connect", () => {
      webSocketService.emit("messages");
      setConnected(true);
    });

    webSocketService.on("messages", (res) => {
      setMessages(res);
      if (ulRef.current) {
        ulRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "end",
        });
      }
    });

    webSocketService.on("disconnect", () => {
      setConnected(false);
    });

    webSocketService.connect();

    return () => {
      webSocketService.disconnect();
    };
  }, [user]);

  return (
    <div className="col-span-3">
      <div className="mb-3 flex flex-row items-center">
        <Image
          src={"/message.png"}
          alt="current round"
          width={20}
          height={20}
        />
        <span className="mx-3 text-white font-bold">Chat</span>
      </div>
      <Card className={"col-span-3 h-72"}>
        <ul className="h-full overflow-auto flex flex-col-reverse" ref={ulRef}>
          {messages.map((m) => {
            let color = colors.get(m.user.id);

            if (!color) {
              color = Math.floor(Math.random() * 16777215).toString(16);
              colors.set(m.user.id, color);
            }

            return (
              <li key={m.id} className="flex flex-row mb-5">
                <span
                  className="text-sm mr-4 flex "
                  style={{ color: `#${color}` }}
                >
                  {m.user.name}
                  {user.id === m.user.id ? "(You)" : ""}:
                </span>
                <span className="bg-gray-600 rounded p-2">{m.text}</span>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-row justify-between">
          <TextInput
            disabled={!user || !connected}
            className="w-full mr-6"
            onChange={(ev) => setMessage(ev.target.value)}
            value={message}
            onKeyPress={(ev) => {
              if (ev.key === "Enter" && message.length) {
                sendMsg();
              }
            }}
          />
          <button
            disabled={!user || !connected || !message.length}
            className={`py-2 px-6 hover:bg-gray-10 dark:hover:bg-gray-700 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-md shadow-md ${
              user && connected && message.length
                ? "cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={() => {
              sendMsg();
            }}
          >
            Start
          </button>
        </div>
      </Card>
    </div>
  );
};

export default React.memo(Chat);
