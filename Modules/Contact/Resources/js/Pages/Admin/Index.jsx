import FilterInput from "@/Components/Admin/FilterInput";
import FilterSelect from "@/Components/Admin/FilterSelect";
import FilterSelectOption from "@/Components/Admin/FilterSelectOption";
import Filters from "@/Components/Admin/Filters";
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
import { Head, router, useForm, usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import React, { useEffect } from "react";

export default function Index({
    auth,
    activeModules,
    flash,
    contactStatuses,
    collection,
}) {
    const { url } = usePage();
    const params = new URLSearchParams(window.location.search);
    const entries = Object.fromEntries(params.entries());
    const { data, setData, get, transform } = useForm(entries);

    // transform((data) =>
    //     Object.keys(data).forEach((key) => {
    //         if (data[key] === null) {
    //             delete data[key];
    //         }
    //     })
    // );

    useEffect(() => {
        // router.visit(url.substring(0, url.indexOf("?")), {
        //     only: [collection],
        //     preserveState: true,
        //     replace: true,
        // });
        get(url.substring(0, url.indexOf("?")), {
            only: [collection],
            preserveState: true,
            replace: true,
        });
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // get(url.substring(0, url.indexOf("?")));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<PageTitle title="Contatos" />}
            activeModules={activeModules}
            flash={flash}
        >
            <Head title="Contatos" />

            <Section>
                <Filters gridCols="sm:grid-cols-4" handleSubmit={handleSubmit}>
                    <FilterSelect
                        title="Status"
                        inpName="seen"
                        data={data.seen}
                        setData={setData}
                    >
                        {contactStatuses.map((statusValue, statusKey) => (
                            <FilterSelectOption
                                key={statusKey}
                                inpValue={statusKey}
                                title={statusValue}
                            />
                        ))}
                    </FilterSelect>
                    <FilterInput
                        inpName="name"
                        title="Nome"
                        placeholder="Nome do contato"
                        data={data.name}
                        setData={setData}
                    />
                    <FilterInput
                        inpName="email"
                        title="E-mail"
                        placeholder="contato@email.com.br"
                        data={data.email}
                        setData={setData}
                    />
                    <FilterInput
                        inpName="subject"
                        title="Assunto"
                        placeholder="Assunto do contato"
                        data={data.subject}
                        setData={setData}
                    />
                </Filters>
                <Table
                    collection={collection}
                    ths={
                        <>
                            <TableTH children="Nome" />
                            <TableTH children="E-mail" />
                            <TableTH children="Assunto" />
                            <TableTH children="Cadastrado" />
                            <TableTH children="Status" />
                            <TableTH children="Ações" />
                        </>
                    }
                >
                    {collection.data ? (
                        collection.data.map((item, index) => (
                            <tr key={index} className="bg-white border-b">
                                <TableTD main={true} children={item.name} />
                                <TableTD children={item.email} />
                                <TableTD children={item.subject} />
                                <TableTD
                                    children={dayjs(item.created_at).format(
                                        "D[/]MM[/]YYYY H[:]m[:]s"
                                    )}
                                />
                                <TableTD>
                                    <StatusBadge
                                        condition={!item.seen}
                                        trueTitle="Novo"
                                        falseTitle="Visto"
                                    />
                                </TableTD>
                                <TableTDActions>
                                    <TableAction
                                        href={route(
                                            "admin.contacts.show",
                                            item.id
                                        )}
                                        title="Visualizar"
                                    >
                                        <i className="text-base align-middle icon-[tabler--eye]"></i>
                                    </TableAction>
                                    <TableAction
                                        href={route(
                                            "admin.contacts.destroy",
                                            item.id
                                        )}
                                        title="Excluir"
                                        isDestroy={true}
                                    >
                                        <i className="text-base align-middle icon-[tabler--trash]"></i>
                                    </TableAction>
                                </TableTDActions>
                            </tr>
                        ))
                    ) : (
                        <TableEmpty />
                    )}
                </Table>
            </Section>
        </AuthenticatedLayout>
    );
}
