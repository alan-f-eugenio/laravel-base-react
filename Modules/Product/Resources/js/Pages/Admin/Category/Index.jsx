import PageButton from "@/Components/Admin/PageButton";
import PageTitle from "@/Components/Admin/PageTitle";
import Section from "@/Components/Admin/Section";
import TableSortable from "@/Components/Admin/TableSortable";
import TableTH from "@/Components/Admin/TableTH";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import TableProductCategory from "../../../Components/Admin/TableProductCategory";

export default function Index({ auth, commonData, collection }) {
   const [collectionState, setCollectionState] = useState(collection);

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
      //    collectionState,
      //    result.source.index,
      //    result.destination.index
      // );

      // axios.put(
      //    route("admin.banners_order"),
      //    newList.map((value, index) => ({ id: value.id, ordem: index + 1 }))
      // );

      // setCollectionState(newList);
   };

   const [items, setItems] = useState([
      {
         id: 1,
         children: [
            { id: 2, children: [] },
            { id: 3, children: [] },
         ],
      },
      { id: 4, children: [] },
   ]);

   function handleDragEnd(event, list, setList) {
      const { active, over } = event;

      if (active.id !== over.id) {
         setList((list) => {
            const oldIndex = list.indexOf(active.id);
            const newIndex = list.indexOf(over.id);

            return arrayMove(list, oldIndex, newIndex);
         });
      }
   }

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
               {collectionState.length ? (
                  <DragDropContext onDragEnd={onDragEnd}>
                     <Droppable droppableId="droppable-0">
                        {(provided) => (
                           <tbody ref={provided.innerRef}>
                              {collectionState.map((item, index) => (
                                 <TableProductCategory
                                    key={index}
                                    item={item}
                                    index={index}
                                    commonData={commonData}
                                    first
                                 />
                              ))}
                              {provided.placeholder}
                           </tbody>
                        )}
                     </Droppable>
                  </DragDropContext>
               ) : (
                  <TableEmpty />
               )}
            </TableSortable>
         </Section>
      </AuthenticatedLayout>
   );
}
