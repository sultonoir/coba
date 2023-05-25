"use client";

import Image from "next/image";
interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      alt="Avatar"
      width={40}
      height={40}
      src={src || `/placeholder.jpg`}
      className="rounded-full"
      placeholder="blur"
      blurDataURL="URL"
    />
  );
};

export default Avatar;
