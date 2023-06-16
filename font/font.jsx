import { Poppins, Roboto, Open_Sans} from "next/font/google";

export const poppins = Poppins({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const open_sans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});
