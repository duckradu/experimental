/// <reference types="@solidjs/start/env" />

import { JSX } from "solid-js";

declare global {
  type SVGIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => JSX.Element;

  type NavigationLinkItem<P extends object = {}> = {
    displayText: string;
    href: string;
  } & P;

  type NavigationLinkItemWithIcon<P extends object = {}> =
    NavigationLinkItem<P> & { icon: SVGIcon };

  type NavigationLinkItemWithStateIcon<P extends object = {}> =
    NavigationLinkItem<P> & { icon: { active: SVGIcon; inactive: SVGIcon } };
}

export {};
