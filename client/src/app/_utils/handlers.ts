import { axiosInstance } from "../_libs/axios.config";

export async function handleVerification(email: string): Promise<void> {
  try {
    await axiosInstance().post("users/v3", { email });
    alert("Verification email sent");
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw error;
    }
  }
}
