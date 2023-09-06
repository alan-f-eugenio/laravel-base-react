import { Link } from "@inertiajs/react";

export default function PlaceholderNavItem({ title }) {
   return (
      <Link
         as="button"
         className={`block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out `}
      >
         {title}
      </Link>
   );
}
