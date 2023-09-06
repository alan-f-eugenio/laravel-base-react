import NavDropdown from "@/Components/Admin/NavDropdown";

export default function CouponNavItem() {
   return (
      <NavDropdown activeDropdown={route().current("admin.coupons.*")}>
         <NavDropdown.Trigger>Cupons</NavDropdown.Trigger>
         <NavDropdown.Content>
            <NavDropdown.Link
               href={route("admin.coupons.create")}
               active={route().current("admin.coupons.create")}
            >
               Cadastrar
            </NavDropdown.Link>
            <NavDropdown.Link
               href={route("admin.coupons.index")}
               active={route().current("admin.coupons.index")}
            >
               Listar
            </NavDropdown.Link>
         </NavDropdown.Content>
      </NavDropdown>
   );
}
