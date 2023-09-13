import Form from "@/Components/Admin/Form";
import FormInput from "@/Components/Admin/FormInput";
import FormLabel from "@/Components/Admin/FormLabel";
import FormSelect from "@/Components/Admin/FormSelect";
import FormSelectOption from "@/Components/Admin/FormSelectOption";
import FormToggleInput from "@/Components/Admin/FormToggleInput";
import FormToggleStructure from "@/Components/Admin/FormToggleStructure";
import Grid from "@/Components/Admin/Grid";
import PageButton from "@/Components/Admin/PageButton";
import PageSubTitle from "@/Components/Admin/PageSubTitle";
import PageTitle from "@/Components/Admin/PageTitle";
import Section from "@/Components/Admin/Section";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

import { moneyMaskOptions, percentMaskOptions } from "@/Helpers/utils";
import Inputmask from "inputmask";

export default function CreateEdit({
   auth,
   commonData,
   item,
   couponDiscountTypes,
}) {
   const { data, setData, submit, transform, errors, processing } = useForm({
      ...item,
      noDateStartLimit: !Boolean(item.date_start),
      noDateEndLimit: !Boolean(item.date_end),
      noQtdLimit: !Boolean(item.qtd),
      noValueMinLimit: !Boolean(item.value_min),
      noValueMaxLimit: !Boolean(item.value_max),
   });

   console.log(errors);

   // console.log(data);

   transform((data) => {
      let newData = data;
      if (!newData.status) {
         newData = {
            ...newData,
            status: Object.keys(commonData.defaultStatuses)[0],
         };
      }
      if (!newData.discount_type) {
         newData = {
            ...newData,
            discount_type: Object.keys(couponDiscountTypes)[0],
         };
      }
      if (data.noDateStartLimit) {
         delete newData.date_start;
      }
      if (data.noDateEndLimit) {
         delete newData.date_end;
      }
      if (data.noQtdLimit) {
         delete newData.qtd;
      }
      if (data.noValueMinLimit) {
         delete newData.value_min;
      }
      if (data.noValueMaxLimit) {
         delete newData.value_max;
      }
      return newData;
   });

   const handleSubmit = (e) => {
      e.preventDefault();
      submit(
         item.id ? "put" : "post",
         item.id
            ? route("admin.coupons.update", item.id)
            : route("admin.coupons.store")
      );
   };

   const changeDiscountMask = (discountInp) => {
      if (data.discount_type != Object.keys(couponDiscountTypes)[1]) {
         if (!discountInp?.inputmask) {
            Inputmask(percentMaskOptions).mask(discountInp);
         } else {
            discountInp.inputmask.option(percentMaskOptions);
         }
      } else {
         if (!discountInp?.inputmask) {
            Inputmask(moneyMaskOptions).mask(discountInp);
         } else {
            discountInp.inputmask.option(moneyMaskOptions);
         }
      }
   };

   useEffect(() => {
      changeDiscountMask(document.querySelector("#discount"));
      console.log(data);
   }, [data.discount_type]);

   Inputmask(moneyMaskOptions).mask(document.querySelectorAll(".moneyMask"));

   return (
      <AuthenticatedLayout
         user={auth.user}
         commonData={commonData}
         header={
            <>
               <PageTitle title="Cupons">
                  <PageSubTitle subtitle={item.id ? "Alterar" : "Cadastrar"} />
               </PageTitle>
               <PageButton
                  href={route("admin.coupons.index")}
                  title="Listar Cupons"
               />
            </>
         }
      >
         <Head title="Cupons" />

         <Section>
            <Form
               processing={processing}
               editing={Boolean(item.id)}
               handleSubmit={handleSubmit}
            >
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
                  <FormLabel inpName="token" title="Token" errors={errors}>
                     <FormInput
                        inpName="token"
                        inpValue={data.token}
                        placeholder="Token do cupom"
                        setData={setData}
                        required
                     />
                  </FormLabel>
                  <FormLabel
                     inpName="description"
                     title="Descrição"
                     errors={errors}
                  >
                     <FormInput
                        inpName="description"
                        inpValue={data.description}
                        placeholder="Descrição do cupom"
                        setData={setData}
                        required
                     />
                  </FormLabel>
                  <FormLabel title="Regra de utilização">
                     <FormToggleStructure title="Apenas primeira compra">
                        <FormToggleInput
                           inpName="first_buy"
                           inpValue={data.first_buy}
                           setData={setData}
                        />
                     </FormToggleStructure>
                  </FormLabel>
                  <FormLabel
                     inpName="discount_type"
                     title="Tipo de Desconto"
                     errors={errors}
                  >
                     <FormSelect
                        inpName="discount_type"
                        data={data.discount_type}
                        setData={setData}
                        required
                     >
                        {Object.keys(couponDiscountTypes).map((typeKey) => (
                           <FormSelectOption
                              key={typeKey}
                              inpValue={typeKey}
                              title={couponDiscountTypes[typeKey]}
                           />
                        ))}
                     </FormSelect>
                  </FormLabel>
                  <FormLabel
                     inpName="discount"
                     title="Desconto (% ou R$)"
                     errors={errors}
                  >
                     <FormInput
                        inpName="discount"
                        inpValue={data.discount}
                        placeholder="Desconto (% ou R$)"
                        setData={setData}
                        required
                     />
                  </FormLabel>
                  <FormLabel title="Período de validade">
                     <FormToggleStructure title="Não possui data de início">
                        <FormToggleInput
                           inpName="noDateStartLimit"
                           inpValue={data.noDateStartLimit}
                           setData={setData}
                           // onChange={(e) =>
                           //    setnoDateStartLimit(!e.target.checked)
                           // }
                        />
                     </FormToggleStructure>
                  </FormLabel>
                  <FormLabel
                     inpName="date_start"
                     title="Data de Início"
                     errors={errors}
                  >
                     <FormInput
                        type="datetime-local"
                        inpName="date_start"
                        inpValue={data.date_start}
                        placeholder="00/00/0000 00:00:00"
                        setData={setData}
                        disabled={data.noDateStartLimit}
                        required
                     />
                  </FormLabel>
                  <FormLabel title="Período de validade">
                     <FormToggleStructure title="Não possui data de expiração">
                        <FormToggleInput
                           inpName="noDateEndLimit"
                           inpValue={data.noDateEndLimit}
                           setData={setData}
                           // onChange={(e) =>
                           //    setnoDateEndLimit(!e.target.checked)
                           // }
                        />
                     </FormToggleStructure>
                  </FormLabel>
                  <FormLabel
                     inpName="date_end"
                     title="Data de Expiração"
                     errors={errors}
                  >
                     <FormInput
                        type="datetime-local"
                        inpName="date_end"
                        inpValue={data.date_end}
                        placeholder="00/00/0000 00:00:00"
                        setData={setData}
                        disabled={data.noDateEndLimit}
                        required
                     />
                  </FormLabel>
                  <FormLabel title="Quantidade de utilizações do cupom">
                     <FormToggleStructure title="Sem limite de uso">
                        <FormToggleInput
                           inpName="noQtdLimit"
                           inpValue={data.noQtdLimit}
                           setData={setData}
                           // onChange={(e) => setnoQtdLimit(!e.target.checked)}
                        />
                     </FormToggleStructure>
                  </FormLabel>
                  <FormLabel inpName="qtd" title="Utlizações" errors={errors}>
                     <FormInput
                        type="number"
                        inpName="qtd"
                        inpValue={data.qtd}
                        placeholder="Qtd. Utlizações"
                        setData={setData}
                        disabled={data.noQtdLimit}
                        required
                     />
                  </FormLabel>
                  <FormLabel title="Valor mínimo do pedido">
                     <FormToggleStructure title="Não possui valor mínimo">
                        <FormToggleInput
                           inpName="noValueMinLimit"
                           inpValue={data.noValueMinLimit}
                           setData={setData}
                           // onChange={(e) =>
                           //    setnoValueMinLimit(!e.target.checked)
                           // }
                        />
                     </FormToggleStructure>
                  </FormLabel>
                  <FormLabel
                     inpName="value_min"
                     title="Valor Mínimo"
                     errors={errors}
                  >
                     <FormInput
                        classes="moneyMask"
                        inpName="value_min"
                        inpValue={data.value_min}
                        placeholder="R$ 0,00"
                        setData={setData}
                        disabled={data.noValueMinLimit}
                        required
                     />
                  </FormLabel>
                  <FormLabel title="Valor máximo do pedido">
                     <FormToggleStructure title="Não possui valor máximo">
                        <FormToggleInput
                           inpName="noValueMaxLimit"
                           inpValue={data.noValueMaxLimit}
                           setData={setData}
                           // onChange={(e) =>
                           //    setnoValueMaxLimit(!e.target.checked)
                           // }
                        />
                     </FormToggleStructure>
                  </FormLabel>
                  <FormLabel
                     inpName="value_max"
                     title="Valor Máximo"
                     errors={errors}
                  >
                     <FormInput
                        classes="moneyMask"
                        inpName="value_max"
                        inpValue={data.value_max}
                        placeholder="R$ 0,00"
                        setData={setData}
                        disabled={data.noValueMaxLimit}
                        required
                     />
                  </FormLabel>
               </Grid>
            </Form>
         </Section>
      </AuthenticatedLayout>
   );
}
