export default function FilterSelectOption({ title, inpValue }) {
    return <option className="checked:font-bold" value={inpValue}>{title}</option>;
}
