"use client";

import ProfileSidebar from "@/components/ProfileSidebar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import AuthGuard from "@/components/AuthGuard";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("datos-personales");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    country: "Colombia",
    nombre: "",
    apellido: "",
    cumpleanos: "1993-01-09",
    sexo: "masculino",
    ciudad: "",
    direccion: "",
    numero_de_telefono: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch("/api/user/info", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setFormData({
            email: data.email || "",
            password: "",
            country: data.country || "Colombia",
            nombre: data.nombre || "",
            apellido: data.apellido || "",
            cumpleanos: data.cumpleanos || "1993-01-09",
            sexo: data.sexo || "masculino",
            ciudad: data.ciudad || "",
            direccion: data.direccion || "",
            numero_de_telefono: data.numero_de_telefono || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("access_token");

      // Prepare data in the correct format for the API
      const updateData = {
        email: formData.email,
        nombre: formData.nombre,
        apellido: formData.apellido,
        country: formData.country,
        ciudad: formData.ciudad,
        direccion: formData.direccion,
        numero_de_telefono: formData.numero_de_telefono,
        sexo: formData.sexo,
        cumpleanos: formData.cumpleanos
          ? new Date(formData.cumpleanos).toISOString().split("T")[0]
          : "",
        status: "active",
      };

      console.log("Sending profile update data:", updateData);

      const response = await fetch("/api/profile/update/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Profile update response:", result);
        alert("Perfil actualizado exitosamente");
      } else {
        const errorData = await response.json();
        console.error("Profile update error:", errorData);
        alert("Error al actualizar el perfil");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error al actualizar el perfil");
    }
  };
  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#f5f6fa] flex flex-col lg:flex-row items-start gap-0 lg:gap-6 p-4">
        {/* Sidebar */}
        <ProfileSidebar balance="0.00COP" userId="0" />

        {/* Main content */}
        <main className="w-full flex-1 flex flex-col items-center justify-start bg-white rounded-2xl p-4 lg:p-10 shadow-lg mt-10 lg:mt-0">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full">
                <h1 className="text-xl lg:text-3xl font-black text-[#23223a] mt-3 lg:mt-6 mb-4 lg:mb-8 text-left">
                  Mi perfil:{" "}
                  <span className="text-[#ffb32c]">
                    {activeTab === "datos-personales"
                      ? "Datos personales"
                      : "Seguro"}
                  </span>
                </h1>
                {/* Tabs */}
                <div className="flex mb-4 lg:mb-6 bg-gray-200 rounded-lg p-1 w-full lg:w-auto">
                  <button
                    onClick={() => setActiveTab("datos-personales")}
                    className={`flex-1 lg:flex-none px-3 lg:px-6 py-1.5 rounded-md text-xs lg:text-sm font-bold focus:outline-none transition-all ${
                      activeTab === "datos-personales"
                        ? "bg-white border-b-3 border-[#ffb32c] text-[#23223a]"
                        : "text-[#23223a] hover:bg-gray-100"
                    }`}
                  >
                    Datos personales
                  </button>
                  <button
                    onClick={() => setActiveTab("seguro")}
                    className={`flex-1 lg:flex-none px-3 lg:px-6 py-1.5 rounded-md ml-1 text-xs lg:text-sm focus:outline-none transition-all ${
                      activeTab === "seguro"
                        ? "bg-white border-b-3 border-[#ffb32c] text-[#23223a] font-bold"
                        : "text-[#23223a] hover:bg-gray-100"
                    }`}
                  >
                    Seguro
                  </button>
                </div>
              </div>
              {/* Tab Content */}
              {activeTab === "datos-personales" && (
                <>
                  {/* Email Verification Alert */}
                  <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 lg:p-6 mb-4">
                    <div className="text-left">
                      <p className="text-gray-700 text-base lg:text-sm mb-4 font-black">
                        Tu correo electrónico no ha sido verificado. Por favor,
                        verifica tu correo electrónico y no olvides revisar tu
                        carpeta de spam.
                      </p>
                      <button
                        type="button"
                        className="bg-[#14532d] hover:bg-[#0f3d20] text-white font-medium px-3 py-1 rounded-md shadow-[0_1px_0_0_#14532d] active:shadow-[0_0.5px_0_0_#14532d] active:translate-y-0.5 transition-all text-sm"
                      >
                        Enviar correo nuevamente
                      </button>
                    </div>
                  </div>

                  <section className="w-full bg-white rounded-none lg:rounded-2xl shadow-none lg:shadow-xl p-4 lg:p-10 flex flex-col gap-4 lg:gap-8 border-0 lg:border border-[#ececf1]">
                    <h2 className="text-xl lg:text-xl font-black text-[#23223a] mb-2">
                      Datos personales
                    </h2>
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col lg:grid lg:grid-cols-4 gap-x-3 gap-y-4 lg:gap-y-3"
                    >
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-[#a3a3b3] font-semibold">
                          Nombre
                        </label>
                        <Input
                          className="rounded-lg border border-[#e3e6f0] bg-white px-3 lg:px-4 py-2 lg:py-3 text-base lg:text-lg"
                          value={formData.nombre}
                          onChange={(e) =>
                            setFormData({ ...formData, nombre: e.target.value })
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-[#a3a3b3] font-semibold">
                          Apellido
                        </label>
                        <Input
                          className="rounded-lg border border-[#e3e6f0] bg-white px-3 lg:px-4 py-2 lg:py-3 text-base lg:text-lg"
                          value={formData.apellido}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              apellido: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-[#a3a3b3] font-semibold">
                          Cumpleaños
                        </label>
                        <Input
                          type="date"
                          className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-3 lg:px-4 py-2 lg:py-3 text-base lg:text-lg"
                          value={formData.cumpleanos}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              cumpleanos: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-1 md:col-span-2 lg:col-span-1">
                        <label className="text-sm text-[#a3a3b3] font-semibold">
                          Sexo
                        </label>
                        <div className="flex gap-4 lg:gap-6 items-center h-full">
                          <label className="flex items-center gap-2 text-sm">
                            <Input
                              type="radio"
                              name="gender"
                              checked={formData.sexo === "masculino"}
                              onChange={() =>
                                setFormData({ ...formData, sexo: "masculino" })
                              }
                              className="accent-white w-4 h-4 lg:w-5 lg:h-5"
                            />{" "}
                            Masculino
                          </label>
                          <label className="flex items-center gap-2 text-sm">
                            <Input
                              type="radio"
                              name="gender"
                              checked={formData.sexo === "femenino"}
                              onChange={() =>
                                setFormData({ ...formData, sexo: "femenino" })
                              }
                              className="accent-[#23223a] w-4 h-4 lg:w-5 lg:h-5"
                            />{" "}
                            Femenino
                          </label>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-[#a3a3b3] font-semibold">
                          País
                        </label>
                        <Input
                          className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-3 lg:px-4 py-2 lg:py-3 text-base lg:text-lg"
                          value={formData.country}
                          readOnly
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-[#a3a3b3] font-semibold">
                          Ciudad
                        </label>
                        <Input
                          className="rounded-lg border border-[#e3e6f0] bg-white px-3 lg:px-4 py-2 lg:py-3 text-base lg:text-lg"
                          value={formData.ciudad}
                          onChange={(e) =>
                            setFormData({ ...formData, ciudad: e.target.value })
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-sm text-[#a3a3b3] font-semibold">
                          Dirección
                        </label>
                        <Input
                          className="rounded-lg border border-[#e3e6f0] bg-white px-3 lg:px-4 py-2 lg:py-3 text-base lg:text-lg"
                          value={formData.direccion}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              direccion: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-span-2 flex flex-col gap-2">
                        <label className="text-sm text-[#a3a3b3] font-semibold">
                          Número de teléfono
                        </label>
                        <div className="flex items-center gap-2">
                          <div>
                            <button
                              type="button"
                              className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-3 lg:px-4 py-2 lg:py-2 text-sm text-[#a3a3b3]"
                            >
                              +84
                            </button>
                          </div>
                          <Input
                            className="rounded-lg border border-[#e3e6f0] bg-white px-3 lg:px-4 py-2 lg:py-3 text-base lg:text-lg"
                            placeholder="(  )"
                            value={formData.numero_de_telefono}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                numero_de_telefono: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="col-span-2 flex flex-col gap-2">
                        <label className="text-sm text-[#a3a3b3] font-semibold">
                          Correo electrónico
                        </label>
                        <Input
                          type="email"
                          className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-3 lg:px-4 py-2 lg:py-3 text-base lg:text-lg"
                          value={formData.email}
                          readOnly
                        />
                      </div>
                      <div className="md:col-span-2 lg:col-span-4 flex justify-end mt-4">
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="bg-[#ffb32c] hover:bg-[#e6a029] text-white font-semibold px-10 py-1.5 rounded-lg transition-colors shadow-[0_4px_0_0_#b97a16] active:shadow-[0_1px_0_0_#b97a16] active:translate-y-1"
                          style={{ boxShadow: "0 4px 0 0 #b97a16" }}
                        >
                          Guardar
                        </button>
                      </div>
                    </form>
                  </section>
                </>
              )}

              {activeTab === "seguro" && (
                <section className="w-full bg-white rounded-none lg:rounded-2xl shadow-none lg:shadow-xl p-4 lg:p-10 flex flex-col gap-4 lg:gap-8 border-0 lg:border border-[#ececf1]">
                  <h2 className="text-xl lg:text-3xl font-black text-[#23223a] mb-2 lg:mb-4">
                    Configuración de seguridad
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-x-3 gap-y-4 lg:gap-y-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-[#a3a3b3] font-semibold">
                        Contraseña Antigua
                      </label>
                      <Input
                        type="password"
                        className="rounded-lg border border-[#e3e6f0] bg-white px-3 lg:px-4 py-2 lg:py-3 text-base lg:text-sm placeholder:text-sm"
                        placeholder="Contraseña Antigua"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-[#a3a3b3] font-semibold">
                        Nueva Contraseña
                      </label>
                      <Input
                        type="password"
                        className="rounded-lg border border-[#e3e6f0] bg-white px-3 lg:px-4 py-2 lg:py-3 text-base lg:text-sm placeholder:text-sm"
                        placeholder="Nueva Contraseña"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-[#a3a3b3] font-semibold">
                        Confirmar Contraseña
                      </label>
                      <Input
                        type="password"
                        className="rounded-lg border border-[#e3e6f0] bg-white px-3 lg:px-4 py-2 lg:py-3 text-base lg:text-sm placeholder:text-sm"
                        placeholder="Confirmar Contraseña"
                      />
                    </div>
                    <div className="w-full flex items-end">
                      <button
                        type="button"
                        className="w-full bg-[#8888a6] hover:bg-[#464667] text-white font-semibold px-6 py-1 rounded-lg transition-colors active:translate-y-1 active:shadow-none"
                        style={{
                          boxShadow: "0 4px 0 0 rgb(86, 86, 115)",
                          transition: "box-shadow 0.1s, transform 0.1s"
                        }}
                      >
                        Enviar
                      </button>
                    </div>
                  </div>
                </section>
              )}
            </>
          )}
        </main>
      </div>
    </AuthGuard>
  );
}
