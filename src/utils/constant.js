import "boxicons";
export const categories = [
  {
    name: "Dashboard",
    icon: (
      <box-icon name="grid-alt" type="solid" animation="flashing"></box-icon>
    ),
    element: "outlet",
  },
  {
    name: "Outlet",
    icon: <box-icon type="solid" name="store"></box-icon>,
    element: "outlet",
  },
  {
    name: "Member",
    icon: <box-icon type="solid" name="user"></box-icon>,
    element: "paket",
  },
  {
    name: "Paket",
    icon: <box-icon type="solid" name="package"></box-icon>,
    element: "paket",
  },
];
