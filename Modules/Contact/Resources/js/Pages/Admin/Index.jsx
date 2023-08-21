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
import { Head } from "@inertiajs/react";
import dayjs from "dayjs";
import React from "react";

export default function Index({
    auth,
    activeModules,
    flash,
    contactStatuses,
    collection,
}) {
    console.log(collection);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<PageTitle title="Contatos" />}
            activeModules={activeModules}
            flash={flash}
        >
            <Head title="Contatos" />

            <Section>
                <Filters gridCols="sm:grid-cols-4">
                    <FilterSelect title="Status" inpName="seen">
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
                    />
                    <FilterInput
                        inpName="email"
                        title="E-mail"
                        placeholder="contato@email.com.br"
                    />
                    <FilterInput
                        inpName="subject"
                        title="Assunto"
                        placeholder="Assunto do contato"
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
                                        destroy={true}
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
