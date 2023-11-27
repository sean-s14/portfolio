"use client";

import { createProject } from "@/app/projects/actions";
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
export default function Page() {
  const [state, formAction] = useFormState(createProject, initialState);
  const { pending } = useFormStatus();

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
        <label htmlFor="title" className="mt-6 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="bg-slate-600/50 p-1 rounded"
          required
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
