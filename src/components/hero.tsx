import fond from "../assets/panier.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-full overflow-hidden">

      {/* ─── DESKTOP (lg+) ─── identique à l'original ──────────────── */}
      <div className="hidden lg:flex relative mt-20 h-[91.6vh] bg-green-50">
        <img
          src={fond}
          alt="fond"
          className="ml-auto h-1/2 absolute top-1/5 left-1/2 rounded-3xl"
        />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2">
          <p className="-translate-x-1/3 -translate-y-1/3 text-primaryGreen text-[6vh] font-semibold h-1/2 flex justify-center items-center leading-20 rounded-4xl font-titre">
            Moins de gaspillage, <br /> Plus de partage
          </p>
          <p className="text-2xl -translate-x-1/3 translate-y-1/6 font-contenu leading-10">
            Ici, les repas ont une seconde chance. <br />
            Partagez ce que vous n'utilisez pas ou trouvez <br /> près de chez
            vous ce qui mérite d'être savouré.
          </p>
          <div className="mt-30 -ml-30 flex">
            <button className="bg-primaryGreen -translate-x-[3vw] text-white text-3xl p-6 rounded-4xl font-contenu">
              Trouver un repas
            </button>
            <button className="bg-[#FBE9D5] text-primaryGreen text-3xl p-6 rounded-4xl font-contenu">
              Partager
            </button>
          </div>
        </div>
      </div>

      {/* ─── TABLET + MOBILE (< lg) ─── image en haut, texte en bas ── */}
      <div className="flex lg:hidden flex-col bg-green-50 mt-[8vh] min-h-[91.6vh] w-full">

        {/* Image en haut */}
        <div className="w-full flex justify-center pt-10 px-6 box-border">
          <img
            src={fond}
            alt="fond"
            className="w-full max-w-sm md:max-w-lg md:mt-25 rounded-3xl object-cover"
          />
        </div>

        {/* Texte + boutons */}
        <div className="w-full px-6 md:px-12 pt-8 pb-10 flex flex-col items-center text-center box-border">
          <p className="text-primaryGreen text-4xl md:text-5xl font-semibold font-titre leading-tight mb-5">
            Moins de gaspillage, <br /> Plus de partage
          </p>
          <p className="text-lg md:text-xl font-contenu leading-8 text-gray-700 mb-8 max-w-lg">
            Ici, les repas ont une seconde chance. Partagez ce que vous
            n'utilisez pas ou trouvez près de chez vous ce qui mérite d'être
            savouré.
          </p>

          <div className="flex flex-col md:flex-row gap-4 w-full max-w-sm md:max-w-md">
            <Link to="/Trouver" className="flex-1">
              <button className="w-full bg-primaryGreen text-white text-xl md:text-2xl py-4 md:py-5 rounded-3xl font-contenu">
                Trouver un repas
              </button>
            </Link>
            <Link to="/Partager" className="flex-1">
              <button className="w-full bg-[#FBE9D5] text-primaryGreen text-xl md:text-2xl py-4 md:py-5 rounded-3xl font-contenu">
                Partager
              </button>
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;