import PageTitle from "@/Components/Admin/PageTitle";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function Dashboard({ auth, activeModules, flash }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<PageTitle title="Contatos" />}
            activeModules={activeModules}
            flash={flash}
        >
            <Head title="Contatos" />

            <div className="bg-white shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">You're logged in!</div>
            </div>
        </AuthenticatedLayout>
    );
}
