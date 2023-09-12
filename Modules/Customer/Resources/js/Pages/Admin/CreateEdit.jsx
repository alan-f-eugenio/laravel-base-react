import Form from "@/Components/Admin/Form";
import FormInput from "@/Components/Admin/FormInput";
import FormLabel from "@/Components/Admin/FormLabel";
import FormSelect from "@/Components/Admin/FormSelect";
import FormSelectOption from "@/Components/Admin/FormSelectOption";
import FormSubtitle from "@/Components/Admin/FormSubtitle";
import FormToggleInput from "@/Components/Admin/FormToggleInput";
import FormToggleStructure from "@/Components/Admin/FormToggleStructure";
import Grid from "@/Components/Admin/Grid";
import PageButton from "@/Components/Admin/PageButton";
import PageSubTitle from "@/Components/Admin/PageSubTitle";
import PageTitle from "@/Components/Admin/PageTitle";
import Section from "@/Components/Admin/Section";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function CreateEdit({
   auth,
   commonData,
   item,
   address,
   personFisica,
   customerPersons,
}) {
   const { data, setData, submit, transform, errors, processing, reset } =
      useForm({ ...item, ...address });

   const [isPersonFisica, setIsPersonFisica] = useState(personFisica);

   const handlePersonChange = (e) => {
      setData("person", e.target.value);
      setIsPersonFisica(e.target.value == Object.keys(customerPersons)[0]);
   };

   transform((data) => {
      let newData = data;
      if (!newData.status) {
         newData = {
            ...newData,
            status: Object.keys(commonData.defaultStatuses)[0],
         };
      }
      if (!newData.person) {
         newData = {
            ...newData,
            person: Object.keys(customerPersons)[0],
         };
      }
      return newData;
   });

   const handleSubmit = (e) => {
      e.preventDefault();
      submit(
         item.id ? "put" : "post",
         item.id
            ? route("admin.customers.update", item.id)
            : route("admin.customers.store"),
         {
            onSuccess: () => setData("recoverPass", false),
         }
      );
   };

   return (
      <AuthenticatedLayout
         user={auth.user}
         commonData={commonData}
         header={
            <>
               <PageTitle title="Clientes">
                  <PageSubTitle subtitle={item.id ? "Alterar" : "Cadastrar"} />
               </PageTitle>
               <PageButton
                  href={route("admin.customers.index")}
                  title="Listar Clientes"
               />
            </>
         }
      >
         <Head title="Clientes" />

         <Section>
            <Form
               processing={processing}
               editing={Boolean(item.id)}
               handleSubmit={handleSubmit}
            >
               <Grid gridCols="sm:grid-cols-3">
                  <FormSubtitle title="Dados de Identificação" />
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
                     inpName="person"
                     title="Tipo de Pessoa"
                     errors={errors}
                  >
                     <FormSelect
                        inpName="person"
                        data={data.person}
                        setData={setData}
                        onChange={(e) => handlePersonChange(e)}
                        required
                     >
                        {Object.keys(customerPersons).map((personKey) => (
                           <FormSelectOption
                              key={personKey}
                              inpValue={personKey}
                              title={customerPersons[personKey]}
                           />
                        ))}
                     </FormSelect>
                  </FormLabel>
                  <FormLabel
                     inpName="fullname"
                     title="Nome Completo"
                     errors={errors}
                  >
                     <FormInput
                        inpName="fullname"
                        inpValue={data.fullname}
                        placeholder="Nome do cliente"
                        setData={setData}
                        required
                     />
                  </FormLabel>
                  <FormLabel inpName="cpf" title="CPF" errors={errors}>
                     <FormInput
                        inpName="cpf"
                        inpValue={data.cpf}
                        placeholder="000.000.000-00"
                        setData={setData}
                        required
                     />
                  </FormLabel>
                  <FormLabel
                     inpName="date_birth"
                     title="Data de Nascimento"
                     errors={errors}
                  >
                     <FormInput
                        type="date"
                        inpName="date_birth"
                        inpValue={data.date_birth}
                        placeholder="00/00/0000"
                        setData={setData}
                        required
                     />
                  </FormLabel>
                  <FormLabel inpName="rg" title="RG" errors={errors}>
                     <FormInput
                        inpName="rg"
                        inpValue={data.rg}
                        placeholder="Identidade"
                        setData={setData}
                     />
                  </FormLabel>
                  {!isPersonFisica && (
                     <>
                        <FormLabel inpName="cnpj" title="CNPJ" errors={errors}>
                           <FormInput
                              inpName="cnpj"
                              inpValue={data.cnpj}
                              placeholder="00.000.000/0000-00"
                              setData={setData}
                              disabled={isPersonFisica}
                              required
                           />
                        </FormLabel>
                        <FormLabel
                           inpName="corporate_name"
                           title="Razão Social"
                           errors={errors}
                        >
                           <FormInput
                              inpName="corporate_name"
                              inpValue={data.corporate_name}
                              placeholder="Razão social"
                              setData={setData}
                              disabled={isPersonFisica}
                              required
                           />
                        </FormLabel>
                        <FormLabel
                           inpName="state_registration"
                           title="Inscrição Estadual"
                           errors={errors}
                        >
                           <FormInput
                              inpName="state_registration"
                              inpValue={data.state_registration}
                              placeholder="Inscrição estadual"
                              setData={setData}
                              disabled={isPersonFisica}
                              required
                           />
                        </FormLabel>
                     </>
                  )}
                  <FormSubtitle title="Dados de Endereço de Cobrança" />
                  <FormLabel inpName="cep" title="CEP" errors={errors}>
                     <FormInput
                        inpName="cep"
                        inpValue={data.cep}
                        placeholder="00000-000"
                        setData={setData}
                        required
                     />
                  </FormLabel>
               </Grid>
               <Grid gridCols="sm:grid-cols-3">
                  <FormLabel inpName="street" title="Endereço" errors={errors}>
                     <FormInput
                        inpName="street"
                        inpValue={data.street}
                        placeholder="Endereço"
                        setData={setData}
                        required
                     />
                  </FormLabel>
                  <FormLabel
                     inpName="neighborhood"
                     title="Bairro"
                     errors={errors}
                  >
                     <FormInput
                        inpName="neighborhood"
                        inpValue={data.neighborhood}
                        placeholder="Bairro"
                        setData={setData}
                        required
                     />
                  </FormLabel>
                  <FormLabel
                     inpName="complement"
                     title="Complemento"
                     errors={errors}
                  >
                     <FormInput
                        inpName="complement"
                        inpValue={data.complement}
                        placeholder="Complemento"
                        setData={setData}
                     />
                  </FormLabel>
                  <FormLabel inpName="city" title="Cidade" errors={errors}>
                     <FormInput
                        inpName="city"
                        inpValue={data.city}
                        placeholder="Cidade"
                        setData={setData}
                        required
                     />
                  </FormLabel>
                  <FormLabel inpName="state" title="Estado" errors={errors}>
                     <FormInput
                        inpName="state"
                        inpValue={data.state}
                        placeholder="Estado"
                        setData={setData}
                        maxLength="2"
                        required
                     />
                  </FormLabel>
                  <FormSubtitle title="Dados de Contato e Acesso" />
                  <FormLabel inpName="phone" title="Telefone" errors={errors}>
                     <FormInput
                        inpName="phone"
                        inpValue={data.phone}
                        placeholder="(00) 0000-0000"
                        setData={setData}
                        required
                     />
                  </FormLabel>
                  <FormLabel inpName="email" title="E-mail" errors={errors}>
                     <FormInput
                        type="email"
                        inpName="email"
                        inpValue={data.email}
                        placeholder="cliente@email.com.br"
                        setData={setData}
                        required
                     />
                  </FormLabel>
                  {item.id ? (
                     <FormLabel title="Recuperação de Senha">
                        <FormToggleStructure title="Enviar recuperação de senha">
                           <FormToggleInput
                              inpName="recoverPass"
                              inpValue={data.recoverPass}
                              setData={setData}
                           />
                        </FormToggleStructure>
                     </FormLabel>
                  ) : (
                     <>
                        <FormLabel
                           inpName="password"
                           title="Senha do Cliente"
                           errors={errors}
                        >
                           <FormInput
                              type="password"
                              inpName="password"
                              inpValue={data.password}
                              placeholder="••••••••"
                              setData={setData}
                              autoComplete="new-password"
                              required
                           />
                        </FormLabel>
                        <FormLabel
                           inpName="password_confirmation"
                           title="Confirme aSenha do Cliente"
                           errors={errors}
                        >
                           <FormInput
                              type="password"
                              inpName="password_confirmation"
                              inpValue={data.password_confirmation}
                              placeholder="••••••••"
                              setData={setData}
                              autoComplete="new-password"
                              required
                           />
                        </FormLabel>
                     </>
                  )}
               </Grid>
            </Form>
         </Section>
      </AuthenticatedLayout>
   );
}
