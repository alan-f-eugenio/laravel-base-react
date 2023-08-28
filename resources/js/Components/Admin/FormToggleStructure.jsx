export default function FormToggleStructure({
    title,
    disabled = false,
    children,
    ...props
}) {
    return (
        <div
            className={`flex items-center h-10 text-sm border border-gray-300 rounded-lg px-2.5 ${
                disabled && "bg-gray-300"
            }`}
            {...props}
        >
            <label className="relative inline-flex items-center cursor-pointer">
                {children}
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                <span className="ml-2 text-sm font-medium text-gray-900">
                    {title}
                </span>
            </label>
        </div>
    );
}
