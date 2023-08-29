import FilterSelectOption from "@/Components/Admin/FilterSelectOption";
import Form from "@/Components/Admin/Form";
import FormInput from "@/Components/Admin/FormInput";
import FormLabel from "@/Components/Admin/FormLabel";
import FormSelect from "@/Components/Admin/FormSelect";
import FormSubtitle from "@/Components/Admin/FormSubtitle";
import FormTextArea from "@/Components/Admin/FormTextArea";
import Grid from "@/Components/Admin/Grid";
import PageSubTitle from "@/Components/Admin/PageSubTitle";
import PageTitle from "@/Components/Admin/PageTitle";
import Section from "@/Components/Admin/Section";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function Edit({
    auth,
    activeModules,
    flash,
    item,
    defaultStatuses,
}) {
    const {
        data,
        setData,
        put,
        errors,
        processing,
        setDefaults,
        reset,
        transform,
    } = useForm({});

    // console.log(item);

    transform((data) => {
        let newData = data;
        document.querySelectorAll("input").forEach((el1) => {
            // newData[el1.name] = el1.value;
            // console.log({ ...el1.name });
        });
        // document.querySelectorAll("select").forEach((el1) => {
        //     newData[el1.name] = el1.value;
        // });
        // newData = {
        //     ...data,
        //     // Object.entries(),
        //     integration: {
        //         99: {
        //             defines: {
        //                 token: "test",
        //             },
        //         },
        //     },
        // };
        return newData;
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(data);
        put(route("admin.integrations.update"));
    };

    const capitalize = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    // useEffect(() => {
    //     document.querySelectorAll("input").forEach((el1) => {
    //         console.log([el1.name, el1.value]);
    //         setData(el1.name, el1.value);
    //         console.log(data);
    //     });
    //     // document.querySelectorAll("select").forEach((el1) => {
    //     //     console.log([el1.name, el1.value]);
    //     //     setData(el1.name, el1.value);
    //     //     console.log(data);
    //     // });
    //     console.log(data);
    //     // reset();
    //     // setDefaults();
    //     // reset();
    // }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <PageTitle title="Integrações">
                    <PageSubTitle subtitle="Alterar" />
                </PageTitle>
            }
            activeModules={activeModules}
            flash={flash}
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
                                    <Grid
                                        key={integrationKey}
                                        gridCols="sm:grid-cols-2"
                                    >
                                        <FormSubtitle
                                            title={`${capitalize(
                                                type
                                            )} - ${capitalize(integration[0])}`}
                                        />
                                        <FormLabel
                                            inpName={`integration[${integration[1].id}][status]`}
                                            title="Status"
                                            errors={errors}
                                        >
                                            <FormSelect
                                                inpName={`integration[${integration[1].id}][status]`}
                                                data={integration[1].status}
                                                setData={setData}
                                            >
                                                {Object.keys(
                                                    defaultStatuses
                                                ).map((statusKey) => (
                                                    <FilterSelectOption
                                                        key={statusKey}
                                                        inpValue={statusKey}
                                                        title={
                                                            defaultStatuses[
                                                                statusKey
                                                            ]
                                                        }
                                                    />
                                                ))}
                                            </FormSelect>
                                        </FormLabel>
                                        {integration[1].editable == true &&
                                            Object.keys(
                                                integration[1].defines
                                            ).map((define, defineKey) => (
                                                <FormLabel
                                                    key={defineKey}
                                                    inpName={`integration[${integration[1].id}][defines][${define}]`}
                                                    title={capitalize(define)}
                                                    errors={errors}
                                                >
                                                    <FormInput
                                                        inpName={`integration[${integration[1].id}][defines][${define}]`}
                                                        inpValue={
                                                            integration[1]
                                                                .defines[define]
                                                        }
                                                        placeholder={capitalize(
                                                            define
                                                        )}
                                                        setData={setData}
                                                    />
                                                </FormLabel>
                                            ))}
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
