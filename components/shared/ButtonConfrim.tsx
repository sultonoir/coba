import React from "react";
import { IconType } from "react-icons";

type Props = {
  label?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  small?: boolean;
  icon?: IconType;
  confirm?: boolean;
};

const ButtonConfirm = ({
  label,
  onClick,
  disabled,
  small,
  icon: Icon,
  confirm,
}: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${
          confirm
            ? "bg-green-500 border-green-500 text-white "
            : "bg-rose-500 border-rose-500 text-white"
        }
        ${
          small
            ? "py-1 text-sm font-light border-[1px]"
            : "py-3 text-base font-semibold border-[2px]"
        }
        `}
    >
      {Icon && (
        <Icon
          size={24}
          className="absolute left-4 top-3"
        />
      )}
      {label}
    </button>
  );
};

export default ButtonConfirm;
