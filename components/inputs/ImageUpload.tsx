"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

const uploadPreset = "ufa5bp0v";

interface ImageUploadProps {
  onChange: (value: string[]) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      const url = result.info.secure_url;
      onChange([...value, url]);
    },
    [onChange, value]
  );

  const removeImage = useCallback(
    (url: string) => {
      const updatedValue = value.filter((imageUrl) => imageUrl !== url);
      onChange(updatedValue);
    },
    [onChange, value]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 4,
      }}
    >
      {({ open }) => {
        return (
          <div className="flex flex-col gap-y-4">
            <div
              onClick={() => open?.()}
              className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-4
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
            >
              <TbPhotoPlus size={50} />
              <div className="font-semibold text-lg">Klik untuk mengunggah</div>
            </div>
            <div className="grid grid-cols-1 max-h-[50vh] overflow-y-auto gap-4">
              {value.map((url) => (
                <div
                  key={url}
                  className="relative"
                >
                  <Image
                    width={200}
                    height={300}
                    src={url}
                    alt="House"
                    className="w-full"
                  />
                  <button
                    onClick={() => removeImage(url)}
                    className="
                      absolute
                      top-2
                      right-2
                      rounded-full
                      bg-red-500
                      text-white
                      p-2
                      focus:outline-none
                      hover:bg-red-600
                      transition
                    "
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
