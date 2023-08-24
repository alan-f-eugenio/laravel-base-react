import { Link } from "@inertiajs/react";

export default function PageButton({ href, title }) {
    return (
        <Link
            href={href}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
            {title}
        </Link>
    );
}
