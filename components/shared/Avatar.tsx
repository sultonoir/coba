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
      className="rounded-full aspect-square"
      placeholder="blur"
      blurDataURL="URL"
      priority
      quality={100}
      sizes="100%"
      style={{ objectFit: "cover" }}
    />
  );
};

export default Avatar;
