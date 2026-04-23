import { FunctionComponent, useCallback } from 'react';
import { Icon } from '@iconify/react';
import checked_radio_button from '../../../../assets/checked_button.svg';
import unchecked_radio_button from '../../../../assets/unchecked_button.svg';


const Preferences: FunctionComponent = () => {

  return (

    <div className="self-stretch rounded-t-num-0 rounded-b-num-16 border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex flex-col items-start py-6 px-6 sm:px-num-32 gap-6 text-center text-[24px] text-black">
      <div className="self-stretch flex flex-col items-start">
        <b className="relative leading-8">Display</b>
      </div>
      <div className="self-stretch overflow-hidden flex flex-col items-start py-num-10 pl-0 pr-num-10 gap-2 text-num-14">
        <div className="self-stretch flex flex-col items-start">
          <div className="self-stretch flex flex-col items-start gap-2">
            <b className="relative">Theme Preferences</b>
            <div className="self-stretch relative leading-6 font-medium text-darkslategray-100 text-left">
              Choose how ATLAS looks to you. Selections are applied immediately and
              saved automatically.
            </div>
          </div>
        </div>
        <div className="w-full overflow-hidden flex flex-col lg:flex-row items-center justify-center py-num-10 px-0 box-border gap-9">
          <div className="w-full lg:w-1/2 flex flex-col items-start gap-2.5">
            <div className="self-stretch h-[220px] rounded-num-16 bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-start gap-2">
              <div className="self-stretch h-10 rounded-t-num-16 rounded-b-num-0 bg-darkslategray-200 overflow-hidden shrink-0 flex items-start p-num-10 box-border" />
              <div className="self-stretch flex flex-col items-start">
                <div className="self-stretch flex items-start py-0 px-5">
                  <div className="h-[148px] w-20 rounded bg-slategray overflow-hidden shrink-0 flex flex-col items-start py-num-10 px-0 box-border" />
                  <div className="flex-1 flex items-start py-0 px-5">
                    <div className="flex-1 flex flex-col items-start gap-2.5">
                      <div className="w-[244px] h-2.5 rounded-sm bg-slategray overflow-hidden shrink-0 flex items-start p-num-10 box-border" />
                      <div className="h-9 flex items-start gap-[9.4px]">
                        <div className="h-num-37_5 w-num-75_1 rounded-num-3_75 bg-slategray overflow-hidden shrink-0 flex flex-col items-start p-num-9_4 box-border" />
                        <div className="h-num-37_5 w-num-75_1 rounded-num-3_75 bg-slategray overflow-hidden shrink-0 flex flex-col items-start p-num-9_4 box-border" />
                        <div className="h-num-37_5 w-num-75_1 rounded-num-3_75 bg-slategray overflow-hidden shrink-0 flex flex-col items-start p-num-9_4 box-border" />
                      </div>
                      <div className="h-9 flex items-start gap-[9.4px]">
                        <div className="h-num-37_5 w-num-75_1 rounded-num-3_75 bg-slategray overflow-hidden shrink-0 flex flex-col items-start p-num-9_4 box-border" />
                        <div className="h-num-37_5 w-num-75_1 rounded-num-3_75 bg-slategray overflow-hidden shrink-0 flex flex-col items-start p-num-9_4 box-border" />
                        <div className="h-num-37_5 w-num-75_1 rounded-num-3_75 bg-slategray overflow-hidden shrink-0 flex flex-col items-start p-num-9_4 box-border" />
                      </div>
                      <div className="h-9 flex items-start gap-[9.4px]">
                        <div className="h-num-37_5 w-num-75_1 rounded-num-3_75 bg-slategray overflow-hidden shrink-0 flex flex-col items-start p-num-9_4 box-border" />
                        <div className="h-num-37_5 w-num-75_1 rounded-num-3_75 bg-slategray overflow-hidden shrink-0 flex flex-col items-start p-num-9_4 box-border" />
                        <div className="h-num-37_5 w-num-75_1 rounded-num-3_75 bg-slategray overflow-hidden shrink-0 flex flex-col items-start p-num-9_4 box-border" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-12 overflow-hidden shrink-0 flex flex-col items-start justify-center p-num-10 box-border">
              <div className="flex items-center shrink-0">
                <div className="h-12 w-12 flex items-center justify-center">
                  <img
                    className="h-6 w-6 rounded-[100px]"
                    alt=""
                    src={checked_radio_button}
                  />
                </div>
                <b className="relative">Light Mode</b>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-start gap-2.5">
            <div className="self-stretch h-[220px] rounded-num-16 bg-black border-black border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-start gap-2">
              <div className="self-stretch h-10 rounded-t-num-16 rounded-b-num-0 bg-darkslategray-200 overflow-hidden shrink-0 flex items-start p-num-10 box-border" />
              <div className="self-stretch flex flex-col items-start">
                <div className="self-stretch flex items-start py-0 px-5">
                  <div className="h-[148px] w-20 rounded bg-darkslategray-200 overflow-hidden shrink-0 flex flex-col items-start py-num-10 px-0 box-border" />
                  <div className="flex-1 flex items-start py-0 px-5">
                    <div className="flex-1 flex flex-col items-start gap-2.5">
                      <div className="w-[244px] h-2.5 rounded-sm bg-teal-100 overflow-hidden shrink-0 flex items-start p-num-10 box-border" />
                      <div className="h-9 flex items-start gap-[9.4px]">
                        <div className="h-num-37_5 w-num-75_1 rounded-num-3_75 bg-aliceblue overflow-hidden shrink-0 flex flex-col items-start p-num-9_4 box-border" />
                        <div className="h-num-37_5 w-num-75_1 rounded-num-3_75 bg-aliceblue overflow-hidden shrink-0 flex flex-col items-start p-num-9_4 box-border" />
                        <div className="h-num-37_5 w-num-75_1 rounded-num-3_75 bg-aliceblue overflow-hidden shrink-0 flex flex-col items-start p-num-9_4 box-border" />
                      </div>
                      <div className="h-9 flex items-start gap-[9.4px]">
                        <div className="h-num-37_5 w-num-75_1 rounded-num-3_75 bg-aliceblue overflow-hidden shrink-0 flex flex-col items-start p-num-9_4 box-border" />
                        <div className="h-num-37_5 w-num-75_1 rounded-num-3_75 bg-aliceblue overflow-hidden shrink-0 flex flex-col items-start p-num-9_4 box-border" />
                        <div className="h-num-37_5 w-num-75_1 rounded-num-3_75 bg-aliceblue overflow-hidden shrink-0 flex flex-col items-start p-num-9_4 box-border" />
                      </div>
                      <div className="h-9 flex items-start gap-[9.4px]">
                        <div className="h-num-37_5 w-num-75_1 rounded-num-3_75 bg-aliceblue overflow-hidden shrink-0 flex flex-col items-start p-num-9_4 box-border" />
                        <div className="h-num-37_5 w-num-75_1 rounded-num-3_75 bg-aliceblue overflow-hidden shrink-0 flex flex-col items-start p-num-9_4 box-border" />
                        <div className="h-num-37_5 w-num-75_1 rounded-num-3_75 bg-aliceblue overflow-hidden shrink-0 flex flex-col items-start p-num-9_4 box-border" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-12 overflow-hidden shrink-0 flex flex-col items-start justify-center p-num-10 box-border">
              <div className="flex items-center shrink-0">
                <div className="h-12 w-12 flex items-center justify-center">
                  <img
                    className="h-6 w-6 rounded-[100px]"
                    alt=""
                    src={unchecked_radio_button}
                  />
                </div>
                <b className="relative">Dark Mode</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )

};

export default Preferences;

