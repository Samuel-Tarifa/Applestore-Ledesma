import ArrowRight from "../../icons/ArrowRight";
import iphone from "../../assets/iphone.webp";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex-1 flex flex-col justify-center w-full overflow-hidden">
      <main className="flex flex-col md:flex-row items-center py-10 gap-8 md:gap-0 md:justify-between w-full">
        <div className="flex flex-col gap-4 px-24 items-center md:px-0 md:pl-24">
          <h2 className="text-center font-semibold text-2xl">
            Accesorios para tu iPhone
          </h2>
          <p className="text-center font-medium">
            Consigue accesorios de todo tipo como cases cargadores y mucho mas a
            la mejor calidad y disponibilidad
          </p>
          <Link to='/products'>
            <button className="bg-purple600 rounded-xl w-fit p-2 px-4 flex items-center">
              <h3 className="text-lg text-white">Ver productos</h3>
              <ArrowRight />
            </button>
          </Link>
        </div>
        <div className="relative flex flex-col items-center md:max-w-[55%]">
          <div className="flex flex-col items-center w-screen md:w-[55vw]">
            <img
              className="w-2/3 aspect-square h-auto"
              src={iphone}
              alt="imagen de iPhone"
            />
            <div className="sombra-iphone"></div>
          </div>
          <div className="circle-container">
            <div className="circle bg-purple300 overflow-hidden"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hero;
