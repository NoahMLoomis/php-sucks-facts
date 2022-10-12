import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { BsPlus, BsList } from "react-icons/bs";
const Menu = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-16 flex flex-col">
      <MenuItem icon={<BsPlus size="32" />} link="add" />
      <MenuItem icon={<BsList size="32" />} link="reasons" />
    </div>
  );
};

const MenuItem = ({ icon, link }: { icon: ReactElement; link: string }) => (
  <Link className="menu" to={link}>
    {icon}
  </Link>
);

export default Menu;
