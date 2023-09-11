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
   couponDiscountTypes,
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
               <PageTitle title="Cupons" />
               <PageButton
                  href={route("admin.coupons.create")}
                  title="Cadastrar Novo"
               />
            </>
         }
      >
         <Head title="Cupons" />

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
                  inpName="token"
                  title="Token"
                  placeholder="Token do cupom"
                  data={data.token}
                  setData={setData}
               />
               <FilterSelect
                  title="Tipo de Desconto"
                  inpName="discount_type"
                  data={data.discount_type}
                  setData={setData}
               >
                  {Object.keys(couponDiscountTypes).map((typeKey) => (
                     <FilterSelectOption
                        key={typeKey}
                        inpValue={typeKey}
                        title={couponDiscountTypes[typeKey]}
                     />
                  ))}
               </FilterSelect>
            </Filter>
            <Table
               collection={collection}
               ths={
                  <>
                     <TableTH children="Token" />
                     <TableTH children="Descrição" />
                     <TableTH children="Tipo de Desconto" />
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
                        <TableTD main={true} children={item.token} />
                        <TableTD children={item.description} />
                        <TableTD>
                           <StatusBadge
                              condition={
                                 item.discount_type ==
                                 Object.keys(couponDiscountTypes)[0]
                              }
                              trueTitle={Object.values(couponDiscountTypes)[0]}
                              falseTitle={Object.values(couponDiscountTypes)[1]}
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
                              href={route("admin.coupons.destroy", item.id)}
                              title="Editar"
                           >
                              <i className="text-base align-middle icon-[tabler--edit]"></i>
                           </TableAction>
                           <TableAction
                              href={route("admin.coupons.destroy", item.id)}
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
