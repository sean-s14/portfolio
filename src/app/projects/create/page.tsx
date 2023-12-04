"use client";

import { useState } from "react";
import { createProject } from "@/app/projects/actions";
import { useFormState, useFormStatus } from "react-dom";
import ImageUploader from "@/components/imageUploader/imageUploader";
import { supabase } from "@/lib/supabase";
import ImageSlider from "@/components/imageSlider/imageSlider";

const projectsBucket = supabase.storage.from("projects");

const initialState = {
  message: null,
  title: null,
  description: null,
  tags: null,
  imageLinks: null,
};

// TODO: Add success message (toast)
export default function Page() {
  const [state, formAction] = useFormState(createProject, initialState);
  const { pending } = useFormStatus();
  const [imageLinks, setImageLinks] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  function handleDeleteImage(imageLink: string) {
    projectsBucket
      .remove([imageLink])
      .then((res) => {
        console.log(res);
        setImageLinks((prev) =>
          prev
            .split(" ")
            .filter((link) => link !== imageLink)
            .join(" ")
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="mt-4 text-2xl">Add Project</h1>

      <form action={formAction} className="flex flex-col w-[420px] max-w-full">
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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

        {/* Image Upload */}
        <input
          type="text"
          hidden
          name="imageLinks"
          value={imageLinks}
          onChange={(e) => {
            console.log("Image Links:", imageLinks);
            console.log(e.target.value);
          }}
        />
        <div className="my-6">
          <ImageUploader
            projectName={title}
            onUpload={(url) => {
              setImageLinks((prev) => {
                if (prev !== "") {
                  return prev + " " + url;
                } else {
                  return url;
                }
              });
            }}
          />
        </div>

        {/* Image Slider */}
        {imageLinks !== "" && (
          <ImageSlider
            imageLinks={imageLinks.split(" ").filter((link) => link !== "")}
            handleDelete={handleDeleteImage}
          />
        )}

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
