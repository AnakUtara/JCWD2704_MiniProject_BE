import { axiosInstance } from "@/app/_libs/axios.config";
import ForgotPasswordHoc from "../_components/forgot_password.hoc";
import UpdatePassword from "./_components/update_password.form";
import { notFound } from "next/navigation";

type Props = { params: { token: string } };
export default async function ChangePassword({ params }: Props) {
  const { token } = params;
  try {
    await axiosInstance().get("users/validation/reset", {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      notFound();
    }
  }
  return (
    <ForgotPasswordHoc
      title="Change Your Password"
      subtitle="Don't be sorry, be better!"
      paragraph="Gain access to your account again and have fun once more. Fill this field below to change your password:"
    >
      <UpdatePassword token={token} />
    </ForgotPasswordHoc>
  );
}
