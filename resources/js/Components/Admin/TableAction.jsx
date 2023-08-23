import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Modal from "./Modal";

export default function TableAction({
    children,
    href,
    hasPhoto = false,
    title,
    isDestroy,
    props,
}) {
    const [isOpen, setIsOpen] = useState(false);

    const { delete: destroy } = useForm({});
    const handleDestroy = (e) => {
        e.preventDefault();
        destroy(href);
        setIsOpen(false);
    };
    const handleClick = (e) => {
        e.preventDefault();
        setIsOpen(true);
    };

    if (!isDestroy) {
        return (
            <Link
                className={`${
                    !hasPhoto && "px-3 py-2"
                } text-xs text-gray-900 bg-white hover:bg-gray-100 hover:text-blue-700`}
                href={href}
                title={title}
                {...props}
            >
                {children}
            </Link>
        );
    }
    return (
        <>
            <Modal show={isOpen} onClose={() => setIsOpen(false)} maxWidth="md" classes="p-6 text-center">
                <Dialog.Title>
                    <i className="icon-[tabler--info-circle] text-gray-400 text-6xl" />
                </Dialog.Title>
                <Dialog.Description className="mb-5 text-lg font-normal text-gray-500">
                    Deseja confirmar esta ação?
                </Dialog.Description>
                <button
                    onClick={(e) => handleDestroy(e)}
                    type="button"
                    className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                    Confirmar
                </button>
                <button
                    onClick={() => setIsOpen(false)}
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                >
                    Cancelar
                </button>
            </Modal>
            <Link
                className="px-3 py-2 text-xs text-gray-900 bg-white hover:bg-gray-100 hover:text-blue-700"
                title={title}
                onClick={(e) => handleClick(e)}
            >
                {children}
            </Link>
        </>
    );
}
