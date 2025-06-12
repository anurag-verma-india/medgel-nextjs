"use client";

import { useState, ChangeEvent, FormEvent, JSX } from "react";
import Image from "next/image";

interface ImageState {
  src: string;
  alt: string;
}

interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

// Configuration for image validation
const IMAGE_VALIDATION = {
  // minWidth: 800,
  // minHeight: 600,
  minWidth: 0,
  minHeight: 0,
  // Target aspect ratio (e.g., 16:9 = 1.78)
  targetAspectRatio: 16 / 9,
  // Tolerance allows for slight variations in aspect ratio (±0.1)
  aspectRatioTolerance: 0.1,
};

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

  // State to track image validation errors
  const [validationError, setValidationError] = useState<string | null>(null);

  // State to store dimensions of the selected image
  const [imageDimensions, setImageDimensions] =
    useState<ImageDimensions | null>(null);

  /**
   * Validates image dimensions and aspect ratio
   * @param width - Image width in pixels
   * @param height - Image height in pixels
   * @returns Object containing validation result and error message if any
   */
  const validateImageDimensions = (
    width: number,
    height: number,
  ): { valid: boolean; error: string | null } => {
    // Check minimum width
    if (width < IMAGE_VALIDATION.minWidth) {
      return {
        valid: false,
        error: `Image width must be at least ${IMAGE_VALIDATION.minWidth}px (current: ${width}px)`,
      };
    }

    // Check minimum height
    if (height < IMAGE_VALIDATION.minHeight) {
      return {
        valid: false,
        error: `Image height must be at least ${IMAGE_VALIDATION.minHeight}px (current: ${height}px)`,
      };
    }

    // Calculate and check aspect ratio
    const aspectRatio = width / height;
    const lowerBound =
      IMAGE_VALIDATION.targetAspectRatio -
      IMAGE_VALIDATION.aspectRatioTolerance;
    const upperBound =
      IMAGE_VALIDATION.targetAspectRatio +
      IMAGE_VALIDATION.aspectRatioTolerance;

    if (aspectRatio < lowerBound || aspectRatio > upperBound) {
      const targetRatioFormatted =
        IMAGE_VALIDATION.targetAspectRatio.toFixed(2);
      const currentRatioFormatted = aspectRatio.toFixed(2);
      return {
        valid: false,
        error: `Image aspect ratio must be approximately ${targetRatioFormatted} (current: ${currentRatioFormatted})`,
      };
    }

    return { valid: true, error: null };
  };

  /**
   * Gets image dimensions from a file
   * @param file - The image file to check
   * @returns Promise resolving to image dimensions
   */
  const getImageDimensions = (file: File): Promise<ImageDimensions> => {
    return new Promise((resolve, reject) => {
      // Create image element the correct way
      const img = document.createElement("img");
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        const aspectRatio = width / height;

        URL.revokeObjectURL(img.src); // Clean up
        resolve({ width, height, aspectRatio });
      };
      img.onerror = () => {
        URL.revokeObjectURL(img.src); // Clean up
        reject(new Error("Failed to load image"));
      };
      img.src = URL.createObjectURL(file);
    });
  };

  /**
   * Handles the image selection process with validation
   * @param event - The change event from the file input
   */
  const handleImageSelect = async (
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    // Reset validation states
    setValidationError(null);
    setImageDimensions(null);

    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];

    // Validate file is an image
    if (!file.type.startsWith("image/")) {
      setValidationError("Please select an image file");
      return;
    }

    try {
      // Get and validate image dimensions
      const dimensions = await getImageDimensions(file);
      setImageDimensions(dimensions);

      const { valid, error } = validateImageDimensions(
        dimensions.width,
        dimensions.height,
      );

      if (!valid) {
        setValidationError(error);
        // Still show preview even if validation fails
        const objectUrl = URL.createObjectURL(file);
        setImage({
          src: objectUrl,
          alt: file.name || "Selected image (invalid dimensions)",
        });
        setSelectedFile(null); // Clear selected file since it's invalid
        return;
      }

      // All validations passed
      const objectUrl = URL.createObjectURL(file);
      setImage({
        src: objectUrl,
        alt: file.name || "Selected image",
      });
      setSelectedFile(file);
    } catch (error) {
      console.error("Error processing image:", error);
      setValidationError("Failed to process image. Please try another file.");
    }
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
      setValidationError("Please select a valid image first");
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

      console.log("Image upload response")
      console.log(response)

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
      setValidationError(null);
    } catch (error) {
      console.error("Upload error:", error);
      setValidationError("Failed to upload image. Please try again.");
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

          {/* Display validation error */}
          {validationError && (
            <p className="mb-4 text-center text-sm text-red-600">
              {validationError}
            </p>
          )}

          {/* Display image dimensions if available */}
          {imageDimensions && (
            <div className="mb-4 text-center text-sm text-gray-700">
              <p>
                Dimensions: {imageDimensions.width}×{imageDimensions.height}px
              </p>
              <p>
                Aspect ratio: {imageDimensions.aspectRatio.toFixed(2)}
                (Target: {IMAGE_VALIDATION.targetAspectRatio.toFixed(2)})
              </p>
            </div>
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
 *    - Description: The main component that renders the image upload page with validation
 *    - Parameters: None
 *    - Returns: JSX.Element - The rendered component
 *
 * 2. validateImageDimensions
 *    - Description: Validates an image's dimensions and aspect ratio against predefined constraints
 *    - Parameters:
 *      - width: number - The image width in pixels
 *      - height: number - The image height in pixels
 *    - Returns: { valid: boolean; error: string | null } - Validation result with error message if invalid
 *    - Process: Checks if dimensions meet minimum requirements and if aspect ratio is within tolerance of target ratio
 *
 * 3. getImageDimensions
 *    - Description: Extracts width, height, and aspect ratio from an image file
 *    - Parameters:
 *      - file: File - The image file to analyze
 *    - Returns: Promise<ImageDimensions> - Promise resolving to an object with width, height, and aspectRatio
 *    - Process: Creates an HTMLImageElement, loads the file data, and reads dimensions
 *
 * 4. handleImageSelect
 *    - Description: Handles the file input change event for image selection with validation
 *    - Parameters:
 *      - event: ChangeEvent<HTMLInputElement> - The file input change event
 *    - Returns: Promise<void>
 *    - Process: Validates file type, extracts and validates dimensions, creates preview URL, updates state
 *
 * 5. handleFormSubmit
 *    - Description: Handles the form submission to upload the selected image to the server
 *    - Parameters:
 *      - event: FormEvent<HTMLFormElement> - The form submission event
 *    - Returns: Promise<void>
 *    - Process: Validates selected file exists, sends to server API endpoint, updates image state with server path
 */
