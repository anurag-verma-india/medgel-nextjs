// file_path: "@/src/app/_common_component/EditImages.tsx"

"use client";

import { ImageObj } from "@/types";
import Image from "next/image";
import React from "react";

type EditImagesParams = {
  images: ImageObj[];
};

const EditImages = ({ images }: EditImagesParams) => {
  const downloadImage = (imageUrl: string, fileName: string): void => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = fileName;
    link.click();
  };
  const renderImages = (key: string, img: ImageObj) => {
    const imageURL = `${process.env.NEXT_PUBLIC_SITE_URL}/${img.url}`;
    return (
      <div key={key} className="mb-6">
        <div className="w-full resize-none rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          <Image
            width={img.width}
            height={img.height}
            src={imageURL}
            // src={`${process.env.NEXT_PUBLIC_SITE_URL}/${img.url}`}
            // src={`${process.env.}/${img.url}`}
            alt={img.url}
          />
          {renderImageDetails(key, img)}
          <button
            onClick={() => downloadImage(imageURL, img.url)}
            className="my-4 flex rounded-lg bg-[#46A6A5] p-4 text-white hover:bg-[#3a8a89]"
          >
            Download
          </button>
        </div>
      </div>
    );
  };

  const renderImageDetails = (key: string, img: ImageObj) => {
    return (
      <>
        <div className="my-4">
          <div>
            URL:
            {`${process.env.NEXT_PUBLIC_SITE_URL}/${img.url}`}
          </div>
          <div>Width: {img.width} px</div>
          <div>Height: {img.height} px</div>
          <div>Size: {img.size} KB</div>
          <div>width/height ratio: {img.aspectratio} px/px</div>
        </div>
      </>
    );
  };
  return (
    <>
      {/* <div className="w-full resize-none rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"> */}
      <div className="block w-full text-center text-3xl font-medium text-gray-700">
        IMAGES
      </div>
      <div className="my-2 w-full text-center">
        make sure to replace images with same width to hight ratio
      </div>
      {Object.entries(images).map(([key, value]) => renderImages(key, value))}
      {/* </div> */}
    </>
  );
};

export default EditImages;
