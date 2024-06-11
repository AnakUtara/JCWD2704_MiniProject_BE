type Props = {};
export default function Loading({}: Props) {
  return (
    <div className="grid min-h-[80dvh] place-items-center">
      <span className="loading loading-bars loading-lg"></span>
    </div>
  );
}
