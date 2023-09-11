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
import TableTH from "@/Components/Admin/TableTH";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage, useRemember } from "@inertiajs/react";
import dayjs from "dayjs";
import { useEffect } from "react";

export default function Index({
   auth,
   commonData,
   collection,
   months,
   customerPersons,
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

   return (
      <AuthenticatedLayout
         user={auth.user}
         commonData={commonData}
         header={
            <>
               <PageTitle title="Clientes" />
               <PageButton
                  href={route("admin.customers.create")}
                  title="Cadastrar Novo"
               />
            </>
         }
      >
         <Head title="Clientes" />

         <Section>
            <Filter gridCols="lg:grid-cols-4 sm:grid-cols-3" setData={setData}>
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
                  inpName="fullname"
                  title="Nome"
                  placeholder="Nome do cliente"
                  data={data.fullname}
                  setData={setData}
               />
               <FilterInput
                  inpName="email"
                  title="E-mail"
                  placeholder="E-mail do cliente"
                  data={data.email}
                  setData={setData}
               />
               <FilterSelect
                  title="Tipo de Pessoa"
                  inpName="person"
                  data={data.person}
                  setData={setData}
               >
                  {Object.keys(customerPersons).map((personKey) => (
                     <FilterSelectOption
                        key={personKey}
                        inpValue={personKey}
                        title={customerPersons[personKey]}
                     />
                  ))}
               </FilterSelect>
               <FilterInput
                  inpName="cpf"
                  title="CPF"
                  placeholder="CPF do cliente"
                  data={data.cpf}
                  setData={setData}
               />
               <FilterSelect
                  title="Mês de Aniversário"
                  inpName="month_birth"
                  data={data.month_birth}
                  setData={setData}
               >
                  {Object.keys(months).map((monthKey) => (
                     <FilterSelectOption
                        key={monthKey}
                        inpValue={monthKey}
                        title={months[monthKey]}
                     />
                  ))}
               </FilterSelect>
               <FilterInput
                  inpName="cnpj"
                  title="CNPJ"
                  placeholder="CNPJ do cliente"
                  data={data.cnpj}
                  setData={setData}
               />
               <FilterInput
                  inpName="corporate_name"
                  title="Razão Social"
                  placeholder="Razão social do cliente"
                  data={data.corporate_name}
                  setData={setData}
               />
            </Filter>
            <Table
               collection={collection}
               ths={
                  <>
                     <TableTH children="Nome" />
                     <TableTH children="Tipo de Pessoa" />
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
                        <TableTD main={true} children={item.fullname} />
                        <TableTD>
                           <StatusBadge
                              condition={
                                 item.person == Object.keys(customerPersons)[0]
                              }
                              trueTitle={Object.values(customerPersons)[0]}
                              falseTitle={Object.values(customerPersons)[1]}
                           />
                        </TableTD>
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
                              href={route("admin.customers.destroy", item.id)}
                              title="Editar"
                           >
                              <i className="text-base align-middle icon-[tabler--edit]"></i>
                           </TableAction>
                           <TableAction
                              href={route("admin.customers.destroy", item.id)}
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
