import FormSelectOption from "@/Components/Admin/FormSelectOption";
import Form from "@/Components/Admin/Form";
import FormInput from "@/Components/Admin/FormInput";
import FormInputFile from "@/Components/Admin/FormInputFile";
import FormLabel from "@/Components/Admin/FormLabel";
import FormSelect from "@/Components/Admin/FormSelect";
import Grid from "@/Components/Admin/Grid";
import PageButton from "@/Components/Admin/PageButton";
import PageSubTitle from "@/Components/Admin/PageSubTitle";
import PageTitle from "@/Components/Admin/PageTitle";
import Section from "@/Components/Admin/Section";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import FormImage from "@/Components/Admin/FormImage";

export default function CreateEdit({
   auth,
   commonData,
   item,
   bannerLocals,
}) {
   const { data, setData, post, transform, errors, processing } = useForm(
      Object.fromEntries(
         Object.entries(item).filter(([k, v]) => k != "filename")
      )
   );

   transform((data) => {
      let newData = data;
      if (!newData.status) {
         newData = { ...newData, status: Object.keys(commonData.defaultStatuses)[0] };
      }
      if (!newData.local_id) {
         newData = { ...newData, local_id: bannerLocals[0].id };
      }
      if (item.id) {
         newData = { ...newData, _method: "put" };
      }
      return newData;
   });

   const handleSubmit = (e) => {
      e.preventDefault();
      post(
         item.id
            ? route("admin.banners.update", item.id)
            : route("admin.banners.store"),
         {
            onSuccess: () => {
               document.querySelector("input[type=file]").value = "";
               setData(
                  Object.fromEntries(
                     Object.entries(data).filter(([k, v]) => k != "filename")
                  )
               );
            },
         }
      );
   };

   return (
      <AuthenticatedLayout
         user={auth.user}
         commonData={commonData}
         header={
            <>
               <PageTitle title="Banners">
                  <PageSubTitle subtitle={item.id ? "Alterar" : "Cadastrar"} />
               </PageTitle>
               <PageButton
                  href={route("admin.banners.index")}
                  title="Listar Banners"
               />
            </>
         }
      >
         <Head title="Banners" />

         <Section>
            <Form
               processing={processing}
               editing={Boolean(item.id)}
               hasFiles={true}
               handleSubmit={handleSubmit}
            >
               <FormImage filename={item.filename} />
               <Grid gridCols="sm:grid-cols-3">
                  <FormLabel inpName="status" title="Status" errors={errors}>
                     <FormSelect
                        inpName="status"
                        data={data.status}
                        setData={setData}
                     >
                        {Object.keys(commonData.defaultStatuses).map((statusKey) => (
                           <FormSelectOption
                              key={statusKey}
                              inpValue={statusKey}
                              title={commonData.defaultStatuses[statusKey]}
                           />
                        ))}
                     </FormSelect>
                  </FormLabel>
                  <FormLabel inpName="title" title="Título" errors={errors}>
                     <FormInput
                        inpName="title"
                        inpValue={data.title}
                        placeholder="Título do banner"
                        setData={setData}
                        required
                     />
                  </FormLabel>
                  <FormLabel inpName="link" title="Link" errors={errors}>
                     <FormInput
                        inpName="link"
                        inpValue={data.link}
                        placeholder="Link do banner"
                        setData={setData}
                     />
                  </FormLabel>
                  <FormLabel inpName="local_id" title="Local" errors={errors}>
                     <FormSelect
                        inpName="local_id"
                        data={data.local_id}
                        setData={setData}
                        required
                     >
                        {bannerLocals.map((bannerLocal) => (
                           <FormSelectOption
                              key={bannerLocal.id}
                              inpValue={bannerLocal.id}
                              title={bannerLocal.title}
                           />
                        ))}
                     </FormSelect>
                  </FormLabel>
                  <FormLabel
                     inpName="filename"
                     title={`${item.id ? "Alterar" : "Cadastrar"} Imagem`}
                     errors={errors}
                  >
                     <FormInputFile
                        inpName="filename"
                        setData={setData}
                        required={!item.id}
                     />
                  </FormLabel>
               </Grid>
            </Form>
         </Section>
      </AuthenticatedLayout>
   );
}
