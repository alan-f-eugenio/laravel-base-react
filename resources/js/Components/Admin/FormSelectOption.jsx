export default function FormSelectOption({ title, inpValue, ...props }) {
    return (
        <option className="checked:font-bold" value={inpValue} {...props}>
            {title}
        </option>
    );
}
