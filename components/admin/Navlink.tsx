import { NavItem, SafeUser } from "@/types";
import Link from "next/link";

interface NavlinkProps {
  items?: NavItem[];
}

export function Navlink({ items }: NavlinkProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={
                    "flex items-center text-lg font-semibold text-muted-foreground sm:text-sm   disabled:cursor-not-allowed  disabled:opacity-80"
                  }
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  );
}
