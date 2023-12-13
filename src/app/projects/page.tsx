import { auth } from "@/auth";
import Link from "next/link";

async function getProjects() {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/projects/api");
  if (!res.ok) throw new Error("Failed to fetch projects");
  const projects = await res.json();
  return projects;
}

export default async function Page() {
  const session = await auth();
  const projects = await getProjects();

  return (
    <div className="flex flex-col items-center min-w-full min-h-[300px] p-10">
      {session?.user?.admin && (
        <Link
          href="/projects/create"
          className="px-2 py-1 border rounded h-fit absolute top-16 sm:top-20 right-4 sm:right-10"
        >
          + Add Project
        </Link>
      )}
      <h1 className="my-4 text-2xl">Projects</h1>
      <div className="text-lg">
        {projects &&
          projects.map(
            (
              { slug, title }: { slug: string; title: string },
              index: number
            ) => (
              <div key={index} className="mt-4">
                <Link
                  href={`/projects/${slug}`}
                  className="text-blue-400 hover:text-blue-200"
                >
                  {title}
                </Link>
              </div>
            )
          )}
      </div>
    </div>
  );
}
