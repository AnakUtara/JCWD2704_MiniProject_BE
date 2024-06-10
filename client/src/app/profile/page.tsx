import dynamic from "next/dynamic";

type Props = {};
export default async function Profile({}: Props) {
  const ProfileTabs = dynamic(() => import("./_components/profile.tabs"), {
    loading: () => (
      <span className="grid min-h-[80dvh] w-full place-content-center">
        <span className="loading loading-bars"></span>
      </span>
    ),
    ssr: false,
  });
  return <ProfileTabs />;
}
