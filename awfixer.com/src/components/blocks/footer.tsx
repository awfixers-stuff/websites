"use client";

import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Footer() {
  const navigation = [
    { name: "Product", href: "/#feature-modern-teams" },
    { name: "About Us", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  const social = [
    { name: "Xwitter", href: "https://x.com/awfixer" },
    { name: "Discord", href: "https://discord.awfixer.com" },
  ];

  const legal = [{ name: "Privacy Policy", href: "/privacy" }];

  return (
    <footer className="flex flex-col items-center gap-14 pt-28 lg:pt-32">
      <div className="container space-y-3 text-center">
        <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
          Join the future, today.
        </h2>
        <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance">
          AWFixer and Friends is the future, today.
        </p>
        <div>
          <Button size="lg" className="mt-4" asChild>
            <a href="https://github.com/awfixer-org">GitHub</a>
          </Button>
        </div>
      </div>

      <nav className="container flex flex-col items-center gap-4">
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="font-medium transition-opacity hover:opacity-75"
              >
                {item.name}
              </Link>
            </li>
          ))}
          {social.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center gap-0.5 font-medium transition-opacity hover:opacity-75"
              >
                {item.name} <ArrowUpRight className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {legal.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-muted-foreground text-sm transition-opacity hover:opacity-75"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <p className="text-muted-foreground mt-6 text-center text-sm">
        © {new Date().getFullYear()} AWFixer Holdings LLC. All rights reserved.
      </p>

      <div
        className="text-primary mt-10 mb-12 w-full md:mt-14 lg:mt-20"
        style={{ height: "150px" }}
      >
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-163.30312499999997 -79.6 826.6062499999999 309.2"
          style={{ background: "rgba(0, 0, 0, 0)" }}
          preserveAspectRatio="xMidYMid"
        >
          <defs>
            <filter id="editing-metal-beveled">
              <feGaussianBlur
                stdDeviation="4"
                in="SourceAlpha"
                result="blur"
              ></feGaussianBlur>
              <feSpecularLighting
                surfaceScale="5"
                specularConstant="0.8"
                specularExponent="7.5"
                lightingColor="#fff"
                in="blur"
                result="specular"
              >
                <fePointLight x="-250" y="-50" z="300"></fePointLight>
              </feSpecularLighting>
              <feComposite
                operator="in"
                in="specular"
                in2="SourceAlpha"
                result="comp"
              ></feComposite>
              <feComposite
                in="SourceGraphic"
                in2="comp"
                operator="arithmetic"
                k1="0"
                k2="1"
                k3="1"
                k4="0"
              ></feComposite>
            </filter>
            <linearGradient
              id="text-gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="currentColor" />
              <stop offset="100%" stopColor="rgba(248, 248, 248, 0.41)" />
            </linearGradient>
          </defs>
          <g filter="url(#editing-metal-beveled)">
            <g transform="translate(-48.060017585754395, 131.94000434875488)">
              <path
                d="M87.47-53.68L87.47-53.68L86.76-36.21L90.31-36.35L90.31-4.12L90.31-4.12Q87.76-1.99 81.51-0.28L81.51-0.28L81.51-0.28Q75.26 1.42 69.72 1.42L69.72 1.42L69.72 1.42Q64.18 1.42 60.92 0.43L60.92 0.43L60.92 0.43Q57.65-0.57 56.09-1.78L56.09-1.78L56.09-1.78Q54.53-2.98 53.68-4.54L53.68-4.54L53.68-4.54Q52.40-6.82 52.40-8.38L52.40-8.38L52.40-8.38Q44.59 1.42 27.55 1.42L27.55 1.42L27.55 1.42Q4.12 1.42 4.12-18.46L4.12-18.46L4.12-18.46Q4.12-30.39 13.21-35.43L13.21-35.43L13.21-35.43Q22.29-40.47 45.01-41.46L45.01-41.46L45.01-41.46Q45.01-46.43 34.08-46.43L34.08-46.43L34.08-46.43Q26.70-46.43 19.95-44.59L19.95-44.59L19.95-44.59Q13.21-42.74 10.22-40.90L10.22-40.90L7.10-39.05L7.10-76.40L7.10-76.40Q8.38-77.39 10.93-78.88L10.93-78.88L10.93-78.88Q13.49-80.37 23.00-82.86L23.00-82.86L23.00-82.86Q32.52-85.34 43.88-85.34L43.88-85.34L43.88-85.34Q66.60-85.34 77.04-77.67L77.04-77.67L77.04-77.67Q87.47-70.01 87.47-53.68ZM47.29-31.10L47.29-31.10L47.29-36.78L39.19-34.51L39.19-31.10L39.19-31.10Q39.19-29.25 40.40-28.12L40.40-28.12L40.40-28.12Q41.61-26.98 43.38-26.98L43.38-26.98L43.38-26.98Q45.16-26.98 46.22-28.12L46.22-28.12L46.22-28.12Q47.29-29.25 47.29-31.10ZM224.22-83.92L210.02 0L163.73 0L160.32-28.97L157.19-28.97L153.93 0L106.22 0L93.44-83.92L135.75-83.92L139.30-51.55L142.43-51.55L144.84-81.37L173.52-81.37L176.36-51.55L179.35-51.55L183.04-83.92L224.22-83.92ZM232.45-82.08L232.45-82.08L232.45-82.08Q232.45-108.06 262.56-108.06L262.56-108.06L262.56-108.06Q270.51-108.06 276.69-107.14L276.69-107.14L276.69-107.14Q282.86-106.22 285.14-105.36L285.14-105.36L287.27-104.51L287.27-76.11L272.21-76.11L272.21-69.86L287.27-69.86L287.27-31.52L277.04-31.52L277.04 0L234.87 0L234.87-31.52L229.33-31.52L229.33-66.60L235.72-69.86L235.72-69.86Q232.45-74.55 232.45-82.08ZM316.52-76.96L316.52-76.96L316.52-76.96Q305.73-76.96 300.61-81.22L300.61-81.22L300.61-81.22Q295.50-85.48 295.50-94.86L295.50-94.86L295.50-94.86Q295.50-104.23 300.69-108.35L300.69-108.35L300.69-108.35Q305.87-112.46 316.52-112.46L316.52-112.46L316.52-112.46Q337.82-112.46 337.82-95.28L337.82-95.28L337.82-95.28Q337.82-85.48 332.56-81.22L332.56-81.22L332.56-81.22Q327.31-76.96 316.52-76.96ZM337.82 0L295.50 0L295.50-73.70L337.82-73.70L337.82 0ZM437.79 0L393.91 0L389.22-30.81L384.39 0L343.21 0L354.29-40.19L343.36-83.92L386.95-83.92L392.06-47.71L397.17-83.92L437.79-83.92L425.15-40.19L437.79 0ZM439.06-41.82L439.06-41.82L439.06-41.82Q439.06-63.47 448.93-74.41L448.93-74.41L448.93-74.41Q458.80-85.34 481.24-85.34L481.24-85.34L481.24-85.34Q503.67-85.34 512.48-76.25L512.48-76.25L512.48-76.25Q521.28-67.17 521.28-46.43L521.28-46.43L520.57-35.50L481.38-35.50L481.38-30.67L481.38-30.67Q484.93-29.82 491.75-29.82L491.75-29.82L491.75-29.82Q506.23-29.82 515.18-31.10L515.18-31.10L518.16-31.52L518.16-4.83L518.16-4.83Q517.02-4.12 514.54-3.05L514.54-3.05L514.54-3.05Q512.05-1.99 502.68-0.28L502.68-0.28L502.68-0.28Q493.31 1.42 481.81 1.42L481.81 1.42L481.81 1.42Q459.09 1.42 449.08-9.37L449.08-9.37L449.08-9.37Q439.06-20.16 439.06-41.82ZM479.25-48.14L479.25-48.14L479.25-42.60L487.34-42.60L487.34-48.14L487.34-48.14Q487.34-49.98 486.14-51.12L486.14-51.12L486.14-51.12Q484.93-52.26 483.16-52.26L483.16-52.26L483.16-52.26Q481.38-52.26 480.32-51.12L480.32-51.12L480.32-51.12Q479.25-49.98 479.25-48.14ZM571.69-40.75L571.69 0L529.38 0L529.38-83.92L565.02-83.92L566.44-73.56L566.44-73.56Q566.72-73.98 567.15-74.69L567.15-74.69L567.15-74.69Q567.57-75.40 569.56-77.18L569.56-77.18L569.56-77.18Q571.55-78.95 574.11-80.37L574.11-80.37L574.11-80.37Q581.21-83.92 592.00-83.92L592.00-83.92L592.00-38.77L571.69-40.75Z"
                fill="url(#text-gradient)"
              ></path>
            </g>
          </g>
        </svg>
      </div>
    </footer>
  );
}
