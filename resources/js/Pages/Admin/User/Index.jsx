import FilterInput from "@/Components/Admin/FilterInput";
import FilterSelect from "@/Components/Admin/FilterSelect";
import FilterSelectOption from "@/Components/Admin/FilterSelectOption";
import Filter from "@/Components/Admin/Filter";
import PageButton from "@/Components/Admin/PageButton";
import PageTitle from "@/Components/Admin/PageTitle";
import Section from "@/Components/Admin/Section";
import StatusBadge from "@/Components/Admin/StatusBadge";
import Table from "@/Components/Admin/Table";
import TableAction from "@/Components/Admin/TableAction";
import TableActionDisabled from "@/Components/Admin/TableActionDisabled";
import TableEmpty from "@/Components/Admin/TableEmpty";
import TableTD from "@/Components/Admin/TableTD";
import TableTDActions from "@/Components/Admin/TableTDActions";
import TableTH from "@/Components/Admin/TableTh";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage, useRemember } from "@inertiajs/react";
import dayjs from "dayjs";
import { useEffect } from "react";

export default function Index({ auth, commonData, collection }) {
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

   return (
      <AuthenticatedLayout
         user={auth.user}
         commonData={commonData}
         header={
            <>
               <PageTitle title="Usuários" />
               <PageButton
                  href={route("admin.users.create")}
                  title="Cadastrar Novo"
               />
            </>
         }
      >
         <Head title="Usuários" />

         <Section>
            <Filter gridCols="sm:grid-cols-3" setData={setData}>
               <FilterSelect
                  title="Status"
                  inpName="status"
                  data={data.status}
                  setData={setData}
               >
                  {Object.keys(commonData.defaultStatuses).map((statusKey) => (
                     <FilterSelectOption
                        key={statusKey}
                        inpValue={statusKey}
                        title={commonData.defaultStatuses[statusKey]}
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
            </Filter>
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
                              "D[/]MM[/]YYYY HH[:]mm[:]ss"
                           )}
                        />
                        <TableTD
                           children={
                              item.updated_at != item.created_at
                                 ? dayjs(item.updated_at).format(
                                      "D[/]MM[/]YYYY HH[:]mm[:]ss"
                                   )
                                 : "Nunca"
                           }
                        />
                        <TableTD>
                           <StatusBadge
                              condition={
                                 item.status ==
                                 Object.keys(commonData.defaultStatuses)[0]
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
                                    : route("admin.users.edit", item.id)
                              }
                              title="Editar"
                           >
                              <i className="text-base align-middle icon-[tabler--edit]"></i>
                           </TableAction>
                           {auth.user.id != item.id ? (
                              <TableAction
                                 href={route("admin.users.destroy", item.id)}
                                 title="Excluir"
                                 isDestroy={true}
                              >
                                 <i className="text-base align-middle icon-[tabler--trash]"></i>
                              </TableAction>
                           ) : (
                              <TableActionDisabled>
                                 <i className="text-base align-middle icon-[tabler--trash]"></i>
                              </TableActionDisabled>
                           )}
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
