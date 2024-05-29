import ForgotPasswordHoc from "../_components/forgot_password.hoc";
import UpdatePassword from "./_components/update_password.form";

type Props = { params: { token: string } };
export default function ChangePassword({ params }: Props) {
  const { token } = params;
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
