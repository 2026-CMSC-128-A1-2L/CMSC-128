// Modal as a separate component
import { useEffect, useRef } from "react";

function RoomtypeModal({ openModal, closeModal, children }) {
    const ref = useRef(null);
    useEffect(() => {
        if (openModal) {
        ref.current?.showModal();
        } else {
        ref.current?.close();
        }
    }, [openModal]);

    return (
        <dialog
        // hacky asf tailwindcss for centering a modal
        className="
        top-[50%] left-[50%] -translate-[50%]
        px-30 py-20 rounded-xl 
        
        "
        ref={ref}
        onCancel={closeModal}
        >
        {children}
        <button onClick={closeModal} className="cursor-pointer bg-red-500 text-white">
            Close
        </button>
        </dialog>
    );
}

export default RoomtypeModal;