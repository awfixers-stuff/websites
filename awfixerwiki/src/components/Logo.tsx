import React from "react";

import { SITE } from "@/constants";

export const Logo: React.FC<
  React.ImgHTMLAttributes<HTMLImageElement>
> = props => (
  <img src={SITE.LOGO_IMAGE} alt="AWFixer Logo" className="logo" {...props} />
);
