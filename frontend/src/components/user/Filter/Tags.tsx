import { Icon } from "@iconify/react";
import { useState } from "react";
import radio from "../../../../assets/radio.svg";
import radio_check from "../../../../assets/radio_check.svg";

interface Props {
  selected: string[];
  onChange: (tags: string[]) => void;
}

const Tags = ({ selected, onChange }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const allTags = [
    "Wi-Fi",
    "With Aircon",
    "Bed Mattress",
    "Own CR",
    "Cooking",
    "Appliances Allowed",
  ];

  const filteredTags = allTags.filter((tag) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleTag = (tag: string) => {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag));
    } else {
      onChange([...selected, tag]);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <b className="text-teal">Essentials</b>
      <div className="relative">
        <Icon
          icon="mynaui:search"
          className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tags..."
          className="w-full bg-[#F1F3F4] rounded-num-12 py-3 pl-10 pr-4 border-none text-sm"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {filteredTags.map((tag) => (
          <label
            key={tag}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer transition-all border-solid ${
              selected.includes(tag)
                ? "border-whitesmoke text-teal bg-white"
                : "border-whitesmoke text-unselected bg-white"
            }`}
          >
            <input
              type="checkbox"
              className="sr-only"
              checked={selected.includes(tag)}
              onChange={() => toggleTag(tag)}
            />
            <img
              src={selected.includes(tag) ? radio_check : radio}
              alt="status"
              className="w-6 h-6 object-contain"
            />
            <span className="text-sm font-semibold whitespace-nowrap">
              {tag}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Tags;
