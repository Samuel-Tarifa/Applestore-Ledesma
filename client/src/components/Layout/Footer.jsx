import logo from "../../assets/logo.webp";
import wppIcon from "../../assets/whatsapp.webp";
import igIcon from "../../assets/instagram.webp";

const Footer = () => {
  return (
    <footer className="bg-black flex h-[16vh] justify-around px-6 w-full max-w-full self-end mt-10">
      <nav className="flex flex-col md:flex-row md:justify-around md:w-1/2 h-full gap-4 mt-auto justify-center">
        <div className="flex items-center gap-2">
          <img
            className="rounded-full w-10"
            src={igIcon}
            alt="Icono de WhatsApp"
          />
          <h3 className="text-white">@applestore.led</h3>
        </div>
        <div className="flex items-center gap-2">
          <img
            className="rounded-full bg-green p-2 w-10"
            src={wppIcon}
            alt="Icono de WhatsApp"
          />
          <h3 className="text-white">+543886101010</h3>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center">
        <img className="rounded-full overflow-hidden self-end" src={logo} alt="Logo de applestore Ledesma" />
      </div>
    </footer>
  );
};

export default Footer;
