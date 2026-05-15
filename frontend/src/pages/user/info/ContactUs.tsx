import { useState, type FunctionComponent } from "react";
import LogoLike from "../../../../assets/logo_like.svg?react";
import SideBar from "../../../components/user/SideBar";
import { Icon } from "@iconify/react";
import Footer from "../../../components/general/Footer";
import Banner from "../../../components/general/Banner";
import BreadcrumbHeader from "../../../components/general/Breadcrumb";

const ContactUs: FunctionComponent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    //api here
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
    setIsSubmitted(false);
  };

  const inputStyle =
    "w-full bg-transparent border-none outline-none text-num-14 font-medium text-darkslategray-200 placeholder:text-dimgray/60";
  const containerStyle =
    "flex-1 min-h-[34px] rounded-num-12 bg-aliceblue border-whitesmoke-200 border-solid border overflow-hidden flex items-start py-2 px-3 transition-all duration-300 focus-within:bg-white focus-within:shadow-[0_4px_12px_rgba(0,0,0,0.05)] focus-within:border-teal-100/30";

  return (
    <div className="w-full h-screen flex flex-col font-inter text-darkslategray-100 overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <div className="fixed top-0 left-0 h-full w-[200px] hidden md:block z-10">
          <SideBar />
        </div>
        <div className="w-[200px] shrink-0 hidden md:block" />

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col min-h-full max-h-[1192px]">
              <div className="flex-1 flex flex-col px-4 sm:px-8 pt-0 pr-4 sm:pr-20">
                <div className="flex-1 flex flex-col items-start">
                  {/* crumbs */}
                  <div className="self-stretch h-16 overflow-hidden shrink-0 flex items-end p-num-10 box-border gap-2.5">
                    <BreadcrumbHeader
                      routes={[
                        { name: "Home", url: "/home" },
                        { name: "Contact Us" },
                      ]}
                    />
                    <div className="w-[704px] rounded-num-12 bg-aliceblue overflow-hidden shrink-0 hidden items-center py-num-10 px-6 box-border gap-2.5 text-dimgray font-inter">
                      <img className="h-6 w-6 relative" alt="" />
                      <b className="relative">
                        Search for Dorms, Apartments, or Locations (e.g. UPLB,
                        Umali Subdivision)
                      </b>
                    </div>
                  </div>

                  <div className="self-stretch flex-1 flex flex-col items-center gap-8 text-center text-darkslategray-200 font-inter">
                    <div className="self-stretch flex flex-col items-center justify-center gap-2 text-darkslategray-100">
                      <b className="w-[262px] relative flex items-center justify-center">
                        Contact Us
                      </b>
                      <b className="relative text-[32px] leading-8 text-teal-100 text-left">
                        We'd love to talk to you
                      </b>
                    </div>

                    {/* contact cards */}
                    <div className="w-full max-w-[1050px] overflow-hidden flex flex-col lg:flex-row items-stretch p-num-10 gap-8 text-teal-200">
                      <div className="lg:w-[240px] rounded-num-12 bg-lightcyan overflow-hidden flex flex-col items-start py-num-16 px-6 gap-2.5">
                        <div className="flex items-center gap-2.5">
                          <Icon
                            icon="simple-line-icons:call-out"
                            className="w-4 h-4 relative"
                          />
                          <div className="relative font-extrabold">Call Us</div>
                        </div>
                        <b className="relative text-num-18 tracking-[-0.01em] text-teal-100">
                          +639 1234 5678
                        </b>
                      </div>
                      <div className="lg:w-[280px] rounded-num-12 bg-lightcyan overflow-hidden flex flex-col items-start py-num-16 px-6 gap-2.5">
                        <div className="flex items-center gap-2.5">
                          <Icon
                            icon="material-symbols-light:mail-outline"
                            className="w-4 h-4 relative"
                          />
                          <div className="relative font-extrabold">
                            Email Us
                          </div>
                        </div>
                        <b className="relative text-num-18 tracking-[-0.01em] text-teal-100">
                          atlasteam@gmail.com
                        </b>
                      </div>
                      <div className="flex-1 rounded-num-12 bg-lightcyan overflow-hidden flex flex-col items-start pt-num-16 px-6 pb-5 gap-2.5">
                        <div className="flex items-center gap-2.5">
                          <Icon
                            icon="boxicons:location"
                            className="w-4 h-4 relative"
                          />
                          <div className="relative font-extrabold">
                            Where we're located
                          </div>
                        </div>
                        <b className="self-stretch relative text-num-18 tracking-[-0.01em] text-teal-100 text-left">
                          University of the Philippines Los Baños
                        </b>
                      </div>
                    </div>

                    {/* form */}
                    <div className="w-full max-w-[1050px] overflow-hidden flex flex-col lg:flex-row items-start justify-between p-num-10 gap-10 lg:gap-16 text-[48px] font-inter">
                      {/* left) */}
                      <div className="w-full lg:w-[380px] rounded-num-12 overflow-hidden shrink-0 flex flex-col items-start py-5 px-num-16 box-border gap-6">
                        {/* column */}
                        <div className="flex flex-col items-start gap-1">
                          {/* si owl */}
                          <div className="w-[351px] h-[74px] relative">
                            <LogoLike className="absolute top-[-7px] left-[224px] w-[108px] h-[81px] object-cover shrink-0 fill-darkslategray" />
                            <div className="absolute w-[calc(100%-244px)] top-[34px] left-[100px] flex items-center justify-center shrink-0 text-[48px] font-buhun-retro-two-free">
                              Nest
                            </div>
                            <b className="absolute w-[calc(100%-89px)] top-0 left-[11px] text-[28px] flex font-inter text-teal-200 text-left items-center shrink-0">
                              Help us build a better
                            </b>
                          </div>

                          {/* feedback */}
                          <div className="self-stretch flex items-center py-num-0 px-3 text-num-14 text-teal-200 font-inter mt-4">
                            <b className="relative">
                              Your feedback helps the whole community.
                            </b>
                          </div>
                        </div>

                        {/* "stuff */}
                        <div className="self-stretch flex items-center justify-center py-num-0 px-3 text-left text-num-14 text-gray font-inter">
                          <div className="flex-1 relative leading-[25px] font-medium">
                            At ATLAS, we're building more than just an app—we're
                            building a community for UPLB students. Have a
                            suggestion to make our portal better? Or maybe a
                            question about securing your own spot? Speak up!
                            Every message helps us make housing better for
                            everyone in the woods.
                          </div>
                        </div>
                      </div>

                      {/* right side*/}
                      {!isSubmitted ? (
                        <form
                          onSubmit={handleSubmit}
                          className="w-full lg:max-w-[510px] rounded-num-12 border-whitesmoke-200 border-solid border overflow-hidden flex flex-col items-start pt-3 px-num-16 pb-num-16 gap-4 text-num-14 text-dimgray font-inter"
                        >
                          <div className="self-stretch flex flex-col items-start gap-4">
                            <div className="self-stretch flex flex-col sm:flex-row items-start gap-4">
                              <div className={containerStyle}>
                                <input
                                  name="firstName"
                                  placeholder="First Name"
                                  value={formData.firstName}
                                  onChange={handleChange}
                                  className={inputStyle}
                                  required
                                />
                              </div>
                              <div className={containerStyle}>
                                <input
                                  name="lastName"
                                  placeholder="Last Name"
                                  value={formData.lastName}
                                  onChange={handleChange}
                                  className={inputStyle}
                                  required
                                />
                              </div>
                            </div>
                            <div className="self-stretch flex">
                              <div className={containerStyle}>
                                <input
                                  type="email"
                                  name="email"
                                  placeholder="Email Address"
                                  value={formData.email}
                                  onChange={handleChange}
                                  className={inputStyle}
                                  required
                                />
                              </div>
                            </div>
                            <div className="self-stretch flex">
                              <div className={`${containerStyle} h-[94px]`}>
                                <textarea
                                  name="message"
                                  placeholder="Message (max. 500 characters)"
                                  value={formData.message}
                                  onChange={handleChange}
                                  maxLength={500}
                                  className={`${inputStyle} h-full resize-none`}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="self-center min-w-[154px] rounded-[45px] bg-darkslategray-200 hover:bg-teal-100 transition-colors flex items-center justify-center py-2.5 px-num-32 gap-2.5 text-white border-none cursor-pointer"
                          >
                            <b className="relative">Give us a hoot</b>
                            <Icon
                              icon="material-symbols-light:owl-rounded"
                              className="w-5 h-5"
                            />
                          </button>
                        </form>
                      ) : (
                        /* WHNE YOUS END NA */
                        <div className="flex-1 w-full relative rounded-xl border-whitesmoke border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-start pt-3 px-4 pb-4 gap-4 text-center text-2xl text-teal font-inter">
                          <div className="self-stretch h-[254px] flex flex-col items-center justify-center">
                            <div className="w-full flex-1 flex flex-col items-center justify-center max-w-full">
                              <Icon
                                icon="material-symbols-light:owl-rounded"
                                className="w-[136px] h-[52px] text-darkslategray"
                              />
                              <b className="relative leading-8">
                                Hoot received!
                              </b>
                              <div className="relative text-sm font-medium text-gray">
                                We’re flying to your inbox with a response soon.
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch overflow-hidden flex items-center justify-center py-0 px-2.5 gap-3 text-sm">
                            <button
                              type="button"
                              className="rounded-[45px] border-whitesmoke border-solid border-[1px] flex items-center justify-center py-2 px-8 gap-2.5 shrink-0 cursor-pointer hover:bg-aliceblue transition-colors"
                              onClick={handleResetForm}
                            >
                              <b className="relative">Submit Another Message</b>
                              <Icon
                                icon="material-symbols:add"
                                className="h-6 w-6"
                              />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="w-full mb-12">
                      <Banner />
                    </div>
                  </div>
                </div>
                <footer>
                  <Footer />
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
