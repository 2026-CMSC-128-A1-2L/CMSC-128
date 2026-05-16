import { type FunctionComponent, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Tags from '../Filter/Tags';
import Distance from '../Filter/DistanceMap';

interface FilterCriteriaProps {
  filterCriteria: {
    minPrice: number;
    maxPrice: number;
    pax: number | 'Any';
    propertyType: string;
    selectedEssentials: string[];
    distance: number;
  };
  setFilterCriteria: (criteria: FilterCriteriaProps['filterCriteria']) => void;
  onClose: () => void;
}

const Filter: FunctionComponent<FilterCriteriaProps> = ({
  filterCriteria,
  setFilterCriteria,
  onClose,
}) => {
  const [minPrice, setMinPrice] = useState(filterCriteria.minPrice);
  const [maxPrice, setMaxPrice] = useState(filterCriteria.maxPrice);
  const [activeThumb, setActiveThumb] = useState<'min' | 'max'>('min');
  const [pax, setPax] = useState<number | 'Any'>(filterCriteria.pax);
  const [propertyType, setPropertyType] = useState(filterCriteria.propertyType);
  const [selectedEssentials, setSelectedEssentials] = useState<string[]>(
    filterCriteria.selectedEssentials,
  );
  const [distance, setDistance] = useState(filterCriteria.distance);

  useEffect(() => {
    console.log(filterCriteria);
  }, [filterCriteria]);

  const PRICE_LIMITS = { min: 0, max: 30000, step: 500 };

  const handleReset = () => {
    setMinPrice(0);
    setMaxPrice(30000);
    setPax('Any');
    setPropertyType('Dormitory');
    setSelectedEssentials([]);
    setDistance(1);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - PRICE_LIMITS.step);
    setMinPrice(value);
    setActiveThumb('min');
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + PRICE_LIMITS.step);
    setMaxPrice(value);
    setActiveThumb('max');
  };

  const handlePaxChange = (type: 'add' | 'minus') => {
    if (type === 'add') {
      setPax((prev) => (prev === 'Any' ? 1 : prev + 1));
    } else {
      setPax((prev) => (prev === 'Any' || prev <= 1 ? 'Any' : prev - 1));
    }
  };

  const handleApply = () => {
    setFilterCriteria({ minPrice, maxPrice, pax, propertyType, selectedEssentials, distance });
    onClose();
  };

  const minPercent = (minPrice / PRICE_LIMITS.max) * 100;
  const maxPercent = (maxPrice / PRICE_LIMITS.max) * 100;

  const thumbStyles = `
    [&::-webkit-slider-thumb]:pointer-events-auto 
    [&::-webkit-slider-thumb]:appearance-none 
    [&::-webkit-slider-thumb]:w-6 
    [&::-webkit-slider-thumb]:h-6 
    [&::-webkit-slider-thumb]:bg-white 
    [&::-webkit-slider-thumb]:border-[3px] 
    [&::-webkit-slider-thumb]:border-teal 
    [&::-webkit-slider-thumb]:rounded-full 
    [&::-webkit-slider-thumb]:cursor-pointer 
    [&::-webkit-slider-thumb]:shadow-md
    [&::-webkit-slider-thumb]:active:scale-115 
    [&::-webkit-slider-thumb]:transition-transform
    [&::-moz-range-thumb]:pointer-events-auto 
    [&::-moz-range-thumb]:w-5 
    [&::-moz-range-thumb]:h-5 
    [&::-moz-range-thumb]:bg-white 
    [&::-moz-range-thumb]:border-[3px] 
    [&::-moz-range-thumb]:border-teal 
    [&::-moz-range-thumb]:rounded-full 
    [&::-moz-range-thumb]:cursor-pointer
  `;

  return (
    <div className="flex flex-col h-full bg-white shadow-xl font-inter overflow-hidden dark:bg-[#101111] dark:text-[#d7e0ef]">
      {/* STICKY HEADER */}
      <div className="w-full flex items-center justify-between py-6 px-8 border-b border-whitesmoke shrink-0 dark:border-[#303331]">
        <b className="text-[1.322rem] leading-[1.763rem] text-black dark:text-[#edf6f4]">
          Select filter
        </b>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="bg-unavailable_action rounded-num-16 flex items-center justify-center py-2 px-4 text-num-12 text-unselected font-bold hover:bg-lightcyan-300 transition-colors border-none cursor-pointer dark:bg-[#242526] dark:text-[#a4acba] dark:hover:bg-[#2d302f]"
          >
            Reset Filter
          </button>
          <button
            onClick={onClose}
            className="flex items-center justify-center p-2 rounded-full hover:bg-whitesmoke transition-colors border-none bg-transparent cursor-pointer dark:hover:bg-[#242526]"
          >
            <Icon
              icon="material-symbols:close-rounded"
              className="w-7 h-7 text-gray dark:text-[#d7e0ef]"
            />
          </button>
        </div>
      </div>

      {/* SCROLLABLE BODY */}
      <div className="flex-1 overflow-y-auto py-4 px-8 flex flex-col gap-8">
        {/* Property Type */}
        <div className="w-full flex flex-col items-start gap-4">
          <b className="text-darkgreen text-num-14 dark:text-[#edf6f4]">Property Type</b>
          <div className="w-full grid grid-cols-4 gap-2">
            {[
              { id: 'Apartment', icon: 'roentgen:apartments-1-story' },
              { id: 'Dormitory', icon: 'roentgen:apartments-3-story-skillion-roof' },
              { id: 'Transient', icon: 'roentgen:apartments-1-story-gabled-roof' },
              { id: 'Bed Spacer', icon: 'ion:bed-sharp' },
            ].map((type) => (
              <div
                key={type.id}
                onClick={() => setPropertyType(type.id)}
                className={`cursor-pointer rounded-num-12 flex flex-col items-center justify-center p-3 gap-2 transition-all border border-solid
                  ${
                    propertyType === type.id
                      ? 'bg-lightcyan/45 text-teal border-teal dark:bg-[#12342e] dark:text-[#72cbb8] dark:border-[#72cbb8]'
                      : 'bg-white text-dimgray border-whitesmoke hover:border-teal/50 dark:bg-[#141515] dark:text-[#a4acba] dark:border-[#303331] dark:hover:border-[#72cbb8]'
                  }`}
              >
                <Icon icon={type.icon} className="w-6 h-6" />
                <div className="text-[0.65rem] font-bold text-center leading-tight">{type.id}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pax */}
        <div className="w-full flex items-center justify-between py-2">
          <b className="text-black text-num-14 dark:text-[#edf6f4]">Pax</b>
          <div className="flex items-center gap-4 text-teal dark:text-[#72cbb8]">
            <button
              onClick={() => handlePaxChange('minus')}
              className="bg-transparent border border-solid border-teal/30 rounded-full p-1 cursor-pointer flex items-center hover:bg-teal/10 dark:border-[#72cbb8]/40 dark:hover:bg-[#12342e]"
            >
              <Icon icon="lsicon:minus-outline" className="w-5 h-5 text-teal dark:text-[#72cbb8]" />
            </button>
            <b className="text-lg min-w-[2rem] text-center">{pax}</b>
            <button
              onClick={() => handlePaxChange('add')}
              className="bg-transparent border border-solid border-teal/30 rounded-full p-1 cursor-pointer flex items-center hover:bg-teal/10 dark:border-[#72cbb8]/40 dark:hover:bg-[#12342e]"
            >
              <Icon icon="formkit:add" className="w-5 h-5 text-teal dark:text-[#72cbb8]" />
            </button>
          </div>
        </div>

        {/* Price Range */}
        <div className="w-full flex flex-col gap-6">
          <b className="text-black text-num-14 dark:text-[#edf6f4]">Price Range</b>
          <div className="relative w-full h-10 flex items-center">
            <div className="absolute w-full h-1.5 bg-whitesmoke rounded-full dark:bg-[#303331]" />
            <div
              className="absolute h-1.5 bg-teal rounded-full dark:bg-[#72cbb8]"
              style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
            />
            <input
              type="range"
              min={PRICE_LIMITS.min}
              max={PRICE_LIMITS.max}
              step={PRICE_LIMITS.step}
              value={minPrice}
              onChange={handleMinChange}
              className={`absolute w-full pointer-events-none appearance-none bg-transparent ${activeThumb === 'min' ? 'z-40' : 'z-30'} ${thumbStyles}`}
            />
            <input
              type="range"
              min={PRICE_LIMITS.min}
              max={PRICE_LIMITS.max}
              step={PRICE_LIMITS.step}
              value={maxPrice}
              onChange={handleMaxChange}
              className={`absolute w-full pointer-events-none appearance-none bg-transparent ${activeThumb === 'max' ? 'z-40' : 'z-30'} ${thumbStyles}`}
            />
          </div>
          <div className="flex items-center justify-center gap-4 text-dimgray dark:text-[#a4acba]">
            <div className="flex-1 flex flex-col gap-1">
              <span className="text-num-10 uppercase font-bold tracking-wider">Min Price</span>
              <div className="py-3 px-4 bg-unavailable_action rounded-num-8 border border-solid border-whitesmoke font-bold text-teal dark:border-[#303331] dark:bg-[#141515] dark:text-[#72cbb8]">
                ₱{minPrice.toLocaleString()}
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-1 text-right">
              <span className="text-num-10 uppercase font-bold tracking-wider">Max Price</span>
              <div className="py-3 px-4 bg-unavailable_action rounded-num-8 border border-solid border-whitesmoke font-bold text-teal dark:border-[#303331] dark:bg-[#141515] dark:text-[#72cbb8]">
                ₱{maxPrice.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Essentials */}
        <div className="w-full flex flex-col gap-4">
          <b className="text-darkgreen text-num-14 dark:text-[#edf6f4]">Essentials</b>
          <Tags selected={selectedEssentials} onChange={setSelectedEssentials} />
        </div>

        {/* Distance */}
        <div className="w-full flex flex-col gap-4 pb-4">
          <b className="text-teal text-[1.1rem] dark:text-[#72cbb8]">Distance from Campus</b>
          <Distance distance={distance} />
          <input
            type="range"
            min={0.1}
            max={5}
            step={0.1}
            value={distance}
            onChange={(e) => setDistance(parseFloat(e.target.value))}
            className="w-full accent-teal cursor-pointer"
          />
          <div className="flex items-center justify-between">
            <span className="font-bold text-dimgray dark:text-[#a4acba]">Kilometers</span>
            <div className="flex items-center justify-center w-28 h-10 border border-solid border-whitesmoke rounded-lg bg-white shadow-sm gap-2 px-3 dark:border-[#303331] dark:bg-[#141515]">
              <span className="font-bold text-teal text-lg dark:text-[#72cbb8]">
                {distance.toFixed(1)}
              </span>
              <div className="flex flex-col border-l border-whitesmoke pl-2 dark:border-[#303331]">
                <Icon icon="heroicons:chevron-up-20-solid" className="w-4 h-4 text-gray-400" />
                <Icon icon="heroicons:chevron-down-20-solid" className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STICKY FOOTER */}
      <div className="p-8 border-t border-whitesmoke shrink-0 bg-white dark:border-[#303331] dark:bg-[#101111]">
        <button
          onClick={handleApply}
          className="w-full bg-teal hover:bg-darkgreen text-white font-bold py-4 rounded-[14.1px] transition-all border-none cursor-pointer shadow-md text-num-14 dark:bg-[#12342e] dark:text-[#72cbb8] dark:hover:bg-[#1f3a34] dark:shadow-none"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default Filter;
