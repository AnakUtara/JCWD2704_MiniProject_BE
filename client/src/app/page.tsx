import EventFeatures from "./_components/events.feature";
import SearchForm from "./_components/events.search";

export default function Home() {
  return (
    <div className=" py-10">
      <div className="container px-10">
        <p className="text-4xl font-bold">THIS IS STARTER FOR MINPRO</p>
      </div>
      <EventFeatures />
      <SearchForm />
    </div>
  );
}
