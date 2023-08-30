export default function FormInputFile({
    inpName,
    id = null,
    type = "text",
    inpValue = "",
    classes = "block w-full text-sm text-gray-900 file:!bg-blue-700 file:!mr-1.5 file:hover:!bg-blue-800 file:font-medium file:text-white file:!py-2 file:!px-4 file:cursor-pointer file:!border-none file border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none",
    setData,
    ...props
}) {
    console.log(inpValue);
    return (
        <input
            className={classes}
            type="file"
            id={id ?? inpName}
            name={inpName}
            // value={inpValue}
            onChange={(e) => setData(inpName, e.target.files[0])}
            {...props}
        />
    );
}
