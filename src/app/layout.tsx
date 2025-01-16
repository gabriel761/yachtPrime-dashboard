"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { ModalProvider } from "@/context/ModalContext";
import Modal from "@/components/Modal"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  // const pathname = usePathname();


  

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark min-h-[100vh]">
          <ModalProvider>
            {loading ? <Loader /> : children}
            <Modal />
          </ModalProvider>
        </div>
      </body>
    </html>
  );
}
