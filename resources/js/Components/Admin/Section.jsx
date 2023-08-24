export default function Section({ children, ...props }) {
    return (
        <div className="grid space-y-6" {...props}>
            {children}
        </div>
    );
}
