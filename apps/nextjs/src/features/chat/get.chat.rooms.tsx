"use server";

import Image from "next/image";
import { LoadingSpinner } from "../../components";
import { useChatStore } from "../../hooks";
import { trpc } from "../../utils/trpc";
import { XMarkIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

// const rooms = [
//   {
//     id: "h",
//     users: [],
//     messages: [
//       {
//         id: "h",
//         message: "you're awesome",
//         createdAt: "2021-08-01T00:00:00.000Z",
//       },
//     ],
//   },
// ];

export const GetChatRooms = () => {
  const chatStore = useChatStore();
  const { data: rooms, isLoading } = trpc.chat.getRooms.useQuery();

  if (isLoading)
    return (
      <div
        className={`h-full w-full duration-1000 ${
          chatStore.active ? "opacity-100" : "opacity-0"
        }`}
      >
        <LoadingSpinner
          className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2`}
        />
      </div>
    );

  return (
    <div className="flex h-full w-full flex-col">
      {rooms &&
        rooms.length > 0 &&
        rooms.map((room) => (
          <div className="relative flex flex-row items-center space-x-2 border-b p-2">
            <span>
              <Image
                width={36}
                height={36}
                src={room.user.profileImageUrl}
                alt="user profile"
                className="rounded-full"
              />
            </span>
            <div className="flex flex-col">
              <p className="flex flex-row items-center space-x-1 tracking-wider text-white">
                <span>{room.user.username}</span>
                <span>•</span>
                <span className="text-sm font-light tracking-wide text-white/70">
                  {dayjs(
                    room.messages[room.messages.length - 1]!.createdAt,
                  ).fromNow()}
                </span>
              </p>
              <span className="text-sm font-medium tracking-wide text-gray-300">
                {room.messages[room.messages.length - 1]!.message}
              </span>
            </div>
            <XMarkIcon className="absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-white" />
          </div>
        ))}
    </div>
  );
};
