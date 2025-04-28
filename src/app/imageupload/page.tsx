"use client";

import { useState, ChangeEvent, FormEvent, JSX } from "react";
import Image from "next/image";

interface ImageState {
  src: string;
  alt: string;
}

export default function ImageUploadPage(): JSX.Element {
  // Initial state with default image
  const [image, setImage] = useState<ImageState>({
    src: "/life-at-medgel.png", // Assumes you have this image in your public folder
    alt: "Default placeholder image",
  });

  // State to track if an image has been uploaded
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  // State to track loading state during upload
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // State to hold the selected file
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  /**
   * Handles the image selection process
   * @param event - The change event from the file input
   */
  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];

    // Validate file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Store the selected file
    setSelectedFile(file);

    // Show a preview of the selected image
    const objectUrl = URL.createObjectURL(file);
    setImage({
      src: objectUrl,
      alt: file.name || "Selected image",
    });
  };

  /**
   * Handles the image upload submission
   * @param event - The form submission event
   */
  const handleFormSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select an image first");
      return;
    }

    setIsLoading(true);

    try {
      // Create FormData object to send the file
      const formData = new FormData();
      formData.append("image", selectedFile);

      // Send the file to the server
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      console.log("Response from server:", data);

      // Update the image state with the server-stored image
      setImage({
        src: data.filePath, // Path returned from the server
        alt: selectedFile.name || "Uploaded image",
      });

      setIsUploaded(true);
      setSelectedFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">Image Uploader</h1>

        <div className="mb-6">
          <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
            {/* The image component */}
            <Image
              src={image.src}
              alt={image.alt}
              fill
              style={{ objectFit: "contain" }}
              priority
              className="transition-all duration-300"
            />
          </div>

          {isUploaded && (
            <p className="mb-4 text-center text-sm text-green-600">
              Image successfully uploaded to server!
            </p>
          )}

          {/* Form for file upload */}
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col items-center"
          >
            <div className="mb-4 w-full">
              <label
                htmlFor="image-upload"
                className="block w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-center text-white transition-colors hover:bg-blue-700"
              >
                {selectedFile ? "Change Selection" : "Select Image"}
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>

            {selectedFile && (
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full rounded-lg px-4 py-2 transition-colors ${
                  isLoading
                    ? "cursor-not-allowed bg-gray-400"
                    : "cursor-pointer bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {isLoading ? "Uploading..." : "Upload to Server"}
              </button>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}

/**
 * FUNCTION SUMMARY:
 *
 * 1. ImageUploadPage
 *    - Description: The main component that renders the image upload page
 *    - Parameters: None
 *    - Returns: JSX.Element - The rendered component
 *
 * 2. handleImageSelect
 *    - Description: Handles the file input change event for image selection
 *    - Parameters:
 *      - event: ChangeEvent<HTMLInputElement> - The file input change event
 *    - Returns: void
 *    - Process: Validates the file is an image, creates a preview URL, updates the state
 *
 * 3. handleFormSubmit
 *    - Description: Handles the form submission to upload the selected image to the server
 *    - Parameters:
 *      - event: FormEvent<HTMLFormElement> - The form submission event
 *    - Returns: Promise<void>
 *    - Process: Sends the file to the server API endpoint, updates the image state with the server path
 */
