export default function TableTD({
    children,
    classes = "px-6 py-4",
    main,
    ...props
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
        <td className={`${classes}`} {...props}>
            {children}
        </td>
    );
}
