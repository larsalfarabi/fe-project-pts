import "@/styles/globals.css";
import CustomChakra from "@/config/CustomChakra";
import { QueryClient, QueryClientProvider } from "react-query";
import { io } from "socket.io-client";
import { syncToken } from "@/api/axios";

export const socket = io.connect("http://localhost:8080");
export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();
  syncToken();
  return (
    <QueryClientProvider client={queryClient}>
      <CustomChakra>
        <Component {...pageProps} />
      </CustomChakra>
    </QueryClientProvider>
  );
}
