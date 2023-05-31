"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

declare global {
  var cloudinary: any;
}
const uploadPreset = "ufa5bp0v";

interface ProfileUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ProfileUpload: React.FC<ProfileUploadProps> = ({ value, onChange }) => {
  const [fileValue, setFileValue] = useState(value);

  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
      setFileValue(result.info.secure_url);
    },
    [onChange]
  );

  const handleRemove = useCallback(() => {
    onChange("");
    setFileValue("");
  }, [onChange]);

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div className="flex flex-col gap-5">
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
              <div className="font-semibold text-lg">Click to upload</div>
            </div>
            {fileValue && (
              <div className="relative w-full h-60">
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  src={fileValue}
                  alt="House"
                />
                <button
                  aria-hidden="true"
                  onClick={handleRemove}
                  className="
                  absolute
                  top-2
                  right-2
                  bg-white
                  rounded-full
                  p-1
                  shadow
                  hover:bg-neutral-200
                  focus:outline-none
                "
                >
                  <AiOutlineClose size={20} />
                </button>
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ProfileUpload;
