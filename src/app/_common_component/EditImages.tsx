// file_path: "@/src/app/_common_component/EditImages.tsx"

"use client";

import { ImageObj } from "@/types";
import Image from "next/image";
import { redirect, RedirectType } from "next/navigation";
import React from "react";

type EditImagesParams = {
  images: ImageObj[];
  title: string;
};

const EditImages = ({ images, title }: EditImagesParams) => {
  const downloadImage = (imageUrl: string, fileName: string): void => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = fileName;
    link.click();
  };

  const renderImages = (key: string, img: ImageObj) => {
    console.log(`key = ${key} and value= ${img.url}`);
    const imageURL = `${process.env.NEXT_PUBLIC_SITE_URL}/${img.url}`;
    return (
      <div key={key} className="grid place-items-center p-4">
        {/* {img && img.width && img.height && ( */}
        {img && (
          <div key={key} className="mb-6 text-justify">
            <div className="rounded-2xl border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <Image
                width={400}
                height={500}
                src={imageURL}
                // src={`${process.env.NEXT_PUBLIC_SITE_URL}/${img.url}`}
                // src={`${process.env.}/${img.url}`}
                alt={img.url}
              />
              {renderImageDetails(key, img)}
              <div className="flex flex-row space-x-3">
                <button
                  onClick={() => downloadImage(imageURL, img.url)}
                  className="my-4 mt-1 w-24 rounded-2xl bg-[#46A6A5] p-2 text-white hover:bg-[#3a8a89]"
                >
                  Download
                </button>
                <button
                  onClick={() => {
                    redirect(
                      `/imageupload?imgurl=${img.url}&title=${title}&key=${key}`,
                      RedirectType.push,
                    );
                  }}
                  className="my-4 mt-1 w-24 rounded-2xl bg-[#46A6A5] p-2 text-white hover:bg-[#3a8a89]"
                >
                  Replace Image
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderImageDetails = (key: string, img: ImageObj) => {
    return (
      <>
        <div className="my-4">
          <div className="text-slate-700">
            <span className="font-bold text-black">URL:</span>
            {`${process.env.NEXT_PUBLIC_SITE_URL}/${img.url}`}
          </div>
          <div className="text-slate-700">
            <span className="font-bold text-black">Width:</span> {img.width} px
          </div>
          <div className="text-slate-700">
            <span className="font-bold text-black">Height:</span> {img.height}{" "}
            px
          </div>
          <div className="text-slate-700">
            <span className="font-bold text-black">Size:</span> {img.size} KB
          </div>
          <div className="text-slate-700">
            <span className="font-bold text-black">Width/Height Ratio:</span>{" "}
            {img.aspectratio} px/px
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      {images && images[0] && images[0].height && images[0].width && (
        <>
          <div className="block w-full text-center text-3xl font-bold text-[#0D9488] underline">
            IMAGES
          </div>
          <div className="my-2 w-full text-center text-xl text-red-700">
            Make sure to replace images with same width to height ratio
          </div>
          {Object.entries(images).map(([key, value]) =>
            renderImages(key, value),
          )}
        </>
      )}
    </>
  );
};

export default EditImages;
