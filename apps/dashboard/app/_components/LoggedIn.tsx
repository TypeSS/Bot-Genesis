import { ReactNode } from "react";
import { auth } from "../auth";

export default async function LoggedIn({ is, isnot }: { is: ReactNode; isnot: ReactNode }) {
  const session = await auth();
  return session ? is : isnot;
}
