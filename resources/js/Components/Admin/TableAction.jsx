export default function TableAction({
    children,
    href,
    hasPhoto = false,
    title,
    destroy,
    attributes,
}) {
    if (!destroy) {
        return (
            <a
                className={`${
                    !hasPhoto && "px-3 py-2"
                } text-xs text-gray-900 bg-white hover:bg-gray-100 hover:text-blue-700`}
                href={href}
                title={title}
                {...attributes}
            >
                {children}
            </a>
        );
    }
    return (
        <form
            action={href}
            method="post"
            onsubmit="return confirm('Confirmar ação?');"
        >
            <button
                type="submit"
                title={title}
                className="px-3 py-2 text-xs text-gray-900 bg-white hover:bg-gray-100 hover:text-blue-700"
            >
                {children}
            </button>
        </form>
    );
}
