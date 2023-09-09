import { useState } from "react";
import PlaceholderNavItem from "./PlaceholderNavItem";

export default function NavItem({ placeholder, module, commonData }) {
   const [ModuleNavItem, setModuleNavItem] = useState(() => PlaceholderNavItem);

   (async () => {
      let { default: newModuleNavItem } = await import(
         `../../../../Modules/${module}/Resources/js/Components/Admin/NavItem.jsx`
      );
      setModuleNavItem(() => newModuleNavItem);
   })();

   return <ModuleNavItem placeholder={placeholder} commonData={commonData} />;
}
