import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function EditLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const session = await auth();

  if (!session?.user?.admin) {
    redirect(`/projects/${params.slug}`);
  }

  return <>{children}</>;
}
