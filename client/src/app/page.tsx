import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Main from "../components/layout/Main";

export default function Home() {
  return (
    <div className='bg-gradient-to-br dark:from-neutral-950 from-neutral-950/15  dark:via-gray-950 via-transparent dark:to-zinc-950 to-zinc-950/20 min-h-dvh'>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
