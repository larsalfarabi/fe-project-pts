import { listGroup } from "@/api/chat";
import { useQuery } from "react-query";

export default function useListGroup() {
  const {
    data: dataGroup,
    isFetching: isFetchingGroup,
    isLoading: isLoadingGroup,
    refetch: refetchGroup,
  } = useQuery(["/group/list"], () => listGroup(), {
    select: (response) => response?.data?.data,
  });
  return {
    dataGroup,
    isFetchingGroup,
    isLoadingGroup,
    refetchGroup,
  };
}
