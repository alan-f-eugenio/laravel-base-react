export default function FilterInput({
    type = "text",
    inpName,
    title,
    placeholder,
    data,
    setData,
}) {
    return (
        <div>
            <label
                htmlFor={inpName}
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                {title}
            </label>
            <input
                className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                type={type}
                id={inpName}
                name={inpName}
                placeholder={placeholder}
                value={data ?? ""}
                onChange={(e) => setData(inpName, e.target.value)}
            />
        </div>
    );
}
