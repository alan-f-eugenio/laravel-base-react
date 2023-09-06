import NavDropdown from "@/Components/Admin/NavDropdown";

export default function CustomerNavItem() {
   return (
      <NavDropdown activeDropdown={route().current("admin.customers.*")}>
         <NavDropdown.Trigger>Clientes</NavDropdown.Trigger>
         <NavDropdown.Content>
            <NavDropdown.Link
               href={route("admin.customers.create")}
               active={route().current("admin.customers.create")}
            >
               Cadastrar
            </NavDropdown.Link>
            <NavDropdown.Link
               href={route("admin.customers.index")}
               active={route().current("admin.customers.index")}
            >
               Listar
            </NavDropdown.Link>
         </NavDropdown.Content>
      </NavDropdown>
   );
}
