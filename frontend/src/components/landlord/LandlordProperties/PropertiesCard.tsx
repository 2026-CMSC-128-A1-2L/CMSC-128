import type { FunctionComponent, MouseEvent } from "react";
import { Icon } from "@iconify/react";
import LocationIcon from "../../../../assets/grey_location.svg";
import info from "../../../../assets/info_icon.svg";
import FallbackImage from "../../general/FallbackImage";

interface PropertiesCardProps {
  name: string;
  status: "Active" | "Inactive";
  address: string;
  totalUnits: number;
  occupiedUnits: number;
  income: string;
  outstanding: string;
  month: string;
  imageSrc: string;
  url: string;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
}

const stopCardClick = (event: MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

const PropertiesCard: FunctionComponent<PropertiesCardProps> = ({
  name,
  status,
  address,
  totalUnits,
  occupiedUnits,
  income,
  outstanding,
  month,
  imageSrc,
  onClick,
  onEdit,
  onDelete,
  isDeleting = false,
}) => {
  const handleEditClick = (event: MouseEvent) => {
    stopCardClick(event);
    onEdit();
  };

  const handleDeleteClick = (event: MouseEvent) => {
    stopCardClick(event);
    onDelete();
  };

  const Content = () => (
    <>
      <div className="flex items-center gap-2 w-full">
        <b className="relative tracking-tight truncate text-sm sm:text-lg">
          {name}
        </b>
        <div className="h-5 relative text-center text-xs text-teal font-poppins shrink-0 flex items-center">
          <div className="absolute h-full w-full rounded-[5px] border-teal border-solid border-[1px]" />
          <div className="flex items-center pl-4 pr-2">{status}</div>
          <div className="absolute h-1.5 w-1.5 top-[7px] left-[6px] rounded-full bg-teal" />
        </div>
      </div>

      <div className="flex items-center gap-1 text-xs text-dimgray font-lora w-full">
        <img className="w-3 shrink-0" src={LocationIcon} alt="loc" />
        <div className="relative tracking-[0.02em] font-semibold truncate">
          {address}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-1 lg:gap-y-2 font-poppins">
        <div className="flex flex-col">
          <b className="text-black text-sm">{totalUnits}</b>
          <div className="text-[10px] text-silver uppercase">Total Units</div>
        </div>
        <div className="flex flex-col">
          <b className="text-black text-sm">{occupiedUnits}</b>
          <div className="text-[10px] text-silver uppercase">Occupied</div>
        </div>
        <div className="flex flex-col">
          <b className="text-transparent bg-clip-text bg-gradient-to-b from-[#5dc2a8] to-[#0c8873] text-sm whitespace-nowrap">
            ₱{income}
          </b>
          <div className="text-[10px] text-silver uppercase leading-tight">
            Income ({month})
          </div>
        </div>
        <div className="flex flex-col">
          <b className="text-transparent bg-clip-text bg-gradient-to-b from-[#c29722] to-[#f6b709] text-sm whitespace-nowrap">
            ₱{outstanding}
          </b>
          <div className="text-[10px] text-silver uppercase leading-tight">
            Outstanding
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onClick();
      }}
      className="w-full md:h-40 text-left text-black font-inter mb-4 cursor-pointer transition-all duration-200
                 hover:shadow-md active:scale-[0.99] active:opacity-90
                 rounded-[10px] bg-white border border-whitesmoke overflow-hidden"
    >
      <div className="flex flex-col sm:hidden">
        <FallbackImage media={imageSrc} alt={name} className="w-full h-40 object-cover" />
        <div className="flex flex-col gap-2 p-4 relative">
          <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
            <button
              type="button"
              onMouseDown={stopCardClick}
              onClick={handleEditClick}
              className="flex h-10 min-w-10 items-center justify-center rounded-full border border-[#d8f5ef] bg-white text-[#096c5b] shadow-sm transition-colors hover:bg-[#edf7f5]"
              aria-label={`Edit ${name}`}
              title="Edit property"
            >
              <Icon icon="iconamoon:edit" className="h-5 w-5" />
            </button>
            <button
              type="button"
              onMouseDown={stopCardClick}
              onClick={handleDeleteClick}
              disabled={isDeleting}
              className="flex h-10 min-w-10 items-center justify-center rounded-full border border-red-100 bg-white text-red-600 shadow-sm transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              aria-label={`Delete ${name}`}
              title={status === "Active" ? "Active properties cannot be deleted" : "Delete property"}
            >
              <Icon icon="material-symbols:delete-outline-rounded" className="h-5 w-5" />
            </button>
            <img className="h-4 w-4" src={info} alt="info" />
          </div>
          <Content />
        </div>
      </div>

      <div className="hidden sm:block relative h-48">
        <FallbackImage
          media={imageSrc}
          alt={name}
          className="absolute h-full w-[27.5%] top-0 left-0 rounded-l-[10px] object-cover"
        />
        <div className="absolute top-[7.5%] right-[1.5%] z-10 flex items-center gap-2">
          <button
            type="button"
            onMouseDown={stopCardClick}
            onClick={handleEditClick}
            className="flex h-11 min-w-11 items-center justify-center rounded-full border border-[#d8f5ef] bg-white text-[#096c5b] shadow-sm transition-colors hover:bg-[#edf7f5]"
            aria-label={`Edit ${name}`}
            title="Edit property"
          >
            <Icon icon="iconamoon:edit" className="h-5 w-5" />
          </button>
          <button
            type="button"
            onMouseDown={stopCardClick}
            onClick={handleDeleteClick}
            disabled={isDeleting}
            className="flex h-11 min-w-11 items-center justify-center rounded-full border border-red-100 bg-white text-red-600 shadow-sm transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label={`Delete ${name}`}
            title={status === "Active" ? "Active properties cannot be deleted" : "Delete property"}
          >
            <Icon icon="material-symbols:delete-outline-rounded" className="h-5 w-5" />
          </button>
          <img className="h-5 w-5 max-w-full" src={info} alt="info" />
        </div>
        <div className="absolute top-[10.5%] left-[30%] right-[5%] h-[70%] flex flex-col items-start justify-center gap-1">
          <Content />
        </div>
      </div>
    </div>
  );
};

export default PropertiesCard;
