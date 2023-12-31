import dayjs from "dayjs";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import StatusBadge from "../../../../../../resources/js/Components/Admin/StatusBadge";
import TableAction from "../../../../../../resources/js/Components/Admin/TableAction";
import TableActionDisabled from "../../../../../../resources/js/Components/Admin/TableActionDisabled";
import TableSortable from "../../../../../../resources/js/Components/Admin/TableSortable";
import TableTD from "../../../../../../resources/js/Components/Admin/TableTD";
import TableTDActions from "../../../../../../resources/js/Components/Admin/TableTDActions";
import TableTH from "../../../../../../resources/js/Components/Admin/TableTH";

export default function TableProductCategory({
   item,
   index,
   commonData,
   first = false,
}) {
   const [openSubItems, setOpenSubItems] = useState(false);

   const handleSubItems = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setOpenSubItems(!openSubItems);
   };

   return (
      <Draggable
         key={item.id}
         draggableId={`draggable-${item.id}`}
         index={index}
         isDragDisabled={openSubItems}
      >
         {(provided) => (
            <tr
               ref={provided.innerRef}
               {...provided.draggableProps}
               {...provided.dragHandleProps}
               className="bg-white border-b"
            >
               <TableTD colSpan="99" classes={!first ? "px-6 py-4" : ""}>
                  <div className="flex">
                     <TableSortable
                        tableOnly
                        ths={
                           <>
                              <TableTH
                                 children="Ordem"
                                 width="10%"
                                 hidden={true}
                              />
                              <TableTH
                                 children="Título"
                                 width="20%"
                                 hidden={true}
                              />
                              <TableTH
                                 children="Cadastrado"
                                 width="20%"
                                 hidden={true}
                              />
                              <TableTH
                                 children="Alterado"
                                 width="20%"
                                 hidden={true}
                              />
                              <TableTH
                                 children="Status"
                                 width="10%"
                                 hidden={true}
                              />
                              <TableTH
                                 children="Ações"
                                 width="20%"
                                 hidden={true}
                              />
                           </>
                        }
                     >
                        <tbody>
                           <tr>
                              <TableTD
                                 classes="ordemNumber px-6 py-4"
                                 children={
                                    <>
                                       <i className="mr-3 text-base align-middle icon-[tabler--arrows-up-down]"></i>
                                       <span className="text-xl">
                                          {index + 1}
                                       </span>
                                    </>
                                 }
                              />
                              <TableTD main={true} children={item.name} />
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
                                       Object.keys(
                                          commonData.defaultStatuses
                                       )[0]
                                    }
                                    trueTitle="Ativo"
                                    falseTitle="Inativo"
                                 />
                              </TableTD>
                              <TableTDActions classes="flex justify-end items-center">
                                 <TableAction
                                    href={route(
                                       "admin.product_categories.edit",
                                       item.id
                                    )}
                                    title="Editar"
                                 >
                                    <i className="text-base align-middle icon-[tabler--edit]"></i>
                                 </TableAction>
                                 <TableAction
                                    href={route(
                                       "admin.product_categories.destroy",
                                       item.id
                                    )}
                                    title="Excluir"
                                    isDestroy={true}
                                    destroyPreserveState={false}
                                 >
                                    <i className="text-base align-middle icon-[tabler--trash]"></i>
                                 </TableAction>
                                 {item.all_childs.length ? (
                                    <TableAction
                                       title="Subcategorias"
                                       onClick={(e) => handleSubItems(e)}
                                    >
                                       <i className="text-base align-middle icon-[tabler--chevron-down]"></i>
                                    </TableAction>
                                 ) : (
                                    <TableActionDisabled>
                                       <i className="text-base align-middle icon-[tabler--chevron-down]"></i>
                                    </TableActionDisabled>
                                 )}
                              </TableTDActions>
                           </tr>
                           {item.all_childs.length > 0 && openSubItems && (
                              <tr className={`bg-gray-100`}>
                                 <TableTD colSpan="99" classes="py-1">
                                    <TableSortable
                                       tableOnly
                                       ths={
                                          <>
                                             <TableTH
                                                children="Ordem"
                                                width="10%"
                                                hidden={true}
                                             />
                                             <TableTH
                                                children="Título"
                                                width="20%"
                                                hidden={true}
                                             />
                                             <TableTH
                                                children="Cadastrado"
                                                width="20%"
                                                hidden={true}
                                             />
                                             <TableTH
                                                children="Alterado"
                                                width="20%"
                                                hidden={true}
                                             />
                                             <TableTH
                                                children="Status"
                                                width="10%"
                                                hidden={true}
                                             />
                                             <TableTH
                                                children="Ações"
                                                width="20%"
                                                hidden={true}
                                             />
                                          </>
                                       }
                                    >
                                       <DragDropContext>
                                          <Droppable
                                             droppableId={`droppable-${item.id}`}
                                          >
                                             {(provided) => (
                                                <tbody ref={provided.innerRef}>
                                                   {item.all_childs.map(
                                                      (subitem, subindex) => (
                                                         <TableProductCategory
                                                            key={subindex}
                                                            item={subitem}
                                                            index={subindex}
                                                            commonData={
                                                               commonData
                                                            }
                                                         />
                                                      )
                                                   )}
                                                   {provided.placeholder}
                                                </tbody>
                                             )}
                                          </Droppable>
                                       </DragDropContext>
                                    </TableSortable>
                                 </TableTD>
                              </tr>
                           )}
                        </tbody>
                     </TableSortable>
                  </div>
               </TableTD>
            </tr>
         )}
      </Draggable>
   );
}
