function Structure({ children, tableOnly }) {
   if (!tableOnly) {
      return (
         <div className="w-full overflow-x-auto bg-white shadow-md sm:rounded-lg">
            {children}
         </div>
      );
   }
   return <>{children}</>;
}

export default function TableSortable({
   children,
   ths = null,
   tableOnly = false,
}) {
   return (
      <Structure tableOnly={tableOnly}>
         <table className="w-full text-sm text-left text-gray-500">
            {ths && (
               <thead
                  className={`${
                     tableOnly && "hidden"
                  } text-xs text-gray-700 uppercase bg-gray-50`}
               >
                  <tr>{ths}</tr>
               </thead>
            )}
            {children}
         </table>
      </Structure>
   );
}
