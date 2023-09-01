import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import PageTitle from "@/Components/Admin/PageTitle";
import Section from "@/Components/Admin/Section";

export default function Edit({ auth, commonData, mustVerifyEmail, status }) {
   return (
      <AuthenticatedLayout
         user={auth.user}
         commonData={commonData}
         header={<PageTitle title="Perfil" />}
      >
         <Head title="Perfil" />

         <Section>
            <div className="p-4 bg-white shadow sm:p-8 sm:rounded-lg">
               <UpdateProfileInformationForm
                  mustVerifyEmail={mustVerifyEmail}
                  status={status}
                  className="max-w-xl"
               />
            </div>

            <div className="p-4 bg-white shadow sm:p-8 sm:rounded-lg">
               <UpdatePasswordForm className="max-w-xl" />
            </div>

            <div className="p-4 bg-white shadow sm:p-8 sm:rounded-lg">
               <DeleteUserForm className="max-w-xl" />
            </div>
         </Section>
      </AuthenticatedLayout>
   );
}
