function Structure({ children, tableOnly }) {
    if (!tableOnly) {
        return (
            <div className="w-full overflow-x-auto bg-white shadow-md sm:rounded-lg">
                {children}
            </div>
        );
    }
    return <>{children}</>;
}

export default function Table({
    children,
    collection,
    ths = null,
    tfoot = null,
    sortable = false,
    tableOnly = false,
}) {
    return (
        <Structure tableOnly={tableOnly}>
            <table className="w-full text-sm text-left text-gray-500">
                {ths && (
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>{ths}</tr>
                    </thead>
                )}
                <tbody className={`${sortable && "table-sortable"}`}>
                    {children}
                </tbody>
                <tfoot>
                    {tfoot ? (
                        { tfoot }
                    ) : collection.hasPages ? (
                        <tr>
                            <td className="px-6 py-4" colspan="99">
                                {collection.links}
                            </td>
                        </tr>
                    ) : (
                        <></>
                    )}
                </tfoot>
            </table>
        </Structure>
    );
}
