export default function TableSortable({
   children,
   ths = null,
}) {
   return (
      <div className="w-full overflow-x-auto bg-white shadow-md sm:rounded-lg">
         <table className="w-full text-sm text-left text-gray-500">
            {ths && (
               <thead
                  className={`text-xs text-gray-700 uppercase bg-gray-50`}
               >
                  <tr>{ths}</tr>
               </thead>
            )}
            {children}
         </table>
      </div>
   );
}
