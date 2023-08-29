export default function Form({
    children,
    editing = false,
    hasFiles = false,
    processing = false,
    handleSubmit,
    ...props
}) {
    return (
        <form
            action="{{ $action }}"
            method="post"
            className="p-6 space-y-5 bg-white shadow-sm sm:rounded-lg"
            {...(hasFiles ? 'enctype="multipart/form-data"' : "")}
            {...props}
            onSubmit={(e) => handleSubmit(e)}
        >
            {children}
            <button
                type="submit"
                disabled={processing}
                className="w-full px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 sm:w-auto"
            >
                {...editing ? "Salvar" : "Cadastrar"}
            </button>
        </form>
    );
}
