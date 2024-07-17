import HeroiconsCheck20Solid from "~icons/heroicons/check-20-solid";
import LogoSolid from "~icons/local/logo-solid";
import SolarAltArrowDownOutline from "~icons/solar/alt-arrow-down-outline";
import SolarBellBold from "~icons/solar/bell-bold";
import SolarBellOutline from "~icons/solar/bell-outline";
import SolarBookmarkBold from "~icons/solar/bookmark-bold";
import SolarBookmarkOutline from "~icons/solar/bookmark-outline";
import SolarCloudBold from "~icons/solar/cloud-bold";
import SolarCloudOutline from "~icons/solar/cloud-outline";
import SolarCompassBold from "~icons/solar/compass-bold";
import SolarCompassOutline from "~icons/solar/compass-outline";
import SolarDangerTriangleBold from "~icons/solar/danger-triangle-bold";
import SolarDialog2Bold from "~icons/solar/dialog-2-bold";
import SolarDialog2Linear from "~icons/solar/dialog-2-linear";
import SolarHomeSmileBold from "~icons/solar/home-smile-bold";
import SolarHomeSmileOutline from "~icons/solar/home-smile-outline";
import SolarLoginBold from "~icons/solar/login-bold";
import SolarLoginOutline from "~icons/solar/login-outline";
import SolarLogoutOutline from "~icons/solar/logout-outline";
import SolarMenuDotsBold from "~icons/solar/menu-dots-bold";
import SolarMenuDotsOutline from "~icons/solar/menu-dots-outline";
import SolarSettingsBold from "~icons/solar/settings-bold";
import SolarSettingsOutline from "~icons/solar/settings-outline";
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
  menuDots: {
    outline: SolarMenuDotsOutline,
    bold: SolarMenuDotsBold,
  },
  arrow: {
    alt: {
      down: {
        outline: SolarAltArrowDownOutline,
      },
    },
  },
  check: {
    outline: HeroiconsCheck20Solid,
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

  user: {
    outline: SolarUserOutline,
    bold: SolarUserBold,
  },
  chat: {
    dialog: {
      2: {
        outline: SolarDialog2Linear,
        bold: SolarDialog2Bold,
      },
    },
  },
  bell: {
    outline: SolarBellOutline,
    bold: SolarBellBold,
  },
  bookmark: {
    outline: SolarBookmarkOutline,
    bold: SolarBookmarkBold,
  },
  cloud: {
    outline: SolarCloudOutline,
    bold: SolarCloudBold,
  },
  settings: {
    outline: SolarSettingsOutline,
    bold: SolarSettingsBold,
  },
  logout: {
    outline: SolarLogoutOutline,
  },
};
