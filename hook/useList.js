import { useQuery } from "react-query";
import { listUser } from "@/api/chat";

export default function useList() {
  const {
    data: dataUser,
    isFetching: isFetchingUser,
    isLoading: isLoadingUser,
  } = useQuery(["/list-user/chat"], () => listUser(), {
    staleTime: 60,
    refetchInterval: 60 * 1000 * 10,
    select: (response) => response?.data?.data,
  });

  return {
    dataUser,
    isFetchingUser,
    isLoadingUser,
  };
}
