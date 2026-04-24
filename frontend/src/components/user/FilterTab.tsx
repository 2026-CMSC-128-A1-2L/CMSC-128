import { FunctionComponent, useState } from "react";
import { Icon } from "@iconify/react";

const Filter: FunctionComponent = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [pax, setPax] = useState<number | "Any">("Any");
  const [propertyType, setPropertyType] = useState("Dormitory");

  // Reverts all state variables to their default values
  const handleReset = () => {
    setMinPrice(0);
    setMaxPrice(1000);
    setPax("Any");
    setPropertyType("Dormitory");
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
                <b className="relative text-darkgreen">Property Type</b>
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
        <div className="flex items-center py-[0.55rem] px-[0rem]">
          <b className="relative text-black">Price Range</b>
        </div>

        <div className="w-full px-2">
          <input
            type="range"
            min={0}
            max={20000}
            step={500}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-teal cursor-pointer"
          />
        </div>

        <div className="self-stretch flex items-center justify-center gap-[0.881rem] text-[0.661rem] text-dimgray font-lora">
          <div className="flex-1 flex flex-col items-start py-[0.218rem] px-[0rem] gap-[0.218rem]">
            <div className="self-stretch tracking-num-0_02 font-semibold">
              Min Price
            </div>
            <div className="w-full h-fit rounded-num-8 border-whitesmoke border-solid border box-border flex items-center py-2 px-2 bg-unavailable_action">
              ₱{minPrice.toLocaleString()}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-end justify-center py-[0.218rem] px-0 gap-[0.218rem] text-right">
            <div className="self-stretch tracking-num-0_02 font-semibold">
              Max Price
            </div>
            <div className="w-full h-fit rounded-num-8 border-whitesmoke border-solid border box-border flex justify-end py-2 px-2 bg-unavailable_action">
              ₱{maxPrice.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* essentials */}
      <div className="self-stretch overflow-hidden flex flex-col items-start py-[0.55rem] px-[0.218rem] gap-[0.55rem] w-full">
        <div className="self-stretch flex items-start py-[0.55rem] px-[0rem] text-teal">
          <b className="flex-1 relative">Essentials</b>
        </div>

        <div className="w-full relative rounded-[10.57px] bg-aliceblue overflow-hidden flex items-center py-[0.662rem] px-[0.881rem] box-border gap-[0.55rem] text-left text-[0.661rem] text-slategray font-lora">
          <Icon icon="ic:outline-search" className="w-5 h-5"></Icon>
          <div className="flex-1 relative tracking-[0.02em] font-semibold text-num-10 whitespace-nowrap">
            Search tags (ex. With Service, With Study Lounge)
          </div>
        </div>

        <div className="self-stretch flex items-center flex-wrap content-center gap-[0.55rem] text-teal">
          {["Wi-Fi", "With Aircon", "Bed Mattress", "Own CR", "Cooking"].map(
            (tag) => (
              <div
                key={tag}
                className="rounded-num-16 bg-white border-whitesmoke border-solid border-[0.9px] flex items-center justify-center py-1 px-2 gap-[0.331rem] cursor-pointer hover:bg-lightcyan-100 transition-colors"
              >
                <div className="relative font-semibold">{tag}</div>
              </div>
            ),
          )}
        </div>
      </div>

      {/* apply */}
      <button className="self-stretch overflow-hidden flex items-center justify-center p-[0.55rem] border-none bg-transparent cursor-pointer w-full mt-4">
        <div className="flex-1 rounded-[14.1px] bg-teal flex items-center justify-center py-[0.662rem] px-[0.881rem] box-border max-w-full text-white hover:opacity-90 transition-opacity">
          <b className="relative text-num-14">Apply Filter</b>
        </div>
      </button>
    </div>
  );
};

export default Filter;
