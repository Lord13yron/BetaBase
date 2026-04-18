"use client";
import { BetaBaseIcon } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { AuthButton } from "./auth-button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { AdminNavlink } from "./AdminNavlink";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-chalk/80 backdrop-blur-md border-b border-fog/60">
      <div className=" mx-auto px-6 lg:px-20 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <BetaBaseIcon size={28} />
          <span className="font-serif text-xl text-granite">
            Beta<span className="text-clay">Base</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {["Gyms", "Upload", "Community"].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-[10px] tracking-widest uppercase text-stone hover:text-granite transition-colors"
            >
              {item}
            </a>
          ))}
          <AdminNavlink />
        </div>
        <div className="items-center gap-3 hidden md:flex">
          <Suspense>
            <AuthButton />
          </Suspense>
        </div>

        <div className="md:hidden">
          <Drawer direction="left">
            <DrawerTrigger>
              <Menu className="hover:cursor-pointer border-2 border-sand py-1 px-2 h-8 w-10" />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="bg-sand">
                <div className="flex justify-between items-center">
                  <DrawerTitle className="text-granite tracking-widest uppercase font-bold">
                    <DrawerClose>
                      <div className="hover:cursor-pointer text-[14px]">
                        <AuthButton isDrawer={true} />
                      </div>
                    </DrawerClose>
                  </DrawerTitle>

                  <DrawerClose className="ml-auto">
                    <X className="hover:cursor-pointer hover:bg-chalk rounded-full p-1 transition-colors" />
                  </DrawerClose>
                </div>
              </DrawerHeader>

              <nav className="flex flex-col w-full bg-chalk h-full">
                {["Gyms", "Upload", "Community", "About", "Contact"].map(
                  (item) => (
                    <DrawerClose key={item}>
                      <div
                        className="w-full text-start px-4 py-2 hover:cursor-pointer text-[14px] tracking-widest uppercase text-stone hover:text-granite transition-colors"
                        onClick={() => router.push(`/${item.toLowerCase()}`)}
                      >
                        {item}
                      </div>
                    </DrawerClose>
                  ),
                )}
                <DrawerClose className="self-start">
                  <div className="text-start px-4 py-2 hover:cursor-pointer text-[14px] tracking-widest uppercase text-stone hover:text-granite transition-colors">
                    <AdminNavlink />
                  </div>
                </DrawerClose>
              </nav>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </nav>
  );
}
