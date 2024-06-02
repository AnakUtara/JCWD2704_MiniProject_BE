import Image from "next/image";

import SearchForm from "./_components/events.search";
import EventFeatures from "./_components/events.features";

export default function Home() {
  return (
    <section className=" py-10">
      <div className="container px-10">
        <p className="text-4xl font-bold">THIS IS STARTER FOR MINPRO</p>
      </div>
      <EventFeatures />
      <SearchForm />
    </section>
  );
}
