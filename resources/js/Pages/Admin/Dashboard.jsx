import PageTitle from "@/Components/Admin/PageTitle";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth, commonData }) {
   return (
      <AuthenticatedLayout
         user={auth.user}
         commonData={commonData}
         header={<PageTitle title="Painel Administrativo" />}
      >
         <Head title="Painel Administrativo" />

         <div className="bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">You're logged in!</div>
         </div>
      </AuthenticatedLayout>
   );
}
