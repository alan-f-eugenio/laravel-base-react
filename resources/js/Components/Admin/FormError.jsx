export default function FormError({ inpName, errors }) {
    if (!errors || !(inpName in errors)) {
        return <></>;
    }
    return <label className="text-red-500">{errors[inpName]}</label>;
}
