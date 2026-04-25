import { FunctionComponent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Icon } from '@iconify/react';
import RoomTypeItem from './RoomTypeItem';
import { useBuildingStore } from './useBuildingStore.ts';

// ─── Props ────────────────────────────────────────────────────────────────────

interface BuildingInformationProps {
  onNextClick: () => void;
  onPrevClick: () => void;
}

// ─── Form shape ───────────────────────────────────────────────────────────────

interface BuildingFormValues {
  name: string;
  typeOfBuilding: string;
  location: string;
  about: string;
}

// ─── Main Component ───────────────────────────────────────────────────────────

const BuildingInformation: FunctionComponent<BuildingInformationProps> = ({ onNextClick, onPrevClick }) => {
  const { buildingInfo, setBuildingInfo, addRoomType } = useBuildingStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BuildingFormValues>({
    defaultValues: {
      name: buildingInfo.name,
      typeOfBuilding: buildingInfo.typeOfBuilding,
      location: buildingInfo.location,
      about: buildingInfo.about,
    },
    mode: 'onChange',
  });

  // Sync every keystroke → zustand
  useEffect(() => {
    const subscription = watch((values) => {
      setBuildingInfo({
        name: values.name ?? '',
        typeOfBuilding: values.typeOfBuilding ?? '',
        location: values.location ?? '',
        about: values.about ?? '',
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, setBuildingInfo]);

  // Called when Next is clicked — validates, logs, then advances
  const onSubmit = (data: BuildingFormValues) => {
    const fullData = {
      ...data,
      roomTypes: buildingInfo.roomTypes,
      managers: buildingInfo.managers,
      photos: buildingInfo.photos,
    };
    console.log('=== Building Information Form Data ===');
    console.log(JSON.stringify(fullData, null, 2));
    onNextClick();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative w-full flex flex-col items-start justify-center gap-2.5 text-center text-num-18 text-teal-200 font-inter"
    >
      <div className="w-[880px] flex flex-col items-start">
        <div className="w-[880px] rounded-2xl bg-white border-whitesmoke border-solid border-[1px] box-border flex flex-col items-start py-8 px-12 gap-3">

          {/* ── Building Information ── */}
          <div className="self-stretch flex flex-col items-start gap-6">
            <div className="self-stretch flex items-center">
              <b className="relative tracking-num--0_01">Building Information</b>
            </div>
            <div className="self-stretch flex flex-col items-start gap-5 text-left text-num-14 text-dimgray">

              {/* Name + Type of Building */}
              <div className="self-stretch flex items-start gap-10">
                {/* Name */}
                <div className="flex-1 flex flex-col items-start gap-3">
                  <b className="relative">Name</b>
                  <div className="self-stretch flex flex-col gap-1">
                    <div className="self-stretch rounded-num-12 bg-aliceblue border-whitesmoke border-solid border-[1px] flex items-center py-3 px-num-16">
                      <input
                        {...register('name', { required: 'Building name is required' })}
                        placeholder="Aa"
                        className="flex-1 bg-transparent text-sm text-gray-700 placeholder-slategray outline-none font-medium leading-num-24"
                      />
                    </div>
                    {errors.name && (
                      <span className="text-xs text-red-500">{errors.name.message}</span>
                    )}
                  </div>
                </div>

                {/* Type of Building */}
                <div className="flex-1 flex flex-col items-start gap-3">
                  <b className="self-stretch h-[15.2px] relative flex items-center shrink-0">Type of Building</b>
                  <div className="self-stretch flex flex-col gap-1">
                    <div className="self-stretch h-12 rounded-num-12 bg-aliceblue border-whitesmoke border-solid border-[1px] box-border flex items-center px-4">
                      <select
                        {...register('typeOfBuilding', { required: 'Please select a building type' })}
                        className="flex-1 bg-transparent text-sm text-gray-700 outline-none font-medium appearance-none cursor-pointer"
                      >
                        <option value="">Select type</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="dormitory">Dormitory</option>
                        <option value="mixed">Mixed Use</option>
                      </select>
                      <Icon icon="mynaui:chevron-down" className="w-5 h-5 shrink-0 pointer-events-none" />
                    </div>
                    {errors.typeOfBuilding && (
                      <span className="text-xs text-red-500">{errors.typeOfBuilding.message}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="self-stretch flex flex-col items-start gap-3">
                <b className="relative">Location</b>
                <div className="self-stretch flex flex-col gap-1">
                  <div className="self-stretch rounded-num-12 bg-aliceblue border-whitesmoke border-solid border-[1px] flex items-center py-3 px-num-16">
                    <input
                      {...register('location', { required: 'Location is required' })}
                      placeholder="Aa"
                      className="flex-1 bg-transparent text-sm text-gray-700 placeholder-slategray outline-none font-medium leading-num-24"
                    />
                  </div>
                  {errors.location && (
                    <span className="text-xs text-red-500">{errors.location.message}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── About ── */}
          <div className="self-stretch overflow-hidden shrink-0 flex flex-col items-start py-num-10 px-0 box-border gap-2.5">
            <div className="self-stretch flex items-center">
              <b className="relative tracking-num--0_01">About</b>
            </div>
            <textarea
              {...register('about', { required: 'Please provide a description' })}
              placeholder="Aa"
              rows={5}
              className="self-stretch rounded-num-12 bg-aliceblue border-whitesmoke border-solid border-[1px] py-3 px-num-16 text-left text-num-14 text-slategray outline-none font-medium resize-none leading-num-24"
            />
            {errors.about && (
              <span className="text-xs text-red-500">{errors.about.message}</span>
            )}
          </div>

          {/* ── Add Photos ── */}
          <div className="self-stretch overflow-hidden flex flex-col items-start p-num-10 gap-2.5">
            <div className="self-stretch flex items-center">
              <b className="relative tracking-num--0_01">Add Photos</b>
            </div>
            <div className="self-stretch overflow-hidden flex items-start flex-wrap content-start py-num-10 px-0">
              <div className="h-[100px] w-[100px] rounded-num-12 border-whitesmoke border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center justify-center p-num-10 cursor-pointer hover:bg-gray-50 transition-colors">
                <Icon icon="material-symbols:add-rounded" className="w-8 h-8" />
              </div>
            </div>
          </div>

          {/* ── Room Types ── */}
          <div className="self-stretch overflow-hidden flex flex-col items-start p-num-10 gap-2.5">
            <div className="self-stretch flex items-center">
              <b className="relative tracking-num--0_01">Room Types</b>
            </div>
            <div className="self-stretch flex flex-col gap-3 text-left text-num-14 text-gray">
              {buildingInfo.roomTypes.map((rt) => (
                <RoomTypeItem key={rt.id} roomType={rt} />
              ))}
              <button
                type="button"
                onClick={addRoomType}
                className="w-full h-[100px] rounded-xl border border-whitesmoke overflow-hidden flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Icon icon="material-symbols:add-rounded" className="w-8 h-8" color="#096C5B" />
              </button>
            </div>
          </div>

          {/* ── Add Managers ── */}
          <div className="self-stretch overflow-hidden flex flex-col items-start p-num-10 gap-2.5">
            <div className="self-stretch flex items-center">
              <b className="relative tracking-num--0_01">Add Managers</b>
            </div>
            <div className="rounded-num-12 bg-aliceblue border-whitesmoke border-solid border-[1px] flex items-center py-2 px-num-16 gap-2.5 text-left text-num-14 text-slategray cursor-pointer hover:bg-blue-100 transition-colors">
              <div className="relative leading-num-24 font-medium">Invite Managers</div>
              <Icon icon="material-symbols:add-rounded" className="w-4 h-4" />
            </div>
          </div>

        </div>
      </div>

      {/* ── Back / Next ── */}
      <div className="w-[903px] overflow-hidden flex items-center justify-center py-0 px-num-10 box-border gap-2.5 text-num-14 text-dimgray">
        <div
          className="rounded-[45px] flex items-center justify-center py-2 px-8 cursor-pointer"
          onClick={onPrevClick}
        >
          <b className="relative">Back</b>
        </div>
        {/* type="submit" triggers handleSubmit → validates → logs → onNextClick */}
        <button
          type="submit"
          className="rounded-[45px] flex items-center justify-center py-2 px-8 gap-2.5 text-white cursor-pointer"
          style={{ background: '#1a5c50' }}
        >
          <b className="relative">Next</b>
          <Icon icon="material-symbols-light:arrow-forward-rounded" className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
};

export default BuildingInformation;
