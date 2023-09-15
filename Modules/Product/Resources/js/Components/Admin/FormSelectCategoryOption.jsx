import FormSelectOption from "@/Components/Admin/FormSelectOption";

export default function FormSelectCategoryOption({
   category,
   treeList,
   level,
}) {
   let levelSpace = "";
   let countSpace = level.split(".");
   for (let x = 0; x < countSpace.length; x++) {
      levelSpace += "\u00a0";
   }

   return (
      <>
         <FormSelectOption
            inpValue={category.id}
            title={`${levelSpace}${level} - ${category.name}`}
            disabled={treeList.includes(category.id)}
         />
         {Object.keys(category.all_childs).map((subCategoryKey) => (
            <FormSelectCategoryOption
               key={subCategoryKey}
               category={category.all_childs[subCategoryKey]}
               treeList={treeList}
               level={`${level}.${parseInt(subCategoryKey) + 1}`}
            />
         ))}
      </>
   );
}
