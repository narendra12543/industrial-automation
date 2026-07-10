"use client";

import Image from "next/image";
import { useState } from "react";
import ProductLightbox from "./ProductLightbox";

interface ProductImage {
  id: string;
  imageUrl: string;
  altText: string | null;
  isPrimary: boolean;
}

interface ProductGalleryProps {
  images: ProductImage[];
   productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const initialImage =
    images.find(
      (image) => image.isPrimary
    ) ?? images[0];

  const [selectedImage, setSelectedImage] =
    
    useState(initialImage);
  
  const [lightboxOpen, setLightboxOpen] =
  useState(false);

  const currentIndex =
  images.findIndex(
    (image) =>
      image.id === selectedImage?.id
  );
  const goPrevious = () => {
  const newIndex =
    currentIndex === 0
      ? images.length - 1
      : currentIndex - 1;

  setSelectedImage(
    images[newIndex]
  );
};

const goNext = () => {
  const newIndex =
    currentIndex ===
    images.length - 1
      ? 0
      : currentIndex + 1;

  setSelectedImage(
    images[newIndex]
  );
};

  if (!selectedImage) {
    return (
      <div className="flex h-[350px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
        <p className="text-slate-500">
          No Images Available
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Image */}
      <div
          onClick={() =>
            setLightboxOpen(true)
          }
           className="
            relative
            h-[420px]
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            flex
            items-center
            justify-center
          "
        >
        <Image
          src={selectedImage.imageUrl}
          alt={
            selectedImage.altText ??
            `${productName} - Aven Automation`
          }
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-contain p-6"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((image) => (
            <button
              key={image.id}
              type="button"
              onClick={() =>
                setSelectedImage(image)
              }
              className={`relative h-24 overflow-hidden rounded-xl border-2 ${
                selectedImage.id === image.id
                  ? "border-[#0F2747]"
                  : "border-slate-200"
              }`}
            >
              <Image
                src={image.imageUrl}
                alt={
                  image.altText ??
                  `${productName} Thumbnail`
                }
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
          {lightboxOpen && (
      <ProductLightbox
        images={images}
        currentIndex={currentIndex}
        onClose={() =>
          setLightboxOpen(false)
        }
        onPrevious={goPrevious}
        onNext={goNext}
      />
    )}
    </div>
  );
}