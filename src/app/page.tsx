'use client'
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/list/listar-seminovo'); // Redireciona para outra página
  }, [router]);
  return (
   null
  );
}
