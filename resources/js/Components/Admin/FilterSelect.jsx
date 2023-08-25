export default function FilterSelect({
    children,
    inpName,
    title,
    data,
    setData,
}) {
    return (
        <div>
            <label
                htmlFor={inpName}
                className="block mb-2 text-sm font-medium text-gray-900 "
            >
                {title}
            </label>
            <select
                id={inpName}
                name={inpName}
                className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                defaultValue={data}
                onChange={(e) => setData(inpName, e.target.value)}
            >
                <option value="">Todos</option>
                {children}
            </select>
        </div>
    );
}
