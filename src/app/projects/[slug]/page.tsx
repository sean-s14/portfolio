import Chevron from "@/icons/chevron";
import Link from "next/link";
import { auth } from "@/auth";
import ImageSlider from "@/components/imageSlider/imageSlider";

type Project = {
  title: string;
  description: string;
  tags: string[];
  imageLinks: string[];
  createdAt: string;
  updatedAt: string;
};

async function getProject(slug: string): Promise<Project> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + `/projects/api/${slug}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch project");
  const project = await res.json();
  return project;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);
  const session = await auth();

  return (
    <div className="p-4 pt-10 flex flex-col items-center">
      <Link
        href="/projects"
        className="self-start -mt-6 ml-2 mb-14 flex gap-2 hover:text-blue-300 fill-white hover:!fill-blue-300"
      >
        <Chevron className="w-3 rotate-90" />
        <span>All Projects</span>
      </Link>
      <div className="w-4/5 max-w-full relative">
        {/* Edit Button */}
        {session?.user?.email && (
          <Link
            href={`/projects/edit/${params.slug}`}
            className="absolute right-0 top-0 bg-blue-400 rounded py-1 px-2"
          >
            Edit
          </Link>
        )}

        {/* Title */}
        <h1 className="text-3xl font-semibold">{project.title}</h1>

        {/* Date */}
        <div className="text-white/60 text-xs mt-2">
          {new Date(project.createdAt).toDateString()}
        </div>

        {/* Images */}
        <div>
          {project.imageLinks.length > 1 && (
            <ImageSlider imageLinks={project.imageLinks} />
          )}
        </div>

        {/* Description */}
        <p className="text-lg mt-10">{project.description}</p>

        {/* Tags */}
        {/* TODO: Make tags clickable */}
        <div className="flex mt-20">
          <span className="mr-2">Tags:</span>
          <div className="flex gap-2">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-sm bg-gray-200 text-gray-800 font-semibold rounded-full px-4 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
