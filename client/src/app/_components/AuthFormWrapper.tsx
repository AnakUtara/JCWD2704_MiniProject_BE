type Props = { children: React.ReactNode; title: string };
export default function AuthFormWrapper({ children, title = "Login" }: Props) {
  return (
    <div className="prose grid h-dvh max-w-full place-items-center p-5">
      <center>
        <h1 className="mb-4">{title}</h1>
        {children}
      </center>
    </div>
  );
}
