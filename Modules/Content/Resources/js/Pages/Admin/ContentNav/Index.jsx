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
               <PageTitle title="Páginas de Conteúdo" />
               <PageButton
                  href={route("admin.contentNavs.create")}
                  title="Cadastrar Novo"
               />
            </>
         }
      >
         <Head title="Páginas de Conteúdo" />

         <Section></Section>
      </AuthenticatedLayout>
   );
}
