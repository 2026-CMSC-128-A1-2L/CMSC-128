import { FunctionComponent, useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Icon } from '@iconify/react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import { useBuildingStore } from './useBuildingStore';
import type { RoomTypeData } from './useBuildingStore';
import AddRoom from './AddRoom';

interface RoomTypeFormValues {
  roomType: string;
  capacity: string;
  about: string;
}

interface RoomTypeItemProps {
  roomType: RoomTypeData;
}

const RoomTypeItem: FunctionComponent<RoomTypeItemProps> = ({ roomType }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { updateRoomType, removeRoomType } = useBuildingStore();

  // Local state for images & lightbox
  const [images, setImages] = useState<string[]>(roomType.images || []);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<RoomTypeFormValues>({
    defaultValues: {
      roomType: roomType.roomType,
      capacity: roomType.capacity,
      about: roomType.about,
    },
    mode: 'onChange',
  });

  const watchedRoomType = watch('roomType');

  useEffect(() => {
    const subscription = watch((values) => {
      updateRoomType(roomType.id, {
        roomType: values.roomType ?? '',
        capacity: values.capacity ?? '',
        about: values.about ?? '',
        images: images, // Keep images synced
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, roomType.id, updateRoomType, images]);

  const headerLabel = watchedRoomType || roomType.name || 'Room Type';

  // ─── Image Upload Handlers ─────────────────────────────────────────────

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      // Create temporary local URLs for the images
      const newImageUrls = newFiles.map((file) => URL.createObjectURL(file));

      const updatedImages = [...images, ...newImageUrls];
      setImages(updatedImages);

      // Update store immediately
      updateRoomType(roomType.id, { images: updatedImages });

      // Reset input so the same files can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updatedImages = images.filter((_, idx) => idx !== indexToRemove);
    setImages(updatedImages);
    updateRoomType(roomType.id, { images: updatedImages });
  };

  return (
    <div className="w-full rounded-xl border border-whitesmoke overflow-hidden flex flex-col">

      {/* Header */}
      <div className="flex items-center px-4 py-2">
        {!isExpanded && (
          <div className="flex-1 text-left">
            <b className="text-sm text-black">{headerLabel}</b>
          </div>
        )}
        {isExpanded && <div className="flex-1" />}
        <button
          type="button"
          onClick={() => setIsExpanded((v) => !v)}
          className="text-sm font-medium leading-6 px-4 py-1"
          style={{ color: isExpanded ? '#dc2626' : '#096C5B' }}
        >
          {isExpanded ? 'Hide' : 'Show'}
        </button>
      </div>

      {/* Expanded form */}
      {isExpanded && (
        <div className="flex flex-col px-4 pb-8 gap-6 text-sm text-black font-inter">

          {/* Room Type + Capacity */}
          <div className="self-stretch flex items-start gap-10">
            <div className="flex-1 flex flex-col items-start gap-3">
              <b className="text-black">Room Type</b>
              <div className="self-stretch flex flex-col gap-1">
                <div className="self-stretch h-12 rounded-xl bg-aliceblue border border-whitesmoke flex items-center px-4">
                  <input
                    {...register('roomType', { required: 'Room type is required' })}
                    placeholder="e.g. Single, Double..."
                    className="flex-1 bg-transparent text-sm text-black placeholder-slategray outline-none font-medium"
                  />
                </div>
                {errors.roomType && (
                  <span className="text-xs text-red-500">{errors.roomType.message}</span>
                )}
              </div>
            </div>

            <div className="flex-1 flex flex-col items-start gap-3">
              <b className="text-black">Capacity</b>
              <div className="self-stretch flex flex-col gap-1">
                <div className="self-stretch h-12 rounded-xl bg-aliceblue border border-whitesmoke flex items-center px-4">
                  <input
                    {...register('capacity', {
                      required: 'Capacity is required',
                      pattern: { value: /^[0-9]+$/, message: 'Must be a number' },
                    })}
                    placeholder="e.g. 2"
                    className="flex-1 bg-transparent text-sm text-black placeholder-slategray outline-none font-medium"
                  />
                </div>
                {errors.capacity && (
                  <span className="text-xs text-red-500">{errors.capacity.message}</span>
                )}
              </div>
            </div>
          </div>

          {/* About */}
          <div className="self-stretch flex flex-col items-start gap-2.5">
            <div className="flex items-center gap-4">
              <b className="text-black">About</b>
              <span className="font-medium text-dimgray">Not required</span>
            </div>
            <textarea
              {...register('about')}
              placeholder="Describe this room type..."
              rows={4}
              className="self-stretch rounded-xl bg-aliceblue border border-whitesmoke py-3 px-4 text-sm text-black placeholder-slategray outline-none font-medium resize-none"
            />
          </div>

          {/* Add Photos */}
          <div className="self-stretch flex flex-col items-start gap-1">
            <b className="text-black">Add Photos</b>
            <div className="flex items-start flex-wrap gap-2 py-2">

              {/* Render Uploaded Images */}
              {images.map((src, index) => (
                <div
                  key={index}
                  className="relative group h-[100px] w-[100px] rounded-xl border border-whitesmoke overflow-hidden bg-gray-50"
                >
                  <img
                    src={src}
                    alt={`Room type preview ${index + 1}`}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setLightboxIndex(index)}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(index);
                    }}
                    className="absolute top-1 right-1 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 hover:bg-white"
                  >
                    <Icon icon="material-symbols:close" className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Upload Button */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="h-[100px] w-[100px] rounded-xl border border-whitesmoke overflow-hidden flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors text-slategray"
              >
                <Icon icon="material-symbols:add-photo-alternate-outline" className="w-8 h-8" />
              </div>

              {/* Hidden File Input */}
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

          {/* Add Rooms */}
          <div className="self-stretch flex flex-col items-start gap-4">
            <b className="text-black">Add Rooms</b>
            <AddRoom roomType={roomType} />
          </div>

          {/* Remove room type */}
          <button
            type="button"
            onClick={() => removeRoomType(roomType.id)}
            className="self-end text-xs font-semibold text-red-400 hover:text-red-600 transition-colors"
          >
            Remove this room type
          </button>

        </div>
      )}

      {/* Lightbox Viewer */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={images.map((src) => ({ src }))}
      />

    </div>
  );
};

export default RoomTypeItem;
