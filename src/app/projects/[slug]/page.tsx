import Chevron from "@/icons/chevron";
import Link from "next/link";
import { auth } from "@/auth";
import ImageSlider from "@/components/imageSlider/imageSlider";
import { deleteProject } from "@/app/projects/actions";
import { getProject } from "@/app/projects/actions";
import TrashCan from "@/icons/trash-can";

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
        {/* Edit & Delete Buttons */}
        {session?.user?.admin && (
          <div className="fixed right-4 top-20 sm:absolute sm:right-0 sm:top-0 flex h-8">
            {/* Edit Button */}
            <Link
              href={`/projects/edit/${params.slug}`}
              className="border border-blue-400 bg-blue-400/20 hover:bg-blue-400/40 text-blue-400 rounded py-1 px-2"
            >
              {/* TODO: Replace this with an edit icon */}
              Edit
            </Link>

            {/* TODO: Create confirmation popup */}
            {/* Delete Button */}
            <form action={deleteProject}>
              <input
                type="text"
                name="id"
                className="hidden"
                defaultValue={project?.id}
              />
              <button
                type="submit"
                className="border border-red-400 bg-red-400/20 hover:bg-red-400/40 text-red-400 rounded py-1 px-2 ml-2 h-full"
              >
                <TrashCan className="w-5 fill-red-300" />
              </button>
            </form>
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl font-semibold">{project?.title}</h1>

        {/* Date */}
        <div className="text-white/60 text-xs mt-2">
          {project?.createdAt && new Date(project.createdAt).toDateString()}
        </div>

        {/* Link */}
        {project?.url && (
          <div className="mt-4">
            <span>Visit at </span>
            <Link
              href={project.url}
              target="_blank"
              className="text-blue-400 hover:text-blue-300"
            >
              {project.url}
            </Link>
          </div>
        )}

        {/* Images */}
        <div>
          {project?.imageLinks && project.imageLinks?.length > 1 && (
            <ImageSlider imageLinks={project.imageLinks} />
          )}
        </div>

        {/* Description */}
        <p className="text-lg mt-10">{project?.description}</p>

        {/* Tags */}
        {/* TODO: Make tags clickable */}
        <div className="flex mt-20">
          <span className="mr-2">Tags:</span>
          <div className="flex gap-2">
            {project?.tags &&
              project.tags.map((tag: string) => (
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
