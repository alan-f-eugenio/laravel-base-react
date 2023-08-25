export default function FormInput({
    inpName,
    id = null,
    type = "text",
    placeholder = "",
    inpValue = "",
    classes = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 disabled:bg-gray-300 read-only:bg-gray-300",
    ...props
}) {
    return (
        <input
            className={classes}
            type={type}
            id={id ?? inpName}
            name={inpName}
            placeholder={placeholder}
            defaultValue={inpValue}
            {...props}
        />
    );
}
