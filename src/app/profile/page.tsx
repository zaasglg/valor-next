"use client";

import ProfileSidebar from "@/components/ProfileSidebar";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import AuthGuard from "@/components/AuthGuard";
import { useLanguage } from "@/contexts/LanguageContext";
import HighBalanceVerificationModal from '@/components/HighBalanceVerificationModal';

// Список стран с телефонными кодами (только страны из RegisterDialog)
const countryPhoneCodes: { [key: string]: string } = {
  "Argentina": "+54",
  "Bolivia": "+591",
  "Brazil": "+55",
  "Chile": "+56",
  "Colombia": "+57",
  "Costa Rica": "+506",
  "Cuba": "+53",
  "Dominican Republic": "+1",
  "Ecuador": "+593",
  "El Salvador": "+503",
  "Guatemala": "+502",
  "Haiti": "+509",
  "Honduras": "+504",
  "Mexico": "+52",
  "Nicaragua": "+505",
  "Panama": "+507",
  "Paraguay": "+595",
  "Peru": "+51",
  "Puerto Rico": "+1",
  "Uruguay": "+598",
  "Venezuela": "+58",
  "Nigeria": "+234",
  "Kenya": "+254",
  "Zimbabwe": "+263",
  "Ghana": "+233",
  "Uganda": "+256",
  "South Africa": "+27",
  "Zambia": "+260",
};

export default function ProfilePage() {
  const { t, setLanguage } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("datos-personales");
  const [phoneCode, setPhoneCode] = useState("+57"); // По умолчанию код Колумбии
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
  const [showHighBalanceVerification, setShowHighBalanceVerification] = useState(false);
  const [userCountry, setUserCountry] = useState('');
  const [userStage, setUserStage] = useState<string>('');
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

  // Verification thresholds and fees per country
  const verificationConfig: Record<string, { min: number; max: number; fee: number; currency: string; feeLabel: string }> = {
    colombia: { min: 10000000, max: 40000000, fee: 200000, currency: 'COP', feeLabel: 'cop' },
    ecuador: { min: 8000, max: 12000, fee: 100, currency: '$ USD', feeLabel: '$ USD' },
    paraguay: { min: 80000000, max: 120000000, fee: 600000, currency: 'PYG', feeLabel: 'PYG' },
    nigeria: { min: 45000, max: 500000, fee: 500000, currency: 'NGN', feeLabel: 'NGN' },
    kenya: { min: 35000, max: 500000, fee: 50000, currency: 'KES', feeLabel: 'KES' },
    zimbabwe: { min: 70000, max: 500000, fee: 10000, currency: 'ZWL', feeLabel: 'ZWL' }
  };

  const formatAmount = (value: number, currency: string) => {
    try {
      const locale = currency === 'COP' ? 'es-CO' : currency === 'USD' ? 'en-US' : 'es-PY';
      return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);
    } catch (e) {
      return String(value);
    }
  };

  const getCountryKey = (country: string | undefined) => {
    if (!country) return null;
    const c = country.toLowerCase();
    if (c.includes('colom') || c === 'co') return 'colombia';
    if (c.includes('ecua') || c === 'ec') return 'ecuador';
    if (c.includes('paragu') || c === 'py') return 'paraguay';
    if (c.includes('niger') || c === 'ng' || c === 'nga') return 'nigeria';
    if (c.includes('kenya') || c === 'ke') return 'kenya';
    if (c.includes('zimbabw') || c === 'zw') return 'zimbabwe';
    return null;
  };


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

          const stage = data.stage || 'normal';
          setUserStage(stage);

          // Check if stage is verif2 and show modal
          if (stage === 'verif2') {
            setShowHighBalanceVerification(true);
          }

          // Get user country for verification modal
          const userCountryData = data.country_info?.country || data.country || data.pais || '';
          setUserCountry(userCountryData);

          // Устанавливаем статус верификации email (защита от разных типов значений)
          const ev = data.email_verified;
          let verified = false;
          if (typeof ev === "boolean") verified = ev;
          else if (typeof ev === "string") verified = ev.toLowerCase() === "true" || ev === "1" || ev.toLowerCase() === "yes";
          else if (typeof ev === "number") verified = ev === 1;
          setEmailVerified(verified);
          
          // Парсим номер телефона для извлечения кода и номера
          let phoneNumber = data.numero_de_telefono || "";
          let phoneCodeFromData = countryPhoneCodes[country] || "+57"; // Код на основе выбранной страны
          
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
          
          // Автоматически переключаем язык на английский для Нигерии и Кении
          if (country === 'Nigeria' || country === 'Kenya') {
            setLanguage('en');
          }
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
        // alert(t("profile.profile_updated"));
      } else {
        const errorData = await response.json();
        console.error("Profile update error:", errorData);
        // alert("Error al actualizar el perfil");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // alert("Error al actualizar el perfil");
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
                  {emailVerified === false && (
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
                  )}

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
                        <select
                          className="rounded-lg border border-[#e3e6f0] bg-white px-3 lg:px-4 py-2 lg:py-3 text-base lg:text-lg"
                          value={formData.country}
                          onChange={(e) => {
                            const selectedCountry = e.target.value;
                            const newPhoneCode = countryPhoneCodes[selectedCountry] || "+57";
                            setFormData({
                              ...formData,
                              country: selectedCountry,
                            });
                            setPhoneCode(newPhoneCode);
                            // Автоматически переключаем язык на английский для Нигерии и Кении
                            if (selectedCountry === 'Nigeria' || selectedCountry === 'Kenya') {
                              setLanguage('en');
                            }
                          }}
                        >
                          {(typeof window !== 'undefined' && (window.location.hostname.includes('valor-games.world') || window.location.hostname.includes('valor-games.online'))) 
                            ? ['Nigeria', 'Kenya', 'Zimbabwe', 'Ghana', 'Uganda', 'South Africa', 'Zambia'].map((country) => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))
                            : Object.keys(countryPhoneCodes).map((country) => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))
                          }
                        </select>
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

        {/* High Balance Verification Modal */}
        <HighBalanceVerificationModal
          open={showHighBalanceVerification}
          onOpenChange={setShowHighBalanceVerification}
          userCountry={userCountry}
          verificationConfig={verificationConfig}
          getCountryKey={getCountryKey}
          formatAmount={formatAmount}
        />
      </div>
    </AuthGuard>
  );
}
