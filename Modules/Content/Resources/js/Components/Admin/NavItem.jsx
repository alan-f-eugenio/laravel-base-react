import NavDropdown from "@/Components/Admin/NavDropdown";
import { usePage } from "@inertiajs/react";

export default function ContentNavItem({ commonData }) {
   const { url } = usePage();
   return (
      <NavDropdown
         activeDropdown={
            route().current("admin.contentNavs.*") ||
            route().current("admin.contents.*")
         }
      >
         <NavDropdown.Trigger>Páginas de Conteúdo</NavDropdown.Trigger>
         <NavDropdown.Content>
            <NavDropdown.Link
               href={route("admin.contentNavs.create")}
               active={route().current("admin.contentNavs.create")}
            >
               Cadastrar
            </NavDropdown.Link>
            <NavDropdown.Link
               href={route("admin.contentNavs.index")}
               active={route().current("admin.contentNavs.index")}
            >
               Listar
            </NavDropdown.Link>
         </NavDropdown.Content>
         {Object.keys(commonData.contentNavs).length > 0 && (
            <NavDropdown.SubContent title="Conteúdos">
               {Object.keys(commonData.contentNavs).map(
                  (navSlug, navSlugIndex) =>
                     commonData.contentNavs[navSlug].status ==
                        Object.keys(commonData.defaultStatuses)[0] &&
                     (commonData.contentNavs[navSlug].type ==
                     Object.keys(commonData.contentNavTypes)[0] ? (
                        <NavDropdown.Link
                           key={navSlugIndex}
                           href={route(
                              "admin.contents.index",
                              commonData.contentNavs[navSlug].id
                           )}
                           active={
                              route().current("admin.contents.index", {
                                 nav: commonData.contentNavs[navSlug].id,
                              }) ||
                              (route().current("admin.contents.edit", {
                                 content: url.split("/")[3],
                              }) &&
                                 Object.keys(
                                    commonData.contentNavs[navSlug].contents
                                 ).filter(
                                    (navKey) =>
                                       commonData.contentNavs[navSlug].contents[
                                          navKey
                                       ].id == url.split("/")[3]
                                 ).length > 0)
                           }
                        >
                           {commonData.contentNavs[navSlug].title}
                        </NavDropdown.Link>
                     ) : (
                        <NavDropdown
                           key={navSlugIndex}
                           activeDropdown={
                              route().current("admin.contents.*", {
                                 nav: commonData.contentNavs[navSlug].id,
                              }) ||
                              (route().current("admin.contents.edit", {
                                 content: url.split("/")[3],
                              }) &&
                                 Object.keys(
                                    commonData.contentNavs[navSlug].contents
                                 ).filter(
                                    (navKey) =>
                                       commonData.contentNavs[navSlug].contents[
                                          navKey
                                       ].id == url.split("/")[3]
                                 ).length > 0)
                           }
                        >
                           <NavDropdown.Trigger>
                              {commonData.contentNavs[navSlug].title}
                           </NavDropdown.Trigger>
                           <NavDropdown.Content>
                              <NavDropdown.Link
                                 href={route(
                                    "admin.contents.create",
                                    commonData.contentNavs[navSlug].id
                                 )}
                                 active={route().current(
                                    "admin.contents.create",
                                    {
                                       nav: commonData.contentNavs[navSlug].id,
                                    }
                                 )}
                              >
                                 Cadastrar
                              </NavDropdown.Link>
                              <NavDropdown.Link
                                 href={route(
                                    "admin.contents.index",
                                    commonData.contentNavs[navSlug].id
                                 )}
                                 active={route().current(
                                    "admin.contents.index",
                                    {
                                       nav: commonData.contentNavs[navSlug].id,
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
   );
}
