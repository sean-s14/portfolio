"use client";
import React, { useState, useEffect } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import Image from "next/image";
import { FileWithPreview } from "@/types/files";

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 150,
  height: 100,
  padding: 4,
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
};

export default function ImageUploader({
  onChange,
}: {
  onChange?: (files: FileWithPreview[]) => void;
}) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      onDrop: (acceptedFiles: FileWithPath[]) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

  useEffect(() => {
    onChange && onChange(files);
  }, [files, onChange]);

  const fileList = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path} - {Math.ceil(file.size / 1024)} kb
    </li>
  ));

  const thumbnails = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <Image
          src={file.preview}
          alt={file.name}
          style={img}
          width={600}
          height={400}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  return (
    <div>
      <div
        {...getRootProps({
          className:
            "border-2 border-dashed border-slate-400 rounded p-4 bg-slate-600/50 text-center",
        })}
      >
        <input
          {...getInputProps({
            name: "images",
          })}
        />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag &#39;n&#39; drop files here, or click to select files</p>
        )}
      </div>
      {files.length > 0 && (
        <>
          <h4 className="mt-4 text-gray-300 text-lg">Files</h4>
          <ul>{fileList}</ul>
        </>
      )}
      <aside
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 16,
        }}
      >
        {thumbnails}
      </aside>
    </div>
  );
}
