export default function Grid({ classes = "", gridCols, props, children }) {
    return (
        <div
            className={`${classes} grid gap-x-6 gap-y-5 ${gridCols}`}
            {...props}
        >
            {children}
        </div>
    );
}
