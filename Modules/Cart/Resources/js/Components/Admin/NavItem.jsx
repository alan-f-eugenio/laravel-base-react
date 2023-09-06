import NavDropdown from "@/Components/Admin/NavDropdown";

export default function CartNavItem() {
   return (
      <NavDropdown.Link
         href={route("admin.carts.index")}
         active={route().current("admin.carts.index")}
      >
         Carrinhos Abandonados
      </NavDropdown.Link>
   );
}
