/* next*/
import type { AppProps } from "next/app";
/* context */
import { UIProvider } from "../context/ui/";
import { EntriesProvider } from "../context/entries";
/* theme */
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "../themes";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
  );
}
