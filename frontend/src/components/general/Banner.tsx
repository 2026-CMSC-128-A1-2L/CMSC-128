import type { FunctionComponent } from "react";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import pic1 from "../../../assets/promotion-1.jpg";
import pic2 from "../../../assets/promotion-2.jpg";
import pic3 from "../../../assets/accent.svg";

const DESIGN_WIDTH = 1992; // 7 w-66 cards + 6 gap-6 spaces
const DESIGN_HEIGHT = 680;

const Banner: FunctionComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / DESIGN_WIDTH));
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[1992px] overflow-hidden rounded-num-12 text-darkslategray font-inter"
      style={{ height: DESIGN_HEIGHT * scale }}
    >
      <div
        className="relative overflow-hidden rounded-num-12 bg-teal-200/25"
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <img
          className="absolute left-[28px] top-[-92px] h-[780px] w-[1080px] object-contain opacity-75"
          src={pic3}
          alt="background accent"
        />

        <img
          className="absolute left-[82px] top-[242px] z-10 w-[560px] -rotate-5 rounded-num-12 shadow-lg"
          src={pic2}
          alt="promotion-2"
        />
        <img
          className="absolute left-[292px] top-[86px] z-20 w-[720px] rotate-4 rounded-num-12 object-contain shadow-[0px_10px_30px_rgba(0,0,0,0.2)]"
          src={pic1}
          alt="promotion-1"
        />

        <div className="absolute left-[1160px] top-[132px] z-30 flex w-[700px] flex-col gap-[34px]">
          <div className="flex flex-col gap-[12px]">
            <b className="text-[44px] leading-[1.08] text-darkslategray">
              Built for students, by students.
            </b>
            <b className="text-[34px] leading-[1.22] text-teal">
              Discover a community-backed way to find your next home in Los
              Ba&ntilde;os with transparency and ease.
            </b>
          </div>

          <div className="flex flex-col items-center gap-[34px]">
            <div className="flex items-center justify-center gap-[58px] text-teal-100 font-lora">
              <div className="flex w-[120px] flex-col items-center gap-[14px]">
                <Icon icon="ic:twotone-search" className="h-[54px] w-[54px]" />
                <span className="text-[28px] font-bold">Search</span>
              </div>
              <Icon
                icon="gg:arrow-right"
                className="h-[34px] w-[34px] opacity-40"
              />
              <div className="flex w-[120px] flex-col items-center gap-[14px]">
                <Icon icon="boxicons:calendar" className="h-[54px] w-[54px]" />
                <span className="text-[28px] font-bold">Book</span>
              </div>
              <Icon
                icon="gg:arrow-right"
                className="h-[34px] w-[34px] opacity-40"
              />
              <div className="flex w-[120px] flex-col items-center gap-[14px]">
                <Icon icon="solar:home-linear" className="h-[54px] w-[54px]" />
                <span className="text-[28px] font-bold">Move In</span>
              </div>
            </div>

            <button
              type="button"
              className="flex h-[102px] w-[420px] items-center justify-center gap-[24px] rounded-[60px] [background:linear-gradient(99.18deg,#5dc2a8_27.88%,#0c8873_88.15%)] text-white shadow-lg transition-all hover:brightness-110"
            >
              <b className="text-[36px]">Find my spot!</b>
              <Icon
                icon="si:arrow-right-duotone"
                className="h-[36px] w-[36px]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
