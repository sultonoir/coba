"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";
type Props = {
  icon: IconType;
  label: string;
  seleted?: boolean;
};

const CategoryBox = ({ icon: Icon, label, seleted }: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updateQuery: any = {
      ...currentQuery,
      category: label,
    };
    if (params?.get("category") === label) {
      delete updateQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updateQuery,
      },
      { skipNull: true }
    );
    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`
      flex flex-col flex-wrap items-center justify-center gap-2p3
      border-b-2 hover:text-neutral-800 transition cursor-pointer
      ${
        seleted
          ? "border-b-neutral-800 text-neutral-800"
          : " border-transparent text-neutral-500"
      }
  `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm whitespace-nowrap">{label}</div>
    </div>
  );
};

export default CategoryBox;
