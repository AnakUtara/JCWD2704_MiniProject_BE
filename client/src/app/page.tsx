import Image from "next/image";
import EventHomepage from "./_components/eventsHomepage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <EventHomepage />
    </main>
  );
}
