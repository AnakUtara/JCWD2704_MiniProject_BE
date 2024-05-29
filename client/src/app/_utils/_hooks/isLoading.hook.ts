import { useState } from "react";

export function isLoading() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return { isLoading, setIsLoading };
}
