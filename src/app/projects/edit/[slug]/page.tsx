"use client";

import { useEffect, useState } from "react";
import { updateProject, getProject } from "@/app/projects/actions";
import { useFormState, useFormStatus } from "react-dom";
import ImageUploader from "@/components/imageUploader/imageUploader";
import ImageSlider from "@/components/imageSlider/imageSlider";
import { getUnsignedUrl } from "@/helpers/getUnsignedUrl";

const initialState = {
  message: null,
  title: null,
  url: null,
  description: null,
  tags: null,
  imageLinks: null,
};

// TODO: Add success message (toast)
export default function Page({ params }: { params: { slug: string } }) {
  const [state, formAction] = useFormState(updateProject, initialState);
  const { pending } = useFormStatus();

  const [project, setProject] = useState<{
    id: string;
    title: string;
    slug: string;
    url: string;
    description: string | null;
    tags: string[];
    imageLinks: string[];
    createdAt: Date;
    updatedAt: Date;
  } | null>({
    id: "",
    title: "",
    slug: "",
    url: "",
    description: "",
    tags: [],
    imageLinks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  function handleDeleteImage(imageLink: string) {
    setProject((prev: any) => ({
      ...prev,
      imageLinks: prev.imageLinks.filter((link: string) => link !== imageLink),
    }));
  }

  useEffect(() => {
    if (params.slug) {
      const fetchProject = async () => {
        const project = await getProject(params.slug);
        setProject(project);
      };
      fetchProject();
    }
  }, [params.slug]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-8 text-2xl">Edit Project</h1>

      <form
        action={formAction}
        className="flex flex-col p-4 sm:p-8 w-[420px] max-w-full"
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

        <label htmlFor="url" className="mt-6 mb-1">
          Link
        </label>
        <input
          type="text"
          id="url"
          name="url"
          className="bg-slate-600/50 p-1 rounded"
          required
          defaultValue={project?.url}
        />
        <p className="text-red-400">{state?.url?._errors[0]}</p>

        <label htmlFor="description" className="mt-6 mb-1">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          cols={30}
          rows={4}
          className="bg-slate-600/50 p-1 rounded"
          defaultValue={project?.description || ""}
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

        {/* Image Upload */}
        {project?.imageLinks && (
          <>
            <input
              type="text"
              hidden
              name="imageLinks"
              value={project.imageLinks
                .map((link) => getUnsignedUrl(link))
                .join(" ")}
              onChange={(e) => {
                console.log("Image Links:", project?.imageLinks);
                console.log(e.target.value);
              }}
            />
            <div className="my-6">
              <ImageUploader
                projectName={project.title}
                onUpload={(url) => {
                  setProject((prev: any) => {
                    if (prev?.imageLinks.join(" ") !== "") {
                      const newImageLinks =
                        prev?.imageLinks.join(" ") + " " + url;
                      return { ...prev, imageLinks: newImageLinks.split(" ") };
                    } else {
                      return { ...prev, imageLinks: [url] };
                    }
                  });
                }}
              />
            </div>
          </>
        )}

        {/* Image Slider */}
        <div className="self-center">
          {project?.imageLinks && project.imageLinks[0] !== "" && (
            <ImageSlider
              imageLinks={project.imageLinks.filter((link) => link !== "")}
              handleDelete={handleDeleteImage}
            />
          )}
        </div>

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
