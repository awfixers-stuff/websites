import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import React, { PropsWithChildren } from "react";

export default function ScrollAreaIsland({ children }: PropsWithChildren) {
  return (
    <RadixScrollArea.Root className="relative w-full h-full z-0 [&_[data-radix-scroll-area-position]::-webkit-scrollbar]:hidden">
      <RadixScrollArea.Viewport className="relative max-w-full max-h-full z-1">
        {children}
      </RadixScrollArea.Viewport>
      <RadixScrollArea.Scrollbar
        orientation="vertical"
        className="absolute select-none transition-opacity w-1 right-0 top-0 bottom-0 z-1"
      >
        <RadixScrollArea.Thumb className="rounded-full select-none relative left-0 top-0 bg-gray-300" />
      </RadixScrollArea.Scrollbar>
    </RadixScrollArea.Root>
  );
}
