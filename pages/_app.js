import MessageAlert from "@/src/components/ui/Alerts/MessageAlert";
import "@/src/styles/global.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <MessageAlert />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
