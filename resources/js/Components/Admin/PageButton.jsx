import { Link } from "@inertiajs/react";

export default function PageButton({ href, title }) {
    return (
        <Link
            href={href}
            className="w-full px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 sm:w-auto"
        >
            {title}
        </Link>
    );
}
