export async function fetchAuth({
  base_url,
  token,
}: {
  base_url: string;
  token: string;
}) {
  return await fetch(base_url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}
