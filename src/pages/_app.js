import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="flex flex-col space-between min-h-screen">
      <Header />
      <div className="flex-1 mt-24 w-9/12 mx-auto">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
