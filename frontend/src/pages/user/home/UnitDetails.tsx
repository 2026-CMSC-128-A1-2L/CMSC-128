import { type FunctionComponent, useCallback, } from "react";
import SideBar from "../../../components/user/SideBar";
import Footer from "../../../components/general/Footer";
import { Icon } from "@iconify/react";
import PropertyTabs from "../../../components/user/unitdetails/PropertyTabs";
import ImageCarousel from "../../../components/user/unitdetails/ImageCarousel";
import pic from "../../../../assets/landing_contact.webp";
import pic2 from "../../../../assets/landing_listing.webp";
import pic3 from "../../../../assets/landing_contact.webp";
import AboutDetails from "../../../components/user/unitdetails/AboutDetails";
import AmenetiesDetails from "../../../components/user/unitdetails/AmenetiesDetails";
import RulesDetails from "../../../components/user/unitdetails/RulesDetails";
import LocationDetails from "../../../components/user/unitdetails/LocationDetails";
import ReviewDetails from "../../../components/user/unitdetails/ReviewDetails";
import PropertyTab from "../../../components/user/unitdetails/PropertyTab";
import { Link } from "react-router-dom";
const UnitDetails: FunctionComponent = () => {
  const gallery = [`${pic}`, `${pic2}`, `${pic3}`];

  const onArrowUpClick = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='searchBarContainer']",
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  return (
    <div className="flex min-h-screen font-lora text-darkslategray-100">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen shrink-0 z-10">
        <SideBar />
      </div>

      {/* Main */}
      <div className="flex flex-1 flex-col min-w-0 overflow-y-auto">
        <div className="flex-1 flex flex-col px-4 sm:px-8 lg:px-20 pt-8 lg:pt-16 pb-0 gap-6">

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-sm font-semibold flex-wrap" data-scroll-to="searchBarContainer">
            <span>Home</span>
            <Icon icon="iconamoon:arrow-right-2" className="w-5 h-5" />
            <span>Pasalo Units</span>
            <Icon icon="iconamoon:arrow-right-2" className="w-5 h-5" />
            <span>Women's Dormitory</span>
          </div>

          {/* Search */}
          <div className="w-full max-w-2xl rounded-xl bg-aliceblue flex items-center py-2.5 px-6 gap-2.5 text-dimgray font-inter">
            <Icon icon="material-symbols:search" className="w-6 h-6 shrink-0" />
            <b className="text-sm">Search for Dorms, Apartments, or Locations (e.g. UPLB, Umali Subdivision)</b>
          </div>

          {/* Top section: image + apply card */}
          <div className="flex flex-col xl:flex-row gap-6 font-inter text-black">
            {/* Left: image + info */}
            <div className="flex-1 min-w-0 flex flex-col gap-6">
              <ImageCarousel images={gallery} />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <b className="text-2xl leading-8">Women's Dormitory</b>
                  <b className="text-xl leading-8 opacity-30">- 1 pax</b>
                </div>
                <div className="flex items-center gap-3 text-xs text-teal-200 font-poppins">
                  <div className="rounded border border-teal-200 py-2 px-6">VISIT</div>
                  <div className="rounded border border-teal-200 py-2 px-6">SAVE</div>
                </div>
              </div>

              <div className="text-xs tracking-wide font-semibold px-2">
                University of the Philippines Los Banos | 0.5 km from UPLB Main Gate | Listed 3 days ago
              </div>

              {/* Price */}
              <div className="relative rounded-lg bg-darkslategray-200 shadow-md px-4 py-3 text-white max-w-max">
                <b className="text-2xl leading-8">₱750.00 - ₱1,000.00</b>
                <span className="text-lg text-teal-100"> / month</span>
              </div>
            </div>

            {/* Right: Apply card */}
            <div className="w-full xl:w-[280px] shrink-0 bg-white border border-whitesmoke-300 rounded-xl flex flex-col items-center p-5 gap-5 text-sm font-inter">
              <div className="w-full flex items-center justify-between text-xl">
                <div className="flex items-center gap-2">
                  <Icon icon="ri:grid-fill" className="h-5 w-5" />
                  <b>Apply</b>
                </div>
                <button className="shadow rounded-md bg-whitesmoke-100 py-1 px-3 text-xs text-gray font-lora">Reset</button>
              </div>

              <div className="w-full flex flex-col gap-4 text-gray font-lora text-xs">
                <div className="flex flex-col gap-1.5">
                  <div className="font-medium">Rooms Available</div>
                  <div className="flex gap-2 text-black">
                    {["1 Pax", "2 Pax"].map(p => (
                      <div key={p} className="flex-1 shadow rounded-lg py-1.5 text-center font-semibold text-xs">{p}</div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="font-medium">Lease Duration</div>
                  <div className="shadow rounded-lg bg-white flex items-center py-2 px-3 gap-2 text-silver">
                    <span className="flex-1 font-semibold text-xs">Choose lease duration</span>
                    <Icon icon="mdi:chevron-down" className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="font-medium">Preferred Move-in Date</div>
                  <div className="shadow rounded-lg bg-white flex items-center py-2 px-3 gap-2 text-silver">
                    <span className="flex-1 font-semibold text-xs">Choose date</span>
                    <Icon icon="mdi:calendar" className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="font-medium">Message to Landlord <span className="text-silver">(optional)</span></div>
                  <div className="shadow rounded-lg bg-white py-2 px-3 h-14 text-silver font-semibold text-xs">
                    Introduce yourself or ask a question..
                  </div>
                </div>

                {/* Cost summary */}
                <div className="shadow rounded-lg bg-whitesmoke-200 flex flex-col p-3 gap-1 text-dimgray font-poppins text-xs">
                  {[["Monthly Rent","₱1000.00"],["Est. Utilities","₱500.00"],["Security Deposit","₱2000.00"]].map(([l,v]) => (
                    <div key={l} className="flex justify-between"><span>{l}</span><span>{v}</span></div>
                  ))}
                  <div className="h-px bg-gray-200 my-1" />
                  <div className="flex justify-between font-bold text-gray">
                    <span>Est. Move-in Cost</span><span>₱3500.00</span>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col gap-2 font-poppins text-white">
                <Link to="/applications" className="w-full rounded-lg bg-darkslategray-200 flex items-center justify-center gap-2 py-3 px-4">
                  <span className="font-medium text-sm">Submit Application</span>
                  <Icon icon="formkit:arrowright" className="h-5 w-5" />
                </Link>
                <p className="text-xs text-dimgray font-lora text-center">
                  Landlord will respond within 24–48 hrs.<br />Your info is kept private until approved.
                </p>
              </div>
            </div>
          </div>

          {/* Tags + tabs + sidebar */}
          <div className="flex flex-col xl:flex-row gap-6 text-sm font-lora text-darkslategray-200">
            {/* Left: tags + tabs */}
            <div className="flex-1 min-w-0 flex flex-col gap-6">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 text-xs text-center text-teal-200">
                {[["2 Slots Left", true], ["Transient"], ["~18 sqm"], ["Female Only"], ["Min. 6 Months"], ["2 Floors"], ["Semi-Furnished"], ["Shared Bathroom"]].map(([label, filled]) => (
                  <div key={label as string} className={`rounded-lg border border-teal-200 py-2 px-4 font-medium ${filled ? "bg-lightcyan" : ""}`}>
                    {label}
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <PropertyTabs>
                <PropertyTab text="ABOUT" element={<AboutDetails />} />
                <PropertyTab text="AMENTITIES" element={<AmenetiesDetails />} />
                <PropertyTab text="RULES" element={<RulesDetails />} />
                <PropertyTab text="LOCATION" element={<LocationDetails />} />
                <PropertyTab text="REVIEWS" element={<ReviewDetails />} />
              </PropertyTabs>
            </div>

            {/* Right: landlord card + similar */}
            <div className="w-full xl:w-[280px] shrink-0 flex flex-col gap-5 font-inter text-black">
              {/* Landlord card */}
              <div className="rounded-lg shadow bg-white flex flex-col p-4 gap-4">
                <div className="flex items-center gap-2 text-xl">
                  <Icon icon="material-symbols:wifi-home-outline-rounded" className="h-6 w-6" />
                  <b className="text-sm">LANDLORD</b>
                </div>
                <div className="flex items-center gap-3">
                  <img className="h-12 w-12 rounded-full object-cover shadow" alt="" />
                  <div className="flex flex-col gap-0.5 font-lora text-xs">
                    <div className="font-medium">Cynthia Villar</div>
                    <div className="text-[10px] font-semibold text-darkslategray-100">member since 2021</div>
                  </div>
                </div>
                <div className="flex gap-2 text-teal-100 text-sm">
                  {[["3","Active Units"],["5 yrs","On Platform"]].map(([val,lbl]) => (
                    <div key={lbl} className="flex-1 border border-teal-100 rounded-lg flex flex-col items-center py-2">
                      <b className="font-semibold">{val}</b>
                      <div className="text-[10px] font-semibold font-lora text-darkslategray-100">{lbl}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2 text-white font-poppins text-sm">
                  <Link to="/direct-messages" className="rounded-lg bg-darkslategray-200 flex items-center justify-center gap-2 py-2 shadow">
                    <Icon icon="material-symbols:mail-outline" className="h-5 w-5" />
                    <span className="font-medium">Send Message</span>
                  </Link>
                  <button className="rounded-lg bg-darkslategray-200 flex items-center justify-center gap-2 py-2 shadow">
                    <Icon icon="ic:outline-phone" className="h-5 w-5" />
                    <span className="font-medium">Contact Details</span>
                  </button>
                </div>
              </div>

              {/* You may also like */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between px-2">
                  <b className="text-lg">You may also like</b>
                  <div className="h-7 w-7 rounded-full shadow bg-white flex items-center justify-center">
                    <Icon icon="iconamoon:arrow-right-2" className="h-5 w-5" />
                  </div>
                </div>
                {[{ name: "Westbrook Residences", addr: "569Q+3J2, Los Baños, Laguna", rating: "4.3" },
                  { name: "Ruby Residences", addr: "10247 Ruby St, Los Baños, Laguna", rating: "4.8" }].map(item => (
                  <Link to="/unit" key={item.name}>
                    <div className="rounded-lg shadow bg-whitesmoke-300 overflow-hidden">
                      <div className="h-28 bg-gray-200 w-full" />
                      <div className="p-3 flex flex-col gap-1">
                        <b className="text-sm font-inter">{item.name}</b>
                        <div className="text-[10px] font-semibold font-lora text-dimgray">{item.addr}</div>
                        <div className="text-[10px] font-semibold">★ {item.rating}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8">
          <Footer />
        </footer>
      </div>

      {/* Scroll to top */}
      <button
        onClick={onArrowUpClick}
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-gradient-to-b from-[#096c5b] to-[#16917c] shadow-lg flex items-center justify-center z-20 hover:opacity-90 transition-opacity"
        aria-label="Scroll to top"
      >
        <Icon icon="mdi:chevron-up" className="h-7 w-7 text-white" />
      </button>
    </div>
  );
};

export default UnitDetails;
