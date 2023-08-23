import FormError from "./FormError";

export default function FormLabel({
    children,
    inpName,
    inpError = null,
    title,
    props,
}) {
    return (
        <div {...props}>
            <label
                htmlFor={inpName}
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                {title}
            </label>
            {children}
            {/* <FormError error={inpError} /> */}
        </div>
    );
}
