// file_path: "@/src/app/_common_component/EditModal.tsx"

"use client";
import { useState } from "react";
import axios from "axios";
import { PageObject, BasePageContent } from "@/types";
import EditImages from "./EditImages";

// Improved type definitions
type EditModalProps = {
  children: PageObject;
  title: string;
  setModalOpen: (isOpen: boolean) => void;
};

// Types for value handling
type PageContentValue =
  | string
  | number
  | boolean
  | Record<string, unknown>
  | unknown[]
  | null
  | undefined;

/**
 * EditModal component allows users to edit page content with dynamic form fields
 */
const EditModal = ({ children, title, setModalOpen }: EditModalProps) => {
  // State for the form data, initialized with the page content
  const [formData, setFormData] = useState<BasePageContent>(children.content);

  /**
   * Converts any content value to a string representation for display in textarea
   */
  const getStringValue = (value: PageContentValue): string => {
    if (value === null || value === undefined) {
      return "";
    }
    if (typeof value === "object") {
      return JSON.stringify(value);
    }
    return String(value);
  };

  /**
   * Attempts to parse the string input back to its original data type
   */
  // const parseValueToOriginalType = (
  //   key: string,
  //   newValue: string,
  // ): PageContentValue => {
  //   const originalValue = children.content[key];

  //   // Handle simple types first
  //   if (typeof originalValue === "number") {
  //     const num = Number(newValue);
  //     return isNaN(num) ? newValue : num;
  //   }

  //   if (typeof originalValue === "boolean") {
  //     const lowerValue = newValue.toLowerCase();
  //     if (lowerValue === "true") return true;
  //     if (lowerValue === "false") return false;
  //     return newValue;
  //   }

  //   // Handle object types (including arrays)
  //   if (typeof originalValue === "object" && originalValue !== null) {
  //     try {
  //       const parsed = JSON.parse(newValue);
  //       // Ensure we maintain array type if original was array
  //       if (Array.isArray(originalValue)) {
  //         return Array.isArray(parsed) ? parsed : [parsed];
  //       }
  //       // Otherwise return object
  //       return typeof parsed === "object" && parsed !== null ? parsed : {};
  //     } catch {
  //       // If parsing fails, keep as string
  //       return newValue;
  //     }
  //   }

  //   // Default to string if none of the above
  //   return newValue;
  // };

  /**
   * Updates a specific field in the form data
   */
  const updateFormField = (key: string, newValue: string): void => {
    // const parsedValue = parseValueToOriginalType(key, newValue);

    // setFormData({
    //   ...formData,
    //   [key]: parsedValue,
    // });

    setFormData({
      ...formData,
      [key]: newValue,
    });
  };

  /**
   * Handles saving the form data to the backend
   */
  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.preventDefault();

    const shouldSave = confirm(
      "Are you sure you want to save these changes?\nYou won't be able to reset after save.",
    );
    if (!shouldSave) return;

    try {
      await axios.put("/api/page", {
        title: title,
        content: formData,
      });

      // Close modal and refresh page to show updates
      setModalOpen(false);
      location.reload();
    } catch (error) {
      console.error("Failed to save page content:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  /**
   * Resets form data to original values
   */
  const handleReset = (): void => {
    setFormData(children.content);
  };

  // const downloadImage = (imageUrl: string, fileName: string): void => {
  //   const link = document.createElement("a");
  //   link.href = imageUrl;
  //   link.download = fileName;
  //   link.click();
  // };

  /**
   * Renders a form field based on its value type
   */
  const renderTextField = (key: string, value: PageContentValue) => {
    const textValue = getStringValue(value);

    return (
      <div key={key} className="mb-4">
        <label
          htmlFor={key}
          className="mb-2 block text-lg text-sm font-bold text-black"
        >
          {key.replace(/_/g, " ").toUpperCase()}
        </label>
        <textarea
          id={key}
          name={key}
          className="w-full resize-none rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={4}
          value={textValue}
          onChange={(e) => updateFormField(key, e.target.value)}
        />
      </div>
    );
  };

  return (
    <>
      {/* Modal overlay */}
      <div className="fixed inset-0 z-10 bg-black bg-opacity-50" />

      {/* Modal content */}
      <div className="fixed inset-0 z-50 flex h-5/6 flex-col items-center justify-center pt-20">
        <div
          className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 mx-auto flex w-5/6 flex-col overflow-y-auto rounded-xl bg-white p-6 shadow-lg"
          style={{
            scrollbarWidth: "auto",
            scrollbarColor: "#A0AEC0 #EDF2F7",
          }}
        >
          {/* Close button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="cursor-pointer border-none bg-transparent text-2xl"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* <div className="mb-2 block text-lg font-medium text-gray-700">
              IMAGES
            </div>
            {Object.entries(children.images).map(([key, value]) =>
              renderImages(key, value),
            )} */}
          {/* Dynamic form fields */}
          <div className="mb-2 block w-full text-center text-3xl font-bold text-[#0D9488] underline">
            TEXT
          </div>
          {Object.entries(formData).map(([key, value]) =>
            renderTextField(key, value),
          )}
          {/* <div className="w-full resize-none rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"> */}
          <div className="block w-full text-center text-3xl font-bold text-[#0D9488] underline">
            IMAGES
          </div>
          <div className="my-2 w-full text-center text-xl text-red-700">
            Make sure to replace images with same width to hight ratio
          </div>
          <EditImages images={children.images} />
        </div>
      </div>

      {/* Action buttons */}
      <div className="fixed bottom-0 left-0 z-50 flex w-screen flex-row items-center justify-center space-x-4 space-y-0 bg-gray-800 p-4">
        <button
          type="button"
          onClick={() => setModalOpen(false)}
          className="w-full rounded-2xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 sm:w-auto"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="w-full rounded-2xl bg-yellow-500 px-6 py-3 font-semibold text-white hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300 sm:w-auto"
        >
          Reset
        </button>
        <button
          type="submit"
          onClick={handleSave}
          className="w-full rounded-2xl bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 sm:w-auto"
        >
          Save
        </button>
      </div>
    </>
  );
};

export default EditModal;

/**
 * FUNCTION SUMMARY:
 * ----------------
 * 1. EditModal - Main component for editing page content
 *    Inputs: { children: PageObject, title: string, setModalOpen: (isOpen: boolean) => void }
 *    Output: React component
 *
 * 2. getStringValue - Converts any value to string for display
 *    Input: value: PageContentValue (string | number | boolean | object | array | null | undefined)
 *    Output: string
 *
 * 3. parseValueToOriginalType - Converts string input back to original data type
 *    Inputs: key: string, newValue: string
 *    Output: PageContentValue (maintains original type of the value)
 *
 * 4. updateFormField - Updates a specific field in form data
 *    Inputs: key: string, newValue: string
 *    Output: void (updates state)
 *
 * 5. handleSave - Saves form data to backend
 *    Input: e: React.MouseEvent<HTMLButtonElement>
 *    Output: Promise<void> (sends data to server and closes modal)
 *
 * 6. handleReset - Resets form data to original values
 *    Input: none
 *    Output: void (resets state)
 *
 * 7. downloadImage - Triggers download of an image
 *    Inputs: imageUrl: string, fileName: string
 *    Output: void (initiates browser download)
 *
 * 8. isImagePath - Checks if a string is an image path
 *    Input: value: string
 *    Output: boolean
 *
 * 9. renderFormField - Renders appropriate form field based on value type
 *    Inputs: key: string, value: PageContentValue
 *    Output: JSX.Element (form field component)
 */
