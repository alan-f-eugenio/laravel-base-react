export default function Grid({ classes = "", gridCols, children, ...props }) {
    return (
        <div
            className={`${classes} ${gridCols} grid gap-x-6 gap-y-5`}
            {...props}
        >
            {children}
        </div>
    );
}
