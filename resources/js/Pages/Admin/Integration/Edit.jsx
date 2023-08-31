import FormSelectOption from "@/Components/Admin/FormSelectOption";
import Form from "@/Components/Admin/Form";
import FormInput from "@/Components/Admin/FormInput";
import FormLabel from "@/Components/Admin/FormLabel";
import FormSelect from "@/Components/Admin/FormSelect";
import FormSubtitle from "@/Components/Admin/FormSubtitle";
import Grid from "@/Components/Admin/Grid";
import PageSubTitle from "@/Components/Admin/PageSubTitle";
import PageTitle from "@/Components/Admin/PageTitle";
import Section from "@/Components/Admin/Section";
import { capitalize, deepMerge } from "@/Helpers/utils";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Edit({ auth, adminData, item, defaultStatuses }) {
   const { data, setData, put, errors, processing, transform } = useForm({});

   transform(() => {
      let newData = {};
      document.querySelectorAll("select").forEach((el1) => {
         newData = deepMerge(
            newData,
            JSON.parse(String(el1.name).replace("inpValue", el1.value))
         );
      });
      document.querySelectorAll("input").forEach((el2) => {
         newData = deepMerge(
            newData,
            JSON.parse(String(el2.name).replace("inpValue", el2.value))
         );
      });
      return newData;
   });

   const handleSubmit = (e) => {
      e.preventDefault();
      put(route("admin.integrations.update"));
   };

   return (
      <AuthenticatedLayout
         user={auth.user}
         adminData={adminData}
         header={
            <PageTitle title="Integrações">
               <PageSubTitle subtitle="Alterar" />
            </PageTitle>
         }
      >
         <Head title="Integrações" />

         <Section>
            {Object.entries(item).length ? (
               <Form
                  processing={processing}
                  editing={true}
                  handleSubmit={handleSubmit}
               >
                  {Object.keys(item).map((type) =>
                     Object.entries(item[type]).map(
                        (integration, integrationKey) => (
                           <Grid key={integrationKey} gridCols="sm:grid-cols-2">
                              <FormSubtitle
                                 title={`${capitalize(type)} - ${capitalize(
                                    integration[0]
                                 )}`}
                              />
                              <FormLabel
                                 inpName={`{"integration":{"${integration[1].id}":{"status":"inpValue"}}}`}
                                 title="Status"
                                 errors={errors}
                              >
                                 <FormSelect
                                    inpName={`{"integration":{"${integration[1].id}":{"status":"inpValue"}}}`}
                                    data={integration[1].status}
                                    setData={setData}
                                    required
                                 >
                                    {Object.keys(defaultStatuses).map(
                                       (statusKey) => (
                                          <FormSelectOption
                                             key={statusKey}
                                             inpValue={statusKey}
                                             title={defaultStatuses[statusKey]}
                                          />
                                       )
                                    )}
                                 </FormSelect>
                              </FormLabel>
                              {integration[1].editable == true &&
                                 Object.keys(integration[1].defines).map(
                                    (define, defineKey) => (
                                       <FormLabel
                                          key={defineKey}
                                          inpName={`{"integration":{"${integration[1].id}":{"defines":{"${define}":"inpValue"}}}}`}
                                          title={capitalize(define)}
                                          errors={errors}
                                       >
                                          <FormInput
                                             inpName={`{"integration":{"${integration[1].id}":{"defines":{"${define}":"inpValue"}}}}`}
                                             inpValue={
                                                data[
                                                   `{"integration":{"${integration[1].id}":{"defines":{"${define}":"inpValue"}}}}`
                                                ] ??
                                                integration[1].defines[define]
                                             }
                                             placeholder={capitalize(define)}
                                             setData={setData}
                                          />
                                       </FormLabel>
                                    )
                                 )}
                           </Grid>
                        )
                     )
                  )}
               </Form>
            ) : (
               <div className="bg-white shadow-sm sm:rounded-lg">
                  <div className="p-6 text-gray-900">
                     Nenhuma integração encontrada.
                  </div>
               </div>
            )}
         </Section>
      </AuthenticatedLayout>
   );
}
