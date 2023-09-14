import FormSelectOption from "@/Components/Admin/FormSelectOption";

export default function FormSelectCategoryOption({
   category,
   treeList,
   count = 1,
}) {
   let levelStr = "";
   for (let x = 0; x < count; x++) {
      levelStr += "-";
   }
   count++;

   return (
      <>
         <FormSelectOption
            inpValue={category.id}
            title={`${levelStr} ${category.name}`}
            disabled={treeList.includes(category.id)}
         />
         {Object.keys(category.all_childs).map((subCategoryKey) => (
            <FormSelectCategoryOption
               key={subCategoryKey}
               category={category.all_childs[subCategoryKey]}
               treeList={treeList}
               count={count}
            />
         ))}
      </>
   );
}
