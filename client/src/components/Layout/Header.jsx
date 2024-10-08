import logo from "../../assets/logo.webp";
import NavItem from "./NavItem";

const Header = () => {
  return (
    <header className="flex border-b p-2 content-between justify-between sm:justify-around h-16">
      <div className="h-full flex items-center ml-2 w-1/3 gap-2">
        <img className=" h-full rounded-full" src={logo} alt="Logo de applestore Ledesma" />
        <h1 className="text-center font-semibold leading-4">
          Applestore Ledesma
        </h1>
      </div>
      <nav className="h-full">
        <ul className="h-full flex gap-4 items-center">
          <NavItem title="Inicio" url="/" />
          <NavItem title="Productos" url="/products" />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
