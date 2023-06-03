import React from "react";
import Select from "react-select";

export type CountrySelectValue = {
  value: string;
};

const options = [
  { value: "Cleanliness" },
  { value: "Comfort" },
  { value: "Service" },
];
interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  return (
    <Select
      placeholder="Select one"
      options={options}
      value={value}
      onChange={(value) => onChange(value as CountrySelectValue)}
      formatOptionLabel={(option: any) => (
        <div className="flex flex-row items-center gap-3">
          <div>{option.value}</div>
        </div>
      )}
      classNames={{
        control: () => "p-3 border-2",
        input: () => "text-lg",
        option: () => "text-lg",
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: "black",
          primary25: "#ffe4e6",
        },
      })}
    />
  );
};

export default CountrySelect;
