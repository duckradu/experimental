/// <reference types="@solidjs/start/env" />

import { JSX } from "solid-js";

declare global {
  type SVGIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => JSX.Element;
}

export {};
