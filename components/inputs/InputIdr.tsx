import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputPercentageProps {
  id: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const InputPercentage: React.FC<InputPercentageProps> = ({
  id,
  disabled,
  register,
  required,
  errors,
}) => {
  return (
    <label className="relative block w-28">
      <input
        min={0}
        max={100}
        step={1}
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder="Persentase"
        type="number"
        className={`
          input
          input-info
          peer
          w-full
          p-4
          font-light 
          bg-background
          rounded-md
          outline-none
          transition
          border
          border-neutral-300
          disabled:bg-secondary
          disabled:cursor-not-allowed
          pr-9
          ${errors[id] ? "border-rose-500" : ""}
          ${errors[id] ? "focus:border-rose-500" : ""}
        `}
      />
      <span className="absolute top-[19px] right-[10px] text-secondary">%</span>
    </label>
  );
};

export default InputPercentage;
