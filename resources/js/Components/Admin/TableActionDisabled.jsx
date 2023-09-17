export default function TableActionDisabled({ children }) {
    return (
        <button
            type="button"
            disabled
            className="px-3 py-2 text-xs text-gray-400 bg-gray-100"
        >
            {children}
        </button>
    );
}
