import { Link } from "@inertiajs/react";
import { useEffect, useState, Suspense, lazy } from "react";
import PlaceholderNavItem from "./PlaceholderNavItem";

export default function NavItem({ placeholder, module, commonData }) {
   // const [ModuleNavItem, setModuleNavItem] = useState(() => PlaceholderNavItem);

   // useEffect(async () => {
   //    let { default: NewModuleNavItem } = await import(
   //       "@modules/Contact/Resources/js/Components/Admin/NavItem"
   //    );
   //    setModuleNavItem(NewModuleNavItem);
   // }, []);
   const ModuleNavItem = lazy(() =>
      import(
         /* @vite-ignore */ `@modules/${module}/Resources/js/Components/Admin/NavItem`
      )
   );

   return (
      <Suspense fallback={<PlaceholderNavItem title={placeholder} />}>
         <ModuleNavItem commonData={commonData} />
      </Suspense>
   );
}
