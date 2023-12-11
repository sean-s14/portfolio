"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import slugify from "slugify";

export default function ImageUploader({
  projectName,
  onUpload,
}: {
  projectName: string;
  onUpload: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const uploadImage: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = file.name.split(".")[0];
      const filePath = `${slugify(projectName, {
        lower: true,
      })}/${fileName}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("projects")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading image!");
    } finally {
      setUploading(false);
    }
  };

  const id = Math.random().toString(36).substring(2);

  return (
    <div>
      <label
        className={`${
          projectName === ""
            ? "opacity-50 cursor-not-allowed"
            : "opacity-100 cursor-pointer"
        } bg-slate-700 rounded px-3 py-2`}
        htmlFor={id}
      >
        {uploading ? "Uploading ..." : "Upload Snapshot"}
      </label>
      <input
        style={{
          visibility: "hidden",
          position: "absolute",
        }}
        type="file"
        id={id}
        accept="image/*"
        onChange={uploadImage}
        disabled={uploading || projectName === ""}
      />
    </div>
  );
}
