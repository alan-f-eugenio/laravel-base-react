import FormError from "./FormError";

export default function FormTextArea({
    inpName,
    inpValue,
    placeholder = "",
    rows = 5,
    setData,
    ...props
}) {
    return (
        <textarea
            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg textEditor bg-gray-50 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-300 read-only:bg-gray-300"
            rows={rows}
            name={inpName}
            id={inpName}
            placeholder={placeholder}
            defaultValue={inpValue}
            onChange={(e) => setData(inpName, e.target.value)}
            {...props}
        ></textarea>
    );
}
