import { Link, usePage } from "@inertiajs/react";

export default function Filters({ children, gridCols, handleSubmit }) {
    const { url } = usePage();

    return (
        <div className="p-6 space-y-6 text-gray-900 bg-white shadow-sm sm:rounded-lg">
            <h2 className="flex items-center justify-between text-lg font-semibold leading-tight text-gray-800">
                Filtros
                <Link
                    href={url.substring(0, url.indexOf("?"))}
                    className="w-auto px-4 py-2 text-sm font-medium text-center border border-gray-300 rounded-lg focus:ring-4 hover:bg-gray-100 focus:outline-none focus:ring-blue-300"
                >
                    Limpar
                </Link>
            </h2>
            <form
                action=""
                method="get"
                className="space-y-6"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className={`grid gap-6 ${gridCols}`}>
                    {children}
                    {/* <div className="flex items-end justify-between md:space-x-6 md:justify-start">
                        {/* <button
                            type="submit"
                            className="w-auto px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                            Filtrar
                        </button> }
                    </div> */}
                </div>
            </form>
        </div>
    );
}
