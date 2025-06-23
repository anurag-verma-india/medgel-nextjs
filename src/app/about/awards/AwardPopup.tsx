// src/app/about/awards_/AwardPopup.tsx

"use client";
import axios, { AxiosResponse } from "axios";
import React, { useState, ChangeEvent, MouseEvent } from "react";
import { Modal } from "antd";

// Type definitions
interface AwardForm {
  title: string;
  award_Image: File | null;
}

interface AwardPopupProps {
  openEditModal: boolean;
  setOpenEditModal: (openEditModalState: boolean) => void;
}

interface ApiResponse {
  message: string;
  data?: unknown;
}

// Supported image types
const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/gif',
  'image/webp'
] as const;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

/**
 * AwardPopup Component - Modal for adding new awards
 * 
 * @param openEditModal - Boolean to control modal visibility
 * @param setOpenEditModal - Function to update modal visibility state
 * @returns JSX.Element - Rendered award popup modal
 */
const AwardPopup: React.FC<AwardPopupProps> = ({
  openEditModal,
  setOpenEditModal,
}) => {
  const [showspin, setShowSpin] = useState<boolean>(false);
  const [form, setForm] = useState<AwardForm>({
    title: "",
    award_Image: null,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof AwardForm, string>>>({});

  /**
   * Validates uploaded file
   * 
   * @param file - File object to validate
   * @returns Object with isValid boolean and error message if invalid
   */
  const validateFile = (file: File): { isValid: boolean; error?: string } => {
    if (!SUPPORTED_IMAGE_TYPES.includes(file.type as typeof SUPPORTED_IMAGE_TYPES[number])) {
      return {
        isValid: false,
        error: `Unsupported file type. Please upload: ${SUPPORTED_IMAGE_TYPES.join(', ')}`
      };
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        isValid: false,
        error: `File size too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`
      };
    }

    return { isValid: true };
  };

  /**
   * Validates form fields
   * 
   * @param formData - Current form state
   * @returns Object with isValid boolean and errors object
   */
  const validateForm = (formData: AwardForm): { 
    isValid: boolean; 
    errors: Partial<Record<keyof AwardForm, string>> 
  } => {
    const newErrors: Partial<Record<keyof AwardForm, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters long";
    }

    if (!formData.award_Image) {
      newErrors.award_Image = "Award image is required";
    }

    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors
    };
  };

  /**
   * Handles text input changes
   * 
   * @param e - Input change event
   * @returns void
   */
  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof AwardForm]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: undefined
      }));
    }
  };

  /**
   * Handles file input changes with validation
   * 
   * @param e - File input change event
   * @returns void
   */
  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    
    if (!file) {
      setForm(prevForm => ({
        ...prevForm,
        award_Image: null
      }));
      return;
    }

    const validation = validateFile(file);
    
    if (!validation.isValid) {
      setErrors(prevErrors => ({
        ...prevErrors,
        award_Image: validation.error
      }));
      // Clear the file input
      e.target.value = '';
      return;
    }

    setForm(prevForm => ({
      ...prevForm,
      award_Image: file,
    }));

    // Clear any existing file errors
    if (errors.award_Image) {
      setErrors(prevErrors => ({
        ...prevErrors,
        award_Image: undefined
      }));
    }
  };

  /**
   * Handles form submission
   * 
   * @param e - Mouse click event from submit button
   * @returns Promise<void>
   */
  const handleOk = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    
    // Validate form
    const validation = validateForm(form);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setShowSpin(true);
    setErrors({}); // Clear any existing errors

    const formData = new FormData();
    formData.append("title", form.title.trim());
    
    // TypeScript knows award_Image is not null due to validation
    if (form.award_Image) {
      formData.append("award_Image", form.award_Image);
    }

    try {
      const response: AxiosResponse<ApiResponse> = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/award`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("Award created:", response.data);
      
      if (response.data.message === "Award created successfully") {
        alert("Award created successfully");
        handleCancel(); // Reset form and close modal
        window.location.reload();
      } else {
        throw new Error(response.data.message || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Error uploading award:", error);
      
      let errorMessage = "Failed to create award. Please try again.";
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    } finally {
      setShowSpin(false);
    }
  };

  /**
   * Handles modal cancellation and form reset
   * 
   * @returns void
   */
  const handleCancel = (): void => {
    setOpenEditModal(false);
    setForm({ 
      title: "", 
      award_Image: null 
    });
    setErrors({});
    setShowSpin(false);
  };

  return (
    <Modal
      title={<span className="text-[#3F5D97]">Add Award</span>}
      open={openEditModal}
      onOk={handleOk}
      onCancel={handleCancel}
      width={400}
      destroyOnClose={true}
      footer={
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={handleOk}
            disabled={showspin}
            className="w-full rounded-md border border-[#3F5D97] bg-[#3F5D97] p-2 font-semibold text-white hover:bg-[#5d7cb9] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {showspin ? "Adding..." : "Add"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={showspin}
            className="w-full rounded-md border border-red-500 bg-red-600 p-2 font-semibold text-white hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      }
    >
      <div className="shadow-md rounded-lg p-4">
        {showspin && (
          <div className="flex items-center justify-center mb-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-dashed border-blue-500"></div>
            <span className="ml-2 text-sm text-gray-600">Uploading...</span>
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter Award Title"
            name="title"
            value={form.title}
            onChange={handleTextInputChange}
            disabled={showspin}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="product-images"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Award Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept={SUPPORTED_IMAGE_TYPES.join(',')}
            name="award_Image"
            id="product-images"
            onChange={handleFileInputChange}
            disabled={showspin}
            className={`w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.award_Image ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.award_Image && (
            <p className="mt-1 text-sm text-red-600">{errors.award_Image}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Supported formats: JPEG, PNG, GIF, WebP. Max size: 5MB
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AwardPopup;
