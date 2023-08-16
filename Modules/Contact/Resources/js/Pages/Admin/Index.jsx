import AuthenticatedLayout from "../../../../../../resources/js/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function Dashboard({ auth, activeModules, adminNotification }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h1 className="text-xl font-semibold leading-10 text-gray-800">
                    Contatos
                </h1>
            }
            activeModules={activeModules}
            adminNotification={adminNotification}
        >
            <Head title="Contatos" />

            <div className="bg-white shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">You're logged in!</div>
            </div>
        </AuthenticatedLayout>
    );
}
