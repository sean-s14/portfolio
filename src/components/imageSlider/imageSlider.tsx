"use client";

import { useState } from "react";
import Image from "next/image";
import TrashCan from "@/icons/trash-can";
import Chevron from "@/icons/chevron";

export default function ImageSlider({
  imageLinks,
  handleDelete,
  width = 900,
  height,
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

  const autoHeight = (width / 3) * 2;

  const sizes: { [key: string]: string } = {
    xs: "xs:w-[300px] xs:h-[200px] xs:min-h-[200px]",
    sm: "sm:w-[420px] sm:h-[280px] sm:min-h-[280px]",
    md: "md:w-[540px] md:h-[360px] md:min-h-[360px]",
    lg: "lg:w-[660px] lg:h-[440px] lg:min-h-[440px]",
    xl: "xl:w-[780px] xl:h-[520px] xl:min-h-[520px]",
    "2xl": "2xl:w-[900px] 2xl:h-[600px] 2xl:min-h-[600px]",
  };

  let completeSizeString = "w-[240px] h-[160px] min-h-[160px] ";
  for (const key in sizes) {
    completeSizeString += `${sizes[key]} `;
  }

  const outerSizes: { [key: string]: string } = {
    xs: "xs:w-[300px] xs:h-[280px] xs:min-h-[200px]",
    sm: "sm:w-[420px] sm:h-[350px] sm:min-h-[280px]",
    md: "md:w-[540px] md:h-[450px] md:min-h-[360px]",
    lg: "lg:w-[660px] lg:h-[550px] lg:min-h-[440px]",
    xl: "xl:w-[780px] xl:h-[650px] xl:min-h-[520px]",
    "2xl": "2xl:w-[900px] 2xl:h-[750px] 2xl:min-h-[600px]",
  };

  let completeOuterSizeString = "w-[240px] h-[240px] min-h-[160px] ";
  for (const key in outerSizes) {
    completeOuterSizeString += `${outerSizes[key]} `;
  }

  return (
    <div
      className={`relative flex flex-col items-center overflow-hidden ${completeOuterSizeString}`}
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
        id="image-placeholder"
        className={completeSizeString}
        style={{
          marginTop: 50,
        }}
      ></div>

      {/* Images */}
      <div
        className={`absolute top-8 left-0 ${completeSizeString}`}
        style={{
          transform: `translateX(-${currentImage * 100}%)`,
          transition: "transform 0.5s ease-in-out",
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
              src={link}
              alt="Project Snapshot"
              width={width}
              height={height || autoHeight}
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
      <div className="flex gap-2 -mt-8">
        {imageLinks.map((link, index) => (
          <button
            key={link}
            type="button"
            className={`w-3 h-3 hover:scale-125 rounded-full ${
              index === currentImage ? "bg-slate-600" : "bg-slate-400"
            }`}
            onClick={() => setCurrentImage(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}
