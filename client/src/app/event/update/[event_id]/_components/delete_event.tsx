"use client";
import { axiosInstance } from "@/app/_libs/axios.config";
import { TEvent } from "@/app/_models/event.model";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = { result: TEvent };
export default async function DeleteEvent({ result }: Props) {
  const router = useRouter();
  const deleteData = async ({ result }: Props) => {
    try {
      await axiosInstance().delete(`/events/${result.id}`);
      toast.success("Success!, chosen event deleted");
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) console.error;
      toast.error("unable to delete event");
    }
  };

  const handleDelete = async () => {
    deleteData({ result });
  };
  return (
    <button
      onClick={handleDelete}
      className="btn btn-accent mt-6 rounded-none text-white hover:bg-zinc-800"
    >
      Delete Event
    </button>
  );
}
