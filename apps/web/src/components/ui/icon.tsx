import LogoSolid from "~icons/local/logo-solid";
import SolarDangerTriangleBold from "~icons/solar/danger-triangle-bold";
import SolarHomeSmileBold from "~icons/solar/home-smile-bold";
import SolarHomeSmileOutline from "~icons/solar/home-smile-outline";
import SolarTrafficLineDuotone from "~icons/solar/traffic-line-duotone";

export const Icon = {
  logo: { bold: LogoSolid },

  spinner: SolarTrafficLineDuotone,
  danger: {
    triangle: {
      bold: SolarDangerTriangleBold,
    },
  },

  home: {
    smile: {
      outline: SolarHomeSmileOutline,
      bold: SolarHomeSmileBold,
    },
  },
};
