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
    <div className="flex flex-col min-w-full min-h-[300px] p-10">
      <div className="flex gap-10 items-center justify-between">
        <div className="mt-4">All Posts</div>
        {session?.user?.admin && (
          <Link
            href="/projects/create"
            className="px-2 py-1 border rounded h-fit"
          >
            + Add Project
          </Link>
        )}
      </div>
      <div className="align-left">
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
