export default function Pagination({ collection }) {
    return (
        <nav role="navigation" className="flex items-center justify-between">
            <div className="flex justify-between flex-1 sm:hidden">
                {collection.current_page == 1 ? (
                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-500 bg-white border border-gray-300 rounded-md cursor-default">
                        &laquo; Anterior
                    </span>
                ) : (
                    <a
                        href={collection.prev_page_url}
                        className="relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700"
                    >
                        &laquo; Anterior
                    </a>
                )}

                {collection.current_page < collection.last_page ? (
                    <a
                        href={collection.next_page_url}
                        className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700"
                    >
                        Próxima &raquo;
                    </a>
                ) : (
                    <span className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium leading-5 text-gray-500 bg-white border border-gray-300 rounded-md cursor-default">
                        Próxima &raquo;
                    </span>
                )}
            </div>

            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm leading-5 text-gray-700">
                        Mostrando{" "}
                        {collection.from ? (
                            <>
                                <span className="font-medium">
                                    {collection.from}{" "}
                                </span>
                                até{" "}
                                <span className="font-medium">
                                    {collection.to}
                                </span>
                            </>
                        ) : (
                            collection.total
                        )}{" "}
                        de{" "}
                        <span className="font-medium">{collection.total}</span>{" "}
                        resultados
                    </p>
                </div>

                <div>
                    <span className="relative z-0 inline-flex rounded-md shadow-sm">
                        {/* {collection.current_page == 1 ? (
                            <span aria-disabled="true">
                                <span
                                    className="relative inline-flex items-center px-2 py-2 text-sm font-medium leading-5 text-gray-500 bg-white border border-gray-300 cursor-default rounded-l-md"
                                    aria-hidden="true"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </span>
                        ) : (
                            <a
                                href={collection.prev_page_url}
                                rel="prev"
                                className="relative inline-flex items-center px-2 py-2 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-l-md hover:text-gray-400 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-500"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        )} */}

                        {collection.links.map((element, i1, elements) =>
                            // typeof element === "string" ||
                            // element instanceof String ? (
                            //     <span key={i1} aria-disabled="true">
                            //         <span className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 bg-white border border-gray-300 cursor-default">
                            //             {element}
                            //         </span>
                            //     </span>
                            // ) : (
                            //     Array.isArray(element) && (
                            //         <span key={i1}>
                            //             {element.map((link, i2) =>
                            //                 link.label ==
                            //                 elements.current_page ? (
                            //                     <span
                            //                         key={i2}
                            //                         aria-current="page"
                            //                     >
                            //                         <span className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-500 bg-white border border-gray-300 cursor-default">
                            //                             {link.label}
                            //                         </span>
                            //                     </span>
                            //                 ) : (
                            //                     <a
                            //                         key={i2}
                            //                         href={link.url}
                            //                         className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 hover:text-gray-500 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700"
                            //                     >
                            //                         {link.label}
                            //                     </a>
                            //                 )
                            //             )}
                            //         </span>
                            //     )
                            // )
                            console.log(element, i1, elements)
                        )
                        }
                        {/* {collection.current_page < collection.last_page ? (
                            <a
                                href={collection.next_page_url}
                                rel="next"
                                className="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-r-md hover:text-gray-400 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-500"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        ) : (
                            <span aria-disabled="true">
                                <span
                                    className="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium leading-5 text-gray-500 bg-white border border-gray-300 cursor-default rounded-r-md"
                                    aria-hidden="true"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </span>
                        )} */}
                    </span>
                </div>
            </div>
        </nav>
    );
}
