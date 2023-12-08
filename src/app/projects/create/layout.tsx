import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.admin) {
    redirect("/projects");
  }

  return <>{children}</>;
}
