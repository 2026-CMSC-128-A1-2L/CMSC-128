import { FunctionComponent, useState, useRef, useCallback } from 'react';
import PaymentMethods1 from '../../../components/user/PaymentMethods';
import FinancePopup from '../../../components/user/FinancePopup';
import PaymentMethods from '../../../components/user/SubmitReceipt';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import SideBar from '../../../components/user/SideBar';

const FinanceforDev: FunctionComponent = () => {
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const [isSubmitReceiptOpen, setSubmitReceiptOpen] = useState(false);
  const [isPaymentMethodsOpen, setPaymentMethodsOpen] = useState(false);
  const navigate = useNavigate();

  const openSubmitReceipt = useCallback(() => {
    setSubmitReceiptOpen(true);
  }, []);

  const closeSubmitReceipt = useCallback(() => {
    setSubmitReceiptOpen(false);
  }, []);

  const openPaymentMethods = useCallback(() => {
    setPaymentMethodsOpen(true);
  }, []);

  const closePaymentMethods = useCallback(() => {
    setPaymentMethodsOpen(false);
  }, []);

  const onMessagesContainerClick = useCallback(() => {
    // Add your code here
  }, []);

  const onFinanceContainerClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <>
      <div className="w-full h-[1024px] relative overflow-y-auto flex items-start isolate gap-8 text-left text-[31.85px] text-darkslategray-200">
        <SideBar></SideBar>
        <div className="w-full flex flex-col items-start pr-20">
          <div className="w-full flex-1 overflow-hidden flex flex-col items-start justify-between gap-0 text-num-14 text-darkslategray-100 font-lora">
            <div className="self-stretch h-[924px] flex flex-col items-start pt-16 pb-num-0 pl-num-32 pr-20 box-border">
              <div className="self-stretch h-[1012px] flex flex-col items-start gap-3 shrink-0">
                <div className="w-[1128px] h-16 overflow-hidden shrink-0 hidden items-center p-num-10 box-border gap-2.5">
                  <div className="h-6 w-[89px] hidden items-center gap-1.5">
                    <div className="relative font-medium hidden shrink-0">View Tenants</div>
                    <img className="h-6 w-6 relative hidden shrink-0" alt="" />
                    <div className="relative font-medium hidden shrink-0">All</div>
                  </div>
                  <div className="w-[704px] rounded-num-12 bg-aliceblue overflow-hidden shrink-0 flex items-center py-num-10 px-6 box-border gap-2.5 text-dimgray font-inter">
                    <img className="h-6 w-6 relative" alt="" />
                    <b className="relative">
                      Search for Dorms, Apartments, or Locations (e.g. UPLB, Umali Subdivision)
                    </b>
                  </div>
                </div>
                <div className="self-stretch h-[948px] flex flex-col items-center text-num-24 text-black font-inter">
                  <div className="self-stretch flex flex-col items-start justify-center gap-3">
                    <div className="self-stretch flex items-center justify-between gap-5">
                      <div className="h-8 w-[258px] flex flex-col items-center justify-end">
                        <div className="w-[246px] flex items-center gap-10">
                          <b className="relative leading-num-32 shrink-0">Finance</b>
                          <div className="h-12 w-[300px] rounded-num-16 bg-aliceblue overflow-hidden shrink-0 hidden items-center py-2 px-3 box-border" />
                        </div>
                      </div>
                      <div className="h-12 w-20 overflow-hidden shrink-0 flex items-end justify-end">
                        <div className="h-12 w-12 rounded-num-100 bg-whitesmoke-100 overflow-hidden shrink-0 hidden items-center justify-end py-2 px-3 box-border" />
                      </div>
                    </div>
                    <div className="self-stretch h-0.5 rounded-num-100 bg-whitesmoke-200 overflow-hidden shrink-0 flex flex-col items-start pt-1 px-num-0 pb-num-0 box-border" />
                  </div>
                  <div className="self-stretch flex-1 flex flex-col items-start gap-8 text-num-14 font-lora">
                    <div className="self-stretch h-[120px] flex flex-col items-start justify-center py-num-0 px-3 box-border gap-1">
                      <div className="self-stretch flex items-start justify-between gap-5 text-num-24 font-inter">
                        <b className="relative leading-num-32">One Sapphire Place</b>
                        <div
                          className="w-[200px] rounded-num-12 bg-lightcyan-100 overflow-hidden shrink-0 flex items-center justify-center p-num-10 box-border gap-2.5 cursor-pointer text-center text-num-14 text-teal"
                          ref={buttonContainerRef}
                          onClick={openSubmitReceipt}
                        >
                          <div className="overflow-hidden flex flex-col items-start">
                            <Icon icon="tabler:currency-peso" className="h-5 w-5 relative" />
                          </div>
                          <div className="relative font-semibold">Payment Methods</div>
                        </div>
                      </div>
                      <div className="self-stretch flex items-center py-num-0 px-[11px] gap-2">
                        <Icon icon="mdi-light:map-marker" className="h-5 w-5 relative" />
                        <b className="flex-1 relative">
                          Lot 3, Block 17, Sapphire St, Umali Subd, Los Baños, Philippines, 4030
                        </b>
                      </div>
                      <div className="self-stretch flex items-center py-num-0 px-[11px] gap-2">
                        <Icon icon="mdi-light:map-marker" className="h-5 w-5 relative" />
                        <b className="flex-1 relative">0969 014 8776</b>
                      </div>
                    </div>
                    <div className="self-stretch flex items-start gap-3 text-teal font-inter">
                      <div className="self-stretch w-[300px] rounded-num-16 overflow-hidden shrink-0 flex flex-col items-start py-num-0 px-num-10 box-border gap-2.5">
                        <div className="self-stretch rounded-num-16 bg-lightcyan-200 overflow-hidden flex flex-col items-start p-3 gap-2.5">
                          <b className="relative">Total Due</b>
                          <div className="flex items-start gap-2.5 text-num-24">
                            <b className="relative leading-num-32">Php</b>
                            <b className="relative leading-num-32">4950.00</b>
                          </div>
                        </div>
                        <div className="self-stretch flex-1 flex flex-col items-start gap-1 text-num-18 text-black">
                          <div className="self-stretch overflow-hidden flex flex-col items-start py-num-10 px-2">
                            <b className="self-stretch relative tracking-num--0_01">
                              Cost Breakdown
                            </b>
                          </div>
                          <div className="self-stretch flex-1 rounded-num-16 border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex flex-col items-start p-num-10 gap-2.5 text-center text-num-14">
                            <div className="self-stretch flex items-start justify-center gap-2.5">
                              <b className="flex-1 relative">Description</b>
                              <b className="flex-1 relative">Amount</b>
                            </div>
                            <div className="self-stretch flex-1 flex flex-col items-start gap-2.5 text-num-12 font-lora">
                              <div className="self-stretch flex items-start justify-center py-2 px-num-0 gap-2.5">
                                <div className="flex-1 relative tracking-num-0_02 font-semibold">
                                  Monthly Rent
                                </div>
                                <div className="flex-1 relative tracking-num-0_02 font-semibold text-left">
                                  Php
                                </div>
                              </div>
                              <div className="self-stretch flex items-start justify-center py-2 px-num-0 gap-2.5">
                                <div className="flex-1 relative tracking-num-0_02 font-semibold">
                                  Electricity
                                </div>
                                <div className="flex-1 relative tracking-num-0_02 font-semibold text-left">
                                  Php
                                </div>
                              </div>
                              <div className="self-stretch flex items-start justify-center py-2 px-num-0 gap-2.5">
                                <div className="flex-1 relative tracking-num-0_02 font-semibold">
                                  Water
                                </div>
                                <div className="flex-1 relative tracking-num-0_02 font-semibold text-left">
                                  Php
                                </div>
                              </div>
                              <div className="self-stretch flex items-start justify-center py-2 px-num-0 gap-2.5">
                                <div className="flex-1 relative tracking-num-0_02 font-semibold">
                                  Internet
                                </div>
                                <div className="flex-1 relative tracking-num-0_02 font-semibold text-left">
                                  Php
                                </div>
                              </div>
                              <div className="self-stretch flex items-start justify-center py-2 px-num-0 gap-2.5">
                                <div className="flex-1 relative tracking-num-0_02 font-semibold">
                                  Others
                                </div>
                                <div className="flex-1 relative tracking-num-0_02 font-semibold text-left">
                                  Php
                                </div>
                              </div>
                            </div>
                            <div className="self-stretch flex items-start justify-center gap-2.5 text-teal">
                              <b className="flex-1 relative">Total</b>
                              <b className="flex-1 relative">Php</b>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 rounded-num-16 overflow-hidden flex flex-col items-center py-num-0 px-num-10 gap-2.5">
                        <div className="self-stretch flex items-center gap-2">
                          <div className="flex-1 rounded-num-16 bg-white border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex flex-col items-start p-3 gap-2.5">
                            <b className="relative">Outstanding Balance</b>
                            <div className="flex items-start gap-2.5 text-num-24">
                              <b className="relative leading-num-32">Php</b>
                              <b className="relative leading-num-32">0.00</b>
                            </div>
                          </div>
                          <div className="flex-1 rounded-num-16 bg-white border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex flex-col items-start p-3 gap-2.5">
                            <b className="relative">Payment Status</b>
                            <div className="flex items-start text-num-24">
                              <div className="relative leading-num-32 font-extrabold text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c29722,_#f6b709)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                                PENDING
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch flex flex-col items-center gap-8 text-center text-num-8 text-black font-lora">
                          <div className="self-stretch h-[280px] rounded-num-16 bg-white border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-center justify-center py-6 px-4 relative isolate gap-2.5">
                            <div className="w-[572px] !!m-[0 important] absolute top-[70px] left-[16px] flex flex-col items-start gap-2.5 z-[0]">
                              <div className="self-stretch h-40 rounded-[10px] bg-white flex flex-col items-center pt-[26px] pb-[11px] pl-3 pr-[13px] box-border gap-1.5">
                                <div className="w-[547px] h-[108px] relative">
                                  <div className="absolute h-[66.67%] w-[6.31%] top-[33.33%] right-[93.69%] bottom-[0%] left-[0%] rounded-num-5 bg-teal" />
                                  <div className="absolute h-[80.56%] w-[6.31%] top-[19.44%] right-[85.18%] bottom-[0%] left-[8.52%] rounded-num-5 bg-teal" />
                                  <div className="absolute h-[74.07%] w-[6.31%] top-[25.93%] right-[76.66%] bottom-[0%] left-[17.03%] rounded-num-5 bg-teal" />
                                  <div className="absolute h-[89.81%] w-[6.31%] top-[10.19%] right-[68.14%] bottom-[0%] left-[25.55%] rounded-num-5 bg-teal" />
                                  <div className="absolute h-[82.41%] w-[6.31%] top-[17.59%] right-[59.62%] bottom-[0%] left-[34.07%] rounded-num-5 bg-teal" />
                                  <div className="absolute h-[71.3%] w-[6.31%] top-[28.7%] right-[51.11%] bottom-[0%] left-[42.59%] rounded-num-5 bg-teal" />
                                  <div className="absolute h-[89.81%] w-[6.31%] top-[10.19%] right-[42.59%] bottom-[0%] left-[51.1%] rounded-num-5 bg-teal" />
                                  <div className="absolute h-[80.56%] w-[6.31%] top-[19.44%] right-[34.07%] bottom-[0%] left-[59.62%] rounded-num-5 bg-teal" />
                                  <div className="absolute h-[93.52%] w-[6.31%] top-[6.48%] right-[25.55%] bottom-[0%] left-[68.14%] rounded-num-5 bg-teal" />
                                  <div className="absolute h-[82.41%] w-[6.31%] top-[17.59%] right-[17.04%] bottom-[0%] left-[76.66%] rounded-num-5 bg-teal" />
                                  <div className="absolute h-full w-[6.31%] top-[0%] right-[8.5%] bottom-[0%] left-[85.19%] rounded-num-5 bg-teal" />
                                  <div className="absolute h-[91.67%] w-[6.31%] top-[8.33%] right-[0%] bottom-[0%] left-[93.69%] rounded-num-5 bg-darkslategray-200" />
                                </div>
                                <div className="w-[547px] h-[9px] relative">
                                  <div className="absolute h-full w-[6.89%] top-[0%] left-[0%] tracking-num-0_04 font-semibold flex items-center justify-center">
                                    APR
                                  </div>
                                  <div className="absolute h-full w-[6.89%] top-[0%] left-[8.46%] tracking-num-0_04 font-semibold flex items-center justify-center">
                                    MAY
                                  </div>
                                  <div className="absolute h-full w-[6.89%] top-[0%] left-[16.93%] tracking-num-0_04 font-semibold flex items-center justify-center">
                                    JUN
                                  </div>
                                  <div className="absolute h-full w-[6.89%] top-[0%] left-[25.39%] tracking-num-0_04 font-semibold flex items-center justify-center">
                                    JUL
                                  </div>
                                  <div className="absolute h-full w-[6.89%] top-[0%] left-[33.86%] tracking-num-0_04 font-semibold flex items-center justify-center">
                                    AUG
                                  </div>
                                  <div className="absolute h-full w-[6.89%] top-[0%] left-[42.32%] tracking-num-0_04 font-semibold flex items-center justify-center">
                                    SEP
                                  </div>
                                  <div className="absolute h-full w-[6.89%] top-[0%] left-[50.78%] tracking-num-0_04 font-semibold flex items-center justify-center">
                                    OCT
                                  </div>
                                  <div className="absolute h-full w-[6.89%] top-[0%] left-[59.25%] tracking-num-0_04 font-semibold flex items-center justify-center">
                                    NOV
                                  </div>
                                  <div className="absolute h-full w-[6.89%] top-[0%] left-[67.71%] tracking-num-0_04 font-semibold flex items-center justify-center">
                                    DEC
                                  </div>
                                  <div className="absolute h-full w-[6.89%] top-[0%] left-[76.18%] tracking-num-0_04 font-semibold flex items-center justify-center">
                                    JAN
                                  </div>
                                  <div className="absolute h-full w-[6.89%] top-[0%] left-[84.64%] tracking-num-0_04 font-semibold flex items-center justify-center">
                                    FEB
                                  </div>
                                  <div className="absolute h-full w-[6.89%] top-[0%] left-[93.1%] tracking-num-0_04 font-semibold flex items-center justify-center">
                                    MAR
                                  </div>
                                </div>
                              </div>
                              <div className="self-stretch flex items-start justify-between gap-0 text-left text-num-12 text-silver">
                                <div className="w-[122px] flex items-end gap-1">
                                  <div className="h-[15px] w-[15.4px] relative rounded-num-5 bg-teal" />
                                  <div className="h-4 w-[81.9px] relative tracking-num-0_02 font-semibold flex items-center shrink-0">
                                    Past Months
                                  </div>
                                </div>
                                <div className="flex-1 flex items-end gap-1">
                                  <div className="h-[15px] w-[15.4px] relative rounded-num-5 bg-darkslategray-200" />
                                  <div className="h-4 w-[98.3px] relative tracking-num-0_02 font-semibold flex items-center shrink-0">
                                    Current Month
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="w-[572px] !!m-[0 important] absolute top-[24px] left-[16px] flex items-center justify-center gap-3 z-[1] text-left text-num-18 font-inter">
                              <b className="h-6 flex-1 relative tracking-num--0_01 flex items-center">
                                Monthly Expenses
                              </b>
                              <div className="rounded-num-8 bg-whitesmoke-200 flex flex-col items-start text-center text-[10px] text-white">
                                <div className="self-stretch rounded-num-8 bg-darkslategray-200 flex items-center p-2 gap-1">
                                  <div className="self-stretch w-[62px] relative tracking-num-0_04 font-semibold flex items-center justify-center shrink-0">
                                    12 Months
                                  </div>
                                  <Icon icon="tabler:chevron-down-filled" className="w-5 h-5" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch overflow-hidden flex flex-col items-start p-num-10 gap-2.5 text-left text-num-14 font-inter">
                            <b className="self-stretch relative text-num-18 tracking-num--0_01">
                              Upcoming Payments
                            </b>
                            <div className="self-stretch h-0.5 border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex items-start pt-num-10 px-num-10 pb-num-0" />
                            <div className="self-stretch rounded-num-8 border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex items-center justify-between py-2 px-num-10 gap-5">
                              <div className="self-stretch flex items-center gap-2.5">
                                <div className="h-5 w-5 rounded-num-4 [background:linear-gradient(180deg,_#c29722,_#f6b709)] overflow-hidden shrink-0 flex flex-col items-start justify-center p-num-10 box-border" />
                                <div className="self-stretch overflow-hidden flex flex-col items-start py-1 pl-num-0 pr-num-10 gap-1">
                                  <div className="relative font-semibold shrink-0">
                                    April 15, 2026
                                  </div>
                                  <div className="relative text-num-12 tracking-num-0_02 font-semibold font-lora text-dimgray shrink-0">
                                    Php 4500.00
                                  </div>
                                </div>
                              </div>
                              <div
                                className="w-20 rounded-num-12 bg-lightcyan-100 overflow-hidden shrink-0 flex items-center justify-center p-num-10 box-border cursor-pointer text-center text-teal"
                                onClick={openPaymentMethods}
                              >
                                <div className="relative font-semibold">Pay Now</div>
                              </div>
                            </div>
                            <div className="self-stretch rounded-num-8 border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex items-center justify-between py-2 px-num-10 gap-5">
                              <div className="self-stretch flex items-center gap-2.5">
                                <div className="h-5 w-5 rounded-num-4 [background:linear-gradient(180deg,_#c29722,_#f6b709)] overflow-hidden shrink-0 flex flex-col items-start justify-center p-num-10 box-border" />
                                <div className="self-stretch overflow-hidden flex flex-col items-start py-1 pl-num-0 pr-num-10 gap-1">
                                  <div className="relative font-semibold shrink-0">
                                    May 15, 2026
                                  </div>
                                  <div className="relative text-num-12 tracking-num-0_02 font-semibold font-lora text-dimgray shrink-0">
                                    Php 4500.00
                                  </div>
                                </div>
                              </div>
                              <div
                                className="w-20 rounded-num-12 bg-lightcyan-100 overflow-hidden shrink-0 flex items-center justify-center p-num-10 box-border cursor-pointer text-center text-teal"
                                onClick={openPaymentMethods}
                              >
                                <div className="relative font-semibold">Pay Now</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch w-num-180 rounded-num-16 border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-start py-num-10 px-num-0 gap-2 text-center text-num-24">
                        <div className="self-stretch rounded-num-16 bg-white overflow-hidden flex flex-col items-start p-3">
                          <div className="self-stretch relative leading-num-32 font-extrabold">
                            Overview
                          </div>
                        </div>
                        <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start py-1 px-num-0 gap-2.5 text-num-14 text-darkslategray-100">
                          <b className="self-stretch relative">Billing History</b>
                          <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start py-num-0 px-3 gap-2 text-left text-num-12">
                            <div className="self-stretch rounded-num-8 border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex items-center py-1 px-3">
                              <div className="self-stretch overflow-hidden flex flex-col items-start py-1 pl-num-0 pr-num-10 gap-1">
                                <div className="relative font-semibold">January 15, 2026</div>
                                <div className="relative text-[10px] tracking-num-0_04 font-semibold font-lora text-dimgray">
                                  Php 4500.00
                                </div>
                              </div>
                            </div>
                            <div className="self-stretch rounded-num-8 border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex items-center py-1 px-3">
                              <div className="self-stretch overflow-hidden flex flex-col items-start py-1 pl-num-0 pr-num-10 gap-1">
                                <div className="relative font-semibold">February 15, 2026</div>
                                <div className="relative text-[10px] tracking-num-0_04 font-semibold font-lora text-dimgray">
                                  Php 4500.00
                                </div>
                              </div>
                            </div>
                            <div className="self-stretch rounded-num-8 border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex items-center py-1 px-3">
                              <div className="self-stretch overflow-hidden flex flex-col items-start py-1 pl-num-0 pr-num-10 gap-1">
                                <div className="relative font-semibold">March 15, 2026</div>
                                <div className="relative text-[10px] tracking-num-0_04 font-semibold font-lora text-dimgray">
                                  Php 4500.00
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
            <div className="self-stretch h-20 bg-white overflow-hidden shrink-0 flex flex-col items-center justify-center text-center text-dimgray font-inter">
              <div className="w-[1273px] bg-whitesmoke-100 overflow-hidden flex items-center py-[19px] pl-[200px] pr-20 box-border shrink-0">
                <div className="flex-1 flex items-center gap-20">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <img className="w-12 relative max-h-full object-cover" alt="" />
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Icon icon="tabler:copyright" className="h-5 w-5 relative" />
                          <b className="relative">2026</b>
                        </div>
                        <div className="flex items-center justify-center">
                          <b className="relative">ATLAS Team</b>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <b className="relative">{`All Rights Reserved `}</b>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center gap-2.5">
                      <b className="relative">Browse Dorms</b>
                      <b className="relative">List your property</b>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2.5">
                    <b className="relative">About</b>
                    <b className="relative">Contact Us</b>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2.5">
                    <b className="relative">Privacy Policy</b>
                    <b className="relative">Terms of Use</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isSubmitReceiptOpen && (
        <FinancePopup
          overlayColor="rgba(0, 0, 0, 0.5)"
          placement="Bottom left"
          left={-280}
          bottom={-120}
          relativeLayerRef={buttonContainerRef}
          onOutsideClick={closeSubmitReceipt}
        >
          <PaymentMethods1 onClose={closeSubmitReceipt} />
        </FinancePopup>
      )}
      {isPaymentMethodsOpen && (
        <FinancePopup
          overlayColor="rgba(0, 0, 0, 0.5)"
          placement="Centered"
          onOutsideClick={closePaymentMethods}
        >
          <PaymentMethods onClose={closePaymentMethods} />
        </FinancePopup>
      )}
    </>
  );
};

export default FinanceforDev;
