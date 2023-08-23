import { useRef, useState } from "react";
import DangerButton from "@/Components/Breeze/DangerButton";
import InputError from "@/Components/Breeze/InputError";
import InputLabel from "@/Components/Breeze/InputLabel";
import Modal from "@/Components/Admin/Modal";
import SecondaryButton from "@/Components/Breeze/SecondaryButton";
import TextInput from "@/Components/Breeze/TextInput";
import { useForm } from "@inertiajs/react";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("admin.profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Inativar Conta
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Uma vez que sua conta é inativa, você perderá acesso a todos
                    os dados e recursos desta conta, portanto, antes de inativar
                    a sua conta, copie todos os dados e informações que você
                    deseje manter.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                Inativar Conta
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Tem certeza que quer inativar a sua conta?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Por favor informe a sua senha para confirmar que você
                        deseja inativar a sua conta.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="block w-3/4 mt-1"
                            isFocused
                            placeholder="Senha"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex justify-end mt-6">
                        <SecondaryButton onClick={closeModal}>
                            Cancelar
                        </SecondaryButton>

                        <DangerButton className="ml-3" disabled={processing}>
                            Inativar Conta
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
