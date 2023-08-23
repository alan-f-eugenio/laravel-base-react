import FilterInput from "@/Components/Admin/FilterInput";
import FilterSelect from "@/Components/Admin/FilterSelect";
import FilterSelectOption from "@/Components/Admin/FilterSelectOption";
import Filters from "@/Components/Admin/Filters";
import FormInput from "@/Components/Admin/FormInput";
import FormLabel from "@/Components/Admin/FormLabel";
import Grid from "@/Components/Admin/Grid";
import PageSubTitle from "@/Components/Admin/PageSubTitle";
import PageTitle from "@/Components/Admin/PageTitle";
import Section from "@/Components/Admin/Section";
import StatusBadge from "@/Components/Admin/StatusBadge";
import Table from "@/Components/Admin/Table";
import TableAction from "@/Components/Admin/TableAction";
import TableEmpty from "@/Components/Admin/TableEmpty";
import TableTD from "@/Components/Admin/TableTD";
import TableTDActions from "@/Components/Admin/TableTDActions";
import TableTH from "@/Components/Admin/TableTh";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import React from "react";

export default function Index({ auth, activeModules, flash, item }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <PageTitle title="Contatos">
                    <PageSubTitle subtitle="Visualizar" />
                </PageTitle>
            }
            activeModules={activeModules}
            flash={flash}
        >
            <Head title="Contatos" />

            <Section>
                <Grid
                    classes="p-6 bg-white shadow-sm sm:rounded-lg"
                    gridCols="sm:grid-cols-2"
                >
                    <FormLabel inpName="name" title="Nome">
                        <FormInput
                            inpName="name"
                            inpValue={item.name}
                            readonly={'readonly'}
                        />
                    </FormLabel>
                </Grid>
            </Section>
        </AuthenticatedLayout>
    );
}
