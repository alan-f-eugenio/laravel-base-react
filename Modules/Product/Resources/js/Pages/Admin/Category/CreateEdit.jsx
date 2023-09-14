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
import FormTextArea from "@/Components/Admin/FormTextArea";
import FormSelectCategoryOption from "../../../Components/Admin/FormSelectCategoryOption";

export default function CreateEdit({
   auth,
   commonData,
   item,
   categories,
   treeList,
}) {
   const { data, setData, post, transform, errors, processing } = useForm(
      Object.fromEntries(
         Object.entries(item).filter(([k, v]) => k != "filename")
      )
   );

   // console.log(categories);
   // console.log(treeList);

   transform((data) => {
      let newData = data;
      if (!newData.status) {
         newData = {
            ...newData,
            status: Object.keys(commonData.defaultStatuses)[0],
         };
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
            ? route("admin.product_categories.update", item.id)
            : route("admin.product_categories.store"),
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
               <PageTitle title="Categorias">
                  <PageSubTitle subtitle={item.id ? "Alterar" : "Cadastrar"} />
               </PageTitle>
               <PageButton
                  href={route("admin.product_categories.index")}
                  title="Listar Categorias"
               />
            </>
         }
      >
         <Head title="Categorias" />

         <Section>
            <Form
               processing={processing}
               editing={Boolean(item.id)}
               hasFiles={true}
               handleSubmit={handleSubmit}
            >
               <FormImage filename={item.filename} />
               <Grid gridCols="sm:grid-cols-2">
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
                  <FormLabel
                     inpName="id_parent"
                     title="Categoria Pai"
                     errors={errors}
                  >
                     <FormSelect
                        inpName="id_parent"
                        data={data.id_parent}
                        setData={setData}
                        required
                     >
                        <FormSelectOption inpValue="0" title="Principal" />
                        {Object.keys(categories).map((categoryKey) => (
                           <FormSelectCategoryOption
                              key={categoryKey}
                              category={categories[categoryKey]}
                              treeList={treeList}
                           />
                        ))}
                     </FormSelect>
                  </FormLabel>
                  <FormLabel inpName="name" title="Nome" errors={errors}>
                     <FormInput
                        inpName="name"
                        inpValue={data.name}
                        placeholder="Nome da categoria"
                        setData={setData}
                        required
                     />
                  </FormLabel>
                  <FormLabel
                     inpName="page_title"
                     title="Título da Página (SEO)"
                     errors={errors}
                  >
                     <FormInput
                        inpName="page_title"
                        inpValue={data.page_title}
                        placeholder="Page title"
                        setData={setData}
                     />
                  </FormLabel>
                  <FormLabel
                     inpName="page_meta_keywords"
                     title="Palavras Chave (SEO)"
                     errors={errors}
                  >
                     <FormInput
                        inpName="page_meta_keywords"
                        inpValue={data.page_meta_keywords}
                        placeholder="Meta keywords"
                        setData={setData}
                     />
                  </FormLabel>
                  <FormLabel
                     inpName="page_meta_description"
                     title="Descrição (SEO)"
                     errors={errors}
                  >
                     <FormInput
                        inpName="page_meta_description"
                        inpValue={data.page_meta_description}
                        placeholder="Meta description"
                        setData={setData}
                     />
                  </FormLabel>
                  <FormLabel inpName="text" title="Descrição" errors={errors}>
                     <FormTextArea
                        inpName="text"
                        inpValue={data.text}
                        placeholder="Descrição da categoria"
                        setData={setData}
                     />
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
