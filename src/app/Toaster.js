"use client";
import dynamic from 'next/dynamic' // Permite la carga de componentes en funcion de ciertas condiciones

export const Toaster = dynamic(    // En este caso dinamyc permite la carga de Toaster de forma asíncrona
  async () => {
    const { Toaster } = await import("react-hot-toast"); // Se carga Toaster cuando se termine la importación del módulo
    return Toaster;
  },
  {
    ssr: false, // Y Toaster no ser renderizará en el servidor, solo se cargará en el navegador.
  }
);
