export default function TableTH({
   children,
   classes = "",
   hidden = false,
   ...props
}) {
   return (
      <th
         scope="col"
         className={`${classes} px-6 py-3`}
         style={
            hidden
               ? {
                    paddingTop: 0,
                    paddingBottom: 0,
                    lineHeight: 0,
                    visibility: "hidden",
                 }
               : {}
         }
         {...props}
      >
         {children}
      </th>
   );
}
