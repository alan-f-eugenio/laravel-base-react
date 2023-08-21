function Structure({ children, justifyEnd }) {
    if (justifyEnd) {
        return <div className="flex justify-end">{children}</div>;
    }
    return <>{children}</>;
}

export default function TableTDActions({
    children,
    classes = "px-6 py-4",
    justifyEnd = false,
}) {
    return (
        <td className={`${classes}`}>
            <Structure children={children} justifyEnd={justifyEnd}>
                <div className="inline-flex overflow-hidden border border-gray-200 divide-x rounded-md shadow-sm">
                    {children}
                </div>
            </Structure>
        </td>
    );
}
