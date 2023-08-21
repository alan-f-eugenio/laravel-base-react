export default function Section({ children, attributes }) {
    return (
        <div className="grid space-y-6" {...attributes}>
            {children}
        </div>
    );
}
