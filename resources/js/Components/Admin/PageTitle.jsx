export default function PageTitle({ title, children }) {
    return (
        <h1 className="text-xl font-semibold leading-10 text-gray-800">
            {title + (children ? " >" : "")} {children}
        </h1>
    );
}
