import { useState } from "react";
import NavLink from "./NavLink";
import NavDropdown from "./NavDropdown";

export default function Navigation({ activeModules }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <aside className="flex-shrink-0 pb-16 xl:pb-0 xl:w-64">
            <div
                className={`${
                    !showingNavigationDropdown ? "hidden" : "block"
                } fixed z-10 w-screen h-screen bg-gray-400 opacity-50 xl:hidden`}
            ></div>
            <nav className="fixed z-20 flex items-center justify-between w-full h-16 px-6 bg-white border-b border-gray-200 xl:hidden">
                <h2 className="font-medium">Painel Administrativo</h2>
                <div className="flex items-center">
                    <button
                        onClick={() =>
                            setShowingNavigationDropdown(
                                (previousState) => !previousState
                            )
                        }
                        className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
                    >
                        <h2 className="mr-1 leading-5 text-gray-500 font-sm">
                            Menu
                        </h2>
                        <svg
                            className="w-6 h-6"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                className={
                                    !showingNavigationDropdown
                                        ? "inline-flex"
                                        : "hidden"
                                }
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                            <path
                                className={
                                    showingNavigationDropdown
                                        ? "inline-flex"
                                        : "hidden"
                                }
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </nav>

            <nav
                className={`${
                    showingNavigationDropdown ? "block" : "hidden"
                } fixed z-20 w-full h-full overflow-y-auto bg-white border-gray-200 xl:h-screen sm:border-r xl:mt-0 sm:w-64 xl:block`}
            >
                <div className="py-3">
                    <NavLink
                        href={route("admin")}
                        active={route().current("admin")}
                    >
                        Home
                    </NavLink>

                    {(activeModules.includes("Contact") ||
                        activeModules.includes("Email")) && (
                        <NavDropdown
                            activeDropdown={
                                route().current("admin.contacts.*") ||
                                route().current("admin.emails.*")
                            }
                        >
                            <NavDropdown.Trigger>
                                Comunicação
                            </NavDropdown.Trigger>
                            <NavDropdown.Content>
                                {activeModules.includes("Contact") && (
                                    <NavDropdown.Link
                                        href={route("admin.contacts.index")}
                                        active={route().current(
                                            "admin.contacts.*"
                                        )}
                                    >
                                        Contatos
                                    </NavDropdown.Link>
                                )}
                                {activeModules.includes("Email") && (
                                    <NavDropdown.Link
                                        href={route("admin.emails.index")}
                                        active={route().current(
                                            "admin.emails.index"
                                        )}
                                    >
                                        Lista de E-mails
                                    </NavDropdown.Link>
                                )}
                            </NavDropdown.Content>
                        </NavDropdown>
                    )}
                    {(activeModules.includes("Banner") ||
                        activeModules.includes("Content")) && (
                        <NavDropdown
                            activeDropdown={
                                route().current("admin.banners.*") ||
                                route().current("admin.contentNavs.*") ||
                                route().current("admin.contents.*")
                            }
                        >
                            <NavDropdown.Trigger>
                                Institucional
                            </NavDropdown.Trigger>
                            <NavDropdown.Content>
                                {activeModules.includes("Banner") && (
                                    <NavDropdown
                                        activeDropdown={route().current(
                                            "admin.banners.*"
                                        )}
                                    >
                                        <NavDropdown.Trigger>
                                            Banners
                                        </NavDropdown.Trigger>
                                        <NavDropdown.Content>
                                            <NavDropdown.Link
                                                href={route(
                                                    "admin.banners.create"
                                                )}
                                                active={route().current(
                                                    "admin.banners.create"
                                                )}
                                            >
                                                Cadastrar
                                            </NavDropdown.Link>
                                            <NavDropdown.Link
                                                href={route(
                                                    "admin.banners.index"
                                                )}
                                                active={route().current(
                                                    "admin.banners.index"
                                                )}
                                            >
                                                Listar
                                            </NavDropdown.Link>
                                        </NavDropdown.Content>
                                    </NavDropdown>
                                )}
                            </NavDropdown.Content>
                        </NavDropdown>
                    )}
                </div>
                <div className="py-3 border-t border-gray-200">
                    <NavDropdown
                        activeDropdown={
                            route().current("admin.users.*") ||
                            route().current("admin.defines.*") ||
                            route().current("admin.integrations.*")
                        }
                    >
                        <NavDropdown.Trigger>Configurações</NavDropdown.Trigger>
                        <NavDropdown.Content>
                            <NavDropdown
                                activeDropdown={route().current(
                                    "admin.users.*"
                                )}
                            >
                                <NavDropdown.Trigger>
                                    Usuários
                                </NavDropdown.Trigger>
                                <NavDropdown.Content>
                                    <NavDropdown.Link
                                        href={route("admin.users.create")}
                                        active={route().current(
                                            "admin.users.create"
                                        )}
                                    >
                                        Cadastrar
                                    </NavDropdown.Link>
                                    <NavDropdown.Link
                                        href={route("admin.users.index")}
                                        active={route().current(
                                            "admin.users.index"
                                        )}
                                    >
                                        Listar
                                    </NavDropdown.Link>
                                </NavDropdown.Content>
                            </NavDropdown>
                            <NavDropdown.Link
                                href={route("admin.defines.edit")}
                                active={route().current("admin.defines.edit")}
                            >
                                Definições
                            </NavDropdown.Link>
                            <NavDropdown.Link
                                href={route("admin.integrations.edit")}
                                active={route().current(
                                    "admin.integrations.edit"
                                )}
                            >
                                Integrações
                            </NavDropdown.Link>
                        </NavDropdown.Content>
                    </NavDropdown>
                </div>
                <div className="py-3 space-y-1 border-t border-gray-200">
                    <NavLink
                        href={route("admin.profile.edit")}
                        active={route().current("admin.profile.edit")}
                    >
                        Perfil
                    </NavLink>
                    <NavLink
                        href={route("admin.logout")}
                        method="post"
                        as="button"
                    >
                        Sair
                    </NavLink>
                </div>
            </nav>
        </aside>
    );
}
