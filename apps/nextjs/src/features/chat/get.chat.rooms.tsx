"use server";

import { LoadingSpinner } from "../../components";
import { useChatStore } from "../../hooks";
import { trpc } from "../../utils/trpc";

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
        rooms.map((room) => <div className="flex "></div>)}
    </div>
  );
};
