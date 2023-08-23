import { Link, usePage } from "@inertiajs/react";

export default function Filters({ children, gridCols }) {
    const { url } = usePage();

    return (
        <div className="p-6 space-y-6 text-gray-900 bg-white shadow-sm sm:rounded-lg">
            <h2 className="text-lg font-semibold leading-tight text-gray-800">
                Filtros
            </h2>
            <form action="" method="get" className="space-y-6">
                <div className={`grid gap-6 ${gridCols}`}>
                    {children}
                    <div className="flex items-end justify-between md:space-x-6 md:justify-start">
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center"
                        >
                            Filtrar
                        </button>
                        <Link
                            href={url.substring(0, url.indexOf("?"))}
                            className="focus:ring-4 hover:bg-gray-100 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center"
                        >
                            Limpar
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
