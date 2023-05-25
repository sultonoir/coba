import Select from "react-select";
import { District } from "territory-indonesia";

export interface safeDist {
  value: string;
  altName: string;
  latlng: number[];
}
interface CountrySelectProps {
  value?: safeDist;
  onChange: (value: safeDist) => void;
  districts: safeDist[];
}

const CountrySelect = ({ value, onChange, districts }: CountrySelectProps) => {
  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={districts}
        value={value}
        onChange={(value) => onChange(value as safeDist)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-col gap-y-1">
            <p>{option.value}</p>
            <p>{option.altName}</p>
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
    </div>
  );
};

export default CountrySelect;
