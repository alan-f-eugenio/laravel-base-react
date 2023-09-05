import NavDropdown from "@/Components/Admin/NavDropdown";

export default function EmailNavItem() {
   return (
      <NavDropdown.Link
         href={route("admin.emails.index")}
         active={route().current("admin.emails.index")}
      >
         Lista de E-mails
      </NavDropdown.Link>
   );
}
