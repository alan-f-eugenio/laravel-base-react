export default function Grid({ classes = "", gridCols, children, ...props }) {
    return (
        <div
            className={`${classes} grid gap-x-6 gap-y-5 ${gridCols}`}
            {...props}
        >
            {children}
        </div>
    );
}
