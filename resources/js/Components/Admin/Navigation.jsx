import { useState } from "react";
import NavLink from "./NavLink";
import NavDropdown from "./NavDropdown";
import { usePage } from "@inertiajs/react";

export default function Navigation({ commonData }) {
   const [showingNavigationDropdown, setShowingNavigationDropdown] =
      useState(false);
   const { url } = usePage();

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
                  <h2 className="mr-1 leading-5 text-gray-500 font-sm">Menu</h2>
                  <i
                     className={`align-middle text-xl text-gray-500 ${
                        !showingNavigationDropdown
                           ? "icon-[tabler--menu-2]"
                           : "icon-[tabler--x]"
                     } `}
                  />
               </button>
            </div>
         </nav>

         <nav
            className={`${
               showingNavigationDropdown ? "block" : "hidden"
            } fixed z-20 w-full h-full overflow-y-auto bg-white border-gray-200 xl:h-screen sm:border-r xl:mt-0 sm:w-64 xl:block`}
         >
            <div className="py-3">
               <NavLink href={route("admin")} active={route().current("admin")}>
                  Home
               </NavLink>

               {(commonData.activeModules.includes("Contact") ||
                  commonData.activeModules.includes("Email")) && (
                  <NavDropdown
                     activeDropdown={
                        route().current("admin.contacts.*") ||
                        route().current("admin.emails.*")
                     }
                  >
                     <NavDropdown.Trigger>Comunicação</NavDropdown.Trigger>
                     <NavDropdown.Content>
                        {commonData.activeModules.includes("Contact") && (
                           <NavDropdown.Link
                              href={route("admin.contacts.index")}
                              active={route().current("admin.contacts.*")}
                           >
                              Contatos
                           </NavDropdown.Link>
                        )}
                        {commonData.activeModules.includes("Email") && (
                           <NavDropdown.Link
                              href={route("admin.emails.index")}
                              active={route().current("admin.emails.index")}
                           >
                              Lista de E-mails
                           </NavDropdown.Link>
                        )}
                     </NavDropdown.Content>
                  </NavDropdown>
               )}
               {(commonData.activeModules.includes("Banner") ||
                  commonData.activeModules.includes("Content")) && (
                  <NavDropdown
                     activeDropdown={
                        route().current("admin.banners.*") ||
                        route().current("admin.contentNavs.*") ||
                        route().current("admin.contents.*")
                     }
                  >
                     <NavDropdown.Trigger>Institucional</NavDropdown.Trigger>
                     <NavDropdown.Content>
                        {commonData.activeModules.includes("Banner") && (
                           <NavDropdown
                              activeDropdown={route().current(
                                 "admin.banners.*"
                              )}
                           >
                              <NavDropdown.Trigger>Banners</NavDropdown.Trigger>
                              <NavDropdown.Content>
                                 <NavDropdown.Link
                                    href={route("admin.banners.create")}
                                    active={route().current(
                                       "admin.banners.create"
                                    )}
                                 >
                                    Cadastrar
                                 </NavDropdown.Link>
                                 <NavDropdown.Link
                                    href={route("admin.banners.index")}
                                    active={route().current(
                                       "admin.banners.index"
                                    )}
                                 >
                                    Listar
                                 </NavDropdown.Link>
                              </NavDropdown.Content>
                           </NavDropdown>
                        )}
                        {commonData.activeModules.includes("Content") && (
                           <NavDropdown
                              activeDropdown={
                                 route().current("admin.contentNavs.*") ||
                                 route().current("admin.contents.*")
                              }
                           >
                              <NavDropdown.Trigger>
                                 Páginas de Conteúdo
                              </NavDropdown.Trigger>
                              <NavDropdown.Content>
                                 <NavDropdown.Link
                                    href={route("admin.contentNavs.create")}
                                    active={route().current(
                                       "admin.contentNavs.create"
                                    )}
                                 >
                                    Cadastrar
                                 </NavDropdown.Link>
                                 <NavDropdown.Link
                                    href={route("admin.contentNavs.index")}
                                    active={route().current(
                                       "admin.contentNavs.index"
                                    )}
                                 >
                                    Listar
                                 </NavDropdown.Link>
                              </NavDropdown.Content>
                              {Object.keys(commonData.contentNavs).length >
                                 0 && (
                                 <NavDropdown.SubContent title="Conteúdos">
                                    {Object.keys(commonData.contentNavs).map(
                                       (navSlug, navSlugIndex) =>
                                          commonData.contentNavs[navSlug]
                                             .status ==
                                             Object.keys(
                                                commonData.defaultStatuses
                                             )[0] &&
                                          (commonData.contentNavs[navSlug]
                                             .type ==
                                          Object.keys(
                                             commonData.contentNavTypes
                                          )[0] ? (
                                             <NavDropdown.Link
                                                key={navSlugIndex}
                                                href={route(
                                                   "admin.contents.index",
                                                   commonData.contentNavs[
                                                      navSlug
                                                   ].id
                                                )}
                                                active={
                                                   route().current(
                                                      "admin.contents.index",
                                                      {
                                                         nav: commonData
                                                            .contentNavs[
                                                            navSlug
                                                         ].id,
                                                      }
                                                   ) ||
                                                   (route().current(
                                                      "admin.contents.edit",
                                                      {
                                                         content:
                                                            url.split("/")[3],
                                                      }
                                                   ) &&
                                                      Object.keys(
                                                         commonData.contentNavs[
                                                            navSlug
                                                         ].contents
                                                      ).filter(
                                                         (navKey) =>
                                                            commonData
                                                               .contentNavs[
                                                               navSlug
                                                            ].contents[navKey]
                                                               .id ==
                                                            url.split("/")[3]
                                                      ).length > 0)
                                                }
                                             >
                                                {
                                                   commonData.contentNavs[
                                                      navSlug
                                                   ].title
                                                }
                                             </NavDropdown.Link>
                                          ) : (
                                             <NavDropdown
                                                key={navSlugIndex}
                                                activeDropdown={
                                                   route().current(
                                                      "admin.contents.*",
                                                      {
                                                         nav: commonData
                                                            .contentNavs[
                                                            navSlug
                                                         ].id,
                                                      }
                                                   ) ||
                                                   (route().current(
                                                      "admin.contents.edit",
                                                      {
                                                         content:
                                                            url.split("/")[3],
                                                      }
                                                   ) &&
                                                      Object.keys(
                                                         commonData.contentNavs[
                                                            navSlug
                                                         ].contents
                                                      ).filter(
                                                         (navKey) =>
                                                            commonData
                                                               .contentNavs[
                                                               navSlug
                                                            ].contents[navKey]
                                                               .id ==
                                                            url.split("/")[3]
                                                      ).length > 0)
                                                }
                                             >
                                                <NavDropdown.Trigger>
                                                   {
                                                      commonData.contentNavs[
                                                         navSlug
                                                      ].title
                                                   }
                                                </NavDropdown.Trigger>
                                                <NavDropdown.Content>
                                                   <NavDropdown.Link
                                                      href={route(
                                                         "admin.contents.create",
                                                         commonData.contentNavs[
                                                            navSlug
                                                         ].id
                                                      )}
                                                      active={route().current(
                                                         "admin.contents.create",
                                                         {
                                                            nav: commonData
                                                               .contentNavs[
                                                               navSlug
                                                            ].id,
                                                         }
                                                      )}
                                                   >
                                                      Cadastrar
                                                   </NavDropdown.Link>
                                                   <NavDropdown.Link
                                                      href={route(
                                                         "admin.contents.index",
                                                         commonData.contentNavs[
                                                            navSlug
                                                         ].id
                                                      )}
                                                      active={route().current(
                                                         "admin.contents.index",
                                                         {
                                                            nav: commonData
                                                               .contentNavs[
                                                               navSlug
                                                            ].id,
                                                         }
                                                      )}
                                                   >
                                                      Listar
                                                   </NavDropdown.Link>
                                                </NavDropdown.Content>
                                             </NavDropdown>
                                          ))
                                    )}
                                 </NavDropdown.SubContent>
                              )}
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
                        activeDropdown={route().current("admin.users.*")}
                     >
                        <NavDropdown.Trigger>Usuários</NavDropdown.Trigger>
                        <NavDropdown.Content>
                           <NavDropdown.Link
                              href={route("admin.users.create")}
                              active={route().current("admin.users.create")}
                           >
                              Cadastrar
                           </NavDropdown.Link>
                           <NavDropdown.Link
                              href={route("admin.users.index")}
                              active={route().current("admin.users.index")}
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
                        active={route().current("admin.integrations.edit")}
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
               <NavLink href={route("admin.logout")} method="post" as="button">
                  Sair
               </NavLink>
            </div>
         </nav>
      </aside>
   );
}
