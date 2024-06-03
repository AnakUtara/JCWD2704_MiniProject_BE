import Navigation from "./_components/navbar";

type Props = { children: React.ReactNode };
export default function HomeTemplate({ children }: Props) {
  return (
    <>
      <Navigation />
      <main className="p-5">{children}</main>
    </>
  );
}
