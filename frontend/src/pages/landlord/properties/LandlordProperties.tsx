import { FunctionComponent, useCallback } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import LandlordLayout from "../../../components/landlord/LandlordLayout";
import PropertiesCard from "../../../components/landlord/LandlordProperties/PropertiesCard";
import { BUILDINGS } from "../../../data/buildings";

// Assets
import search from "../../../../assets/search_green.svg";
import plus from "../../../../assets/green_plus.svg";

const LandlordProperties: FunctionComponent = () => {
  const navigate = useNavigate();

  const onAddBuildingContainerClick = useCallback(() => {
    navigate("/landlord/add-building");
  }, []);

  return (
    <LandlordLayout activeSidebarItem="properties" breadcrumbs={[]}>
      <div className="flex w-full flex-col gap-[32px] pt-[16px]">
        {/* Header Section */}
        <section className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[4px]">
            <span className="font-['Inter',sans-serif] text-[14px] font-bold text-[#666]">
              Properties
            </span>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[12px]">
                <h2 className="font-['Inter',sans-serif] text-[24px] font-bold text-black">
                  My Accommodations
                </h2>
                <span className="text-[24px] font-bold text-[#5dc2a8]">
                  {BUILDINGS.length}
                </span>
              </div>

              <div className="flex items-center gap-[16px]">
                <div className="flex items-center gap-[8px]">
                  <span className="font-['Inter',sans-serif] text-[14px] font-bold text-black">
                    Filter By:
                  </span>
                  <button className="flex items-center gap-[10px] rounded-[16px] bg-[#f5f5f5] px-[12px] py-[8px] text-[#666]">
                    <span className="text-[14px] font-medium">
                      Recently Added
                    </span>
                    <Icon icon="mdi-light:chevron-down" className="h-5 w-5" />
                  </button>
                </div>
                <button className="h-8 w-8 transition-opacity hover:opacity-70">
                  <img src={search} alt="Search" className="h-full w-full" />
                </button>
              </div>
            </div>
          </div>
          <div className="h-[2px] w-full rounded-full bg-[#f0f0f0]" />
        </section>

        {/* Properties List Section */}
        <section className="flex flex-col gap-[24px]">
          {BUILDINGS.map((building) => (
            <PropertiesCard
              key={building.id}
              name={building.name}
              address={building.address}
              totalUnits={building.totalUnits}
              occupiedUnits={building.occupiedUnits}
              income={building.income}
              outstanding={building.outstanding}
              status={building.status}
              month={building.month}
              imageSrc={building.img}
              url={building.url}
              onClick={() => navigate(building.url, { state: building })}
            />
          ))}

          {/* Add New Listing Button */}
          <button
            onClick={onAddBuildingContainerClick}
            className="flex w-full flex-col items-center justify-center gap-[16px] rounded-[10px] border border-dashed border-black bg-white py-[32px] transition-colors hover:shadow-md hover:bg-gray-50"
          >
            <img src={plus} alt="plus" className="w-8" />
            <div className="flex flex-col items-center">
              <b className="font-['Inter',sans-serif] text-[16px] text-[#5dc2a8]">
                Add New Building
              </b>
              <span className="text-[14px] font-medium text-[#666]">
                Register a building, room, etc.
              </span>
            </div>
          </button>
        </section>
      </div>
    </LandlordLayout>
  );
};

export default LandlordProperties;
