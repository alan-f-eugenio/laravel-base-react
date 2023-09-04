import Form from "@/Components/Admin/Form";
import FormInput from "@/Components/Admin/FormInput";
import FormLabel from "@/Components/Admin/FormLabel";
import FormSelect from "@/Components/Admin/FormSelect";
import FormSelectOption from "@/Components/Admin/FormSelectOption";
import Grid from "@/Components/Admin/Grid";
import PageButton from "@/Components/Admin/PageButton";
import PageSubTitle from "@/Components/Admin/PageSubTitle";
import PageTitle from "@/Components/Admin/PageTitle";
import Section from "@/Components/Admin/Section";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function CreateEdit({ auth, commonData, item }) {
   const { data, setData, submit, transform, errors, reset, processing } =
      useForm(item);

   transform((data) => {
      let newData = data;
      if (!data.status) {
         newData = {
            ...data,
            status: Object.keys(commonData.defaultStatuses)[0],
         };
      }
      return newData;
   });

   const handleSubmit = (e) => {
      e.preventDefault();
      submit(
         item.id ? "put" : "post",
         item.id
            ? route("admin.contentNavs.update", item.id)
            : route("admin.contentNavs.store"),
         {
            onSuccess: () => reset(),
         }
      );
   };

   return (
      <AuthenticatedLayout
         user={auth.user}
         commonData={commonData}
         header={
            <>
               <PageTitle title="Páginas de Conteúdo">
                  <PageSubTitle subtitle={item.id ? "Alterar" : "Cadastrar"} />
               </PageTitle>
               <PageButton
                  href={route("admin.contentNavs.index")}
                  title="Listar Páginas de Conteúdo"
               />
            </>
         }
      >
         <Head title="Páginas de Conteúdo" />

         <Section>
            <Form
               processing={processing}
               editing={Boolean(item.id)}
               handleSubmit={handleSubmit}
            >
               <Grid gridCols="">
                  <FormLabel inpName="status" title="Status" errors={errors}>
                     <FormSelect
                        inpName="status"
                        data={data.status}
                        setData={setData}
                        required
                     >
                        {Object.keys(commonData.defaultStatuses).map(
                           (statusKey) => (
                              <FormSelectOption
                                 key={statusKey}
                                 inpValue={statusKey}
                                 title={commonData.defaultStatuses[statusKey]}
                              />
                           )
                        )}
                     </FormSelect>
                  </FormLabel>
                  <FormLabel inpName="title" title="Título" errors={errors}>
                     <FormInput
                        inpName="title"
                        inpValue={data.title}
                        placeholder="Título da página de conteúdo"
                        setData={setData}
                        required
                     />
                  </FormLabel>
                  <FormLabel
                     inpName="type"
                     title="Tipo de Conteúdo"
                     errors={errors}
                  >
                     <FormSelect
                        inpName="type"
                        data={data.type}
                        setData={setData}
                     >
                        {Object.keys(commonData.contentNavTypes).map(
                           (navTypeKey) => (
                              <FormSelectOption
                                 key={navTypeKey}
                                 inpValue={navTypeKey}
                                 title={commonData.contentNavTypes[navTypeKey]}
                              />
                           )
                        )}
                     </FormSelect>
                  </FormLabel>
               </Grid>
            </Form>
         </Section>
      </AuthenticatedLayout>
   );
}
