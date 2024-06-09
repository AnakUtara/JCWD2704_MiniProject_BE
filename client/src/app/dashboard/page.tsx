import Link from "next/link";

type Props = {};
export default function Dashboard({}: Props) {
  return (
    <div>
      Dashboard
      <Link href={`/event/create`}>
        <button className="w-[200px] rounded-md border-[1px] border-gray-500 p-2 hover:bg-slate-300">
          Create new event
        </button>
      </Link>
    </div>
  );
}
