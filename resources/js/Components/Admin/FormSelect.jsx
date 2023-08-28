export default function FormSelect({
    children,
    inpName,
    id = null,
    classes = "bg-gray-50  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full disabled:bg-gray-300",
    placehName = "",
    placehDisabled = false,
    data,
    setData,
    ...props
}) {
    return (
        <select
            className={`${classes} ${
                !props.multiple
                    ? "border p-2"
                    : "[&>.ts-control]:bg-gray-50 [&>.ts-control]:rounded-lg [&>.ts-control]:border [&>.ts-control]:text-sm [&>.ts-control]:leading-6 placeholder:[&>.ts-control>input]:text-sm [&>.ts-control>.item]:!bg-gray-200 [&>.ts-control>.item]:rounded"
            }`}
            id={id ?? inpName}
            name={inpName}
            defaultValue={data}
            onChange={(e) => setData(inpName, e.target.value)}
            {...props}
        >
            {placehName && (
                <option {...(placehDisabled && "selected disabled")} value="">
                    {placehName}
                </option>
            )}
            {children}
        </select>
    );
}
