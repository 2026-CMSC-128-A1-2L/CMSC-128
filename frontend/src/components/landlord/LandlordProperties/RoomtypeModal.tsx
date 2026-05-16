import React, { useEffect, useRef, useState } from "react";
import type { Room, RoomType, Tenant } from "../../../data/buildings";

interface RoomtypeModalProps {
    openModal: boolean;
    closeModal: () => void;
    name: string;
    rooms: Room[];
    tenants: Tenant[];
    listing: RoomType;
}

function RoomtypeModal({ openModal, closeModal, name, rooms, tenants, listing }: RoomtypeModalProps) {
    const ref = useRef<HTMLDialogElement>(null);
    const [expandedRooms, setExpandedRooms] = useState<string[]>([]);

    useEffect(() => {
        if (openModal) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [openModal]);

    const toggleRoom = (roomId: string) => {
        setExpandedRooms((prev) =>
            prev.includes(roomId)
                ? prev.filter((id) => id !== roomId)
                : [...prev, roomId]
        );
    };

    const filteredRooms = rooms.filter((room) => room.roomType.includes(listing.name));

    const getStatus = (room: Room) => {
        const status = room.status ?? listing.status ?? "closed";
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    const isOpen = (room: Room) => {
        const status = room.status ?? listing.status ?? "closed";
        return status === "open";
    };

    return (
        <dialog
            className="top-[50%] left-[50%] -translate-[50%] w-[560px] rounded-2xl p-0 shadow-xl bg-white"
            ref={ref}
            onCancel={closeModal}
        >
            <div className="flex flex-col w-full py-8">

                {/* Header */}
                <div className="flex flex-col items-center text-center px-10 pb-6 gap-1">
                    {/* text-gray-200 = #1e1e1e (dark, visible) */}
                    <p className="font-bold text-xl text-gray-200">{name}</p>
                    {/* teal-200 = #096c5b */}
                    <p className="font-semibold text-sm text-teal-200">
                        {listing.name}
                    </p>
                </div>

                {/* border-whitesmoke-300 = #f0f0f0 */}
                <hr className="border-t-3 border-whitesmoke-300 mx-6" />

                {/* Table Header — text-gray-100 = #757575 (muted but visible) */}
                <div className="grid grid-cols-[1fr_2fr_1.2fr_auto] items-center px-8 pt-5 pb-2 text-sm font-medium text-gray-100">
                    <span>Room Number</span>
                    <span className="text-center">Current Occupants</span>
                    <span className="text-center">Status</span>
                    <span className="w-6" />
                </div>


                {/* Room Rows */}
                <div className="flex flex-col mx-6">
                    {filteredRooms.map((room) => {
                        const roomTenants = tenants.filter(
                            (t) => t.roomNumber === room.roomNumber
                        );
                        const isExpanded = expandedRooms.includes(room.id);

                        return (
                            <div key={room.id}>
                                {/* Room Row */}
                                <div className="grid grid-cols-[1fr_2fr_1.2fr_auto] items-center px-2 py-4">
                                    {/* text-gray-200 = #1e1e1e */}
                                    <span className="font-bold text-gray-200">{room.roomNumber}</span>
                                    <span className="text-center font-bold text-gray-200">
                                        {roomTenants.length}
                                    </span>
                                    {/* crimson = #ef4444, teal-200 = #096c5b */}
                                    <span
                                        className={`text-center font-bold text-sm ${
                                            isOpen(room) ? "text-teal-200" : "text-crimson"
                                        }`}
                                    >
                                        {getStatus(room)}
                                    </span>
                                    {/* text-gray-100 = #757575 */}
                                    <button
                                        onClick={() => toggleRoom(room.id)}
                                        className="w-6 text-gray-100 text-xs cursor-pointer hover:text-gray-200 transition-colors"
                                    >
                                        {isExpanded ? "︿" : "﹀"}
                                    </button>
                                </div>

                                {/* Expanded Tenant List */}
                                {isExpanded && (
                                    <div className="px-2 pb-4 flex flex-col gap-1">
                                        {/* text-gray-100 = #757575 */}
                                        <p className="text-sm text-gray-100 font-medium mb-1">Tenants</p>
                                        {roomTenants.length === 0 ? (
                                            <p className="text-sm text-gray-100 italic">No tenants</p>
                                        ) : (
                                            roomTenants.map((tenant) => (
                                                <div
                                                    key={tenant.name}
                                                    className="grid items-center grid-cols-3"
                                                >
                                                    <p className="font-bold text-sm text-gray-200">
                                                        {tenant.name}
                                                    </p>
                                                    {/* Swap false for your actual pending logic e.g. tenant.status === 'pending' */}
                                                    {tenant.pending && (
                                                        <span className="text-xs text-yellow-500 flex items-center gap-1">
                                                            ⚠ Pending Application
                                                        </span>
                                                    )}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}

                            </div>
                        );
                    })}
                </div>

                {/* Close Button */}
                <div className="flex justify-end px-8 pt-6">
                    <button
                        onClick={closeModal}
                        className="cursor-pointer bg-crimson hover:opacity-90 transition-opacity text-white text-sm font-medium px-5 py-2 rounded-lg"
                    >
                        Close
                    </button>
                </div>

            </div>
        </dialog>
    );
}

export default RoomtypeModal;
