export default function FormToggleInput({
    inpName,
    inpValue = false,
    setData,
    ...props
}) {
    return (
        <input
            type="checkbox"
            value="checked"
            name={inpName}
            className="sr-only peer"
            checked={inpValue}
            onChange={(e) => setData(inpName, e.target.checked)}
            {...props}
        />
    );
}
