"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputIdrProps {
  id: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const InputIdr: React.FC<InputIdrProps> = ({
  id,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors,
}) => {
  return (
    <label className="relative block">
      <input
        min={0}
        max={100}
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
      input
      input-info
      peer
      w-full
      p-4
      pt-6
      font-light 
      bg-background
      rounded-md
      outline-none
      transition
      border
      border-neutral-300
      disabled:bg-secondary
      disabled:cursor-not-allowed
      ${formatPrice ? "pl-9" : "pl-4"}
      ${errors[id] ? "border-rose-500" : ""}
      ${errors[id] ? "focus:border-rose-500" : ""}
    `}
      />
      {formatPrice && (
        <span className="absolute top-[25px] right-[10px] text-secondary">
          %
        </span>
      )}
    </label>
  );
};

export default InputIdr;
