import PageButton from "@/Components/Admin/PageButton";
import PageTitle from "@/Components/Admin/PageTitle";
import Section from "@/Components/Admin/Section";
import StatusBadge from "@/Components/Admin/StatusBadge";
import TableAction from "@/Components/Admin/TableAction";
import TableEmpty from "@/Components/Admin/TableEmpty";
import TableProductCategory from "@/Components/Admin/TableProductCategory";
import TableSortable from "@/Components/Admin/TableSortable";
import TableTD from "@/Components/Admin/TableTD";
import TableTDActions from "@/Components/Admin/TableTDActions";
import TableTH from "@/Components/Admin/TableTH";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage, useRemember } from "@inertiajs/react";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Index({ auth, commonData, collection }) {
   const [collectionState, setCollectionState] = useState(collection);

   const { url } = usePage();
   const params = new URLSearchParams(window.location.search);
   const entries = Object.fromEntries(params.entries());
   const { data, setData, get, transform, recentlySuccessful } =
      useForm(entries);
   const [formState] = useRemember(entries);

   // console.log(collection);

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

   useEffect(() => {
      setCollectionState(collection);
   }, [recentlySuccessful]);

   transform((data) =>
      Object.fromEntries(
         Object.entries(data).filter(
            ([k, v]) => String(v).length && k != "page"
         )
      )
   );

   const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
   };

   const onDragEnd = (result) => {
      if (!result.destination) {
         return;
      }
      if (result.destination.index === result.source.index) {
         return;
      }

      console.log(result);

      // let newList = reorder(
      //    collectionState[result.destination.droppableId],
      //    result.source.index,
      //    result.destination.index
      // );

      // axios.put(
      //    route("admin.banners_order"),
      //    newList.map((value, index) => ({ id: value.id, ordem: index + 1 }))
      // );

      // collectionState[result.destination.droppableId] = newList;
   };

   return (
      <AuthenticatedLayout
         user={auth.user}
         commonData={commonData}
         header={
            <>
               <PageTitle title="Categorias" />
               <PageButton
                  href={route("admin.product_categories.create")}
                  title="Cadastrar Novo"
               />
            </>
         }
      >
         <Head title="Categorias" />

         <Section>
            <TableSortable
               ths={
                  <>
                     <TableTH children="Ordem" width="10%" />
                     <TableTH children="Título" width="20%" />
                     <TableTH children="Cadastrado" width="20%" />
                     <TableTH children="Alterado" width="20%" />
                     <TableTH children="Status" width="10%" />
                     <TableTH children="Ações" width="20%" />
                  </>
               }
            >
               {collection.length ? (
                  collection.map((item, index) => (
                     <TableProductCategory
                        key={index}
                        item={item}
                        index={index}
                        onDragEnd={onDragEnd}
                        commonData={commonData}
                     />
                  ))
               ) : (
                  <TableEmpty />
               )}
            </TableSortable>
         </Section>
      </AuthenticatedLayout>
   );
}
