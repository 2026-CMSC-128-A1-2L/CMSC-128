import { type FunctionComponent, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import Lightbox from "yet-another-react-lightbox";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "yet-another-react-lightbox/styles.css";
import "leaflet/dist/leaflet.css";

import RoomTypeItem from "./RoomTypeItem";
import Payments from "./Payment";
import {
  DEFAULT_BUILDING_COORDINATES,
  type BuildingCoordinates,
  useBuildingStore,
} from "./useBuildingStore";
import AddManager1 from "../LandlordManagerAddForms/LandlordManagerAdd1";
import AddManager2 from "../LandlordManagerAddForms/LandlordManagerAdd2";
import type { AddManagerFormValues } from "../LandlordManagerAddForms/LandlordManagerAdd1";
import RecenterMap from "../../utilities/RecenterMap";
import FallbackImage from "../../general/FallbackImage";
import { getPrimaryMediaUrl } from "../../../utils/media";

// ─── Props ────────────────────────────────────────────────────────────────────

interface BuildingInformationProps {
  onNextClick: () => void;
  onPrevClick: () => void;
}

interface BuildingFormValues {
  name: string;
  typeOfBuilding: string;
  location: string;
  about: string;
}

const GreenIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [30, 46],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const LocationClickHandler: FunctionComponent<{
  onSelect: (coordinates: BuildingCoordinates) => void;
}> = ({ onSelect }) => {
  useMapEvents({
    click(event) {
      onSelect({
        lat: event.latlng.lat,
        long: event.latlng.lng,
      });
    },
  });

  return null;
};

const LocationPickerMap: FunctionComponent<{
  coordinates: BuildingCoordinates;
  locationName: string;
  onChange: (coordinates: BuildingCoordinates) => void;
}> = ({ coordinates, locationName, onChange }) => {
  const position: [number, number] = [coordinates.lat, coordinates.long];

  return (
    <div className="self-stretch h-[340px] rounded-2xl overflow-hidden border border-whitesmoke bg-aliceblue shadow-sm dark:border-[#343737] dark:bg-[#1f2022]">
      <MapContainer
        center={position}
        zoom={16}
        minZoom={13}
        maxZoom={18}
        zoomAnimation={false}
        markerZoomAnimation={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationClickHandler onSelect={onChange} />
        <Marker
          draggable
          icon={GreenIcon}
          position={position}
          eventHandlers={{
            dragend(event) {
              const marker = event.target as L.Marker;
              const nextPosition = marker.getLatLng();
              onChange({ lat: nextPosition.lat, long: nextPosition.lng });
            },
          }}
        >
          <Popup>
            <div className="font-inter">
              <p className="m-0 font-bold text-teal-700">
                {locationName.trim() || "Selected location"}
              </p>
              <p className="mt-1 text-xs text-slate-500">Building Location</p>
            </div>
          </Popup>
        </Marker>
        <RecenterMap lat={coordinates.lat} lng={coordinates.long} />
      </MapContainer>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const BuildingInformation: FunctionComponent<BuildingInformationProps> = ({
  onNextClick,
  onPrevClick,
}) => {
  const {
    buildingInfo,
    setBuildingInfo,
    addRoomType,
    addManager,
    removeManager,
  } = useBuildingStore();

  const [activePopup, setActivePopup] = useState<"none" | "add1" | "add2">(
    "none",
  );
  const [lastInvitedEmail, setLastInvitedEmail] = useState("");
  const [images, setImages] = useState<string[]>(buildingInfo.images || []);
  const [imageFiles, setImageFiles] = useState<File[]>(buildingInfo.imageFiles || []);
  const [coordinates, setCoordinates] = useState<BuildingCoordinates>(
    buildingInfo.locationCoordinates || DEFAULT_BUILDING_COORDINATES,
  );
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<BuildingFormValues>({
    defaultValues: {
      name: buildingInfo.name,
      typeOfBuilding: buildingInfo.typeOfBuilding,
      location: buildingInfo.location,
      about: buildingInfo.about,
    },
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      name: buildingInfo.name,
      typeOfBuilding: buildingInfo.typeOfBuilding,
      location: buildingInfo.location,
      about: buildingInfo.about,
    });
    setImages(buildingInfo.images || []);
    setImageFiles(buildingInfo.imageFiles || []);
    setCoordinates(buildingInfo.locationCoordinates || DEFAULT_BUILDING_COORDINATES);
  }, [buildingInfo.id, reset]);

  useEffect(() => {
    const subscription = watch((values) => {
      setBuildingInfo({
        name: values.name ?? "",
        typeOfBuilding: values.typeOfBuilding ?? "",
        location: values.location ?? "",
        locationCoordinates: coordinates,
        about: values.about ?? "",
        images,
        imageFiles,
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, setBuildingInfo, images, imageFiles, coordinates]);

  // ─── Image handlers ───────────────────────────────────────────────────────

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newUrls = files.map((f) =>
        URL.createObjectURL(f),
      );
      const updated = [...images, ...newUrls];
      const updatedFiles = [...imageFiles, ...files];
      setImages(updated);
      setImageFiles(updatedFiles);
      setBuildingInfo({ images: updated, imageFiles: updatedFiles });
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (i: number) => {
    const updated = images.filter((_, idx) => idx !== i);
    const updatedFiles = imageFiles.filter((_, idx) => idx !== i);
    setImages(updated);
    setImageFiles(updatedFiles);
    setBuildingInfo({ images: updated, imageFiles: updatedFiles });
  };

  const handleCoordinateChange = (nextCoordinates: BuildingCoordinates) => {
    setCoordinates(nextCoordinates);
    setBuildingInfo({ locationCoordinates: nextCoordinates });
  };

  // ─── Manager handlers ─────────────────────────────────────────────────────

  const handleManagerSend = (data: AddManagerFormValues) => {
    addManager({ email: data.email.trim(), checkboxes: data.checkboxes });
    setLastInvitedEmail(data.email.trim());
    setActivePopup("add2");
  };

  // ─── Submit — logs all data including payment ─────────────────────────────

  const onSubmit = (data: BuildingFormValues) => {
    const fullData = {
      ...data,
      images,
      imageFiles,
      locationCoordinates: coordinates,
      roomTypes: buildingInfo.roomTypes,
      managers: buildingInfo.managers,
      payment: buildingInfo.payment,
      allowPasalo: buildingInfo.allowPasalo,
      allowOcularVisit: buildingInfo.allowOcularVisit,
    };
    console.log("=== Building Information Form Data ===");
    console.log(JSON.stringify(fullData, null, 2));
    onNextClick();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-full flex flex-col items-start justify-center gap-2.5 text-center text-num-18 text-teal-200 font-inter"
      >
        <div className="w-[880px] flex flex-col items-start">
          <div className="w-[880px] rounded-2xl bg-white border-whitesmoke border-solid border-[1px] box-border flex flex-col items-start py-8 px-12 gap-3 dark:bg-[#101111] dark:border-[#343737]">
            {/* ── Building Information ── */}
            <div className="self-stretch flex flex-col items-start gap-6">
              <div className="self-stretch flex items-center">
                <b className="relative tracking-num--0_01">
                  Building Information
                </b>
              </div>
              <div className="self-stretch flex flex-col items-start gap-5 text-left text-num-14 text-dimgray dark:text-[#a4acba]">
                <div className="self-stretch flex items-start gap-10">
                  <div className="flex-1 flex flex-col items-start gap-3">
                    <b className="relative">Name</b>
                    <div className="self-stretch flex flex-col gap-1">
                      <div className="self-stretch rounded-num-12 bg-aliceblue border-whitesmoke border-solid border-[1px] flex items-center py-3 px-num-16 dark:bg-[#1f2022] dark:border-[#3a3d3c]">
                        <input
                          {...register("name", {
                            required: "Building name is required",
                          })}
                          placeholder="Aa"
                          className="flex-1 bg-transparent text-sm text-[#2f3136] placeholder-slategray outline-none font-medium leading-num-24 dark:text-[#d7e0ef] dark:placeholder-[#8c95a3]"
                        />
                      </div>
                      {errors.name && (
                        <span className="text-xs text-red-500">
                          {errors.name.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-start gap-3">
                    <b className="self-stretch h-[15.2px] relative flex items-center shrink-0">
                      Type of Building
                    </b>
                    <div className="self-stretch flex flex-col gap-1">
                      <div className="self-stretch h-12 rounded-num-12 bg-aliceblue border-whitesmoke border-solid border-[1px] box-border flex items-center px-4 dark:bg-[#1f2022] dark:border-[#3a3d3c]">
                        <select
                          {...register("typeOfBuilding", {
                            required: "Please select a building type",
                          })}
                          className="flex-1 bg-transparent text-sm text-[#2f3136] outline-none font-medium appearance-none cursor-pointer dark:text-[#d7e0ef]"
                        >
                          <option value="">Select type</option>
                          <option value="off-campus">Off-campus housing</option>
                          <option value="on-campus">On-campus housing</option>
                          <option value="partner housing">Partner housing</option>
                        </select>
                        <Icon
                          icon="mynaui:chevron-down"
                          className="w-5 h-5 shrink-0 pointer-events-none dark:text-[#a4acba]"
                        />
                      </div>
                      {errors.typeOfBuilding && (
                        <span className="text-xs text-red-500">
                          {errors.typeOfBuilding.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start gap-3">
                  <b className="relative">Location</b>
                  <div className="self-stretch flex flex-col gap-3">
                    <div className="self-stretch rounded-num-12 bg-aliceblue border-whitesmoke border-solid border-[1px] flex items-center py-3 px-num-16 dark:bg-[#1f2022] dark:border-[#3a3d3c]">
                      <input
                        {...register("location", {
                          required: "Location is required",
                        })}
                        placeholder="e.g. UPLB Grove, Lopez Avenue"
                        className="flex-1 bg-transparent text-sm text-[#2f3136] placeholder-slategray outline-none font-medium leading-num-24 dark:text-[#d7e0ef] dark:placeholder-[#8c95a3]"
                      />
                    </div>
                    {errors.location && (
                      <span className="text-xs text-red-500">
                        {errors.location.message}
                      </span>
                    )}
                    <LocationPickerMap
                      coordinates={coordinates}
                      locationName={watch("location") ?? ""}
                      onChange={handleCoordinateChange}
                    />
                    <div className="self-stretch flex items-center justify-between rounded-xl bg-[#f7fbfa] border border-whitesmoke px-4 py-2 text-xs font-medium text-[#34655d] dark:bg-[#12342e] dark:border-[#24463f] dark:text-[#72cbb8]">
                      <span>Pin coordinates</span>
                      <span>
                        Lat {coordinates.lat.toFixed(6)} · Long {coordinates.long.toFixed(6)}
                      </span>
                    </div>
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
                {...register("about", {
                  required: "Please provide a description",
                })}
                placeholder="Aa"
                rows={5}
                className="self-stretch rounded-num-12 bg-aliceblue border-whitesmoke border-solid border-[1px] py-3 px-num-16 text-left text-num-14 text-slategray outline-none font-medium resize-none leading-num-24 dark:bg-[#1f2022] dark:border-[#3a3d3c] dark:text-[#d7e0ef] dark:placeholder-[#8c95a3]"
              />
              {errors.about && (
                <span className="text-xs text-red-500">
                  {errors.about.message}
                </span>
              )}
            </div>
            {/* ── Add Photos ── */}
            <div className="self-stretch overflow-hidden flex flex-col items-start p-num-10 gap-2.5">
              <div className="self-stretch flex items-center">
                <b className="relative tracking-num--0_01">Add Photos</b>
              </div>
              <div className="self-stretch overflow-hidden flex items-start flex-wrap content-start py-num-10 px-0 gap-2">
                {images.map((src, index) => (
                  <div
                    key={index}
                    className="relative group h-[100px] w-[100px] rounded-num-12 border-whitesmoke border-solid border-[1px] overflow-hidden bg-gray-50 shrink-0 dark:bg-[#1f2022] dark:border-[#343737]"
                  >
                    <FallbackImage
                      media={src}
                      alt={`Building preview ${index + 1}`}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setLightboxIndex(index)}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(index);
                      }}
                      className="absolute top-1 right-1 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <Icon icon="material-symbols:close" className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="h-[100px] w-[100px] rounded-num-12 border-whitesmoke border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center justify-center p-num-10 cursor-pointer hover:bg-gray-50 transition-colors text-slategray dark:border-[#343737] dark:text-[#72cbb8] dark:hover:bg-[#1f2022]"
                >
                  <Icon
                    icon="material-symbols:add-photo-alternate-outline"
                    className="w-8 h-8"
                  />
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
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
                  className="w-full h-[100px] rounded-xl border border-whitesmoke overflow-hidden flex items-center justify-center hover:bg-gray-50 transition-colors dark:border-[#343737] dark:hover:bg-[#1f2022] cursor-pointer"
                >
                  <Icon
                    icon="material-symbols:add-rounded"
                    className="w-8 h-8 text-[#096C5B] dark:text-[#72cbb8]"
                  />
                </button>
              </div>
            </div>
            {/* ── Cashless Payments ── */}
            <div className="self-stretch overflow-hidden flex flex-col items-start p-num-10 gap-2.5">
              <div className="self-stretch flex items-center">
                <b className="relative tracking-num--0_01">Payment Methods</b>
              </div>
              <div className="self-stretch">
                <Payments />
              </div>
            </div>
            {/* ── Building Policies ── */}
            <div className="self-stretch overflow-hidden flex flex-col items-start p-num-10 gap-3">
              <div className="self-stretch flex items-center">
                <b className="relative tracking-num--0_01 text-teal-900 dark:text-[#72cbb8]">
                  Building Policies
                </b>
              </div>
              <div className="self-stretch flex flex-col gap-2.5">
                {/* Allow Pasalo */}
                <div
                  onClick={() =>
                    setBuildingInfo({
                      ...buildingInfo,
                      allowPasalo: !buildingInfo.allowPasalo,
                    })
                  }
                  className={`self-stretch rounded-2xl flex items-center py-4 px-5 gap-4 cursor-pointer transition-all select-none border-[1.5px] ${
                    buildingInfo.allowPasalo
                      ? "border-teal-600 bg-[#f4faf9] dark:border-[#72cbb8] dark:bg-[#12342e]"
                      : "border-transparent bg-white hover:border-gray-200 hover:bg-gray-50/50 dark:bg-[#141515] dark:hover:border-[#343737] dark:hover:bg-[#1f2022]"
                  }`}
                >
                  {/* Icon box */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      buildingInfo.allowPasalo
                        ? "bg-[#34655d]"
                        : "bg-[#f0f2f5] dark:bg-[#1f2022]"
                    }`}
                  >
                    <Icon
                      icon="material-symbols:swap-horiz-rounded"
                      className={`w-5 h-5 transition-colors ${buildingInfo.allowPasalo ? "text-white" : "text-slategray dark:text-[#a4acba]"}`}
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col flex-1 gap-0.5 text-left">
                    <b
                      className={`text-sm transition-colors ${buildingInfo.allowPasalo ? "text-[#1a3a34] dark:text-[#d7e0ef]" : "text-slategray dark:text-[#a4acba]"}`}
                    >
                      Allow Pasalo
                    </b>
                    <span
                      className={`text-xs font-medium transition-colors ${buildingInfo.allowPasalo ? "text-[#34655d] dark:text-[#72cbb8]" : "text-slategray dark:text-[#a4acba]"}`}
                    >
                      Tenants may transfer their lease to another person
                    </span>
                  </div>

                  {/* Badge */}
                  <span
                    className={`text-xs font-semibold rounded-full px-3 py-1 shrink-0 transition-colors ${
                      buildingInfo.allowPasalo
                        ? "bg-[#4a8a7f] text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    {buildingInfo.allowPasalo ? "Enabled" : "Off"}
                  </span>

                  {/* Toggle */}
                  <div
                    className={`h-[26px] w-[48px] relative rounded-full shrink-0 transition-colors ${
                      buildingInfo.allowPasalo ? "bg-[#42a391]" : "bg-gray-800"
                    }`}
                  >
                    <div
                      className={`absolute top-[3px] h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
                        buildingInfo.allowPasalo ? "left-[25px]" : "left-[3px]"
                      }`}
                    />
                  </div>
                </div>

                {/* Allow Ocular Visit */}
                <div
                  onClick={() =>
                    setBuildingInfo({
                      ...buildingInfo,
                      allowOcularVisit: !buildingInfo.allowOcularVisit,
                    })
                  }
                  className={`self-stretch rounded-2xl flex items-center py-4 px-5 gap-4 cursor-pointer transition-all select-none border-[1.5px] ${
                    buildingInfo.allowOcularVisit
                      ? "border-teal-600 bg-[#f4faf9] dark:border-[#72cbb8] dark:bg-[#12342e]"
                      : "border-transparent bg-white hover:border-gray-200 hover:bg-gray-50/50 dark:bg-[#141515] dark:hover:border-[#343737] dark:hover:bg-[#1f2022]"
                  }`}
                >
                  {/* Icon box */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      buildingInfo.allowOcularVisit
                        ? "bg-[#34655d]"
                        : "bg-[#f0f2f5] dark:bg-[#1f2022]"
                    }`}
                  >
                    <Icon
                      icon="material-symbols:visibility-outline-rounded"
                      className={`w-5 h-5 transition-colors ${buildingInfo.allowOcularVisit ? "text-white" : "text-slategray dark:text-[#a4acba]"}`}
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col flex-1 gap-0.5 text-left">
                    <b
                      className={`text-sm transition-colors ${buildingInfo.allowOcularVisit ? "text-[#1a3a34] dark:text-[#d7e0ef]" : "text-slategray dark:text-[#a4acba]"}`}
                    >
                      Allow Ocular Visit
                    </b>
                    <span
                      className={`text-xs font-medium transition-colors ${buildingInfo.allowOcularVisit ? "text-[#34655d] dark:text-[#72cbb8]" : "text-slategray dark:text-[#a4acba]"}`}
                    >
                      Prospective tenants may request an in-person visit to the
                      property
                    </span>
                  </div>

                  {/* Badge */}
                  <span
                    className={`text-xs font-semibold rounded-full px-3 py-1 shrink-0 transition-colors ${
                      buildingInfo.allowOcularVisit
                        ? "bg-[#4a8a7f] text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    {buildingInfo.allowOcularVisit ? "Enabled" : "Off"}
                  </span>

                  {/* Toggle */}
                  <div
                    className={`h-[26px] w-[48px] relative rounded-full shrink-0 transition-colors ${
                      buildingInfo.allowOcularVisit
                        ? "bg-[#42a391]"
                        : "bg-gray-800"
                    }`}
                  >
                    <div
                      className={`absolute top-[3px] h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
                        buildingInfo.allowOcularVisit
                          ? "left-[25px]"
                          : "left-[3px]"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* ── Add Managers ── */}
            <div className="self-stretch overflow-hidden flex flex-col items-start p-num-10 gap-2.5">
              <div className="self-stretch flex items-center">
                <b className="relative tracking-num--0_01">Add Managers</b>
              </div>
              {buildingInfo.managers.length > 0 && (
                <div className="self-stretch flex items-start flex-wrap gap-2 mb-1">
                  {buildingInfo.managers.map((manager) => (
                    <div
                      key={manager.email}
                      className="flex items-center gap-1.5 rounded-full bg-aliceblue border border-whitesmoke py-1 px-3 text-num-14 text-slategray dark:bg-[#1f2022] dark:border-[#343737] dark:text-[#d7e0ef]"
                    >
                      <span className="font-medium text-xs">
                        {manager.email}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeManager(manager.email)}
                        className="text-slategray hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Icon
                          icon="material-symbols:close"
                          className="w-3.5 h-3.5"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div
                className="rounded-num-12 bg-aliceblue border-whitesmoke border-solid border-[1px] flex items-center py-2 px-num-16 gap-2.5 text-left text-num-14 text-slategray cursor-pointer hover:bg-blue-100 transition-colors dark:bg-[#1f2022] dark:border-[#343737] dark:text-[#72cbb8] dark:hover:bg-[#12342e]"
                onClick={() => setActivePopup("add1")}
              >
                <div className="relative leading-num-24 font-medium">
                  Invite Managers
                </div>
                <Icon icon="material-symbols:add-rounded" className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Back / Next ── */}
        <div className="w-[903px] overflow-hidden flex items-center justify-center py-0 px-num-10 box-border gap-2.5 text-num-14 text-dimgray dark:text-[#a4acba]">
          <div
            className="rounded-[45px] flex items-center justify-center py-2 px-8 cursor-pointer"
            onClick={onPrevClick}
          >
            <b className="relative">Back</b>
          </div>
          <button
            type="submit"
            className="rounded-[45px] flex items-center justify-center py-2 px-8 gap-2.5 text-white cursor-pointer"
            style={{ background: "#1a5c50" }}
          >
            <b className="relative">Next</b>
            <Icon
              icon="material-symbols-light:arrow-forward-rounded"
              className="w-6 h-6"
            />
          </button>
        </div>

        <Lightbox
          open={lightboxIndex >= 0}
          index={lightboxIndex}
          close={() => setLightboxIndex(-1)}
          slides={images.map((src) => ({ src: getPrimaryMediaUrl(src) }))}
        />
      </form>

      {activePopup === "add1" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            className="relative shadow-2xl rounded-tl-[26px]"
            onClick={(e) => e.stopPropagation()}
          >
            <AddManager1
              onCancel={() => setActivePopup("none")}
              onSend={handleManagerSend}
            />
          </div>
        </div>
      )}
      {activePopup === "add2" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            className="relative shadow-2xl rounded-tl-[26px]"
            onClick={(e) => e.stopPropagation()}
          >
            <AddManager2
              onClose={() => setActivePopup("none")}
              email={lastInvitedEmail}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BuildingInformation;
