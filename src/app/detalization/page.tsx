"use client";

import ProfileSidebar from "../../components/ProfileSidebar";
import { useState, useEffect } from "react";
import AuthGuard from "../../components/AuthGuard";

interface Transaction {
  id: number;
  user_id: string;
  transacciones_data: string;
  transacciones_monto: string;
  estado: string;
  transaccion_number: string;
  metodo_de_pago: string;
  amount_usd?: string;
  stage_processed?: boolean;
  currency?: string;
  exchange_rate?: string;
  created_at?: string;
}

interface PaymentHistory {
  id: number;
  user_id: string;
  transacciones_data: string;
  transacciones_monto: string;
  estado: string;
  transaccion_number: string;
  metodo_de_pago: string;
  phone: string;
  cuenta_corriente: string;
  numero_de_cuenta: string;
  tipo_de_documento: string;
  numero_documento: string;
  banco: string;
}

export default function DetalizationPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [payments, setPayments] = useState<PaymentHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("deposits");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");

        // Fetch transactions (deposits)
        const transactionsResponse = await fetch("/api/transactions/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (transactionsResponse.ok) {
          const transactionsData = await transactionsResponse.json();
          console.log("Transactions:", transactionsData);
          setTransactions(transactionsData);
        }

        // Fetch payment history
        const paymentsResponse = await fetch("/api/historial_pagos/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (paymentsResponse.ok) {
          const paymentsData = await paymentsResponse.json();
          console.log("Payments:", paymentsData);
          setPayments(paymentsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#f5f6fa] flex flex-col lg:flex-row items-start gap-0 lg:gap-6 p-4">
        <ProfileSidebar />
        <main className="flex-1 p-4 lg:p-8 bg-white rounded-2xl mt-5 lg:mt-0 w-full lg:w-auto">
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="mb-4 lg:mb-8">
                  <h1 className="text-xl lg:text-3xl font-black text-[#23223a] leading-tight">
                    Historial de transacciones:
                    <br />
                    <span className="text-[#ffb32c]">
                      {activeTab === "deposits" ? "depósitos" : "pagos"}
                    </span>
                  </h1>
                </div>
                {/* Tabs */}
                <div className="flex mb-4 lg:mb-6 bg-gray-200 rounded-lg p-1 w-full lg:w-auto">
                  <button
                    onClick={() => setActiveTab("deposits")}
                    className={`flex-1 lg:flex-none px-4 lg:px-8 py-2 rounded-md text-sm lg:text-lg font-bold focus:outline-none transition-all ${
                      activeTab === "deposits"
                        ? "bg-white border-b-4 border-[#ffb32c] text-[#23223a]"
                        : "text-[#23223a] hover:bg-gray-100"
                    }`}
                  >
                    depósitos
                  </button>
                  <button
                    onClick={() => setActiveTab("payments")}
                    className={`flex-1 lg:flex-none px-4 lg:px-8 py-2 rounded-md ml-2 text-sm lg:text-base focus:outline-none transition-all ${
                      activeTab === "payments"
                        ? "bg-white border-b-4 border-[#ffb32c] text-[#23223a] font-bold"
                        : "text-[#23223a] hover:bg-gray-100"
                    }`}
                  >
                    pagos
                  </button>
                </div>
              </div>
              {/* Table */}
              <div className="bg-white rounded-none lg:rounded-2xl shadow-none lg:shadow-lg overflow-x-auto border border-gray-200">
                <table className="min-w-full">
                  {(activeTab === "deposits"
                    ? transactions.length > 0
                    : payments.length > 0) && (
                    <thead>
                      <tr className="bg-[#ffb32c] text-white text-left">
                        <th className="py-2 lg:py-4 px-2 lg:px-6 rounded-tl-none lg:rounded-tl-2xl text-xs lg:text-base">
                          Fecha y Hora
                        </th>
                        <th className="py-2 lg:py-4 px-2 lg:px-6 text-xs lg:text-base">
                          Transacción
                        </th>
                        <th className="py-2 lg:py-4 px-2 lg:px-6 text-xs lg:text-base">
                          Monto
                        </th>
                        <th className="py-2 lg:py-4 px-2 lg:px-6 text-xs lg:text-base hidden md:table-cell">
                          Método de pago
                        </th>
                        <th className="py-2 lg:py-4 px-2 lg:px-6 rounded-tr-none lg:rounded-tr-2xl text-xs lg:text-base">
                          Estado
                        </th>
                      </tr>
                    </thead>
                  )}
                  <tbody className="text-[#23223a] text-sm lg:text-base font-medium">
                    {(
                      activeTab === "deposits"
                        ? transactions.length === 0
                        : payments.length === 0
                    ) ? (
                      <tr>
                        <td colSpan={5} className="py-8 lg:py-16 px-4 lg:px-8">
                          <div className="flex flex-col items-center justify-center text-center">
                            {/* Icon */}
                            <div className="mb-6">
                              <svg
                                width="66"
                                height="50"
                                viewBox="0 0 66 50"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M65.99 20.9611C65.99 20.2311 65.87 19.4911 65.64 18.7611C64.68 15.8311 61.87 13.2311 57.77 11.3111C57.73 11.1211 57.7 10.9411 57.64 10.7511C56.21 6.38111 50.7 2.75111 42.9 1.03111C36.72 -0.328885 30 -0.298885 24.11 0.851115C24.1 0.851115 24.08 0.851115 24.07 0.851115C18.15 2.02111 13.08 4.32111 10.3 7.47111C8.78 9.19111 8.02 11.0411 8.02 12.9211C8.02 12.9411 8.01 12.9511 8.01 12.9711V19.4111C5.66 20.5311 3.7 21.8911 2.31 23.4711C0.78 25.2111 0.02 27.0611 0.01 28.9411C0.01 28.9611 0 28.9811 0 29.0011V37.0011C0 44.2911 10.98 50.0011 25 50.0011C36.02 50.0011 45.16 46.4711 48.57 41.4111C58.78 39.7811 66 34.9111 66 28.9911V20.9911C66 20.9911 66 20.9711 66 20.9611H65.99ZM58 13.6811C59.44 14.4511 60.67 15.3011 61.63 16.2211L58 16.9511V13.6811ZM57.94 21.9311C57.94 22.0011 57.92 22.0611 57.91 22.1311C57.92 22.0611 57.93 22.0011 57.94 21.9311ZM55.74 11.3911C56.38 13.3511 55.87 15.3011 54.22 17.1711L45.39 15.1611C46 14.1011 46.16 12.9411 45.82 11.8211L55.07 9.97112C55.36 10.4311 55.58 10.9011 55.74 11.3811V11.3911ZM33 32.0111C30.31 32.0111 27.71 31.7711 25.29 31.3511V25.3811C27.8 25.8011 30.36 26.0011 32.9 26.0011C35.44 26.0011 37.91 25.8011 40.3 25.4211V31.4211C38 31.8011 35.54 32.0111 33.01 32.0111H33ZM20.42 36.4811C21.06 36.9611 21.75 37.4111 22.5 37.8411C22.48 38.0211 22.5 38.2111 22.55 38.3911C22.74 38.9511 23.27 39.3711 24.02 39.5511C24.25 39.6011 24.5 39.6311 24.77 39.6311C25.14 39.6311 25.53 39.5711 25.88 39.4311C26.35 39.6111 26.83 39.7811 27.32 39.9511C24.28 40.1011 21.16 39.9511 18.1 39.4811L20.42 36.4811ZM18.78 31.7611C22.36 33.0311 26.63 33.8211 31.29 33.9811V38.9511C25.22 37.5511 20.55 34.9111 18.78 31.7711V31.7611ZM16.75 32.2311C15.37 31.5011 14.42 30.6111 14.11 29.6511C14.11 29.6311 14.11 29.6111 14.1 29.5911C14.76 29.9911 15.47 30.3611 16.23 30.7111C16.23 30.7111 16.23 30.7111 16.22 30.7111C16.35 31.2311 16.52 31.7311 16.76 32.2311H16.75ZM39.01 19.2311C40.96 18.6911 42.66 17.8911 43.89 16.8711L52.4 18.8011C49.78 20.8011 46.03 22.2911 41.74 23.1511L39.01 19.2211V19.2311ZM39.57 23.5311C35.28 24.1511 30.61 24.1711 26.1 23.4711L29.04 19.6711C30.36 19.8911 31.71 20.0011 33.03 20.0011C34.35 20.0011 35.65 19.8911 36.89 19.6911L39.56 23.5311H39.57ZM43.23 14.7511C40.89 17.4011 34.45 18.6611 28.93 17.6111C28.89 17.6011 28.85 17.5911 28.81 17.5911C28.67 17.5611 28.53 17.5411 28.39 17.5111C25.06 16.7811 22.66 15.3011 22.12 13.6511C21.86 12.8511 22.08 12.0411 22.79 11.2411C24.57 9.22112 28.74 8.01112 33.06 8.01112C34.6 8.01112 36.16 8.16111 37.64 8.49111C40.97 9.22112 43.37 10.7011 43.91 12.3511C44.17 13.1511 43.95 13.9611 43.24 14.7611L43.23 14.7511ZM26.88 19.1811L23.88 23.0611C23.77 23.0411 23.65 23.0211 23.53 22.9911C19.1 22.0111 15.45 20.3711 13.05 18.3711L21.81 16.6211C23 17.7111 24.73 18.5811 26.88 19.1811ZM38.9 33.6411C38.85 33.6411 38.8 33.6511 38.75 33.6611C38.8 33.6611 38.85 33.6511 38.9 33.6411ZM42.26 33.1011C42.26 33.1011 42.18 33.1211 42.14 33.1211C42.18 33.1211 42.22 33.1011 42.26 33.1011ZM42.29 25.0411C47.7 23.9311 52.35 21.8611 55.15 19.0611C55.19 19.0311 55.23 18.9811 55.27 18.9411C55.41 18.7911 55.57 18.6511 55.7 18.5011C55.81 18.3811 55.89 18.2511 55.99 18.1311V21.0011C55.99 25.3911 50.27 29.2811 42.28 31.0311V25.0511L42.29 25.0411ZM43.05 3.13111C47.65 4.22111 51.37 6.04111 53.62 8.22112L44.79 9.99111C43.71 8.71111 41.94 7.67111 39.66 6.96111L43.05 3.14111V3.13111ZM32.96 1.98111C35.57 1.98111 38.21 2.21111 40.79 2.67111L37.47 6.41111C34.62 5.86111 31.64 5.86111 28.96 6.32112L26.08 2.50111C28.29 2.16111 30.61 1.98111 32.96 1.98111ZM23.88 2.90111L26.82 6.81111C24.58 7.45111 22.69 8.44112 21.47 9.72112L12.87 7.77111C15.42 5.53111 19.34 3.87111 23.88 2.91111V2.90111ZM10 13.1211C9.96 11.8811 10.39 10.6511 11.28 9.45111L20.29 11.5011C19.94 12.4011 19.91 13.3411 20.21 14.2611C20.28 14.4611 20.38 14.6611 20.47 14.8511L11.39 16.6711C10.88 16.0011 10.49 15.3111 10.26 14.6011C10.1 14.1111 10.01 13.6211 10 13.1311V13.1211ZM10 18.1211C12.48 21.1611 17.11 23.6211 23.1 24.9411C23.16 24.9511 23.22 24.9611 23.28 24.9711V30.9111C15.51 29.1211 9.99 25.2911 9.99 20.9811V18.1111L10 18.1211ZM17.56 31.2811C17.5 31.2511 17.44 31.2311 17.37 31.2011C17.43 31.2311 17.49 31.2511 17.56 31.2811ZM9.86 25.9811C9.86 25.9811 9.86 25.9711 9.85 25.9611C9.85 25.9611 9.85 25.9711 9.86 25.9811ZM8.04 21.6311C8.14 22.7011 8.47 23.7211 9.01 24.7011L4.88 23.7611C5.77 22.9811 6.84 22.2711 8.04 21.6311ZM2.01 29.1311C1.97 27.8911 2.4 26.6611 3.29 25.4511L10.94 27.1911C11.3 27.5411 11.68 27.8711 12.09 28.2011C11.95 28.8811 11.99 29.5811 12.21 30.2611C12.28 30.4611 12.38 30.6611 12.47 30.8511L3.39 32.6711C2.88 32.0011 2.49 31.3111 2.26 30.6011C2.1 30.1111 2.01 29.6211 2 29.1311H2.01ZM10.34 26.5611C10.34 26.5611 10.36 26.5911 10.38 26.6011C10.37 26.5911 10.36 26.5711 10.34 26.5611ZM15.29 46.9311C7.52 45.1411 2 41.3111 2 37.0011V34.1311C4.48 37.1711 9.11 39.6311 15.1 40.9511C15.16 40.9611 15.22 40.9711 15.28 40.9811V46.9211L15.29 46.9311ZM15.54 39.0011C11.11 38.0211 7.46 36.3811 5.06 34.3811L13.82 32.6311C15.01 33.7211 16.74 34.5911 18.89 35.1911L15.89 39.0711C15.78 39.0511 15.66 39.0311 15.54 39.0011ZM32.3 47.4111C30 47.7911 27.54 48.0011 25.01 48.0011C22.32 48.0011 19.72 47.7611 17.3 47.3411V41.3711C19.8 41.7911 22.37 41.9911 24.91 41.9911C27.45 41.9911 29.92 41.7911 32.31 41.4111V47.4111H32.3ZM34.3 47.0311V41.5511C36.43 41.8511 38.68 42.0111 41.01 42.0111C42.59 42.0111 44.13 41.9311 45.62 41.7911C43.22 44.0911 39.19 45.9611 34.3 47.0311ZM48.3 39.4111C46 39.7911 43.54 40.0011 41.01 40.0011C38.32 40.0011 35.72 39.7611 33.3 39.3411V34.0011C34.59 34.0011 35.86 33.9411 37.09 33.8411C38.36 33.9411 39.64 33.9911 40.91 33.9911C43.43 33.9911 45.93 33.7911 48.31 33.4111V39.4111H48.3ZM49.53 30.8311C52.48 29.4911 54.8 27.8011 56.26 25.8611L60.42 26.8111C57.8 28.8111 54.05 30.3111 49.76 31.1611L49.53 30.8311ZM64.01 29.0011C64.01 33.3911 58.29 37.2811 50.3 39.0311V33.0511C55.71 31.9411 60.36 29.8711 63.16 27.0711C63.21 27.0311 63.25 26.9811 63.29 26.9311C63.43 26.7911 63.58 26.6511 63.71 26.5011C63.82 26.3811 63.9 26.2511 64 26.1311V29.0011H64.01ZM62.22 25.1711L57.33 24.0611C57.48 23.7311 57.61 23.3911 57.71 23.0411C57.88 23.1211 58.06 23.1911 58.26 23.2311C58.49 23.2811 58.74 23.3111 59.01 23.3111C59.72 23.3111 60.48 23.1011 60.94 22.5611C61.27 22.1711 61.37 21.6811 61.22 21.2211C61.03 20.6611 60.5 20.2411 59.75 20.0611C59.23 19.9411 58.59 19.9711 58.01 20.1611V18.9911L63.08 17.9811C63.37 18.4411 63.59 18.9111 63.75 19.3911C64.39 21.3511 63.88 23.2911 62.23 25.1711H62.22ZM4.79 29.6111C4.64 29.1511 4.74 28.6511 5.07 28.2711C5.69 27.5411 6.89 27.4111 7.74 27.6111C8.49 27.7811 9.03 28.2011 9.22 28.7711C9.37 29.2311 9.27 29.7211 8.94 30.1111C8.48 30.6411 7.72 30.8511 7.02 30.8511C6.76 30.8511 6.5 30.8211 6.27 30.7711C5.52 30.6011 4.98 30.1811 4.8 29.6211L4.79 29.6111ZM12.79 13.6011C12.64 13.1411 12.74 12.6411 13.07 12.2611C13.69 11.5311 14.9 11.4011 15.74 11.6011C16.49 11.7711 17.03 12.1911 17.21 12.7611C17.36 13.2211 17.26 13.7111 16.93 14.1011C16.47 14.6311 15.71 14.8511 15 14.8511C14.74 14.8511 14.48 14.8211 14.25 14.7711C13.5 14.6011 12.96 14.1811 12.78 13.6211L12.79 13.6011ZM31.23 4.39111C31.08 3.93111 31.18 3.44111 31.51 3.05111C32.14 2.32111 33.34 2.19111 34.18 2.39111C34.93 2.56111 35.47 2.98111 35.65 3.54111C35.8 4.00111 35.7 4.49112 35.37 4.88111C34.91 5.41111 34.15 5.63111 33.44 5.63111C33.18 5.63111 32.92 5.60112 32.69 5.55112C31.94 5.38111 31.4 4.96111 31.21 4.39111H31.23ZM48.78 14.0711C48.63 13.6111 48.73 13.1211 49.06 12.7311C49.68 12.0011 50.89 11.8711 51.73 12.0711C52.48 12.2411 53.02 12.6611 53.2 13.2211C53.35 13.6811 53.25 14.1811 52.92 14.5611C52.46 15.0911 51.7 15.3011 50.99 15.3011C50.73 15.3011 50.48 15.2711 50.25 15.2211C49.5 15.0511 48.96 14.6311 48.77 14.0611L48.78 14.0711ZM34.98 21.5311C35.13 21.9911 35.03 22.4811 34.7 22.8711C34.24 23.4011 33.48 23.6211 32.78 23.6211C32.52 23.6211 32.26 23.5911 32.03 23.5411C31.28 23.3711 30.74 22.9511 30.55 22.3811C30.4 21.9211 30.5 21.4311 30.83 21.0411C31.46 20.3111 32.65 20.1811 33.5 20.3811C34.25 20.5511 34.79 20.9711 34.98 21.5411V21.5311Z"
                                  fill="#FDA700"
                                />
                              </svg>
                            </div>
                            {/* Title */}
                            <h3 className="text-lg lg:text-xl font-bold text-[#23223a] mb-3">
                              {activeTab === "deposits" ? (
                                <>
                                  La historia de operaciones está <br /> vacía
                                </>
                              ) : (
                                <>
                                  Aún no hay solicitudes para <br /> recibir
                                  ganancias
                                </>
                              )}
                            </h3>
                            {/* Description */}
                            <p className="text-sm lg:text-sm text-gray-400 mb-6">
                              {activeTab === "deposits" ? (
                                <>
                                  Recarga tu cuenta, realiza apuestas <br /> y
                                  obtén ganancias!
                                </>
                              ) : (
                                <>
                                  Las solicitudes de ganancias <br /> se
                                  mostrarán aquí
                                </>
                              )}
                            </p>
                            {/* Button */}
                            <button
                              className="bg-[#FDA700] hover:bg-[#E6A029] text-white font-semibold px-6 py-2 rounded-lg shadow-[0_2px_0_0_#B97A16] active:shadow-[0_1px_0_0_#B97A16] active:translate-y-0.5 transition-all"
                              onClick={() =>
                                (window.location.href =
                                  activeTab === "deposits"
                                    ? "/deposit"
                                    : "/withdrawal")
                              }
                            >
                              {activeTab === "deposits"
                                ? "Recargar"
                                : "Obtener una ganancia"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      (activeTab === "deposits" ? transactions : payments).map(
                        (item) => (
                          <tr
                            key={item.id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="py-2 lg:py-4 px-2 lg:px-6 text-xs lg:text-sm">
                              {new Date(
                                item.transacciones_data
                              ).toLocaleDateString("es-ES")}
                            </td>
                            <td className="py-2 lg:py-4 px-2 lg:px-6 text-xs lg:text-sm">
                              {item.transaccion_number}
                            </td>
                            <td className="py-2 lg:py-4 px-2 lg:px-6 text-xs lg:text-sm">
                              {activeTab === "deposits" &&
                              "currency" in item &&
                              item.currency
                                ? `${item.transacciones_monto} ${item.currency}`
                                : `$${item.transacciones_monto}`}
                            </td>
                            <td className="py-2 lg:py-4 px-2 lg:px-6 text-xs lg:text-sm hidden md:table-cell">
                              {item.metodo_de_pago}
                            </td>
                            <td className="py-2 lg:py-4 px-2 lg:px-6">
                              <span
                                className={`px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm ${
                                  item.estado === "completado"
                                    ? "bg-green-100 text-green-800"
                                    : item.estado === "esperando"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : item.estado === "pendiente"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {item.estado}
                              </span>
                            </td>
                          </tr>
                        )
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </main>
      </div>
    </AuthGuard>
  );
}
