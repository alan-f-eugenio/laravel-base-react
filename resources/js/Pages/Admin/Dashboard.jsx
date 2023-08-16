import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({
    auth,
    activeModules,
    adminNotification,
    flash
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h1 className="text-xl font-semibold leading-10 text-gray-800">
                    Painel Administrativo
                </h1>
            }
            activeModules={activeModules}
            adminNotification={adminNotification}
            flash={flash}
        >
            <Head title="Painel Administrativo" />

            <div className="bg-white shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">You're logged in!</div>
            </div>
        </AuthenticatedLayout>
    );
}
