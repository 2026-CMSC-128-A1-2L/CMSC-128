import { type FunctionComponent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Location from '../../../../../assets/pin_location_icon.svg';
import House from '../../../../../assets/house_icon.svg';
import StarIcon from '../../../../../assets/quality_star_icon.svg';
import FilledStarIcon from '../../../../../assets/quality_star_icon_filled.svg';
import LeafIcon from '../../../../../assets/comfort_leaf_icon.svg';
import FilledLeafIcon from '../../../../../assets/comfort_leaf_icon_filled.svg';
import TreeIcon from '../../../../../assets/environment_tree_icon.svg';
import FilledTreeIcon from '../../../../../assets/environment_tree_icon_filled.svg';
import SideBar from '../../../../components/user/SideBar';
import BreadcrumbHeader from '../../../../components/general/Breadcrumb';
import ProgressBar from '../../../../components/user/ProgressBar';
import { useCurrentDormReviewDetails } from './useCurrentDormReviewDetails';

const RateAndReview: FunctionComponent = () => {
  const navigate = useNavigate();

  const [qualityRating, setQualityRating] = useState(0);
  const [comfortRating, setComfortRating] = useState(0);
  const [environmentRating, setEnvironmentRating] = useState(0);
  const [description, setDescription] = useState('');
  const { details, isLoading, error } = useCurrentDormReviewDetails();
  const totalRating = qualityRating + comfortRating + environmentRating;
  const overallRating = totalRating > 0 ? totalRating / 3 : 0;

  const isFormInvalid =
    qualityRating === 0 || comfortRating === 0 || environmentRating === 0 || !details?.listingId;

  const onUserProfileTextClick = useCallback(() => {
    if (isFormInvalid) return;
    navigate('/rate-review-upload', {
      state: {
        listingId: details?.listingId,
        ratings: {
          quality: qualityRating,
          comfort: comfortRating,
          environment: environmentRating,
        },
        description: description.trim() || undefined,
        totalRating,
        overallRating,
      },
    });
  }, [
    navigate,
    isFormInvalid,
    details?.listingId,
    qualityRating,
    comfortRating,
    environmentRating,
    description,
    totalRating,
    overallRating,
  ]);

  return (
    <div className="w-full h-screen relative overflow-y-auto flex flex-col items-start isolate gap-2.5 text-left text-num-14 text-darkslategray-100 font-inter">
      <div className="w-full max-w-[1440px] min-h-screen overflow-hidden flex flex-col items-start z-1 mx-auto">
        <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start py-num-0 pl-num-0 pr-0 md:pr-20">
          <div className="self-stretch flex-1 flex items-center gap-8 shrink-0">
            <div className="fixed top-0 left-0 h-full w-[200px] hidden md:block z-10">
              <SideBar />
            </div>

            {/* Main Content shifted to the right of the fixed sidebar */}
            <div className="self-stretch w-full md:w-[calc(100%-200px)] md:ml-[200px] flex flex-col items-start shrink-0">
              <div className="self-stretch h-16 overflow-hidden shrink-0 flex items-end p-2.5 box-border gap-2.5">
                <div className="h-6 flex items-center gap-1.5">
                  <BreadcrumbHeader
                    routes={[
                      { name: 'User Profile', url: '/profile-switcher' },
                      { name: 'Current Dorm', url: '/profile-switcher' },
                      { name: 'Rate & Review', url: '/rate-review' },
                    ]}
                  />
                </div>

                <div className="w-[704px] rounded-xl bg-aliceblue overflow-hidden shrink-0 hidden items-center py-2.5 px-6 box-border gap-2.5 text-dimgray font-inter">
                  <img className="h-6 w-6 relative" alt="" />
                  <b className="relative">
                    Search for Dorms, Apartments, or Locations (e.g. UPLB, Umali Subdivision)
                  </b>
                </div>
              </div>

              <div className="self-stretch max-w-[1128px] h-[800px] rounded-2xl bg-white border-whitesmoke-200 border-solid border box-border flex flex-col items-start py-num-32 px-num-0 gap-[21px] text-black">
                <div className="self-stretch h-[349px] flex flex-col items-start gap-3 shrink-0">
                  <div className="w-full h-[196px] flex items-center justify-center py-num-0 px-[100px] box-border">
                    <div className="h-[195px] w-[928px] rounded-xl border-whitesmoke-200 border-solid border box-border flex items-center gap-2.5">
                      <img
                        className="h-[195px] w-[305px] rounded-tl-xl rounded-tr-none rounded-br-none rounded-bl-xl object-cover"
                        src={details?.dormitoryImage}
                        alt={details?.dormitoryName ?? 'Current dorm'}
                      />

                      <div className="h-[195px] flex-1 rounded-2xl flex flex-col items-center py-num-0 px-num-12 box-border">
                        <div className="w-full h-[195px] flex flex-col items-center justify-center gap-0.5 max-w-full">
                          <div className="self-stretch flex flex-col items-start py-num-12 px-num-0 gap-0.5">
                            <div className="self-stretch flex items-center justify-center text-[24px] font-inter">
                              <b className="flex-1 relative leading-8">
                                {details?.dormitoryName ?? 'Current Dorm'}
                              </b>
                            </div>

                            <div className="self-stretch flex items-center py-num-0 px-num-12 gap-2">
                              <img className="w-[9px] relative max-h-full" alt="" src={Location} />
                              <div className="flex items-center justify-center">
                                <div className="relative font-medium text-[14px]">
                                  {details?.dormitoryAddress ?? 'Address unavailable'}
                                </div>
                              </div>
                            </div>

                            <div className="self-stretch flex items-center py-num-0 px-num-12 gap-[7px]">
                              <img className="h-[9px] w-[9px] relative" alt="" src={House} />
                              <div className="flex items-center justify-center">
                                <div className="relative">
                                  <span className="font-medium">
                                    {details?.landlordName ?? 'Dorm Landlord'}{' '}
                                  </span>
                                  <span className="text-[8px] tracking-[0.04em] font-semibold text-silver-200">
                                    Landlord
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="self-stretch flex items-center py-num-0 px-num-12 gap-[7px]">
                              <img className="h-[9px] w-[9px] relative" alt="" src={House} />
                              <div className="flex items-center justify-center">
                                <div className="relative">
                                  <span className="font-medium">
                                    {details?.managerName ?? 'Dorm Manager'}{' '}
                                  </span>
                                  <span className="text-[8px] tracking-[0.04em] font-semibold text-silver-200">
                                    Dorm Manager
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="self-stretch flex items-start py-4 px-num-0 gap-2 text-center text-[14.26px] text-darkslategray-200">
                            <div className="h-[42.8px] w-[118.6px] relative">
                              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[8.91px] bg-lightcyan border-teal border-solid border-[0.9px] box-border" />
                              <div className="absolute h-[56.31%] w-[81.2%] top-[20.83%] left-[9.77%] font-medium flex items-center justify-center">
                                {details?.roomType ?? 'Selected Room'}
                              </div>
                            </div>

                            <div className="h-[42px] w-[74px] relative">
                              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[8.91px] bg-lightcyan border-teal border-solid border-[0.9px] box-border" />
                              <div className="absolute h-[56.19%] w-[81.22%] top-[20.83%] left-[9.77%] font-medium flex items-center justify-center">
                                {details?.roomNumber ?? 'Assigned Unit'}
                              </div>
                            </div>

                            <div className="h-[42px] w-[268px] relative">
                              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[8.91px] bg-lightcyan border-teal border-solid border-[0.9px] box-border" />
                              <div className="absolute h-[56.19%] w-[81.19%] top-[20.83%] left-[9.77%] font-medium flex items-center justify-center">
                                {details?.contractLabel ?? 'Current Lease'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="self-stretch flex flex-col items-center py-6 px-num-32 text-center font-poppins">
                    <ProgressBar
                      currentStepIndex={1}
                      steps={[
                        { key: 'information', label: 'Information' },
                        { key: 'reviewing', label: 'Reviewing' },
                        { key: 'finalize', label: 'Finalize' },
                      ]}
                    />
                  </div>
                </div>

                <div className="self-stretch h-[405px] flex flex-col items-center gap-[117px] shrink-0 text-[18px] text-darkolivegreen">
                  {(isLoading || error) && (
                    <div
                      className={`w-[735px] rounded-xl border px-4 py-3 text-center text-sm font-semibold ${
                        error
                          ? 'border-crimson/30 bg-crimson/5 text-crimson'
                          : 'border-whitesmoke-200 bg-aliceblue text-dimgray'
                      }`}
                    >
                      {error ?? 'Loading your current dorm details...'}
                    </div>
                  )}
                  <div className="self-stretch flex flex-col items-center justify-center py-num-12 px-num-32 gap-[37px]">
                    <div className="w-[734px] h-[34px] relative">
                      <div className="absolute top-0 left-0 flex items-center gap-[34px]">
                        <div className="h-5 w-[115px] relative flex items-center shrink-0">
                          Quality
                        </div>

                        <div className="flex items-center gap-2.5">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <button
                              type="button"
                              key={num}
                              onClick={() => setQualityRating(num)}
                              className="h-num-30 w-num-30.6 relative overflow-hidden shrink-0 border-none bg-transparent p-0 cursor-pointer"
                            >
                              <img
                                className="absolute h-[79.33%] w-[75.16%] top-[12.5%] right-[12.34%] bottom-[8.17%] left-[12.5%] max-w-full overflow-hidden max-h-full transition-transform active:scale-90"
                                alt={`Rate ${num}`}
                                src={num <= qualityRating ? FilledStarIcon : StarIcon}
                              />
                            </button>
                          ))}
                        </div>

                        <div className="h-[33.2px] w-[347.6px] relative text-num-14 text-center flex items-center justify-center shrink-0">
                          Rate the overall condition of the building, furniture, and utilities. Does
                          everything work as it should?
                        </div>
                      </div>
                    </div>

                    <div className="w-[728px] h-[34px] relative">
                      <div className="absolute top-0 left-0 flex items-center gap-[34px]">
                        <div className="h-[19px] w-[115px] relative flex items-center shrink-0">
                          Comfort
                        </div>

                        <div className="flex items-center gap-2.5">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <button
                              type="button"
                              key={num}
                              onClick={() => setComfortRating(num)}
                              className="h-num-30 w-num-30.6 relative overflow-hidden shrink-0 border-none bg-transparent p-0 cursor-pointer"
                            >
                              <img
                                className="absolute h-[79.33%] w-[75.16%] top-[12.5%] right-[12.34%] bottom-[8.17%] left-[12.5%] max-w-full overflow-hidden max-h-full transition-transform active:scale-90"
                                alt={`Rate ${num}`}
                                src={num <= comfortRating ? FilledLeafIcon : LeafIcon}
                              />
                            </button>
                          ))}
                        </div>

                        <div className="h-[33.2px] w-[347.6px] relative text-num-14 text-center flex items-center justify-center shrink-0">
                          Rate the bedding, room layout, and the overall feel of the 'home away from
                          home' experience.
                        </div>
                      </div>
                    </div>

                    <div className="w-[728px] h-[34px] relative">
                      <div className="absolute top-0 left-0 flex items-center gap-8">
                        <div className="h-[23px] w-[115px] relative flex items-center shrink-0">
                          Environment
                        </div>

                        <div className="flex items-center gap-2.5">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <button
                              type="button"
                              key={num}
                              onClick={() => setEnvironmentRating(num)}
                              className="h-num-30 w-num-30.6 relative overflow-hidden shrink-0 border-none bg-transparent p-0 cursor-pointer"
                            >
                              <img
                                className="absolute h-[79.33%] w-[75.16%] top-[12.5%] right-[12.34%] bottom-[8.17%] left-[12.5%] max-w-full overflow-hidden max-h-full transition-transform active:scale-90"
                                alt={`Rate ${num}`}
                                src={num <= environmentRating ? FilledTreeIcon : TreeIcon}
                              />
                            </button>
                          ))}
                        </div>

                        <div className="h-[33.2px] w-[347.6px] relative text-num-14 text-center flex items-center justify-center shrink-0">
                          Rate the atmosphere, and cleanliness of the surroundings. Is it a good
                          place for study and rest?
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-[735.9px] h-[33px] relative text-num-14 text-gray font-inter">
                    <div className="absolute top-px left-0 w-[618px] h-8">
                      <div className="absolute h-[1931.25%] w-[5.18%] top-full right-[94.82%] bottom-[-1931.25%] left-[0%] shadow-[0px_0px_4px_rgba(0,0,0,0.25)] rounded-[24.68px] bg-white transform-[rotate(-90deg)] origin-top-left" />
                      <input
                        type="text"
                        placeholder="Report..."
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        className="absolute h-[88.75%] w-[95.89%] top-[6.34%] left-[2.43%] leading-6 font-medium flex items-center bg-transparent border-none outline-none focus:ring-0 placeholder-dimgray font-inter text-[14px] text-black"
                      />
                    </div>

                    <div className="absolute -top-9 left-0 text-[13px] font-semibold text-darkslategray-200">
                      Total: {totalRating} / 15 - Overall: {overallRating.toFixed(1)} / 5.0
                    </div>

                    <button
                      type="button"
                      className="absolute top-0 left-[627.93px] w-[108px] h-8 text-center text-white font-inter border-none bg-transparent cursor-pointer p-0 group"
                      onClick={onUserProfileTextClick}
                      disabled={isFormInvalid}
                    >
                      <div
                        className={`absolute h-[337.5%] w-[29.63%] top-full right-[70.37%] bottom-[-337.5%] left-[0%] shadow-[0px_0px_4px_rgba(0,0,0,0.25)] rounded-[6.17px] transform-[rotate(-90deg)] origin-top-left transition-all 
                        ${
                          isFormInvalid
                            ? 'bg-gray-400 opacity-50'
                            : 'bg-darkslategray-200 group-hover:brightness-125'
                        }`}
                      />
                      <div className="absolute h-[101.25%] w-[100.28%] top-[0%] left-[0%] font-medium flex items-center justify-center text-[14px]">
                        Submit
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[1440px] h-20 bg-white overflow-hidden shrink-0 hidden flex-col items-center justify-center">
            <div className="w-[1273px] h-[82px] bg-whitesmoke-100 overflow-hidden shrink-0 flex items-center py-[19px] pl-[200px] pr-20 box-border" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateAndReview;
