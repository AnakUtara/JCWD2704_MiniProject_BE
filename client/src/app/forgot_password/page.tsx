import EmailForm from "./_components/email.form";
import ForgotPasswordHoc from "./_components/forgot_password.hoc";

type Props = {};
export default function EmailVerification({}: Props) {
  return (
    <ForgotPasswordHoc
      title="Forgot Your Password?"
      subtitle="Sometimes people forget important stuff. That's okay."
      paragraph="For security purposes, we just need to confirm who you are first. Fill your email below:"
    >
      <EmailForm />
    </ForgotPasswordHoc>
  );
}
