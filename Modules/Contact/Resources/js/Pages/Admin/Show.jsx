import FormInput from "@/Components/Admin/FormInput";
import FormLabel from "@/Components/Admin/FormLabel";
import FormTextArea from "@/Components/Admin/FormTextArea";
import Grid from "@/Components/Admin/Grid";
import PageButton from "@/Components/Admin/PageButton";
import PageSubTitle from "@/Components/Admin/PageSubTitle";
import PageTitle from "@/Components/Admin/PageTitle";
import Section from "@/Components/Admin/Section";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Show({ auth, adminData, item }) {
   return (
      <AuthenticatedLayout
         user={auth.user}
         adminData={adminData}
         header={
            <>
               <PageTitle title="Contatos">
                  <PageSubTitle subtitle="Visualizar" />
               </PageTitle>
               <PageButton
                  href={route("admin.contacts.index")}
                  title="Listar Contatos"
               />
            </>
         }
      >
         <Head title="Contatos" />

         <Section>
            <Grid
               classes="p-6 bg-white shadow-sm sm:rounded-lg"
               gridCols="sm:grid-cols-2"
            >
               <FormLabel inpName="name" title="Nome">
                  <FormInput inpName="name" inpValue={item.name} readOnly />
               </FormLabel>
               <FormLabel inpName="email" title="E-mail">
                  <FormInput inpName="email" inpValue={item.email} readOnly />
               </FormLabel>
               <FormLabel inpName="subject" title="Assunto">
                  <FormInput
                     inpName="subject"
                     inpValue={item.subject}
                     readOnly
                  />
               </FormLabel>
               <FormLabel inpName="phone" title="Telefone">
                  <FormInput inpName="phone" inpValue={item.phone} readOnly />
               </FormLabel>
               <FormLabel
                  inpName="message"
                  title="Telefone"
                  className="sm:col-span-2"
               >
                  <FormTextArea
                     inpName="message"
                     inpValue={item.message}
                     rows="10"
                     readOnly
                  />
               </FormLabel>
            </Grid>
         </Section>
      </AuthenticatedLayout>
   );
}
