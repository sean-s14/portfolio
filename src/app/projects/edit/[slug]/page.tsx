"use client";

import { useEffect, useState } from "react";
import { updateProject } from "@/app/projects/actions";
import { useFormState, useFormStatus } from "react-dom";
import ImageUploader from "@/components/imageUploader/imageUploader";
import ImageSlider from "@/components/imageSlider/imageSlider";
import { supabase } from "@/lib/supabase";

const projectsBucket = supabase.storage.from("projects");

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
    url: string;
    description: string;
    tags: string[];
    imageLinks: string[];
  }>({
    id: "",
    title: "",
    url: "",
    description: "",
    tags: [],
    imageLinks: [],
  });

  function handleDeleteImage(imageLink: string) {
    projectsBucket
      .remove([imageLink])
      .then((res) => {
        console.log(res);
        setProject((prev) => ({
          ...prev,
          imageLinks: prev.imageLinks.filter((link) => link !== imageLink),
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
      <h1 className="mt-8 text-2xl">Edit Project</h1>

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

        {/* Image Upload */}
        <input
          type="text"
          hidden
          name="imageLinks"
          value={project.imageLinks.join(" ")}
          onChange={(e) => {
            console.log("Image Links:", project.imageLinks);
            console.log(e.target.value);
          }}
        />
        <div className="my-6">
          <ImageUploader
            projectName={project.title}
            onUpload={(url) => {
              setProject((prev) => {
                if (prev.imageLinks.join(" ") !== "") {
                  const newImageLinks = prev.imageLinks.join(" ") + " " + url;
                  return { ...prev, imageLinks: newImageLinks.split(" ") };
                } else {
                  return { ...prev, imageLinks: [url] };
                }
              });
            }}
          />
        </div>

        {/* Image Slider */}
        <div className="self-center">
          {project.imageLinks.join(" ") !== "" && (
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
