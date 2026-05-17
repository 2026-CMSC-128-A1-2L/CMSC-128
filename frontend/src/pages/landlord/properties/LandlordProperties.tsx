import { type FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import LandlordLayout from '../../../components/landlord/LandlordLayout';
import PropertiesCard from '../../../components/landlord/LandlordProperties/PropertiesCard';
import { FacilityService } from '../../../service/FacilityService';
import { api } from '../../../service/axiosInstance';

import search from '../../../../assets/search_green.svg';
import plus from '../../../../assets/green_plus.svg';

const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
];

type IncomeByFacility = {
  facilityId: string;
  facilityName: string;
  expectedMonthlyIncome: number;
};

const LandlordProperties: FunctionComponent = () => {
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState<any[]>([]);
  const [incomeMap, setIncomeMap] = useState<Map<string, number>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentMonth = MONTHS[new Date().getMonth()];

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [facilitiesRes, incomeRes] = await Promise.all([
          FacilityService.getLandlordFacilities(),
          api.get<{
            data: {
              total: number;
              totalTenants: number;
              byFacility: IncomeByFacility[];
            };
          }>('/api/facilities/landlord/monthly-income'),
        ]);
        if (!cancelled) {
          setFacilities(facilitiesRes.data);
          const map = new Map<string, number>();
          for (const f of incomeRes.data.data.byFacility) {
            map.set(f.facilityId.toString(), f.expectedMonthlyIncome);
          }
          setIncomeMap(map);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load properties.');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const onAddBuildingContainerClick = useCallback(() => {
    navigate('/landlord/add-building');
  }, [navigate]);

  const mapStatus = (status: string): 'Active' | 'Inactive' =>
    status === 'approved' ? 'Active' : 'Inactive';

  const getTotalUnits = (facility: any): number =>
    (facility.listings ?? []).reduce((sum: number, l: any) => sum + (l.unitCount ?? 0), 0);

  const getOccupiedUnits = (facility: any): number => {
    const avail = (facility.listings ?? []).reduce(
      (sum: number, l: any) => sum + (l.availableUnitCount ?? 0),
      0,
    );
    return getTotalUnits(facility) - avail;
  };

  const formatIncome = (amount: number): string =>
    amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const getImage = (facility: any): string =>
    facility.image ?? facility.media?.[0]?.value ?? 'https://placehold.co/400x200?text=No+image';

  return (
    <LandlordLayout activeSidebarItem="properties" breadcrumbs={[]}>
      <div className="flex w-full flex-col gap-[32px] pt-[16px]">

        <section className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[4px]">
            <span className="font-['Inter',sans-serif] text-[14px] font-bold text-[#666]">
              Properties
            </span>

            <div className="flex flex-col gap-[8px] sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-[12px]">
                <h2 className="font-['Inter',sans-serif] text-[20px] sm:text-[24px] font-bold text-black">
                  My Accommodations
                </h2>
                <span className="text-[20px] sm:text-[24px] font-bold text-[#5dc2a8]">
                  {isLoading ? '—' : facilities.length}
                </span>
              </div>

              <div className="flex items-center gap-[12px]">
                <div className="flex items-center gap-[8px]">
                  <span className="hidden sm:inline font-['Inter',sans-serif] text-[14px] font-bold text-black">
                    Filter By:
                  </span>
                  <button className="flex items-center gap-[10px] rounded-[16px] bg-[#f5f5f5] px-[12px] py-[8px] text-[#666] cursor-pointer">
                    <span className="text-[12px] sm:text-[14px] font-medium whitespace-nowrap">
                      Recently Added
                    </span>
                    <Icon icon="mdi-light:chevron-down" className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
                <button className="h-7 w-7 sm:h-8 sm:w-8 transition-opacity hover:opacity-70 shrink-0 cursor-pointer">
                  <img src={search} alt="Search" className="h-full w-full" />
                </button>
              </div>
            </div>
          </div>
          <div className="h-[2px] w-full rounded-full bg-[#f0f0f0]" />
        </section>

        <section className="flex flex-col gap-[24px]">
          {isLoading && (
            <div className="flex items-center justify-center h-32 text-gray-500">
              Loading properties...
            </div>
          )}

          {!isLoading && error && (
            <div className="flex items-center justify-center h-32 text-red-500">{error}</div>
          )}

          {!isLoading && !error && facilities.length === 0 && (
            <div className="flex items-center justify-center h-32 text-gray-400">
              No properties yet.
            </div>
          )}

          {!isLoading &&
            !error &&
            facilities.map((facility: any) => {
              const income = incomeMap.get(facility.id) ?? 0;
              return (
                <PropertiesCard
                  key={facility.id}
                  name={facility.name}
                  address={facility.location?.text ?? ''}
                  totalUnits={getTotalUnits(facility)}
                  occupiedUnits={getOccupiedUnits(facility)}
                  income={formatIncome(income)}
                  outstanding="—"
                  status={mapStatus(facility.status ?? '')}
                  month={currentMonth}
                  imageSrc={getImage(facility)}
                  url={`/landlord/properties/${facility.id}`}
                  onClick={() =>
                    navigate(`/landlord/properties/${facility.id}`, {
                      state: {
                        facilityStatus: facility.status,
                        facilityCapacity: (facility as any).capacity,
                      },
                    })
                  }
                />
              );
            })}

          <button
            onClick={onAddBuildingContainerClick}
            className="flex w-full flex-col items-center justify-center gap-[16px] rounded-[10px] border border-dashed border-black bg-white py-[24px] sm:py-[32px] transition-colors hover:shadow-md hover:bg-gray-50 cursor-pointer"
          >
            <img src={plus} alt="plus" className="w-7 sm:w-8" />
            <div className="flex flex-col items-center">
              <b className="font-['Inter',sans-serif] text-[14px] sm:text-[16px] text-[#5dc2a8]">
                Add New Building
              </b>
              <span className="text-[12px] sm:text-[14px] font-medium text-[#666]">
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
