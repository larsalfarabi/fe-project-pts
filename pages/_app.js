import "@/styles/globals.css";
import CustomChakra from "@/config/CustomChakra";
import { QueryClient, QueryClientProvider } from "react-query";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { syncToken } from "@/api/axios";
export default function App({ Component, pageProps }) {
  const socket = io.connect("http://localhost:8080");
  const queryClient = new QueryClient();


  if (Cookies.get("authMyApp") == true) {
    syncToken();
    return (
      <QueryClientProvider client={queryClient} >
        <CustomChakra>
          <Component {...pageProps} />
        </CustomChakra>
      </QueryClientProvider>
    );
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <CustomChakra>
          <Component {...pageProps} />
        </CustomChakra>
      </QueryClientProvider>
    );
  }
}
