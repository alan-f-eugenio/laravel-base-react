export default function StatusBadge({ condition, trueTitle, falseTitle }) {
    return (
        <span
            className={`${
                condition
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-200 text-yellow-800"
            } text-xs font-medium px-2 py-1 rounded whitespace-nowrap`}
        >
            {condition ? trueTitle : falseTitle}
        </span>
    );
}
