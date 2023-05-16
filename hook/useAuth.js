import { useQuery } from "react-query";
import { authMe } from "@/api/auth";
import jwt_decode from "jwt-decode";
export default function useAuth() {
  const {
    data: dataAuth,
    isFetching: isFetchingAuth,
    isLoading: isLoadingAuth,
  } = useQuery(["authMe"], () => authMe(), {
    staleTime: 60 * 1000 * 10,
    select: (response) => {
      const data = response?.data?.token;
      const decode = jwt_decode(data);

      return decode;
    },
  });
  return {
    dataAuth,
    isFetchingAuth,
    isLoadingAuth,
  };
}
