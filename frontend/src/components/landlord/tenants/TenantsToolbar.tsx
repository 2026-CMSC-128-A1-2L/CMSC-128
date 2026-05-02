import { Icon } from '@iconify/react';

type TenantsToolbarProps = {
  eyebrow?: string;
  title: string;
  count?: number | string;
  countClassName?: string;
  onSearch?: () => void;
  filterLabel?: string;
  onFilterClick?: () => void;
};

const TenantsToolbar = ({
  eyebrow,
  title,
  count,
  countClassName = 'text-[#096c5b]',
  onSearch,
  filterLabel = 'Recently Added',
  onFilterClick,
}: TenantsToolbarProps) => {
  return (
    <div className="flex w-full items-center gap-[20px]">
      <div className="flex min-w-0 flex-1 flex-col gap-[5px]">
        {eyebrow && (
          <span className="font-['Inter',sans-serif] text-[14px] font-bold text-[#666]">
            {eyebrow}
          </span>
        )}
        <div className="flex items-center gap-[12px]">
          <span className="font-['Inter',sans-serif] text-[24px] font-bold leading-[32px] whitespace-nowrap text-black">
            {title}
          </span>
          {count !== undefined && (
            <span
              className={[
                "font-['Inter',sans-serif] text-[24px] font-bold leading-[32px]",
                countClassName,
              ].join(' ')}
            >
              {count}
            </span>
          )}
          <button
            type="button"
            onClick={onSearch}
            aria-label={`Search ${title.toLowerCase()}`}
            className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center text-[#2f3136] transition-colors hover:text-[#096c5b]"
          >
            <Icon
              icon="material-symbols:search-rounded"
              className="h-[24px] w-[24px]"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <div className="flex h-[60px] shrink-0 items-center justify-end gap-[10px] pr-[32px] py-[10px]">
        <span className="font-['Inter',sans-serif] text-[14px] font-bold whitespace-nowrap text-black">
          Filter By:
        </span>
        <button
          type="button"
          onClick={onFilterClick}
          className="flex h-full cursor-pointer items-center justify-center gap-[10px] rounded-[16px] border border-solid border-[#f8fafc] bg-[#f8fafc] px-[12px] py-[8px] transition-colors duration-200 hover:bg-[#eef3f9]"
        >
          <span className="font-['Inter',sans-serif] text-[14px] font-medium leading-[24px] whitespace-nowrap text-[#666]">
            {filterLabel}
          </span>
          <Icon
            icon="mdi-light:chevron-down"
            className="h-[24px] w-[24px] text-[#2f3136]"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
};

export default TenantsToolbar;
