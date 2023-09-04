import Form from "@/Components/Admin/Form";
import FormImage from "@/Components/Admin/FormImage";
import FormInput from "@/Components/Admin/FormInput";
import FormInputFile from "@/Components/Admin/FormInputFile";
import FormLabel from "@/Components/Admin/FormLabel";
import FormSelect from "@/Components/Admin/FormSelect";
import FormSelectOption from "@/Components/Admin/FormSelectOption";
import Grid from "@/Components/Admin/Grid";
import PageButton from "@/Components/Admin/PageButton";
import PageSubTitle from "@/Components/Admin/PageSubTitle";
import PageTitle from "@/Components/Admin/PageTitle";
import Section from "@/Components/Admin/Section";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/pt-br";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Head, useForm } from "@inertiajs/react";
import axios from "axios";

export default function CreateEdit({ auth, commonData, item, nav }) {
   const { data, setData, post, transform, errors, reset, processing } =
      useForm(
         Object.fromEntries(
            Object.entries(item).filter(([k, v]) => k != "filename")
         )
      );

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
            ? route("admin.contents.update", item.id)
            : route("admin.contents.store", nav.id),
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

   function uploadAdapter(loader) {
      return {
         upload: () => {
            return new Promise((resolve, reject) => {
               const body = new FormData();
               loader.file.then((file) => {
                  body.append("upload", file);
                  axios
                     .post(route("admin.content_images.store"), body)
                     .then((res) => resolve({ default: res.url }))
                     .catch((err) => {
                        reject(err);
                     });
               });
            });
         },
      };
   }
   function uploadPlugin(editor) {
      editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
         return uploadAdapter(loader);
      };
   }

   return (
      <AuthenticatedLayout
         user={auth.user}
         commonData={commonData}
         header={
            <>
               <PageTitle title="Conteúdos">
                  <PageSubTitle subtitle={item.id ? "Alterar" : "Cadastrar"} />
               </PageTitle>
               <PageButton
                  href={route("admin.contents.index", nav.id)}
                  title="Listar Conteúdos"
               />
            </>
         }
      >
         <Head title="Conteúdos" />

         <Section>
            <Form
               processing={processing}
               editing={Boolean(item.id)}
               handleSubmit={handleSubmit}
               hasFiles={true}
            >
               <FormImage filename={item.filename} />
               <Grid gridCols="sm:grid-cols-3">
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
                        placeholder="Título do conteúdo"
                        setData={setData}
                        required
                     />
                  </FormLabel>
                  <FormLabel
                     inpName="subtitle"
                     title="Subtítulo"
                     errors={errors}
                  >
                     <FormInput
                        inpName="subtitle"
                        inpValue={data.subtitle}
                        placeholder="Subtítulo do conteúdo"
                        setData={setData}
                     />
                  </FormLabel>
                  <FormLabel inpName="author" title="Autor" errors={errors}>
                     <FormInput
                        inpName="author"
                        inpValue={data.author}
                        placeholder="Autor do conteúdo"
                        setData={setData}
                     />
                  </FormLabel>
                  <FormLabel
                     inpName="link"
                     title="Link (conteúdo externo)"
                     errors={errors}
                  >
                     <FormInput
                        inpName="link"
                        inpValue={data.link}
                        placeholder="Link do conteúdo"
                        setData={setData}
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
                     title="Meta Descrição (SEO)"
                     errors={errors}
                  >
                     <FormInput
                        inpName="page_meta_description"
                        inpValue={data.page_meta_description}
                        placeholder="Meta description"
                        setData={setData}
                     />
                  </FormLabel>
                  <FormLabel
                     inpName="filename"
                     title={`${item.filename ? "Alterar" : "Cadastrar"} Imagem`}
                     errors={errors}
                  >
                     <FormInputFile inpName="filename" setData={setData} />
                  </FormLabel>
               </Grid>
               <FormLabel inpName="text" title="Texto" errors={errors}>
                  <CKEditor
                     editor={ClassicEditor}
                     data={data.text}
                     onChange={(event, editor) => {
                        const dataCK = editor.getData();
                        setData("text", dataCK);
                     }}
                     config={{
                        language: "pt-br",
                        placeholder: "Texto do conteúdo",
                        extraPlugins: [uploadPlugin],
                     }}
                  />
               </FormLabel>
               <FormLabel inpName="abstract" title="Resumo" errors={errors}>
                  <CKEditor
                     editor={ClassicEditor}
                     data={data.abstract}
                     onChange={(event, editor) => {
                        const dataCK = editor.getData();
                        setData("abstract", dataCK);
                     }}
                     config={{
                        language: "pt-br",
                        placeholder: "Resumo do conteúdo",
                        extraPlugins: [uploadPlugin],
                     }}
                  />
               </FormLabel>
            </Form>
         </Section>
      </AuthenticatedLayout>
   );
}
