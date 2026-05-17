import type { FunctionComponent } from 'react';
import checked_radio_button from '../../../../assets/checked_button.svg';
import unchecked_radio_button from '../../../../assets/unchecked_button.svg';
import { useTheme } from '../../utilities/DarkMode';

const Preferences: FunctionComponent = () => {
  const { isDark, setTheme } = useTheme();

  return (
    <div className="self-stretch rounded-t-num-0 rounded-b-num-16 border-whitesmoke-200 border-solid border overflow-hidden flex flex-col items-start py-6 px-6 sm:px-num-32 gap-6 text-center text-[24px] text-black">
      <div className="self-stretch flex flex-col items-start">
        <b className="relative leading-8">Display</b>
      </div>
      <div className="self-stretch overflow-hidden flex flex-col items-start py-num-10 pl-0 pr-num-10 gap-2 text-num-14">
        <div className="self-stretch flex flex-col items-start">
          <div className="self-stretch flex flex-col items-start gap-2">
            <b className="relative">Theme Preferences</b>
            <div className="self-stretch relative leading-6 font-medium text-darkslategray-100 text-left">
              Choose how ATLAS looks to you. Selections are applied immediately and saved
              automatically.
            </div>
          </div>
        </div>
        <div className="w-full overflow-hidden flex flex-col lg:flex-row items-center justify-center py-num-10 px-0 box-border gap-9">
          {/* Light Mode card */}
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={[
              'w-full lg:w-1/2 flex flex-col items-start gap-2.5 bg-transparent border-none p-0 text-left',
              !isDark ? 'cursor-default' : 'cursor-pointer group',
            ].join(' ')}
          >
            <div
              className={[
                'self-stretch h-[220px] rounded-num-16 bg-white border-solid border box-border overflow-hidden shrink-0 flex flex-col items-start gap-2 transition-all duration-200',
                !isDark
                  ? 'border-teal-100 shadow-md'
                  : 'border-whitesmoke-200 group-hover:border-teal-100 group-hover:shadow-md group-hover:scale-[1.02]',
              ].join(' ')}
            >
              <div className="self-stretch h-10 rounded-t-num-16 rounded-b-num-0 bg-darkslategray-200 overflow-hidden shrink-0 flex items-start p-num-10 box-border cursor-pointer" />
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
            <div
              className={[
                'self-stretch h-12 overflow-hidden shrink-0 flex flex-col items-start justify-center p-num-10 box-border rounded-num-8 transition-all duration-150',
                !isDark ? '' : 'group-hover:bg-azure',
              ].join(' ')}
            >
              <div className="flex items-center shrink-0">
                <div className="h-12 w-12 flex items-center justify-center">
                  <img
                    className="h-6 w-6 rounded-[100px]"
                    alt=""
                    src={!isDark ? checked_radio_button : unchecked_radio_button}
                  />
                </div>
                <b className="relative">Light Mode</b>
              </div>
            </div>
          </button>

          {/* Dark Mode card */}
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={[
              'w-full lg:w-1/2 flex flex-col items-start gap-2.5 bg-transparent border-none p-0 text-left',
              isDark ? 'cursor-default' : 'cursor-pointer group',
            ].join(' ')}
          >
            <div
              className={[
                'self-stretch h-[220px] rounded-num-16 bg-black border-solid border box-border overflow-hidden shrink-0 flex flex-col items-start gap-2 transition-all duration-200',
                isDark
                  ? 'border-teal-100 shadow-md'
                  : 'border-black group-hover:border-teal-100 group-hover:shadow-md group-hover:scale-[1.02]',
              ].join(' ')}
            >
              <div className="self-stretch h-10 rounded-t-num-16 rounded-b-num-0 bg-darkslategray-200 overflow-hidden shrink-0 flex items-start p-num-10 box-border cursor-pointer" />
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
            <div
              className={[
                'self-stretch h-12 overflow-hidden shrink-0 flex flex-col items-start justify-center p-num-10 box-border rounded-num-8 transition-all duration-150',
                isDark ? '' : 'group-hover:bg-azure',
              ].join(' ')}
            >
              <div className="flex items-center shrink-0">
                <div className="h-12 w-12 flex items-center justify-center">
                  <img
                    className="h-6 w-6 rounded-[100px]"
                    alt=""
                    src={isDark ? checked_radio_button : unchecked_radio_button}
                  />
                </div>
                <b className="relative">Dark Mode</b>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
