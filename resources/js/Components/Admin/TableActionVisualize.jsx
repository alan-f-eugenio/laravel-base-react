import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Modal from "./Modal";

export default function TableActionVisualize({ children, filename, title }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setIsOpen(true);
    };

    return (
        <>
            <Modal
                show={isOpen}
                onClose={() => setIsOpen(false)}
                classes="p-1 text-center relative flex justify-center"
            >
                <Dialog.Title className="absolute flex items-center justify-end w-5 h-5 bg-white rounded shadow bg-opacity-90 top-3 right-2">
                    <button
                        onClick={() => setIsOpen(false)}
                        type="button"
                        className="flex items-center justify-center w-5 h-5"
                    >
                        <i className="text-base align-middle icon-[tabler--x]"></i>
                    </button>
                </Dialog.Title>
                <img className="max-w-full max-h-96" src={filename} />
            </Modal>
            <Link
                className="px-3 py-2 text-xs text-gray-900 bg-white hover:bg-gray-100 hover:text-blue-700"
                title={title}
                as="button"
                onClick={(e) => handleClick(e)}
            >
                {children}
            </Link>
        </>
    );
}
