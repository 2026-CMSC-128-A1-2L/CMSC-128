import { FunctionComponent, useState } from "react";
import { Icon } from "@iconify/react";
import Tags from "../Filter/Tags";
import Distance from "../Filter/DistanceMap";

const Filter: FunctionComponent = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [pax, setPax] = useState<number | "Any">("Any");
  const [propertyType, setPropertyType] = useState("Dormitory");
  const [selectedEssentials, setSelectedEssentials] = useState<string[]>([]);
  const [distance, setDistance] = useState(1); // default 1km

  const handleReset = () => {
    setMinPrice(0);
    setMaxPrice(1000);
    setPax("Any");
    setPropertyType("Dormitory");
    setSelectedEssentials([]);
  };

  const handlePaxChange = (type: "add" | "minus") => {
    if (type === "add") {
      setPax((prev) => (prev === "Any" ? 1 : prev + 1));
    } else {
      setPax((prev) => (prev === "Any" || prev <= 1 ? "Any" : prev - 1));
    }
  };

  return (
    <div className="relative rounded-[14.1px] bg-white w-130 h-fit overflow-hidden flex flex-col items-start py-[2.643rem] px-[1.762rem] box-border gap-[0.881rem] text-left text-[0.771rem] text-teal font-inter shadow-lg">
      <div className="w-full overflow-hidden flex items-center py-[0rem] pl-[0rem] pr-[0.662rem] gap-[0.55rem] text-center text-[1.322rem] text-gray">
        <div className="flex-1 flex items-center">
          <b className="relative leading-[1.763rem] text-black">
            Select filter
          </b>
        </div>
        <button
          onClick={handleReset}
          className="bg-unavailable_action rounded-num-16 baliceblue flex items-center justify-center py-2 px-4 text-num-12 text-unselected hover:bg-lightcyan-300 transition-colors border-none cursor-pointer"
        >
          <b className="relative">Reset Filter</b>
        </button>
      </div>

      {/* property type */}
      <div className="w-full flex flex-col items-start gap-[1.1rem]">
        <div className="w-full flex flex-col items-start py-[0.55rem] px-[0rem] gap-[0.55rem]">
          <div className="w-full flex flex-col items-start text-center text-dimgray">
            <div className="w-full overflow-hidden flex flex-col items-start py-[0.55rem] px-[0rem] gap-[0.55rem]">
              <div className="self-stretch flex items-center">
                <b className="relative text-darkgreen text-num-14">Room Type</b>
              </div>

              <div className="w-full flex items-center justify-between gap-2">
                {[
                  { id: "Apartment", icon: "roentgen:apartments-1-story" },
                  {
                    id: "Dormitory",
                    icon: "roentgen:apartments-3-story-skillion-roof",
                  },
                  {
                    id: "Transient",
                    icon: "roentgen:apartments-1-story-gabled-roof",
                  },
                  { id: "Bed Spacer", icon: "ion:bed-sharp" },
                ].map((type) => (
                  <div
                    key={type.id}
                    onClick={() => setPropertyType(type.id)}
                    className={`w-full cursor-pointer rounded-num-12 flex flex-col items-start p-[0.55rem] gap-[0.437rem]
                      ${
                        propertyType === type.id
                          ? "bg-lightcyan/45 text-teal"
                          : "bg-white text-dimgray border border-solid border-whitesmoke"
                      }`}
                  >
                    <Icon icon={type.icon} className="w-5 h-5" />
                    <div className="relative leading-[1.322rem] font-medium text-num-10 whitespace-nowrap">
                      {type.id}
                    </div>
                  </div>
                ))}
              </div>
            </div>{" "}
          </div>

          <div className="w-full overflow-hidden flex items-start p-[0.55rem] gap-[0.55rem] text-left">
            <div className="flex-1 flex items-center">
              <b className="relative text-black">Pax</b>
            </div>
            <div className="flex items-center gap-[0.55rem] text-teal">
              <button
                onClick={() => handlePaxChange("minus")}
                className="bg-transparent border-none p-0 cursor-pointer flex items-center"
              >
                <Icon
                  icon="lsicon:minus-outline"
                  className="w-4 h-4 text-teal"
                />
              </button>
              <div className="overflow-hidden flex flex-col items-center justify-center py0 px-[0.218rem] min-w-[2rem]">
                <b className="self-stretch relative text-center">{pax}</b>
              </div>
              <button
                onClick={() => handlePaxChange("add")}
                className="bg-transparent border-none p-0 cursor-pointer flex items-center"
              >
                <Icon icon="formkit:add" className="w-4 h-4 text-teal" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* price */}
      <div className="self-stretch flex flex-col items-start gap-[0.662rem] w-full">
        <div className="flex items-center py-1 text-num-14">
          <b className="relative text-black">Price Range</b>
        </div>

        <div className="w-full px-2">
          <input
            type="range"
            min={0}
            max={30000}
            step={500}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-teal cursor-pointer"
          />
        </div>

        <div className="self-stretch flex items-center justify-center gap-[0.881rem] text-[0.661rem] text-dimgray font-lora">
          <div className="flex-1 flex flex-col items-start py-[0.218rem] px-[0rem] gap-[0.218rem]">
            <div className="self-stretch tracking-num-0_02 font-semibold text-num-12">
              Min Price
            </div>
            <div className="w-full h-fit text-num-12 font-inter rounded-num-8 border-whitesmoke border-solid border box-border flex items-center py-2 px-2 bg-unavailable_action">
              ₱{minPrice.toLocaleString()}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-end justify-center py-[0.218rem] px-0 gap-[0.218rem] text-right">
            <div className="self-stretch tracking-num-0_02 font-semibold text-num-12">
              Max Price
            </div>
            <div className="w-full h-fit text-num-12 font-inter rounded-num-8 border-whitesmoke border-solid border box-border flex justify-end py-2 px-2 bg-unavailable_action">
              ₱{maxPrice.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* essentials */}
      <div className="w-full h-fit flex flex-col py-1 text-num-14 gap-2">
        <b className="text-darkgreen font-inter">Essentials</b>
        <Tags selected={selectedEssentials} onChange={setSelectedEssentials} />
      </div>

      <div className="w-full flex flex-col gap-4">
        <b className="text-teal text-lg">Distance from Campus</b>
        <Distance distance={distance} />
        <div className="w-full px-2">
          <input
            type="range"
            min={0.1}
            max={5}
            step={0.1}
            value={distance}
            onChange={(e) => setDistance(parseFloat(e.target.value))}
            className="w-full accent-teal cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-700">Kilometers</span>
          <div className="flex items-center justify-center w-24 h-10 border border-gray-300 rounded-lg bg-white shadow-sm">
            <span className="font-bold text-[#13634F]">
              {distance.toFixed(1)}
            </span>
            <div className="flex flex-col ml-2 border-l border-gray-200 pl-1">
              <Icon
                icon="heroicons:chevron-up-20-solid"
                className="w-3 h-3 text-gray-400"
              />
              <Icon
                icon="heroicons:chevron-down-20-solid"
                className="w-3 h-3 text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* apply */}
      <button className="self-stretch overflow-hidden flex items-center justify-center p-[0.55rem] border-none bg-transparent cursor-pointer w-full mt-4">
        <div className="flex-1 rounded-[14.1px] bg-teal flex items-center justify-center py-[0.662rem] px-[0.881rem] box-border max-w-full text-white hover:opacity-90 transition-opacity">
          <b className="relative text-num-14">Apply Filter</b>
        </div>
      </button>
    </div>
    // </div>
  );
};

export default Filter;
