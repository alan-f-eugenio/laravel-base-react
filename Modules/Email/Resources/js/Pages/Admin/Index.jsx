import FilterInput from "@/Components/Admin/FilterInput";
import Filter from "@/Components/Admin/Filter";
import PageTitle from "@/Components/Admin/PageTitle";
import Section from "@/Components/Admin/Section";
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

export default function Index({ auth, adminData, collection }) {
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
         adminData={adminData}
         header={<PageTitle title="Lista de E-mails" />}
      >
         <Head title="Lista de E-mails" />

         <Section>
            <Filter gridCols="sm:grid-cols-2">
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
            </Filter>
            <Table
               collection={collection}
               ths={
                  <>
                     <TableTH children="Nome" />
                     <TableTH children="E-mail" />
                     <TableTH children="Cadastrado" />
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
                        <TableTDActions>
                           <TableAction
                              href={route("admin.emails.destroy", item.id)}
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
