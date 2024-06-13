import LogoSolid from "~icons/local/logo-solid";
import SolarCompassBold from "~icons/solar/compass-bold";
import SolarCompassOutline from "~icons/solar/compass-outline";
import SolarHomeSmileBold from "~icons/solar/home-smile-bold";
import SolarHomeSmileOutline from "~icons/solar/home-smile-outline";
import SolarLoginBold from "~icons/solar/login-bold";
import SolarLoginOutline from "~icons/solar/login-outline";
import SolarShopBold from "~icons/solar/shop-bold";
import SolarShopOutline from "~icons/solar/shop-outline";
import SolarTrafficLineDuotone from "~icons/solar/traffic-line-duotone";
import SolarUserPlusBold from "~icons/solar/user-plus-bold";
import SolarUserPlusOutline from "~icons/solar/user-plus-outline";

export const Icon = {
  logo: { bold: LogoSolid },

  spinner: SolarTrafficLineDuotone,

  home: {
    smile: {
      outline: SolarHomeSmileOutline,
      bold: SolarHomeSmileBold,
    },
  },
  compass: {
    outline: SolarCompassOutline,
    bold: SolarCompassBold,
  },
  shop: {
    outline: SolarShopOutline,
    bold: SolarShopBold,
  },
  userPlus: {
    outline: SolarUserPlusOutline,
    bold: SolarUserPlusBold,
  },
  login: {
    outline: SolarLoginOutline,
    bold: SolarLoginBold,
  },
};
