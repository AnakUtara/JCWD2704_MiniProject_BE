type Props = {};
export default function HomeLoading({}: Props) {
  return (
    <div className="grid min-h-dvh max-w-full place-items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}
