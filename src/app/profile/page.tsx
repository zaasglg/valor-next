"use client";

import ProfileSidebar from "@/components/ProfileSidebar";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import AuthGuard from "@/components/AuthGuard";
import { useLanguage } from "@/contexts/LanguageContext";

// Список стран с телефонными кодами
const countryPhoneCodes: { [key: string]: string } = {
  "Colombia": "+57",
  "Argentina": "+54",
  "Mexico": "+52",
  "Chile": "+56",
  "Peru": "+51",
  "Ecuador": "+593",
  "Venezuela": "+58",
  "Bolivia": "+591",
  "Paraguay": "+595",
  "Uruguay": "+598",
  "Brazil": "+55",
  "Spain": "+34",
  "United States": "+1",
  "Canada": "+1",
  "United Kingdom": "+44",
  "France": "+33",
  "Germany": "+49",
  "Italy": "+39",
  "Portugal": "+351",
  "Russia": "+7",
  "China": "+86",
  "Japan": "+81",
  "South Korea": "+82",
  "India": "+91",
  "Australia": "+61",
  "Vietnam": "+84",
  "Thailand": "+66",
  "Philippines": "+63",
  "Indonesia": "+62",
  "Malaysia": "+60",
  "Singapore": "+65",
  "Turkey": "+90",
  "Egypt": "+20",
  "South Africa": "+27",
  "Nigeria": "+234",
  "Kenya": "+254",
  "Morocco": "+212",
  "Algeria": "+213",
  "Tunisia": "+216",
  "Israel": "+972",
  "Saudi Arabia": "+966",
  "UAE": "+971",
  "Qatar": "+974",
  "Kuwait": "+965",
  "Bahrain": "+973",
  "Oman": "+968",
  "Jordan": "+962",
  "Lebanon": "+961",
  "Syria": "+963",
  "Iraq": "+964",
  "Iran": "+98",
  "Afghanistan": "+93",
  "Pakistan": "+92",
  "Bangladesh": "+880",
  "Sri Lanka": "+94",
  "Nepal": "+977",
  "Bhutan": "+975",
  "Myanmar": "+95",
  "Cambodia": "+855",
  "Laos": "+856",
  "Mongolia": "+976",
  "Kazakhstan": "+7",
  "Uzbekistan": "+998",
  "Kyrgyzstan": "+996",
  "Tajikistan": "+992",
  "Turkmenistan": "+993",
  "Azerbaijan": "+994",
  "Armenia": "+374",
  "Georgia": "+995",
  "Ukraine": "+380",
  "Belarus": "+375",
  "Moldova": "+373",
  "Romania": "+40",
  "Bulgaria": "+359",
  "Greece": "+30",
  "Albania": "+355",
  "Macedonia": "+389",
  "Serbia": "+381",
  "Montenegro": "+382",
  "Bosnia": "+387",
  "Croatia": "+385",
  "Slovenia": "+386",
  "Slovakia": "+421",
  "Czech Republic": "+420",
  "Poland": "+48",
  "Hungary": "+36",
  "Austria": "+43",
  "Switzerland": "+41",
  "Liechtenstein": "+423",
  "Netherlands": "+31",
  "Belgium": "+32",
  "Luxembourg": "+352",
  "Denmark": "+45",
  "Sweden": "+46",
  "Norway": "+47",
  "Finland": "+358",
  "Iceland": "+354",
  "Ireland": "+353",
  "Malta": "+356",
  "Cyprus": "+357",
  "Estonia": "+372",
  "Latvia": "+371",
  "Lithuania": "+370"
};

