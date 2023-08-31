import PageButton from "@/Components/Admin/PageButton";
import PageTitle from "@/Components/Admin/PageTitle";
import Section from "@/Components/Admin/Section";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ auth, activeModules, flash, collection }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <PageTitle title="Banners" />
                    <PageButton
                        href={route("admin.banners.create")}
                        title="Cadastrar Novo"
                    />
                </>
            }
            activeModules={activeModules}
            flash={flash}
        >
            <Head title="Banners" />

            <Section></Section>
        </AuthenticatedLayout>
    );
}
