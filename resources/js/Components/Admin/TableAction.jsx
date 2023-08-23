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
            {/* <Transition show={isOpen} as={Fragment} leave="duration-200">
                <Dialog
                    as="div"
                    id="modal"
                    className="fixed inset-0 z-50 flex items-center px-4 py-6 overflow-y-auto transition-all transform sm:px-0"
                    onClose={() => setIsOpen(false)}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="absolute inset-0 bg-gray-500/75" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel
                            className={`mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto sm:max-w-md p-6 text-center`}
                        >
                            <Dialog.Title>
                                <svg
                                    class="mx-auto mb-4 text-gray-400 w-12 h-12"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
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
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition> */}
            <Modal show={isOpen} onClose={() => setIsOpen(false)} maxWidth="md" classes="p-6 text-center">
                <Dialog.Title>
                    <svg
                        className="w-12 h-12 mx-auto mb-4 text-gray-400"
                        ariaHidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
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
