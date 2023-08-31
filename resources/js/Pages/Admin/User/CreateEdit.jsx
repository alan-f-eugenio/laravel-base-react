import FormSelectOption from "@/Components/Admin/FormSelectOption";
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
    defaultStatuses,
}) {
    const { data, setData, submit, transform, errors, reset, processing } =
        useForm(
            Object.fromEntries(
                Object.entries(item).filter(
                    ([k, v]) => k != "password" && k != "password_confirmation"
                )
            )
        );
    const [changePass, setChangePass] = useState(item.id ? false : true);

    transform((data) => {
        let newData = data;
        if (!data.status) {
            newData = { ...data, status: Object.keys(defaultStatuses)[0] };
        }
        if (!data.changePass && item.id) {
            newData = Object.fromEntries(
                Object.entries(newData).filter(
                    ([k, v]) => k != "password" && k != "password_confirmation"
                )
            );
        }
        return newData;
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        submit(
            item.id ? "put" : "post",
            item.id
                ? route("admin.users.update", item.id)
                : route("admin.users.store"),
            {
                onSuccess: () => reset(),
            }
        );
    };

    useEffect(() => {
        if (item.id) {
            setChangePass(data.changePass);
        }
    }, [data.changePass]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <PageTitle title="Usuários">
                        <PageSubTitle
                            subtitle={item.id ? "Alterar" : "Cadastrar"}
                        />
                    </PageTitle>
                    <PageButton
                        href={route("admin.users.index")}
                        title="Listar Usuários"
                    />
                </>
            }
            activeModules={activeModules}
            flash={flash}
        >
            <Head title="Usuários" />

            <Section>
                <Form
                    processing={processing}
                    editing={Boolean(item.id)}
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
                                        <FormSelectOption
                                            key={statusKey}
                                            inpValue={statusKey}
                                            title={defaultStatuses[statusKey]}
                                        />
                                    )
                                )}
                            </FormSelect>
                        </FormLabel>
                        <FormLabel inpName="name" title="Nome" errors={errors}>
                            <FormInput
                                inpName="name"
                                inpValue={data.name}
                                placeholder="Nome do usuário"
                                setData={setData}
                                required
                            />
                        </FormLabel>
                        <FormLabel
                            inpName="email"
                            title="Login do Usuário"
                            errors={errors}
                        >
                            <FormInput
                                inpName="email"
                                inpValue={data.email}
                                placeholder="usuario@login.com.br"
                                setData={setData}
                                autoComplete="username"
                                required
                            />
                        </FormLabel>
                        {item.id && (
                            <FormLabel title="Alterar Senha?">
                                <FormToggleStructure title="Alterar senha do usuário">
                                    <FormToggleInput
                                        inpName="changePass"
                                        inpValue={data.changePass}
                                        setData={setData}
                                    />
                                </FormToggleStructure>
                            </FormLabel>
                        )}
                        <FormLabel
                            inpName="password"
                            title="Senha do Usuário"
                            errors={errors}
                        >
                            <FormInput
                                inpName="password"
                                placeholder="••••••••"
                                inpValue={data.password}
                                type="password"
                                setData={setData}
                                disabled={!changePass}
                                autoComplete="new-password"
                                required
                            />
                        </FormLabel>
                        <FormLabel
                            inpName="password_confirmation"
                            title="Confirme a Senha do Usuário"
                            errors={errors}
                        >
                            <FormInput
                                inpName="password_confirmation"
                                placeholder="••••••••"
                                inpValue={data.password_confirmation}
                                type="password"
                                setData={setData}
                                disabled={!changePass}
                                autoComplete="new-password"
                                required
                            />
                        </FormLabel>
                    </Grid>
                </Form>
            </Section>
        </AuthenticatedLayout>
    );
}
