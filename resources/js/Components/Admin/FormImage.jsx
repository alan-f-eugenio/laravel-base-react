export default function FormImage({ filename }) {
    if (!filename) {
        return <></>;
    }
    return (
        <div className="p-3 mb-6 border border-gray-300 rounded-lg bg-gray-50 sm:h-96">
            <div className="h-full mx-auto">
                <img
                    className="object-contain object-center w-full h-full"
                    src={filename}
                />
            </div>
        </div>
    );
}
