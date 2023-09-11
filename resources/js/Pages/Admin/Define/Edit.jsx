import Form from "@/Components/Admin/Form";
import FormInput from "@/Components/Admin/FormInput";
import FormLabel from "@/Components/Admin/FormLabel";
import FormSubtitle from "@/Components/Admin/FormSubtitle";
import FormTextArea from "@/Components/Admin/FormTextArea";
import Grid from "@/Components/Admin/Grid";
import PageSubTitle from "@/Components/Admin/PageSubTitle";
import PageTitle from "@/Components/Admin/PageTitle";
import Section from "@/Components/Admin/Section";
import {
   cepMaskOptions,
   cnpjMaskOptions,
   phoneMaskOptions,
   whatsMaskOptions,
} from "@/Helpers/utils";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Inputmask from "inputmask";

export default function Edit({ auth, commonData, item }) {
   const { data, setData, put, errors, processing } = useForm(item);

   const handleSubmit = (e) => {
      e.preventDefault();
      put(route("admin.defines.update"));
   };

   Inputmask(cnpjMaskOptions).mask(document.querySelectorAll("#company_cnpj"));
   Inputmask(cepMaskOptions).mask(document.querySelectorAll("#company_cep"));
   Inputmask(phoneMaskOptions).mask(
      document.querySelectorAll("#company_phone")
   );
   Inputmask(whatsMaskOptions).mask(
      document.querySelectorAll("#company_whats")
   );

   return (
      <AuthenticatedLayout
         user={auth.user}
         commonData={commonData}
         header={
            <PageTitle title="Definições">
               <PageSubTitle subtitle="Alterar" />
            </PageTitle>
         }
      >
         <Head title="Definições" />

         <Section>
            <Form
               processing={processing}
               editing={Boolean(item.id)}
               handleSubmit={handleSubmit}
            >
               <Grid gridCols="sm:grid-cols-3">
                  <FormSubtitle title="Otimização (SEO)" />
                  <FormLabel
                     inpName="page_title"
                     title="Título da Página"
                     errors={errors}
                  >
                     <FormInput
                        inpName="page_title"
                        inpValue={data.page_title}
                        placeholder="Page title"
                        setData={setData}
                        required
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
                  <FormSubtitle title="Dados da Empresa" />
                  <FormLabel
                     inpName="company_name"
                     title="Nome da Empresa"
                     errors={errors}
                  >
                     <FormInput
                        inpName="company_name"
                        inpValue={data.company_name}
                        placeholder="Nome da empresa"
                        setData={setData}
                        required
                     />
                  </FormLabel>
                  <FormLabel
                     inpName="company_corporate_name"
                     title="Razão Social"
                     errors={errors}
                  >
                     <FormInput
                        inpName="company_corporate_name"
                        inpValue={data.company_corporate_name}
                        placeholder="Razão social"
                        setData={setData}
                        required
                     />
                  </FormLabel>
                  <FormLabel
                     inpName="company_cnpj"
                     title="CNPJ"
                     errors={errors}
                  >
                     <FormInput
                        inpName="company_cnpj"
                        inpValue={data.company_cnpj}
                        placeholder="00.000.000/0000-00"
                        setData={setData}
                        required
                     />
                  </FormLabel>
                  <FormLabel
                     inpName="company_email"
                     title="E-mail do site"
                     errors={errors}
                  >
                     <FormInput
                        inpName="company_email"
                        inpValue={data.company_email}
                        placeholder="email@empresa.com.br"
                        type="email"
                        setData={setData}
                        required
                     />
                  </FormLabel>
                  <FormLabel
                     inpName="company_cep"
                     title="CEP (Para Cálculo de Frete)"
                     errors={errors}
                  >
                     <FormInput
                        inpName="company_cep"
                        inpValue={data.company_cep}
                        placeholder="00000-000"
                        setData={setData}
                        required
                     />
                  </FormLabel>
               </Grid>
               <FormLabel
                  inpName="company_address"
                  title="Endereço da Empresa"
                  errors={errors}
               >
                  <FormTextArea
                     inpName="company_address"
                     inpValue={data.company_address}
                     placeholder="Endereço da Empresa"
                     setData={setData}
                  />
               </FormLabel>
               <Grid gridCols="sm:grid-cols-3">
                  <FormSubtitle title="Contatos e Redes Sociais" />
                  <FormLabel
                     inpName="company_phone"
                     title="Telefone/Celular"
                     errors={errors}
                  >
                     <FormInput
                        inpName="company_phone"
                        inpValue={data.company_phone}
                        placeholder="(00) 00000-0000"
                        setData={setData}
                     />
                  </FormLabel>
                  <FormLabel
                     inpName="company_whats"
                     title="WhatsApp"
                     errors={errors}
                  >
                     <FormInput
                        inpName="company_whats"
                        inpValue={data.company_whats}
                        placeholder="(00) 00000-0000"
                        setData={setData}
                     />
                  </FormLabel>
                  <FormLabel
                     inpName="company_opening_hours"
                     title="Horário de Atendimento"
                     errors={errors}
                  >
                     <FormInput
                        inpName="company_opening_hours"
                        inpValue={data.company_opening_hours}
                        placeholder="Horário de Atendimento"
                        setData={setData}
                     />
                  </FormLabel>
                  <FormLabel
                     inpName="company_face"
                     title="URL do Facebook"
                     errors={errors}
                  >
                     <FormInput
                        inpName="company_face"
                        inpValue={data.company_face}
                        placeholder="URL do Facebook"
                        setData={setData}
                     />
                  </FormLabel>
                  <FormLabel
                     inpName="company_insta"
                     title="URL do Instagram"
                     errors={errors}
                  >
                     <FormInput
                        inpName="company_insta"
                        inpValue={data.company_insta}
                        placeholder="URL do Instagram"
                        setData={setData}
                     />
                  </FormLabel>
                  <FormLabel
                     inpName="company_yout"
                     title="URL do Youtube"
                     errors={errors}
                  >
                     <FormInput
                        inpName="company_yout"
                        inpValue={data.company_yout}
                        placeholder="URL do Youtube"
                        setData={setData}
                     />
                  </FormLabel>
               </Grid>
            </Form>
         </Section>
      </AuthenticatedLayout>
   );
}
