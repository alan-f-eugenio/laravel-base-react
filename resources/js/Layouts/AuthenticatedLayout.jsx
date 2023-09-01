import { useEffect, useState } from "react";
import Notification from "@/Components/Admin/Notification";
import Navigation from "@/Components/Admin/Navigation";

export default function Authenticated({ user, commonData, header, children }) {
   const [flashMessage, setFlashMessage] = useState(commonData.flash.message);

   useEffect(() => {
      setFlashMessage(commonData.flash.message);
   }, [commonData.flash]);

   return (
      <div className="flex flex-col min-h-screen bg-gray-100 xl:flex-row">
         <Navigation commonData={commonData} />

         <div className="flex-1 py-6 space-y-6">
            {header && (
               <header>
                  <div className="container flex flex-col items-center justify-between px-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
                     {header}
                  </div>
               </header>
            )}

            <main className="container px-6">{children}</main>

            {flashMessage && (
               <Notification
                  type={flashMessage.type}
                  text={flashMessage.text}
                  setFlashMessage={setFlashMessage}
               />
            )}
         </div>
      </div>
   );
}
