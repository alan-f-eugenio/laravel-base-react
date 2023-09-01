import Filter from "@/Components/Admin/Filter";
import FilterInput from "@/Components/Admin/FilterInput";
import FilterSelect from "@/Components/Admin/FilterSelect";
import FilterSelectOption from "@/Components/Admin/FilterSelectOption";
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
import { useEffect } from "react";

export default function Index({ auth, commonData, collection, nav }) {
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
               <PageTitle title={nav.title} />
               {((collection.data.length == 0 && nav.contents.length == 0) ||
                  nav.type != Object.keys(commonData.contentNavTypes)[0]) && (
                  <PageButton
                     href={route("admin.contents.create", nav.id)}
                     title="Cadastrar Novo"
                  />
               )}
            </>
         }
      >
         <Head title={nav.title} />

         <Section>
            <Filter gridCols="sm:grid-cols-2">
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
                  inpName="title"
                  title="Título"
                  placeholder="Título do conteúdo"
                  data={data.title}
                  setData={setData}
               />
            </Filter>
            <Table
               collection={collection}
               ths={
                  <>
                     <TableTH children="Título" />
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
                        <TableTD main={true} children={item.title} />
                        <TableTD
                           children={dayjs(item.created_at).format(
                              "D[/]MM[/]YYYY H[:]m[:]s"
                           )}
                        />
                        <TableTD
                           children={
                              item.updated_at != item.created_at
                                 ? dayjs(item.updated_at).format(
                                      "D[/]MM[/]YYYY H[:]m[:]s"
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
                              href={route("admin.contents.edit", item.id)}
                              title="Editar"
                           >
                              <i className="text-base align-middle icon-[tabler--edit]"></i>
                           </TableAction>
                           <TableAction
                              href={route("admin.contents.destroy", item.id)}
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
