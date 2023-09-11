import Filter from "@/Components/Admin/Filter";
import FilterInput from "@/Components/Admin/FilterInput";
import FilterSelect from "@/Components/Admin/FilterSelect";
import FilterSelectOption from "@/Components/Admin/FilterSelectOption";
import PageTitle from "@/Components/Admin/PageTitle";
import Section from "@/Components/Admin/Section";
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
         header={<PageTitle title="Carrinhos Abandonados" />}
      >
         <Head title="Carrinhos Abandonados" />

         <Section>
            <Filter gridCols="sm:grid-cols-3" setData={setData}>
               <FilterSelect
                  title="Cliente"
                  inpName="has_customer"
                  data={data.has_customer}
                  setData={setData}
               >
                  <FilterSelectOption inpValue="1" title="Identificado" />
                  <FilterSelectOption inpValue="2" title="Não Identificado" />
               </FilterSelect>
               <FilterInput
                  inpName="name"
                  title="Nome"
                  placeholder="Nome do cliente"
                  data={data.name}
                  setData={setData}
               />
               <FilterInput
                  type="date"
                  inpName="date"
                  title="Data"
                  placeholder="Data do carrinho"
                  data={data.date}
                  setData={setData}
               />
            </Filter>
            <Table
               collection={collection}
               ths={
                  <>
                     <TableTH children="Data do Carrinho" />
                     <TableTH children="Cliente" />
                     <TableTH children="Cupom" />
                     <TableTH children="Frete" />
                     <TableTH children="Produtos" />
                     <TableTH children="Ações" />
                  </>
               }
            >
               {collection.data.length ? (
                  collection.data.map((item, index) => (
                     <tr key={index} className="bg-white border-b">
                        <TableTD
                           main={true}
                           children={dayjs(item.updated_at).format(
                              "D[/]MM[/]YYYY HH[:]mm[:]ss"
                           )}
                        />
                        <TableTD children={""} />
                        <TableTD children={""} />
                        <TableTD children={""} />
                        <TableTD children={""} />
                        <TableTDActions>
                           <TableAction
                              href={route("admin.carts.destroy", item.id)}
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
