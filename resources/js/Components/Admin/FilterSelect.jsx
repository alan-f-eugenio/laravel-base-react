export default function FilterSelect({ children, inpName, title }) {
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
                <option value="">Todos</option>
                {children}
            </select>
        </div>
    );
}
