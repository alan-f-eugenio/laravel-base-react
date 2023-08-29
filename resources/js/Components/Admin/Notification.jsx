import { useEffect, useState } from "react";
export default function Notification({ type, text, setFlashMessage }) {
    let bgClass = "bg-green-300";
    let borderClass = "border-green-600";
    let icon = "icon-[tabler--check] text-green-600";

    if (type === "error") {
        bgClass = "bg-red-300";
        borderClass = "border-red-600";
        icon = "icon-[tabler--x] text-red-600";
    } else if (type === "warning") {
        bgClass = "bg-amber-300";
        borderClass = "border-amber-600";
        icon = "icon-[tabler--alert-triangle] text-amber-600";
    }

    const [showingNotification, setShowingNotification] = useState(true);

    useEffect(() => {
        if (showingNotification) {
            const timer = setTimeout(() => {
                setShowingNotification(false);
                setTimeout(() => {
                    setFlashMessage({ type: null, text: null });
                }, 200);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [showingNotification]);

    useEffect(() => {
        if (text) {
            setShowingNotification(true);
        }
    }, [text]);

    return (
        <div
            className={`${
                !showingNotification ? "opacity-0 -z-10" : "opacity-100 z-10"
            } ${bgClass} ${borderClass} fixed left-0 right-0  flex items-center w-11/12 sm:w-auto p-4 mx-auto text-gray-900 border rounded-lg shadow-md bottom-2 sm:bottom-4 sm:right-4 sm:left-auto duration-200 transition-all ease-in-out`}
        >
            <div
                className={`${borderClass} inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-white rounded-lg border`}
            >
                <i className={`${icon} align-midle`}></i>
            </div>
            <div className={`mx-4 text-sm rounded-lg`}>{text}</div>
            <button
                onClick={() =>
                    setShowingNotification((previousState) => !previousState)
                }
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
            >
                <i className="text-xl leading-5 align-midle icon-[tabler--x]"></i>
            </button>
        </div>
    );
}
