import Filter from "@/Components/Admin/Filter";
import FilterInput from "@/Components/Admin/FilterInput";
import FilterSelect from "@/Components/Admin/FilterSelect";
import FilterSelectOption from "@/Components/Admin/FilterSelectOption";
import FormSubtitle from "@/Components/Admin/FormSubtitle";
import PageButton from "@/Components/Admin/PageButton";
import PageTitle from "@/Components/Admin/PageTitle";
import Section from "@/Components/Admin/Section";
import StatusBadge from "@/Components/Admin/StatusBadge";
import TableAction from "@/Components/Admin/TableAction";
import TableActionVisualize from "@/Components/Admin/TableActionVisualize";
import TableEmpty from "@/Components/Admin/TableEmpty";
import TableSortable from "@/Components/Admin/TableSortable";
import TableTD from "@/Components/Admin/TableTD";
import TableTDActions from "@/Components/Admin/TableTDActions";
import TableTH from "@/Components/Admin/TableTH";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage, useRemember } from "@inertiajs/react";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function Index({ auth, commonData, bannerLocals, collection }) {
   const [collectionState, setCollectionState] = useState(collection);

   const { url } = usePage();
   const params = new URLSearchParams(window.location.search);
   const entries = Object.fromEntries(params.entries());
   const { data, setData, get, transform, recentlySuccessful } =
      useForm(entries);
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
      console.log(result)
      if (!result.destination) {
         return;
      }
      if (result.destination.index === result.source.index) {
         return;
      }

      console.log(collectionState)

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
               <PageTitle title="Banners" />
               <PageButton
                  href={route("admin.banners.create")}
                  title="Cadastrar Novo"
               />
            </>
         }
      >
         <Head title="Banners" />

         <Section>
            <Filter  gridCols="sm:grid-cols-3" setData={setData}>
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
                  placeholder="Título do banner"
                  data={data.title}
                  setData={setData}
               />
               <FilterSelect
                  title="Local"
                  inpName="local_id"
                  data={data.local_id}
                  setData={setData}
               >
                  {bannerLocals.map((bannerLocal) => (
                     <FilterSelectOption
                        key={bannerLocal.id}
                        inpValue={bannerLocal.id}
                        title={bannerLocal.title}
                     />
                  ))}
               </FilterSelect>
            </Filter>
            {Object.keys(collectionState).map((local, localIndex) => (
               <div className="space-y-6" key={localIndex}>
                  <FormSubtitle title={local} />
                  <TableSortable
                     ths={
                        <>
                           <TableTH children="Ordem" />
                           <TableTH children="Título" />
                           <TableTH children="Local" />
                           <TableTH children="Cadastrado" />
                           <TableTH children="Alterado" />
                           <TableTH children="Status" />
                           <TableTH children="Ações" />
                        </>
                     }
                  >
                     <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId={local}>
                           {(provided) => (
                              <tbody ref={provided.innerRef}>
                                 {collectionState[local].length ? (
                                    collectionState[local].map(
                                       (item, index) => (
                                          <Draggable
                                             key={item.id}
                                             draggableId={`draggable-${item.id}`}
                                             index={index}
                                          >
                                             {(provided) => (
                                                <tr
                                                   ref={provided.innerRef}
                                                   {...provided.draggableProps}
                                                   {...provided.dragHandleProps}
                                                   className="bg-white border-b"
                                                >
                                                   <TableTD
                                                      classes="ordemNumber cursor-grab px-6 py-4"
                                                      children={
                                                         <>
                                                            <i className="mr-3 text-base align-middle icon-[tabler--arrows-up-down]"></i>
                                                            <span className="text-xl">
                                                               {index + 1}
                                                            </span>
                                                         </>
                                                      }
                                                   />
                                                   <TableTD
                                                      main={true}
                                                      children={item.title}
                                                   />
                                                   <TableTD
                                                      children={
                                                         item.local.title
                                                      }
                                                   />
                                                   <TableTD
                                                      children={dayjs(
                                                         item.created_at
                                                      ).format(
                                                         "D[/]MM[/]YYYY HH[:]mm[:]ss"
                                                      )}
                                                   />
                                                   <TableTD
                                                      children={
                                                         item.updated_at !=
                                                         item.created_at
                                                            ? dayjs(
                                                                 item.updated_at
                                                              ).format(
                                                                 "D[/]MM[/]YYYY HH[:]mm[:]ss"
                                                              )
                                                            : "Nunca"
                                                      }
                                                   />
                                                   <TableTD>
                                                      <StatusBadge
                                                         condition={
                                                            item.status ==
                                                            Object.keys(
                                                               commonData.defaultStatuses
                                                            )[0]
                                                         }
                                                         trueTitle="Ativo"
                                                         falseTitle="Inativo"
                                                      />
                                                   </TableTD>
                                                   <TableTDActions>
                                                      <TableActionVisualize
                                                         filename={
                                                            item.filename
                                                         }
                                                         title="Visualizar"
                                                      >
                                                         <i className="text-base align-middle icon-[tabler--eye]"></i>
                                                      </TableActionVisualize>
                                                      <TableAction
                                                         href={route(
                                                            "admin.banners.edit",
                                                            item.id
                                                         )}
                                                         title="Editar"
                                                      >
                                                         <i className="text-base align-middle icon-[tabler--edit]"></i>
                                                      </TableAction>
                                                      <TableAction
                                                         href={route(
                                                            "admin.banners.destroy",
                                                            item.id
                                                         )}
                                                         title="Excluir"
                                                         isDestroy={true}
                                                         destroyPreserveState={
                                                            false
                                                         }
                                                      >
                                                         <i className="text-base align-middle icon-[tabler--trash]"></i>
                                                      </TableAction>
                                                   </TableTDActions>
                                                </tr>
                                             )}
                                          </Draggable>
                                       )
                                    )
                                 ) : (
                                    <TableEmpty />
                                 )}
                                 {provided.placeholder}
                              </tbody>
                           )}
                        </Droppable>
                     </DragDropContext>
                  </TableSortable>
               </div>
            ))}
         </Section>
      </AuthenticatedLayout>
   );
}
