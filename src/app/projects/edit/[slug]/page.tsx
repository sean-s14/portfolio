"use client";

import { useEffect, useState } from "react";
import { updateProject } from "@/app/projects/actions";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
  message: null,
  title: null,
  description: null,
  tags: null,
  imageLinks: null,
};

// TODO: Add image upload
// TODO: Add success message (toast)
export default function Page({ params }: { params: { slug: string } }) {
  const [state, formAction] = useFormState(updateProject, initialState);
  const { pending } = useFormStatus();

  const [project, setProject] = useState<{
    id: string;
    title: string;
    description: string;
    tags: string[];
    imageLinks: string[];
  }>({
    id: "",
    title: "",
    description: "",
    tags: [],
    imageLinks: [],
  });

  useEffect(() => {
    if (params.slug) {
      const fetchProject = async () => {
        const res = await fetch(
          process.env.NEXT_PUBLIC_BASE_URL + `/projects/api/${params.slug}`
        );
        if (!res.ok) throw new Error("Failed to fetch project");
        const project = await res.json();
        setProject(project);
      };
      fetchProject();
    }
  }, [params.slug]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-8 text-2xl">Add Project</h1>

      <form
        action={formAction}
        className="flex flex-col p-4 sm:p-8 w-96 max-w-full"
      >
        {state?.message && (
          <p className="bg-red-500 text-neutral-100 rounded px-2 py-1 self-center">
            {state.message}
          </p>
        )}
        <input
          type="text"
          name="id"
          className="hidden"
          defaultValue={project?.id}
        />
        <label htmlFor="title" className="mt-6 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="bg-slate-600/50 p-1 rounded"
          required
          defaultValue={project?.title}
        />
        <p className="text-red-400">{state?.title?._errors[0]}</p>

        <label htmlFor="description" className="mt-6 mb-1">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          cols={30}
          rows={4}
          className="bg-slate-600/50 p-1 rounded"
          defaultValue={project?.description}
        ></textarea>
        <p className="text-red-400">{state?.description?._errors[0]}</p>

        <label htmlFor="tags" className="mt-6 mb-1">
          <span>Tags</span>
          <span className="ml-2 text-xs text-gray-50/70">
            &#40;separate tags with spaces&#41;
          </span>
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          className="bg-slate-600/50 p-1 rounded"
          defaultValue={project?.tags?.join(" ")}
        />
        <p className="text-red-400">{state?.tags?._errors[0]}</p>

        {/* Images */}

        <button
          type="submit"
          className={
            "px-4 py-1 w-full border rounded self-center mt-8 mb-4 hover:bg-slate-600/50 transition-colors duration-200"
          }
          disabled={pending}
          aria-disabled={pending}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
