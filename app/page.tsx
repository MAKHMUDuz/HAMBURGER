import HeroBurger from "./components/HeroBurger";
import MenuGrid from "./components/MenuGrid";
import Promotions from "./components/Promotions";
import WhatsAppButton from "./components/WhatsAppButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden">
      <HeroBurger />
      <Promotions />
      <div id="menu" className="w-full">
        <MenuGrid />
      </div>
      <WhatsAppButton />
    </main>
  );
}
