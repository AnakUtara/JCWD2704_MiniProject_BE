import { Major_Mono_Display, IBM_Plex_Mono } from "next/font/google";

export const major_mono = Major_Mono_Display({
  subsets: ["latin"],
  weight: ["400"],
});
export const plex_mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "700"],
});
