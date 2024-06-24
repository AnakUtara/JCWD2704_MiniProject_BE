import { TTransaction } from "@/app/_models/transaction.model";
import Image from "next/image";

type Props = { trans: TTransaction | undefined };
export default function ViewProofModal({ trans }: Props) {
  return (
    <dialog id="view_proof" className="modal">
      <div className="modal-box aspect-square rounded-none">
        <Image
          width={480}
          height={480}
          src={`${process.env.NEXT_PUBLIC_API_IMAGES_URL}/transfer-proof/${trans?.transfer_proof}`}
          alt={`transaction ${trans?.id} proof`}
          className="min-h-96 object-cover"
        />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
