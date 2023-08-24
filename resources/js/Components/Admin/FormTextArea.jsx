import FormError from "./FormError";

export default function FormTextArea({
    inpName,
    inpValue,
    placeholder = "",
    rows = 5,
    ...props
}) {
    return (
        <textarea
            className="textEditor bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-300 read-only:bg-gray-300"
            rows={rows}
            name={inpName}
            id={inpName}
            placeholder={placeholder}
            defaultValue={inpValue}
            {...props}
        ></textarea>
    );
}
