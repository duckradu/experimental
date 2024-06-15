import LogoSolid from "~icons/local/logo-solid";
import SolarCompassBold from "~icons/solar/compass-bold";
import SolarCompassOutline from "~icons/solar/compass-outline";
import SolarDangerTriangleBold from "~icons/solar/danger-triangle-bold";
import SolarHomeSmileBold from "~icons/solar/home-smile-bold";
import SolarHomeSmileOutline from "~icons/solar/home-smile-outline";
import SolarLoginBold from "~icons/solar/login-bold";
import SolarLoginOutline from "~icons/solar/login-outline";
import SolarLogoutOutline from "~icons/solar/logout-outline";
import SolarMenuDotsBold from "~icons/solar/menu-dots-bold";
import SolarMenuDotsOutline from "~icons/solar/menu-dots-outline";
import SolarShopBold from "~icons/solar/shop-bold";
import SolarShopOutline from "~icons/solar/shop-outline";
import SolarTrafficLineDuotone from "~icons/solar/traffic-line-duotone";
import SolarUserBold from "~icons/solar/user-bold";
import SolarUserOutline from "~icons/solar/user-outline";
import SolarUserPlusBold from "~icons/solar/user-plus-bold";
import SolarUserPlusOutline from "~icons/solar/user-plus-outline";

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
  menuDots: {
    outline: SolarMenuDotsOutline,
    bold: SolarMenuDotsBold,
  },
  user: {
    outline: SolarUserOutline,
    bold: SolarUserBold,
  },
  logout: {
    outline: SolarLogoutOutline,
  },
};
