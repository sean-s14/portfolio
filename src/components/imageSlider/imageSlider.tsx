"use client";

import { useState } from "react";
import Image from "next/image";
import TrashCan from "@/icons/trash-can";
import Chevron from "@/icons/chevron";
import { supabase } from "@/lib/supabase";

const projectsBucket = supabase.storage.from("projects");

export default function ImageSlider({
  imageLinks,
  handleDelete,
  width = 900,
  height = 600,
}: {
  imageLinks: string[];
  handleDelete?: (imageLink: string) => void;
  width?: number;
  height?: number;
}) {
  const [currentImage, setCurrentImage] = useState(0);

  function handleNextImage() {
    setCurrentImage((prev) => {
      if (prev === imageLinks.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  }

  function handlePreviousImage() {
    setCurrentImage((prev) => {
      if (prev === 0) {
        return imageLinks.length - 1;
      } else {
        return prev - 1;
      }
    });
  }

  return (
    <div
      className="relative flex flex-col items-center overflow-hidden"
      style={{
        width: `${width}px`,
        minHeight: `${height}px`,
      }}
    >
      {/* Arrows */}
      <div className="flex gap-2">
        <button type="button" onClick={handlePreviousImage} className="p-2">
          <Chevron className="w-3 fill-white rotate-90" />
        </button>
        <span>
          {currentImage + 1} / {imageLinks.length}
        </span>
        <button type="button" onClick={handleNextImage} className="p-2">
          <Chevron className="w-3 fill-white -rotate-90" />
        </button>
      </div>

      {/* Image Placeholder */}
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          marginTop: 20,
        }}
      ></div>

      {/* Images */}
      <div
        className="absolute top-8 left-0"
        style={{
          transform: `translateX(-${currentImage * 100}%)`,
          transition: "transform 0.5s ease-in-out",
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        {imageLinks.map((link, index) => (
          <div
            key={link}
            className="absolute"
            style={{
              transform: `translateX(${index * 100}%)`,
            }}
          >
            <Image
              src={projectsBucket.getPublicUrl(link).data.publicUrl}
              alt="Project Snapshot"
              width={900}
              height={600}
              className="rounded mb-4"
            />
            {handleDelete && (
              <button
                type="button"
                className="absolute top-0 right-0 w-9 h-9 rounded border border-red-400 bg-red-400/30 hover:bg-red-500/60 transition-colors duration-150 flex items-center justify-center"
                onClick={() => {
                  handleDelete(link);
                  setCurrentImage(0);
                }}
              >
                <TrashCan className="w-5 fill-white" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex gap-2">
        {imageLinks.map((link, index) => (
          <button
            key={link}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === currentImage ? "bg-slate-600" : "bg-slate-400"
            }`}
            onClick={() => setCurrentImage(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}
