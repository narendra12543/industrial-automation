"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

import { uploadProductImage } from "@/actions/products";

interface ProductImagesUploaderProps {
  productId: string;
}

interface PreviewFile {
  file: File;
  preview: string;
}

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function ProductImagesUploader({
  productId,
}: ProductImagesUploaderProps) {
  const router = useRouter();

  const [files, setFiles] = useState<PreviewFile[]>(
    []
  );

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isUploading, setIsUploading] =
    useState(false);

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setError("");
    setSuccess("");

    const selectedFiles = Array.from(
      event.target.files ?? []
    );

    const validFiles: PreviewFile[] = [];

    for (const file of selectedFiles) {
      if (
        !ALLOWED_TYPES.includes(file.type)
      ) {
        setError(
          "Invalid file type. Only JPG, JPEG, PNG and WEBP are allowed."
        );
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError(
          "File exceeds 5MB limit."
        );
        continue;
      }

      validFiles.push({
        file,
        preview:
          URL.createObjectURL(file),
      });
    }

    setFiles(validFiles);
  };

  const handleUpload = async () => {
    try {
      setError("");
      setSuccess("");

      if (files.length === 0) {
        setError(
          "Please select at least one image."
        );
        return;
      }

      setIsUploading(true);

      for (const item of files) {
        const result =
          await uploadProductImage(
            productId,
            item.file
          );

        if (!result.success) {
          throw new Error(
            result.message
          );
        }
      }

      setSuccess(
        "Images uploaded successfully."
      );

      setFiles([]);

      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Upload failed."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-xl font-semibold text-[#0F2747]">
        Upload Images
      </h2>

      <p className="mt-2 text-slate-600">
        Upload product gallery images.
      </p>

      <div className="mt-6 rounded-xl border-2 border-dashed border-[#0F2747]/30 p-10 text-center">
        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleFileChange}
          className="mb-4 block w-full text-sm text-[#0F2747]"
        />

        <button
          type="button"
          onClick={handleUpload}
          disabled={
            isUploading ||
            files.length === 0
          }
          className="rounded-lg bg-[#0F2747] px-5 py-3 font-medium text-white transition hover:bg-[#18385F] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading
            ? "Uploading..."
            : "Upload Images"}
        </button>

        {error && (
          <p className="mt-4 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        {success && (
          <p className="mt-4 text-sm font-medium text-green-600">
            {success}
          </p>
        )}
      </div>

      {files.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold text-[#0F2747]">
            Image Preview
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {files.map(
              (item, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-slate-200"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={
                        item.preview
                      }
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-3">
                    <p className="truncate text-sm font-medium text-[#0F2747]">
                      {
                        item.file
                          .name
                      }
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
