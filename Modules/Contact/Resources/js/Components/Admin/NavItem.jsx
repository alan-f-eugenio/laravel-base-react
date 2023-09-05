import NavDropdown from "@/Components/Admin/NavDropdown";

export default function ContactNavItem() {
   return (
      <NavDropdown.Link
         href={route("admin.contacts.index")}
         active={route().current("admin.contacts.*")}
      >
         Contatos
      </NavDropdown.Link>
   );
}
