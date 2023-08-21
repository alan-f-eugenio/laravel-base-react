export default function TableTH({
    children,
    classes = "px-6 py-3",
    attributes,
    hidden,
}) {
    return (
        <th
            scope="col"
            className={`${classes}`}
            {...attributes}
            {...(hidden
                ? "style='padding-top: 0 !important;padding-bottom: 0 !important;line-height: 0;visibility: hidden;'"
                : "")}
        >
            {children}
        </th>
    );
}
