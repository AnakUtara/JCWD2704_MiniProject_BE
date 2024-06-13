import dynamic from "next/dynamic";

type Props = {};
export default function CreateEvent() {
  const CreateForm = dynamic(() => import("./_components/create.form"), {
    loading: () => (
      <span className="grid min-h-[80dvh] w-full place-content-center">
        <span className="loading loading-bars loading-lg"></span>
      </span>
    ),
    ssr: false,
  });
  return <CreateForm />;
}
