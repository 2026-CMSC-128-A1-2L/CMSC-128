import { Icon } from '@iconify/react';
import { useState } from 'react';
import radio from '../../../../assets/radio.svg';
import radio_check from '../../../../assets/radio_check.svg';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';

interface Props {
  selected: string[];
  onChange: (tags: string[]) => void;
}

const Tags = ({ selected, onChange }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 250);
  const [isExpanded, setIsExpanded] = useState(false);

  const allTags = [
    'Wi-Fi',
    'With Aircon',
    'Bed Mattress',
    'Own CR',
    'Curfew',
    'Security Guard',
    'CCTV',
    'Study Lounge',
    'Laundry',
    'Gym',
    'Parking',
    'Near Restaurants',
    'Near Grocery',
    'Near Main Road',
  ];

  const filteredTags = allTags.filter((tag) =>
    tag.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  );

  const displayTags = debouncedSearchTerm || isExpanded ? filteredTags : filteredTags.slice(0, 6);

  const toggleTag = (tag: string) => {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag));
    } else {
      onChange([...selected, tag]);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Search Input */}
      <div className="relative">
        <Icon
          icon="mynaui:search"
          className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tags (e.g. Study Lounge, Gym)"
          className="w-full bg-unavailable_action rounded-2xl py-3 pl-10 pr-4 border-none text-medium text-num-14 focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {displayTags.map((tag) => (
          <label
            key={tag}
            className={`flex items-center gap-2 px-4 py-2 rounded-num-12 border cursor-pointer transition-all border-solid ${
              selected.includes(tag) ? 'border-teal text-teal' : 'border-whitesmoke text-unselected'
            }`}
          >
            <input
              type="checkbox"
              className="sr-only"
              checked={selected.includes(tag)}
              onChange={() => toggleTag(tag)}
            />
            <img src={selected.includes(tag) ? radio_check : radio} className="w-5 h-5" alt="" />
            <span className="text-sm font-semibold">{tag}</span>
          </label>
        ))}
      </div>

      {/* show more/less*/}
      {!debouncedSearchTerm && filteredTags.length > 6 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-slategray font-bold text-left text-num-12 hover:text-teal transition-colors border-none bg-transparent cursor-pointer"
        >
          {isExpanded ? 'Show Less...' : 'Show More...'}
        </button>
      )}
    </div>
  );
};

export default Tags;
