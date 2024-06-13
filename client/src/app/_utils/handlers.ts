import { toast } from "sonner";
import { axiosInstance } from "../_libs/axios.config";
import { useDebouncedCallback } from "use-debounce";
import dynamic, { DynamicOptionsLoadingProps } from "next/dynamic";


export async function handleVerification(email: string): Promise<void> {
  try {
    await axiosInstance().post("users/v3", { email });
    toast.success("Verification email sent");
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw error;
    }
    toast.error("Oops... Something is wrong. Please try again later.");
  }
}
