import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TableTD from "./TableTD";
import StatusBadge from "./StatusBadge";
import TableTDActions from "./TableTDActions";
import TableAction from "./TableAction";

export default function TableProductCategory({
   item,
   index,
   onDragEnd,
   commonData,
}) {
   return (
      <DragDropContext onDragEnd={onDragEnd}>
         <Droppable droppableId={item.id}>
            {(provided) => (
               <tbody ref={provided.innerRef}>
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
                        ></tr>
                     )}
                  </Draggable>
                  {provided.placeholder}
               </tbody>
            )}
         </Droppable>
      </DragDropContext>
   );
}