export default function ProfilePage() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("datos-personales");
  const [phoneCode, setPhoneCode] = useState("+57"); // По умолчанию код Колумбии
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
          const country = data.country || "Colombia";
          
          // Парсим номер телефона для извлечения кода и номера
          let phoneNumber = data.numero_de_telefono || "";
          let phoneCodeFromData = "+57"; // По умолчанию код Колумбии
          
          // Если номер начинается с кода, извлекаем его
          if (phoneNumber.startsWith("+")) {
            // Ищем первый код из списка, который совпадает с началом номера
            for (const [countryName, code] of Object.entries(countryPhoneCodes)) {
              if (phoneNumber.startsWith(code)) {
                phoneCodeFromData = code;
                phoneNumber = phoneNumber.substring(code.length);
                break;
              }
            }
          }
          
          setFormData({
            email: data.email || "",
            password: "",
            country: country,
            nombre: data.nombre || "",
            apellido: data.apellido || "",
            cumpleanos: data.cumpleanos || "1993-01-09",
            sexo: data.sexo || "masculino",
            ciudad: data.ciudad || "",
            direccion: data.direccion || "",
            numero_de_telefono: phoneNumber,
          });
          // Устанавливаем телефонный код
          setPhoneCode(phoneCodeFromData);
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
      const fullPhoneNumber = formData.numero_de_telefono 
        ? `${phoneCode}${formData.numero_de_telefono}` 
        : "";
      
      const updateData = {
        email: formData.email,
        nombre: formData.nombre,
        apellido: formData.apellido,
        country: formData.country,
        ciudad: formData.ciudad,
        direccion: formData.direccion,
        numero_de_telefono: fullPhoneNumber,
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
        alert(t("profile.profile_updated"));
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
        <ProfileSidebar />

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
                  {t("profile.my_profile")}:{" "}
                  <span className="text-[#ffb32c]">
                    {activeTab === "datos-personales"
                      ? t("profile.personal_data")
                      : t("profile.security")}
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
                    {t("profile.personal_data")}
                  </button>
                  <button
                    onClick={() => setActiveTab("seguro")}
                    className={`flex-1 lg:flex-none px-3 lg:px-6 py-1.5 rounded-md ml-1 text-xs lg:text-sm focus:outline-none transition-all ${
                      activeTab === "seguro"
                        ? "bg-white border-b-3 border-[#ffb32c] text-[#23223a] font-bold"
                        : "text-[#23223a] hover:bg-gray-100"
                    }`}
                  >
                    {t("profile.security")}
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
                        {t("profile.email_not_verified")}
                      </p>
                      <button
                        type="button"
                        className="bg-[#14532d] hover:bg-[#0f3d20] text-white font-medium px-3 py-1 rounded-md shadow-[0_1px_0_0_#14532d] active:shadow-[0_0.5px_0_0_#14532d] active:translate-y-0.5 transition-all text-sm"
                      >
                        {t("profile.resend_email")}
                      </button>
                    </div>
                  </div>

                  <section className="w-full bg-white rounded-none lg:rounded-2xl shadow-none lg:shadow-xl p-4 lg:p-10 flex flex-col gap-4 lg:gap-8 border-0 lg:border border-[#ececf1]">
                    <h2 className="text-xl lg:text-xl font-black text-[#23223a] mb-2">
                      {t("profile.personal_data")}
                    </h2>
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col lg:grid lg:grid-cols-4 gap-x-3 gap-y-4 lg:gap-y-3"
                    >
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-[#a3a3b3] font-semibold">
                          {t("profile.first_name")}
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
                          {t("profile.last_name")}
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
                          {t("profile.birthday")}
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
                          {t("profile.gender")}
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
                            {t("profile.male")}
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
                            {t("profile.female")}
                          </label>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-[#a3a3b3] font-semibold">
                          {t("profile.country")}
                        </label>
                        <Input
                          className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-3 lg:px-4 py-2 lg:py-3 text-base lg:text-lg"
                          value={formData.country}
                          readOnly
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-[#a3a3b3] font-semibold">
                          {t("profile.city")}
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
                          {t("profile.address")}
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
                          {t("profile.phone_number")}
                        </label>
                        <div className="flex items-center gap-2">
                          <div>
                            <button
                              type="button"
                              className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-3 lg:px-4 py-2 lg:py-2 text-sm text-[#a3a3b3]"
                            >
                              {phoneCode}
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
                          {t("profile.email")}
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
                          {t("profile.save")}
                        </button>
                      </div>
                    </form>
                  </section>
                </>
              )}

              {activeTab === "seguro" && (
                <section className="w-full bg-white rounded-none lg:rounded-2xl shadow-none lg:shadow-xl p-4 lg:p-10 flex flex-col gap-4 lg:gap-8 border-0 lg:border border-[#ececf1]">
                  <h2 className="text-xl lg:text-3xl font-black text-[#23223a] mb-2 lg:mb-4">
                    {t("profile.security_settings")}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-x-3 gap-y-4 lg:gap-y-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-[#a3a3b3] font-semibold">
                        {t("profile.old_password")}
                      </label>
                      <Input
                        type="password"
                        className="rounded-lg border border-[#e3e6f0] bg-white px-3 lg:px-4 py-2 lg:py-3 text-base lg:text-sm placeholder:text-sm"
                        placeholder={t("profile.old_password")}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-[#a3a3b3] font-semibold">
                        {t("profile.new_password")}
                      </label>
                      <Input
                        type="password"
                        className="rounded-lg border border-[#e3e6f0] bg-white px-3 lg:px-4 py-2 lg:py-3 text-base lg:text-sm placeholder:text-sm"
                        placeholder={t("profile.new_password")}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-[#a3a3b3] font-semibold">
                        {t("profile.confirm_password")}
                      </label>
                      <Input
                        type="password"
                        className="rounded-lg border border-[#e3e6f0] bg-white px-3 lg:px-4 py-2 lg:py-3 text-base lg:text-sm placeholder:text-sm"
                        placeholder={t("profile.confirm_password")}
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
                        {t("profile.send")}
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
