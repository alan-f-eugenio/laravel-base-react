export default function TableTD({
    children,
    classes = "px-6 py-4",
    attributes,
    main,
}) {
    if (main) {
        return (
            <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
                {children}
            </th>
        );
    }
    return (
        <td className={`${classes}`} {...attributes}>
            {children}
        </td>
    );
}
