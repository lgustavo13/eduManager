import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { Dispatch, SetStateAction } from "react";

interface FilterSelectProps {
  label: string;
  placeholder: string;
  options: { id: number; name: string }[];
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

export const FilterSelect = ({
  label,
  placeholder,
  options,
  filter,
  setFilter,
}: FilterSelectProps) => {
  return (
    <div className="relative">
      <Select value={filter} onValueChange={(value) => setFilter(value)}>
        <SelectTrigger className="pl-8 pr-4 py-2 border border-slate-300 rounded-lg text-slate-700 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none w-full hover:cursor-pointer">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map((option) => (
              <SelectItem
                className="hover:cursor-pointer"
                key={option.id}
                value={String(option.id)}
              >
                {option.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
    </div>
  );
};
