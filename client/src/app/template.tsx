import Navbar from "./_components/navbar";

type Props = { children: React.ReactNode };
export default function HomeTemplate({ children }: Props) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
