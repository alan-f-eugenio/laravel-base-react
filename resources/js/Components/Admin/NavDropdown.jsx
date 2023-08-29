import { useState, createContext, useContext, Fragment } from "react";
import { Link } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

const DropDownContext = createContext({
    open: false,
    setOpen: () => {},
    toggleOpen: () => {},
    active: false,
    setActive: () => {},
});

const NavDropdown = ({ children, activeDropdown = false }) => {
    const [open, setOpen] = useState(activeDropdown);
    const [active, setActive] = useState(activeDropdown);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <DropDownContext.Provider
            value={{ open, setOpen, toggleOpen, active, setActive }}
        >
            <div
                className={`${
                    active
                        ? "text-indigo-700 bg-indigo-50 border-indigo-400 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 "
                        : (open
                              ? "bg-gray-50 border-gray-300 "
                              : "text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 ") +
                          "border-white"
                } block w-full px-3 border-l-4 text-left text-sm font-medium focus:outline-none transition duration-75 ease-in-out`}
            >
                {children}
            </div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }) => {
    const { open, setOpen, toggleOpen, active, setActive } =
        useContext(DropDownContext);

    return (
        <>
            <button
                type="button"
                onClick={toggleOpen}
                className="flex items-center justify-between w-full py-2 text-left"
            >
                {children}
                <i
                    className={`${
                        open
                            ? "icon-[tabler--chevron-up]"
                            : "icon-[tabler--chevron-down]"
                    } align-middle ms-3`}
                ></i>
            </button>
        </>
    );
};

const Content = ({ children }) => {
    const { open, setOpen } = useContext(DropDownContext);

    return (
        <>
            <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div
                    className={`shadow-lg inline-block w-full mb-3 space-y-2 origin-top-left rounded-md`}
                >
                    <div
                        className={`py-1 bg-white rounded-md ring-1 ring-black ring-opacity-5`}
                    >
                        {children}
                    </div>
                </div>
            </Transition>
        </>
    );
};

const DropdownLink = ({ active = false, children, ...props }) => {
    return (
        <Link
            {...props}
            className={`${
                active &&
                "text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100"
            } block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out `}
        >
            {children}
        </Link>
    );
};

NavDropdown.Trigger = Trigger;
NavDropdown.Content = Content;
NavDropdown.Link = DropdownLink;

export default NavDropdown;
