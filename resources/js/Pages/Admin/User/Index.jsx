import FilterInput from "@/Components/Admin/FilterInput";
import FilterSelect from "@/Components/Admin/FilterSelect";
import FilterSelectOption from "@/Components/Admin/FilterSelectOption";
import Filters from "@/Components/Admin/Filters";
import PageButton from "@/Components/Admin/PageButton";
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
import { Head, useForm, usePage, useRemember } from "@inertiajs/react";
import dayjs from "dayjs";
import React, { useEffect } from "react";

export default function Index({
    auth,
    activeModules,
    flash,
    defaultStatuses,
    defaultStatuses2,
    collection,
}) {
    const { url } = usePage();
    const params = new URLSearchParams(window.location.search);
    const entries = Object.fromEntries(params.entries());
    const { data, setData, get, transform } = useForm(entries);
    const [formState] = useRemember(entries);

    useEffect(() => {
        if (data != formState) {
            get(url.substring(0, url.indexOf("?")), {
                only: ["collection"],
                preserveScroll: true,
                preserveState: true,
                replace: true,
            });
        }
    }, [data]);

    transform((data) =>
        Object.fromEntries(
            Object.entries(data).filter(
                ([k, v]) => String(v).length && k != "page"
            )
        )
    );

    console.log(auth)

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <PageTitle title="Usuários" />
                    <PageButton
                        href={route("admin.users.create")}
                        title="Cadastrar Novo"
                    />
                </>
            }
            activeModules={activeModules}
            flash={flash}
        >
            <Head title="Usuários" />

            <Section>
                <Filters gridCols="sm:grid-cols-3">
                    <FilterSelect
                        title="Status"
                        inpName="status"
                        data={data.status}
                        setData={setData}
                    >
                        {Object.keys(defaultStatuses).map((statusKey) => (
                            <FilterSelectOption
                                key={statusKey}
                                inpValue={statusKey}
                                title={defaultStatuses[statusKey]}
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
                        title="Login do Usuário"
                        placeholder="usuario@login.com.br"
                        data={data.email}
                        setData={setData}
                    />
                </Filters>
                <Table
                    collection={collection}
                    ths={
                        <>
                            <TableTH children="Nome" />
                            <TableTH children="Login" />
                            <TableTH children="Cadastrado" />
                            <TableTH children="Alterado" />
                            <TableTH children="Status" />
                            <TableTH children="Ações" />
                        </>
                    }
                >
                    {collection.data.length ? (
                        collection.data.map((item, index) => (
                            <tr key={index} className="bg-white border-b">
                                <TableTD main={true} children={item.name} />
                                <TableTD children={item.email} />
                                <TableTD
                                    children={dayjs(item.created_at).format(
                                        "D[/]MM[/]YYYY H[:]m[:]s"
                                    )}
                                />
                                <TableTD
                                    children={
                                        item.updated_at != item.created_at
                                            ? dayjs(item.created_at).format(
                                                  "D[/]MM[/]YYYY H[:]m[:]s"
                                              )
                                            : "Nunca"
                                    }
                                />
                                <TableTD>
                                    <StatusBadge
                                        condition={
                                            item.status ==
                                            Object.keys(defaultStatuses)[0]
                                        }
                                        trueTitle="Ativo"
                                        falseTitle="Inativo"
                                    />
                                </TableTD>
                                <TableTDActions>
                                    <TableAction
                                        href={
                                            auth.user.id == item.id
                                                ? route("admin.profile.edit")
                                                : route(
                                                      "admin.users.edit",
                                                      item.id
                                                  )
                                        }
                                        title="Editar"
                                    >
                                        <i className="text-base align-middle icon-[tabler--edit]"></i>
                                    </TableAction>
                                    <TableAction
                                        href={route(
                                            "admin.users.destroy",
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
