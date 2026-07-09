import { ReactNode } from "react";
import { auth } from "@/app/auth";
import { headers } from "next/headers";

export default async function LoggedIn({ is, isnot }: { is: ReactNode; isnot: ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  return session ? is : isnot;
}
