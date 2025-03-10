"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useSheetStore } from "@/store/sheet";

export function MobileMenu({ children }: { children: React.ReactNode }) {
  //children으로 받는이유:client선언을 했기때문에 환경변수를 받아오지 못함
  const open = useSheetStore((state) => state.open);
  const setOpen = useSheetStore((state) => state.setOpen);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <VisuallyHidden.Root>
            <SheetTitle>메뉴</SheetTitle>
          </VisuallyHidden.Root>
          {children}
        </SheetContent>
      </Sheet>
    </div>
  );
}
