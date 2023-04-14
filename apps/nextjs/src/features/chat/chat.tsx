"use client";

import { inferProcedureOutput } from "@trpc/server";
import { useChatStore } from "../../hooks";
import {
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { GetChatRooms } from "./get.chat.rooms";
import { AppRouter } from "@acme/api";
import { ReactNode } from "react";

type ChatBoxProps = {
  children: ReactNode;
};

export const ChatBox = ({ children }: ChatBoxProps) => {
  const chatStore = useChatStore();

  return (
    <div
      className={`absolute bottom-4 right-4 bg-purple ${
        chatStore.active
          ? "rounded-lg duration-700 md:h-1/2 md:w-2/5"
          : "h-14 w-14 cursor-pointer rounded-[50%] shadow-md shadow-black duration-500"
      }`}
    >
      <div
        onClick={chatStore.toggle}
        className={`flex items-center justify-center ${
          chatStore.active
            ? "pointer-events-none h-0 w-0 opacity-0"
            : "opacity-1 h-full w-full delay-300"
        }`}
      >
        <ChatBubbleLeftRightIcon className="h-8 w-8 text-white" />
      </div>

      <div
        className={`relative ${
          chatStore.active
            ? "h-full opacity-100 delay-700 duration-300"
            : "h-0 opacity-0 duration-500"
        }`}
      >
        <div
          onClick={chatStore.reset}
          className="relative top-0 flex w-full cursor-pointer items-center justify-between border-b py-2 pl-4 pr-2 text-white"
        >
          <p>Messages</p>
          <ChevronDownIcon className="h-5 w-5" />
        </div>

        <div
          className={`h-full w-full ${
            chatStore.active ? "opacity-100" : "opacity-0"
          }`}
        >
          <GetChatRooms />
        </div>
      </div>
    </div>
  );
};

type ChatProps = inferProcedureOutput<AppRouter["chat"]["getRooms"]>[number];

const chat = ({ id, messages, user }: ChatProps) => {
  return <div></div>;
};
