import { useUser as getUser } from "@clerk/nextjs";
import { trpc } from "../utils/trpc";

export const useUser = () => {
  const { user } = getUser();

  if (!user) return null;

  return {
    id: user?.id,
    email: user?.primaryEmailAddress?.emailAddress,
    profileImageUrl: user?.profileImageUrl,
    firstName: user?.firstName,
    lastName: user?.lastName,
  };
};
