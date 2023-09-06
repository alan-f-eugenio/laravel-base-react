import NavDropdown from "@/Components/Admin/NavDropdown";

export default function BannerNavItem() {
   return (
      <NavDropdown activeDropdown={route().current("admin.banners.*")}>
         <NavDropdown.Trigger>Banners</NavDropdown.Trigger>
         <NavDropdown.Content>
            <NavDropdown.Link
               href={route("admin.banners.create")}
               active={route().current("admin.banners.create")}
            >
               Cadastrar
            </NavDropdown.Link>
            <NavDropdown.Link
               href={route("admin.banners.index")}
               active={route().current("admin.banners.index")}
            >
               Listar
            </NavDropdown.Link>
         </NavDropdown.Content>
      </NavDropdown>
   );
}
