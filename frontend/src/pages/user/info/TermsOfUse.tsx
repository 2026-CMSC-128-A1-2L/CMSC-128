import { type FunctionComponent, useCallback } from 'react';
import SideBar from '../../../components/user/SideBar';
import { Link } from 'react-router-dom';
import BreadcrumbHeader from '../../../components/general/Breadcrumb';

const TermsOfUse: FunctionComponent = () => {
  const onTopicContainerClick = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='theATLASTerms']");
    if (anchor) {
      anchor.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, []);

  const onTopicContainerClick1 = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='aDefinitionsText']");
    if (anchor) {
      anchor.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, []);

  const onTopicContainerClick2 = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='frameContainer9']");
    if (anchor) {
      anchor.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, []);

  const onTopicContainerClick3 = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='frameContainer8']");
    if (anchor) {
      anchor.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, []);

  const onTopicContainerClick4 = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='frameContainer7']");
    if (anchor) {
      anchor.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, []);

  const onTopicContainerClick5 = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='frameContainer6']");
    if (anchor) {
      anchor.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, []);

  const onTopicContainerClick6 = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='frameContainer5']");
    if (anchor) {
      anchor.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, []);

  const onTopicContainerClick7 = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='frameContainer4']");
    if (anchor) {
      anchor.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, []);

  const onTopicContainerClick8 = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='frameContainer3']");
    if (anchor) {
      anchor.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, []);

  const onTopicContainerClick9 = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='frameContainer2']");
    if (anchor) {
      anchor.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, []);

  const onTopicContainerClick10 = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='frameContainer1']");
    if (anchor) {
      anchor.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, []);

  const onTopicContainerClick11 = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='frameContainer']");
    if (anchor) {
      anchor.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="w-full h-fit relative overflow-hidden flex items-start text-num-14 pr-20 gap-8 text-darkslategray font-inter">
      <div className="sticky h-screen top-0">
        <SideBar></SideBar>
      </div>

      <div className="w-full flex flex-col items-start z-1 shrink-0">
        <div className="self-stretch h-[1024px] flex flex-col items-start py-num-0 pl-num-0 pr-20 box-border">
          <div className="self-stretch flex-1 flex items-center gap-8">
            <div className="h-[1112px] hidden flex-col items-center shrink-0">
              <div className="w-[106px] h-[924px] bg-white border-whitesmoke-200 border-solid border box-border overflow-hidden shrink-0 flex flex-col items-center py-8 pl-8 pr-num-10" />
            </div>
            <div className="self-stretch flex-1 flex flex-col items-start pt-num-0 px-num-0 pb-[140px] shrink-0">
              <div className="self-stretch h-[1024px] flex flex-col items-start shrink-0">
                <div className="self-stretch flex-1 flex flex-col items-start gap-6">
                  <div className="w-full h-16 flex items-end text-num-10 box-border">
                    <BreadcrumbHeader
                      routes={[{ name: 'Home', url: '/' }, { name: 'Terms of Use' }]}
                    ></BreadcrumbHeader>
                  </div>
                  <div className="self-stretch flex-1 flex flex-col items-center gap-8 text-[24px] text-black font-inter">
                    <div className="self-stretch flex flex-col items-start justify-center gap-3">
                      <div className="self-stretch flex flex-col items-start justify-center">
                        <b className="relative leading-num-32">ATLAS Terms of Use</b>
                      </div>
                      <div className="self-stretch h-0.5 rounded-[100px] bg-whitesmoke-200 overflow-hidden shrink-0 flex flex-col items-start pt-num-4 px-num-0 pb-num-0 box-border" />
                    </div>
                    <div className="self-stretch h-[882px] flex items-start gap-12 text-teal">
                      <div className="h-[882px] flex-1 flex flex-col items-start p-num-10 box-border">
                        <div className="self-stretch h-[872px] overflow-y-auto shrink-0 flex flex-col items-start gap-12">
                          <div className="self-stretch flex flex-col items-start gap-2.5 shrink-0">
                            <div className="flex items-center justify-center">
                              <b className="relative leading-num-32">Acceptance of Terms</b>
                            </div>
                            <div className="self-stretch relative text-num-14 leading-num-24 text-black">
                              <span className="font-medium">
                                {`By accessing, browsing, or using ATLAS, whether through our website, mobile application, or any related services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.`}
                                <br />
                                {``}
                                <br />
                                {`These terms apply to `}
                              </span>
                              <b>all users</b>
                              <span className="font-medium">{` of the platform, including students, tenants, landlords, housing managers, and any other individuals or entities accessing ATLAS. `}</span>
                            </div>
                          </div>
                          <div className="w-num-740 hidden flex-col items-start gap-2.5 shrink-0">
                            <div className="flex flex-col items-start gap-1">
                              <b className="relative leading-num-32">Summary</b>
                              <div className="w-num-740 flex flex-col items-start">
                                <div className="self-stretch h-0.5 relative bg-whitesmoke-100" />
                              </div>
                            </div>
                            <div className="self-stretch relative text-num-14 leading-num-24 font-medium text-gray">
                              awaeawewa
                            </div>
                          </div>
                          <div className="self-stretch flex flex-col items-start gap-2.5 shrink-0">
                            <div className="flex flex-col items-start gap-1">
                              <b className="relative leading-num-32" data-scroll-to="theATLASTerms">
                                The ATLAS Terms of Use
                              </b>
                              <div className="w-num-740 flex flex-col items-start">
                                <div className="self-stretch h-0.5 relative bg-whitesmoke-100" />
                              </div>
                            </div>
                            <div className="self-stretch relative text-num-14 leading-num-24 font-medium text-black">
                              Effective Date: May 11, 2026
                            </div>
                          </div>
                          <div className="self-stretch flex flex-col items-start gap-2.5 shrink-0 text-num-18 text-black">
                            <div className="flex flex-col items-start gap-1 text-[24px] text-teal">
                              <b
                                className="relative leading-num-32"
                                data-scroll-to="aDefinitionsText"
                              >
                                A. Definitions
                              </b>
                              <div className="w-num-740 flex flex-col items-start">
                                <div className="self-stretch h-0.5 relative bg-whitesmoke-100" />
                              </div>
                            </div>
                            <div className="self-stretch relative text-num-14 leading-num-24 font-medium">
                              Key terms used throughout the agreement
                            </div>
                            <div className="flex items-start gap-2.5">
                              <div className="h-40 w-num-360 rounded-num-16 bg-white border-whitesmoke-200 border-solid border box-border flex flex-col items-center justify-center">
                                <div className="self-stretch flex items-center py-num-10 px-num-24">
                                  <b className="relative tracking-num--0_01">ATLAS</b>
                                </div>
                                <div className="self-stretch flex items-center py-num-10 px-num-24 mt-[-9px] relative text-num-14 font-lora">
                                  <div className="h-20 w-num-312 relative font-medium inline-block shrink-0">
                                    The ATLAS website and all related digital services operated by
                                    the ATLAS team.
                                  </div>
                                </div>
                              </div>
                              <div className="h-40 w-num-360 rounded-num-16 bg-white border-whitesmoke-200 border-solid border box-border flex flex-col items-center justify-center">
                                <div className="self-stretch flex items-center py-num-10 px-num-24">
                                  <b className="relative tracking-num--0_01">User</b>
                                </div>
                                <div className="self-stretch flex items-center py-num-10 px-num-24 mt-[-9px] relative text-num-14 font-lora">
                                  <div className="h-20 w-num-312 relative font-medium inline-block shrink-0">
                                    Any individual who creates an account or accesses the platform,
                                    including tenants, students, landlords, and housing managers.
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start gap-2.5">
                              <div className="h-40 w-num-360 rounded-num-16 bg-white border-whitesmoke-200 border-solid border box-border flex flex-col items-center justify-center">
                                <div className="self-stretch flex items-center py-num-10 px-num-24">
                                  <b className="relative tracking-num--0_01">{`Tenant / Student `}</b>
                                </div>
                                <div className="self-stretch flex items-center py-num-10 px-num-24 mt-[-9px] relative text-num-14 font-lora">
                                  <div className="h-20 w-num-312 relative font-medium inline-block shrink-0">
                                    A user who browses listings, applies for units, and manages
                                    their lease through the platform.
                                  </div>
                                </div>
                              </div>
                              <div className="h-40 w-num-360 rounded-num-16 bg-white border-whitesmoke-200 border-solid border box-border flex flex-col items-center justify-center">
                                <div className="self-stretch flex items-center py-num-10 px-num-24">
                                  <b className="relative tracking-num--0_01">Landlord / Manager</b>
                                </div>
                                <div className="self-stretch flex items-center py-num-10 px-num-24 mt-[-9px] relative text-num-14 font-lora">
                                  <div className="h-20 w-num-312 relative font-medium inline-block shrink-0">
                                    A user who lists dormitory units, manages tenancies, and
                                    processes billing through the platform.
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start gap-2.5">
                              <div className="h-40 w-num-360 rounded-num-16 bg-white border-whitesmoke-200 border-solid border box-border flex flex-col items-center justify-center">
                                <div className="self-stretch flex items-center py-num-10 px-num-24">
                                  <b className="relative tracking-num--0_01">Listing</b>
                                </div>
                                <div className="self-stretch flex items-center py-num-10 px-num-24 mt-[-9px] relative text-num-14 font-lora">
                                  <div className="h-20 w-num-312 relative font-medium inline-block shrink-0">
                                    A dormitory room or unit posted on the platform by a landlord or
                                    housing manager for tenant applications.
                                  </div>
                                </div>
                              </div>
                              <div className="h-40 w-num-360 rounded-num-16 bg-white border-whitesmoke-200 border-solid border box-border flex flex-col items-center justify-center">
                                <div className="self-stretch flex items-center py-num-10 px-num-24">
                                  <b className="relative tracking-num--0_01">ATLAS</b>
                                </div>
                                <div className="self-stretch flex items-center py-num-10 px-num-24 mt-[-9px] relative text-num-14 font-lora">
                                  <div className="h-20 w-num-312 relative font-medium inline-block shrink-0">
                                    The ATLAS website and all related digital services operated by
                                    the ATLAS team.
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start gap-2.5">
                              <div className="h-40 w-num-360 rounded-num-16 bg-white border-whitesmoke-200 border-solid border box-border flex flex-col items-center justify-center">
                                <div className="self-stretch flex items-center py-num-10 px-num-24">
                                  <b className="relative tracking-num--0_01">ATLAS</b>
                                </div>
                                <div className="self-stretch flex items-center py-num-10 px-num-24 mt-[-9px] relative text-num-14 font-lora">
                                  <div className="h-20 w-num-312 relative font-medium inline-block shrink-0">
                                    The ATLAS website and all related digital services operated by
                                    the ATLAS team.
                                  </div>
                                </div>
                              </div>
                              <div className="h-40 w-num-360 rounded-num-16 bg-white border-whitesmoke-200 border-solid border box-border flex flex-col items-center justify-center">
                                <div className="self-stretch flex items-center py-num-10 px-num-24">
                                  <b className="relative tracking-num--0_01">ATLAS</b>
                                </div>
                                <div className="self-stretch flex items-center py-num-10 px-num-24 mt-[-9px] relative text-num-14 font-lora">
                                  <div className="h-20 w-num-312 relative font-medium inline-block shrink-0">
                                    The ATLAS website and all related digital services operated by
                                    the ATLAS team.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch flex flex-col items-start gap-2.5 shrink-0 text-num-14 text-black">
                            <div
                              className="flex flex-col items-start gap-1 text-[24px] text-teal"
                              data-scroll-to="frameContainer9"
                            >
                              <b className="relative leading-num-32">B. Account Terms</b>
                              <div className="w-num-740 flex flex-col items-start">
                                <div className="self-stretch h-0.5 relative bg-whitesmoke-100" />
                              </div>
                            </div>
                            <div className="self-stretch relative leading-num-24 font-medium">
                              <p className="m-0">
                                To access most features of ATLAS, you must create an account using a
                                valid email address and a secure password. You are responsible for
                                maintaining the confidentiality of your credentials and for all
                                activities conducted under your account.
                              </p>
                              <p className="m-0">&nbsp;</p>
                              <ul className="m-0 font-inherit text-[length:inherit] pl-num-19">
                                <li className="mb-0">
                                  To be a tenant user, you must be a UPLB student.
                                </li>
                                <li className="mb-0">
                                  You agree to provide accurate, complete, and current information
                                  during registration and to update it as needed.
                                </li>
                                <li className="mb-0">
                                  You must not create multiple accounts for the same person, or
                                  create accounts on behalf of others without authorization.
                                </li>
                                <li className="mb-0">
                                  ATLAS reserves the right to verify your identity and school
                                  enrollment status as part of tenant verification.
                                </li>
                                <li>
                                  You must notify ATLAS immediately if you suspect unauthorized
                                  access to your account.
                                </li>
                              </ul>
                            </div>
                            <div className="w-num-740 h-20 rounded-num-16 [background:linear-gradient(0deg,#ffc273,#fa7900)_border-box] [border-left:4px_solid_transparent] box-border flex items-center justify-center">
                              <div className="h-20 w-num-740 rounded-num-16 border-whitesmoke-200 border-solid border-t border-r border-b box-border flex items-start justify-center">
                                <div className="h-20 w-num-700 flex items-center justify-center py-num-8 px-num-0 box-border">
                                  <div className="h-num-60 w-num-700 relative inline-block shrink-0">
                                    <span className="leading-num-24 font-medium">{`Account Sharing: `}</span>
                                    <span className="font-medium font-lora text-dimgray">
                                      Sharing your login credentials with others is strictly
                                      prohibited. ATLAS is not responsible for any loss or damage
                                      arising from unauthorized account access due to your failure
                                      to secure your credentials.
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch flex flex-col items-start gap-2.5 shrink-0 text-num-14 text-black">
                            <div
                              className="flex flex-col items-start gap-1 text-[24px] text-teal"
                              data-scroll-to="frameContainer8"
                            >
                              <b className="relative leading-num-32">C. Platform Use</b>
                              <div className="w-num-740 flex flex-col items-start">
                                <div className="self-stretch h-0.5 relative bg-whitesmoke-100" />
                              </div>
                            </div>
                            <div className="self-stretch relative leading-num-24 font-medium">
                              ATLAS grants you a limited, non-exclusive, non-transferable, and
                              revocable license to access and use the platform strictly for its
                              intended purpose: finding and managing dormitory accommodations in the
                              vicinity of the University of the Philippines Los Banos.
                              <br />
                              <br />
                              All content on the platform including the ATLAS name, logo, design,
                              text, graphics, and underlying software is the intellectual property
                              of ATLAS or its licensors and is protected by applicable Philippine
                              and international laws. You may not copy, modify, distribute, sell, or
                              lease any part of the platform or its content without prior written
                              permission.
                            </div>
                            <div className="w-num-740 h-20 rounded-num-16 [background:linear-gradient(89.89deg,#0c8873_23.56%,#40bc9c)_border-box] [border-left:4px_solid_transparent] box-border flex items-center justify-center">
                              <div className="h-20 w-num-740 rounded-num-16 border-whitesmoke-200 border-solid border-t border-r border-b box-border flex items-start justify-center">
                                <div className="h-20 w-num-700 flex items-center justify-center py-num-8 px-num-0 box-border">
                                  <div className="h-num-60 w-num-700 relative inline-block shrink-0">
                                    <span className="leading-num-24 font-medium">{`Permitted use includes: `}</span>
                                    <span className="font-medium font-lora text-dimgray">
                                      Browsing listings, submitting applications, managing your
                                      lease, downloading your own billing statements, and
                                      communicating with landlords through the platform's messaging
                                      system.
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch flex flex-col items-start gap-2.5 shrink-0">
                            <div
                              className="flex flex-col items-start gap-1"
                              data-scroll-to="frameContainer7"
                            >
                              <b className="relative leading-num-32">D. Tenant Obligations</b>
                              <div className="w-num-740 flex flex-col items-start">
                                <div className="self-stretch h-0.5 relative bg-whitesmoke-100" />
                              </div>
                            </div>
                            <div className="self-stretch relative text-num-14 leading-num-24 font-medium text-black">
                              <p className="m-0">
                                As a tenant using ATLAS, you agree to the following
                                responsibilities:
                              </p>
                              <p className="m-0">&nbsp;</p>
                              <ul className="m-0 font-inherit text-[length:inherit] pl-num-19">
                                <li className="mb-0">
                                  Submit only truthful information in applications, profiles, and
                                  lease transfer requests. Misrepresentation may result in account
                                  suspension.
                                </li>
                                <li className="mb-0">
                                  Fulfill all obligations under your lease agreement, including
                                  timely payment of rent and utilities as recorded in the billing
                                  system.
                                </li>
                                <li className="mb-0">
                                  Comply with the house rules established by your landlord and
                                  visible in your unit's listing.
                                </li>
                                <li className="mb-0">
                                  Report maintenance issues through the proper channels on the
                                  platform and cooperate with the landlord's resolution process.
                                </li>
                                <li className="mb-0">
                                  Seek landlord approval before initiating a Pasalo (lease transfer)
                                  and complete all required documents on the platform.
                                </li>
                                <li>
                                  Leave the unit in the condition agreed upon at move-out and settle
                                  all outstanding balances before departure.
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="self-stretch flex flex-col items-start gap-2.5 shrink-0 text-num-14 text-black">
                            <div
                              className="flex flex-col items-start gap-1 text-[24px] text-teal"
                              data-scroll-to="frameContainer6"
                            >
                              <b className="relative leading-num-32">
                                E. Landlord/Manager Obligations
                              </b>
                              <div className="w-num-740 flex flex-col items-start">
                                <div className="self-stretch h-0.5 relative bg-whitesmoke-100" />
                              </div>
                            </div>
                            <div className="self-stretch relative leading-num-24 font-medium">
                              <p className="m-0">
                                Landlords and housing managers using ATLAS agree to uphold standards
                                of honesty and fair practice in all interactions with tenants on the
                                platform.
                              </p>
                              <p className="m-0">&nbsp;</p>
                              <ul className="m-0 font-inherit text-[length:inherit] pl-num-19">
                                <li className="mb-0">
                                  Provide accurate, up-to-date, and complete information in all unit
                                  listings, including photos, amenities, and pricing.
                                </li>
                                <li className="mb-0">
                                  Process tenant applications and lease transfer requests promptly
                                  and within the timelines specified on the platform.
                                </li>
                                <li className="mb-0">
                                  Issue billing statements accurately and in a timely manner.
                                  Overcharging or fabricating utility costs is a violation of these
                                  terms.
                                </li>
                                <li className="mb-0">
                                  Maintain units in a habitable and safe condition consistent with
                                  the description in the listing.
                                </li>
                                <li>
                                  Respect tenant privacy and not use ATLAS's communication tools for
                                  purposes outside of legitimate property management.
                                </li>
                              </ul>
                            </div>
                            <div className="w-num-740 h-20 rounded-num-16 border-lightcyan border-solid border-l-4 box-border flex items-center justify-center">
                              <div className="h-20 w-num-740 rounded-num-16 border-whitesmoke-200 border-solid border-t border-r border-b box-border flex items-start justify-center">
                                <div className="h-20 w-num-700 flex items-center justify-center py-num-8 px-num-0 box-border">
                                  <div className="h-num-60 w-num-700 relative inline-block shrink-0">
                                    <span className="leading-num-24 font-medium">{`Zero Tolerance: `}</span>
                                    <span className="font-medium font-lora text-dimgray">
                                      Harassment, discrimination, or retaliatory actions against
                                      tenants using the platform will result in immediate account
                                      suspension and may be reported to relevant authorities.
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch flex flex-col items-start gap-2.5 shrink-0">
                            <div
                              className="flex flex-col items-start gap-1"
                              data-scroll-to="frameContainer5"
                            >
                              <b className="relative leading-num-32">F. Payments and Billings</b>
                              <div className="w-num-740 flex flex-col items-start">
                                <div className="self-stretch h-0.5 relative bg-whitesmoke-100" />
                              </div>
                            </div>
                            <div className="self-stretch relative text-num-14 leading-num-24 text-black">
                              <p className="m-0 font-medium">
                                ATLAS provides a billing management system that enables landlords to
                                issue statements and tenants to record and track payments. It is
                                important to understand the scope and limits of this system:
                              </p>
                              <p className="m-0 font-medium">&nbsp;</p>
                              <ul className="m-0 text-[length:inherit] pl-num-19">
                                <li className="mb-0">
                                  <span className="font-medium font-inter">{`ATLAS `}</span>
                                  <b className="font-inter">does not process payments directly</b>
                                  <span className="font-medium">
                                    . Rent and utility payments are made between tenants and
                                    landlords through their agreed payment methods (cash, bank
                                    transfer, GCash, etc.).
                                  </span>
                                </li>
                                <li className="mb-0">
                                  <span className="font-medium">
                                    Billing records on the platform are for reference and
                                    documentation purposes only. They do not constitute official
                                    receipts unless issued as such by the landlord.
                                  </span>
                                </li>
                                <li className="mb-0">
                                  <span className="font-medium">
                                    Disputes over payment amounts must be resolved directly between
                                    the tenant and landlord. ATLAS may provide records to assist
                                    resolution but is not an arbitrator.
                                  </span>
                                </li>
                                <li>
                                  <span className="font-medium">
                                    Downloadable PDF billing statements and monthly reports are
                                    generated by the system for record-keeping purposes and are not
                                    legally binding financial instruments.
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="self-stretch flex flex-col items-start gap-2.5 shrink-0 text-num-14">
                            <div
                              className="flex flex-col items-start gap-1 text-[24px]"
                              data-scroll-to="frameContainer4"
                            >
                              <b className="relative leading-num-32">G. Privacy and Data</b>
                              <div className="w-num-740 flex flex-col items-start">
                                <div className="self-stretch h-0.5 relative bg-whitesmoke-100" />
                              </div>
                            </div>
                            <div className="self-stretch relative leading-num-24 text-black">
                              <p className="m-0">
                                <span className="font-medium font-inter">
                                  ATLAS collects and processes personal data in accordance with
                                  Republic Act No. 10173, the 
                                </span>
                                <b className="font-inter">Data Privacy Act of 2012</b>
                                <span className="font-medium">
                                  , and its implementing rules and regulations. Your privacy is
                                  important to us.
                                </span>
                              </p>
                              <p className="m-0 font-medium">&nbsp;</p>
                              <ul className="m-0 text-[length:inherit] pl-num-19">
                                <li className="mb-0">
                                  <span className="font-medium">
                                    We collect only the data necessary to provide our services,
                                    including identity verification, profile information, and
                                    platform activity.
                                  </span>
                                </li>
                                <li className="mb-0">
                                  <span className="font-medium">
                                    Your personal data is never sold to third parties. It may be
                                    shared with your landlord only to the extent necessary for
                                    tenancy management.
                                  </span>
                                </li>
                                <li className="mb-0">
                                  <span className="font-medium">
                                    You have the right to access, correct, and request deletion of
                                    your personal data. Contact our Data Protection Officer to
                                    exercise these rights.
                                  </span>
                                </li>
                                <li>
                                  <span className="font-medium">
                                    Documents uploaded for verification (IDs, enrollment
                                    certificates, etc.) are stored securely and accessible only to
                                    authorized parties.
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <div className="w-num-740 h-20 rounded-num-16 [background:linear-gradient(89.89deg,#0c8873_23.56%,#40bc9c)_border-box] [border-left:4px_solid_transparent] box-border flex items-center justify-center text-dimgray font-lora">
                              <div className="h-20 w-num-740 rounded-num-16 border-whitesmoke-200 border-solid border-t border-r border-b box-border flex items-start justify-center">
                                <div className="h-20 w-num-700 flex items-center justify-center py-num-8 px-num-0 box-border">
                                  <div className="h-num-60 w-num-700 relative font-medium inline-block shrink-0">
                                    For full details on data collection and processing, please refer
                                    to our separate
                                    <a
                                      className="text-inherit"
                                      href={`https://www.claudeusercontent.com/?domain=claude.ai&parentOrigin=https%3A%2F%2Fclaude.ai&errorReportingMode=parent&formattedSpreadsheets=true#`}
                                      target="_blank"
                                      rel="noopener"
                                    >
                                      <span className="[text-decoration:underline]">
                                        Privacy Policy
                                      </span>
                                    </a>
                                    , which forms part of these terms by reference.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch flex flex-col items-start gap-2.5 shrink-0">
                            <div
                              className="flex flex-col items-start gap-1"
                              data-scroll-to="frameContainer3"
                            >
                              <b className="relative leading-num-32">H. Prohibited Conduct</b>
                              <div className="w-num-740 flex flex-col items-start">
                                <div className="self-stretch h-0.5 relative bg-whitesmoke-100" />
                              </div>
                            </div>
                            <div className="self-stretch relative text-num-14 leading-num-24 font-medium text-black">
                              <p className="m-0">
                                The following actions are strictly prohibited on the ATLAS platform.
                                Violations may result in content removal, account suspension, or
                                legal action:
                              </p>
                              <p className="m-0">&nbsp;</p>
                              <ul className="m-0 font-inherit text-[length:inherit] pl-num-19">
                                <li className="mb-0">
                                  Posting false, misleading, or fraudulent listings or tenant
                                  applications.
                                </li>
                                <li className="mb-0">
                                  Impersonating another person or entity, or misrepresenting your
                                  identity or affiliation.
                                </li>
                                <li className="mb-0">
                                  Uploading falsified documents for verification, application, or
                                  lease transfer purposes.
                                </li>
                                <li className="mb-0">
                                  Harassing, threatening, or abusing other users through the
                                  platform's communication features.
                                </li>
                                <li className="mb-0">
                                  Attempting to access, scrape, or reverse-engineer any part of the
                                  platform's systems or data.
                                </li>
                                <li>
                                  Using the platform for any illegal purpose, including money
                                  laundering, fraud, or any activity prohibited under Philippine
                                  law.
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="self-stretch flex flex-col items-start gap-2.5 shrink-0 text-num-14 text-black">
                            <div
                              className="flex flex-col items-start gap-1 text-[24px] text-teal"
                              data-scroll-to="frameContainer2"
                            >
                              <b className="relative leading-num-32">{`I. Disclaimers & Limitation of Liability`}</b>
                              <div className="w-num-740 flex flex-col items-start">
                                <div className="self-stretch h-0.5 relative bg-whitesmoke-100" />
                              </div>
                            </div>
                            <div className="w-num-740 h-20 rounded-num-16 [background:linear-gradient(89.89deg,#0c8873_23.56%,#40bc9c)_border-box] [border-left:4px_solid_transparent] box-border flex items-center justify-center">
                              <div className="h-20 w-num-740 rounded-num-16 border-whitesmoke-200 border-solid border-t border-r border-b box-border flex items-start justify-center">
                                <div className="h-20 w-num-700 flex items-center justify-center py-num-8 px-num-0 box-border">
                                  <div className="h-num-60 w-num-700 relative inline-block shrink-0">
                                    <span className="leading-num-24 font-medium">
                                      Platform Role:
                                    </span>
                                    <span className="font-medium font-lora text-dimgray">
                                      <span className="text-silver"> </span>
                                      <span>
                                        ATLAS is a facilitating platform, not a party to any tenancy
                                        agreement. We do not own, manage, or operate any of the
                                        listed properties.
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="self-stretch relative leading-num-24 font-medium">
                              ATLAS provides the platform on an "as is" and "as available" basis. We
                              make no warranties, express or implied, about the accuracy,
                              completeness, or reliability of listings, user-submitted content, or
                              information on the platform.
                              <br />
                              <br />
                              To the maximum extent permitted by Philippine law, ATLAS shall not be
                              liable for any indirect, incidental, special, consequential, or
                              punitive damages arising from: your use or inability to use the
                              platform; disputes between tenants and landlords; or the content or
                              actions of other users.
                            </div>
                          </div>
                          <div className="self-stretch flex flex-col items-start gap-2.5 shrink-0">
                            <div
                              className="flex flex-col items-start gap-1"
                              data-scroll-to="frameContainer1"
                            >
                              <b className="relative leading-num-32">J. Termination</b>
                              <div className="w-num-740 flex flex-col items-start">
                                <div className="self-stretch h-0.5 relative bg-whitesmoke-100" />
                              </div>
                            </div>
                            <div className="self-stretch relative text-num-14 leading-num-24 font-medium text-black">
                              <p className="m-0">
                                ATLAS reserves the right to suspend or terminate your account at any
                                time, with or without notice, for violations of these terms,
                                fraudulent activity, extended inactivity, or any other reason at our
                                discretion.
                              </p>
                              <p className="m-0">
                                You may also close your account at any time by contacting our
                                support team. Upon termination, your access to the platform will be
                                revoked. Certain data may be retained as required by law or for
                                legitimate business purposes, as described in our Privacy Policy.
                              </p>
                              <p className="m-0">&nbsp;</p>
                              <ul className="m-0 font-inherit text-[length:inherit] pl-num-19">
                                <li className="mb-0">
                                  Outstanding lease obligations or billing records will remain
                                  accessible for download for 30 days after account closure.
                                </li>
                                <li>
                                  ATLAS will provide notice of termination where reasonably
                                  practicable, except in cases of serious or urgent violations.
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="self-stretch flex flex-col items-start gap-2.5 shrink-0">
                            <div
                              className="flex flex-col items-start gap-1"
                              data-scroll-to="frameContainer"
                            >
                              <b className="relative leading-num-32">K. Governing Law</b>
                              <div className="w-num-740 flex flex-col items-start">
                                <div className="self-stretch h-0.5 relative bg-whitesmoke-100" />
                              </div>
                            </div>
                            <div className="self-stretch relative text-num-14 leading-num-24 text-black">
                              <span className="font-medium">
                                These Terms of Use shall be governed by and construed in accordance
                                with the laws of the 
                              </span>
                              <b>Republic of the Philippines</b>
                              <span className="font-medium">
                                , without regard to its conflict of law provisions.
                                <br />
                                <br />
                                Any dispute arising out of or relating to these terms or your use of
                                ATLAS shall first be attempted to be resolved through good-faith
                                negotiation. If unresolved, disputes shall be submitted to the
                                appropriate courts of the Philippines with proper jurisdiction.
                                <br />
                                <br />
                                ATLAS reserves the right to update or modify these terms at any
                                time. Continued use of the platform after any changes constitutes
                                your acceptance of the revised terms. We will notify users of
                                material changes via email or in-platform notification.
                              </span>
                            </div>
                          </div>
                          <div className="self-stretch flex flex-col items-start gap-2.5 shrink-0">
                            <div className="flex flex-col items-start gap-1">
                              <b className="relative leading-num-32">Contact Us</b>
                              <div className="w-num-740 flex flex-col items-start">
                                <div className="self-stretch h-0.5 relative bg-whitesmoke-100" />
                              </div>
                            </div>
                            <div className="self-stretch relative text-num-14 leading-num-24 font-medium text-black">
                              <span>{`If you have questions, concerns, or requests relating to these Terms of Use, you may contact us through `}</span>

                              <Link to="/contact-us">
                                <span className="[text-decoration:underline] text-dodgerblue">
                                  Contact Us
                                </span>
                              </Link>
                              <span>{` and `}</span>

                              <Link to="/support">
                                <span className="[text-decoration:underline] text-dodgerblue">
                                  Support
                                </span>
                              </Link>

                              <span> page</span>
                            </div>
                          </div>
                          <div className="self-stretch h-[133px] shrink-0 flex flex-col items-start" />
                        </div>
                      </div>
                      <div className="h-[510px] w-80 overflow-hidden shrink-0 flex flex-col items-start p-num-10 box-border gap-2.5 text-num-14 text-black">
                        <b className="relative">In this article</b>
                        <div className="flex flex-col items-start gap-2.5 text-dimgray">
                          <div
                            className="flex flex-col items-start cursor-pointer"
                            onClick={onTopicContainerClick}
                          >
                            <div className="self-stretch flex items-center justify-center py-num-4 px-num-10 gap-2.5">
                              <div className="self-stretch w-num-3 flex items-center" />
                              <b className="relative">The ATLAS Terms of Use</b>
                            </div>
                          </div>
                          <div className="flex flex-col items-start">
                            <div className="self-stretch flex items-center justify-center py-num-4 px-num-10 gap-2.5">
                              <div className="self-stretch w-num-3 flex items-center" />
                              <b className="relative">Definitions</b>
                            </div>
                          </div>
                          <div
                            className="flex flex-col items-start cursor-pointer"
                            onClick={onTopicContainerClick1}
                          >
                            <div className="self-stretch flex items-center justify-center py-num-4 px-num-10 gap-2.5">
                              <div className="self-stretch w-num-3 flex items-center" />
                              <b className="relative">A. Definitions</b>
                            </div>
                          </div>
                          <div
                            className="flex flex-col items-start cursor-pointer"
                            onClick={onTopicContainerClick2}
                          >
                            <div className="self-stretch flex items-center justify-center py-num-4 px-num-10 gap-2.5">
                              <div className="self-stretch w-num-3 flex items-center" />
                              <b className="relative">B. Account Terms</b>
                            </div>
                          </div>
                          <div
                            className="flex flex-col items-start cursor-pointer"
                            onClick={onTopicContainerClick3}
                          >
                            <div className="self-stretch flex items-center justify-center py-num-4 px-num-10 gap-2.5">
                              <div className="self-stretch w-num-3 flex items-center" />
                              <b className="relative">C. Platform Use</b>
                            </div>
                          </div>
                          <div
                            className="flex flex-col items-start cursor-pointer"
                            onClick={onTopicContainerClick4}
                          >
                            <div className="self-stretch flex items-center justify-center py-num-4 px-num-10 gap-2.5">
                              <div className="self-stretch w-num-3 flex items-center" />
                              <b className="relative">D. Tenant Obligations</b>
                            </div>
                          </div>
                          <div
                            className="flex flex-col items-start cursor-pointer"
                            onClick={onTopicContainerClick5}
                          >
                            <div className="self-stretch flex items-center justify-center py-num-4 px-num-10 gap-2.5">
                              <div className="self-stretch w-num-3 flex items-center" />
                              <b className="relative">E. Landlord/Manager Obligations</b>
                            </div>
                          </div>
                          <div
                            className="flex flex-col items-start cursor-pointer"
                            onClick={onTopicContainerClick6}
                          >
                            <div className="self-stretch flex items-center justify-center py-num-4 px-num-10 gap-2.5">
                              <div className="self-stretch w-num-3 flex items-center" />
                              <b className="relative">F. Payment and Billings</b>
                            </div>
                          </div>
                          <div
                            className="flex flex-col items-start cursor-pointer"
                            onClick={onTopicContainerClick7}
                          >
                            <div className="self-stretch flex items-center justify-center py-num-4 px-num-10 gap-2.5">
                              <div className="self-stretch w-num-3 flex items-center" />
                              <b className="relative">G. Privacy and Data</b>
                            </div>
                          </div>
                          <div
                            className="flex flex-col items-start cursor-pointer"
                            onClick={onTopicContainerClick8}
                          >
                            <div className="self-stretch flex items-center justify-center py-num-4 px-num-10 gap-2.5">
                              <div className="self-stretch w-num-3 flex items-center" />
                              <b className="relative">H. Prohibited Conduct</b>
                            </div>
                          </div>
                          <div
                            className="flex flex-col items-start cursor-pointer"
                            onClick={onTopicContainerClick9}
                          >
                            <div className="self-stretch flex items-center justify-center py-num-4 px-num-10 gap-2.5">
                              <div className="self-stretch w-num-3 flex items-center" />
                              <b className="relative">{`I. Disclaimers & Limitation of Liability`}</b>
                            </div>
                          </div>
                          <div
                            className="flex flex-col items-start cursor-pointer"
                            onClick={onTopicContainerClick10}
                          >
                            <div className="self-stretch flex items-center justify-center py-num-4 px-num-10 gap-2.5">
                              <div className="self-stretch w-num-3 flex items-center" />
                              <b className="relative">J. Termination</b>
                            </div>
                          </div>
                          <div
                            className="flex flex-col items-start cursor-pointer"
                            onClick={onTopicContainerClick11}
                          >
                            <div className="self-stretch flex items-center justify-center py-num-4 px-num-10 gap-2.5">
                              <div className="self-stretch w-num-3 flex items-center" />
                              <b className="relative">K. Governing Law</b>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
