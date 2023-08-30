import FilterSelectOption from "@/Components/Admin/FilterSelectOption";
import Form from "@/Components/Admin/Form";
import FormInput from "@/Components/Admin/FormInput";
import FormLabel from "@/Components/Admin/FormLabel";
import FormSelect from "@/Components/Admin/FormSelect";
import FormToggleInput from "@/Components/Admin/FormToggleInput";
import FormToggleStructure from "@/Components/Admin/FormToggleStructure";
import Grid from "@/Components/Admin/Grid";
import PageButton from "@/Components/Admin/PageButton";
import PageSubTitle from "@/Components/Admin/PageSubTitle";
import PageTitle from "@/Components/Admin/PageTitle";
import Section from "@/Components/Admin/Section";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function CreateEdit({
    auth,
    activeModules,
    flash,
    item,
    bannerLocals,
    defaultStatuses,
}) {
    const { data, setData, submit, transform, errors, reset, processing } =
        useForm(item);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data)
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <PageTitle title="Banners">
                        <PageSubTitle
                            subtitle={item.id ? "Alterar" : "Cadastrar"}
                        />
                    </PageTitle>
                    <PageButton
                        href={route("admin.banners.index")}
                        title="Listar Banners"
                    />
                </>
            }
            activeModules={activeModules}
            flash={flash}
        >
            <Head title="Banners" />

            <Section>
                <Form
                    processing={processing}
                    editing={Boolean(item.id)}
                    hasFiles={true}
                    handleSubmit={handleSubmit}
                >
                    <Grid gridCols="sm:grid-cols-3">
                        <FormLabel
                            inpName="status"
                            title="Status"
                            errors={errors}
                        >
                            <FormSelect
                                inpName="status"
                                data={data.status}
                                setData={setData}
                            >
                                {Object.keys(defaultStatuses).map(
                                    (statusKey) => (
                                        <FilterSelectOption
                                            key={statusKey}
                                            inpValue={statusKey}
                                            title={defaultStatuses[statusKey]}
                                        />
                                    )
                                )}
                            </FormSelect>
                        </FormLabel>
                    </Grid>
                </Form>
            </Section>
        </AuthenticatedLayout>
    );
}
