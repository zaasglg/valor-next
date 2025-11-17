"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDialog } from "@/components/DialogProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  EllipsisVertical,
  UserRound,
  ChevronDown,
  Menu,
  ClosedCaption,
  X,
} from "lucide-react";
import Loader from "@/components/Loader";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBalanceContext } from "@/contexts/BalanceContext";
import {
  LogoIcon,
  HomeIcon,
  AviatorIcon,
  AviatorTextIcon,
  GamesIcon,
  BonusIcon,
  LiveIcon,
  ChickenIcon,
} from "@/components/icons";
import BottomNavigationBar from "../components/BottomNavigationBar";
import CasinoIcon from "@/components/icons/CasinoIcon";
import ChickenTextIcon from "@/components/icons/ChickenTextIcon";

const Header: React.FC = () => {
  const { openLogin, openRegister } = useDialog();
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    user_id: "",
    deposit: "0.00",
    currency: "$",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const formatAmount = (amount: number) => {
    return amount.toFixed(2);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token);

    if (token) {
      // Basic token validation (check if it's not empty and looks like a JWT)
      // Более мягкая проверка - только проверяем что токен не пустой
      const isValidToken = token.trim().length > 0;

      if (!isValidToken) {
        console.log("Header - Empty token, clearing token");
        localStorage.removeItem("access_token");
        setIsAuthenticated(false);
        setUserInfo({
          user_id: "",
          deposit: formatAmount(0),
          currency: "$",
        });
        return;
      }

      // Получаем баланс и информацию о пользователе из /api/user/info
      const fetchUserInfo = async () => {
        setBalanceLoading(true);
        try {
          const response = await fetch("/api/user/info", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            const data = await response.json();
            console.log('User info with balance:', data);
            
            // Получаем валюту из API (как в ProfileSidebar)
            const currency = data.country_info?.currency || data.currency || '$';

            // Получаем deposit из API и форматируем
            const deposit = parseFloat(data.deposit || "0").toFixed(2);

            setUserInfo({
              user_id: data.user_id || "",
              deposit: deposit,
              currency: currency,
            });
          } else if (response.status === 401) {
            // Попытка обновить токен перед удалением
            const refreshToken = localStorage.getItem("refresh_token");
            if (refreshToken) {
              try {
                const refreshResponse = await fetch('/api/refresh', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ refresh: refreshToken }),
                });
                
                if (refreshResponse.ok) {
                  const refreshData = await refreshResponse.json();
                  if (refreshData.access) {
                    localStorage.setItem('access_token', refreshData.access);
                    // Повторяем запрос с новым токеном
                    const retryResponse = await fetch("/api/user/info", {
                      headers: { Authorization: `Bearer ${refreshData.access}` },
                    });
                    
                    if (retryResponse.ok) {
                      const retryData = await retryResponse.json();
                      const currency = retryData.country_info?.currency || retryData.currency || '$';
                      const deposit = parseFloat(retryData.deposit || "0").toFixed(2);
                      
                      setUserInfo({
                        user_id: retryData.user_id || "",
                        deposit: deposit,
                        currency: currency,
                      });
                      return; // Успешно обновили токен, выходим
                    }
                  }
                }
              } catch (refreshError) {
                console.error("Header - Error refreshing token:", refreshError);
              }
            }
            
            // Если обновление не удалось, удаляем токены
            console.log("Header - Token refresh failed, logging out");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user_id");
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Header - Error fetching user info:", error);
        } finally {
          setBalanceLoading(false);
        }
      };
      fetchUserInfo();
      
      // Автоматическое обновление баланса каждые 30 секунд
      const intervalId = setInterval(fetchUserInfo, 30000);
      
      return () => clearInterval(intervalId);
    }

    const handleStorageChange = () => {
      const token = localStorage.getItem("access_token");
      setIsAuthenticated(!!token);
      
      // Если токен появился, обновляем информацию о пользователе
      if (token) {
        const fetchUserInfo = async () => {
          setBalanceLoading(true);
          try {
            const response = await fetch("/api/user/info", {
              headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
              const data = await response.json();
              console.log('User info with balance (storage event):', data);
              
              // Получаем валюту из API (как в ProfileSidebar)
              const currency = data.country_info?.currency || data.currency || '$';

              // Получаем deposit из API и форматируем
              const deposit = parseFloat(data.deposit || "0").toFixed(2);

              setUserInfo({
                user_id: data.user_id || "",
                deposit: deposit,
                currency: currency,
              });
            }
          } catch (error) {
            console.error("Error fetching user info (storage event):", error);
          } finally {
            setBalanceLoading(false);
          }
        };
        
        fetchUserInfo();
      } else {
        // Если токена нет, сбрасываем информацию
        setUserInfo({
          user_id: "",
          deposit: formatAmount(0),
          currency: "$",
        });
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Listen for auth events (e.g., from game pages)
  useEffect(() => {
    const handleAuthEvent = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.type === 'auth:openRegister') {
        console.log('🎯 Received auth:openRegister event, opening register dialog');
        openRegister();
      } else if (customEvent.type === 'auth:openLogin') {
        console.log('🎯 Received auth:openLogin event, opening login dialog');
        openLogin();
      }
    };

    document.addEventListener('auth:openRegister', handleAuthEvent);
    document.addEventListener('auth:openLogin', handleAuthEvent);

    return () => {
      document.removeEventListener('auth:openRegister', handleAuthEvent);
      document.removeEventListener('auth:openLogin', handleAuthEvent);
    };
  }, [openRegister, openLogin]);

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {/* Desktop & Tablet Header */}
      <header className="hidden md:flex w-full items-center justify-between px-3 lg:px-4 h-[60px] bg-white sticky top-0 z-50 border-b border-gray-200">
        {/* Logo */}
        <div className="flex items-center gap-2 lg:gap-4">
          <Link href="/" className="flex items-center cursor-pointer h-full">
            <span className="block scale-90 lg:scale-100">
              <LogoIcon />
            </span>
            <span className="ml-1.5 lg:ml-2 px-1.5 py-0.5 rounded bg-[#F9B24B] text-white font-bold text-[10px] lg:text-xs leading-none tracking-widest">
              CASINO
            </span>
          </Link>
        </div>
        {/* Navigation */}
        <nav className="h-full flex-1 flex items-center justify-center gap-4 lg:gap-8">
          {/* Search Icon */}
          <button className="flex items-center justify-center w-10 lg:w-12 h-8 text-[#6B46C1] hover:text-[#5B21B6] transition-colors border-l border-r border-gray-200">
            <svg
              className="w-4 lg:w-5 h-4 lg:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <Link
            href="/"
            className="h-full relative flex items-center gap-1.5 lg:gap-2 text-[#202040] font-medium text-xs lg:text-sm group"
          >
            <span className="block scale-90 lg:scale-100">
              <HomeIcon />
            </span>
            <span className="hidden lg:inline">Inicio</span>
            {/* Pseudo-element replacement */}
            <div
              className={`absolute bottom-0 left-0 w-full h-1 bg-[#0a893d] rounded-t transition-opacity duration-200 ease-in-out ${isActive("/")
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
                }`}
            ></div>
          </Link>

          <Link
            href="/game/aviator"
            className="flex items-center gap-1.5 lg:gap-2 font-medium text-xs lg:text-sm"
          >
            <span className="flex items-center gap-1.5 lg:gap-2 scale-90 lg:scale-100">
              <AviatorIcon />
              <AviatorTextIcon />
            </span>
          </Link>
          <Link
            href="/game/chicken-road"
            className="flex items-center gap-1.5 lg:gap-2 font-medium text-xs lg:text-sm"
          >
            <span className="flex items-center gap-1.5 lg:gap-2 scale-90 lg:scale-100">
              <img src="/icons/chicken_1.svg" alt="" />
              <img src="/icons/chicken_2.svg" alt="" />
            </span>
          </Link>
          <Link
            href="/all_games"
            className="h-full relative flex items-center gap-1.5 lg:gap-2 text-[#202040] font-medium text-xs lg:text-sm group"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="lg:w-[22px] lg:h-[22px]"
            >
              <path
                d="M18.8799 9.7702C18.6738 8.59296 18.2095 7.50348 17.5476 6.56244C17.0135 5.80292 16.3507 5.1402 15.5912 4.60596C14.6501 3.94415 13.5607 3.47974 12.3834 3.27368C11.9339 3.19495 11.4717 3.15363 11 3.15363C10.5283 3.15363 10.0661 3.19495 9.61658 3.27368C8.43933 3.47974 7.34991 3.94415 6.40881 4.60596C5.64929 5.1402 4.98651 5.80292 4.45233 6.56244C3.79047 7.50348 3.32617 8.59296 3.12006 9.7702C3.04138 10.2197 3 10.6819 3 11.1536C3 11.6253 3.04138 12.0875 3.12006 12.537C3.32617 13.7143 3.79053 14.8036 4.45233 15.7448C4.98657 16.5043 5.64929 17.1671 6.40881 17.7012C7.34991 18.3631 8.43933 18.8275 9.61658 19.0336C10.0661 19.1122 10.5283 19.1536 11 19.1536C11.4717 19.1536 11.9339 19.1122 12.3834 19.0336C13.5607 18.8275 14.6501 18.3631 15.5912 17.7012C16.3507 17.1671 17.0134 16.5043 17.5476 15.7448C18.2095 14.8036 18.6738 13.7143 18.8799 12.537C18.9586 12.0875 19 11.6253 19 11.1536C19 10.6819 18.9586 10.2197 18.8799 9.7702ZM18.2644 9.7702H16.4922C16.3557 9.22827 16.1407 8.71722 15.8604 8.24969L17.1129 6.99719C17.6732 7.8186 18.0721 8.75818 18.2644 9.7702ZM16.0581 11.1536C16.0581 11.6331 15.9911 12.0972 15.8658 12.537C15.7579 12.9163 15.6064 13.2773 15.4176 13.6147C14.9594 14.4338 14.2802 15.113 13.4611 15.5712C13.1237 15.7599 12.7626 15.9115 12.3834 16.0195C11.9435 16.1447 11.4795 16.2117 11 16.2117C10.5205 16.2117 10.0564 16.1447 9.61658 16.0195C9.23737 15.9115 8.87634 15.7599 8.53888 15.5712C7.71979 15.113 7.04053 14.4338 6.5824 13.6147C6.39362 13.2773 6.24213 12.9163 6.13416 12.537C6.00891 12.0972 5.94183 11.6331 5.94183 11.1536C5.94183 10.6741 6.00891 10.21 6.13416 9.7702C6.24213 9.39093 6.39362 9.02997 6.5824 8.6925C7.04053 7.87341 7.71973 7.19415 8.53882 6.73602C8.87634 6.54724 9.23737 6.39575 9.61658 6.28778C10.0564 6.16254 10.5205 6.09546 11 6.09546C11.4795 6.09546 11.9435 6.16254 12.3834 6.28778C12.7626 6.39575 13.1237 6.54724 13.4611 6.73602C14.2802 7.19415 14.9594 7.87335 15.4176 8.6925C15.6064 9.02997 15.7579 9.39093 15.8658 9.7702C15.9911 10.21 16.0581 10.6741 16.0581 11.1536ZM15.1564 5.04071L13.9039 6.29321C13.4364 6.01282 12.9254 5.79797 12.3834 5.66138V3.88922C13.3954 4.08148 14.335 4.48047 15.1564 5.04071ZM9.61658 3.88922V5.66138C9.07465 5.79797 8.5636 6.01282 8.09607 6.29321L6.84357 5.04071C7.66498 4.48047 8.60455 4.08148 9.61658 3.88922ZM4.88708 6.99719L6.13959 8.24969C5.85919 8.71722 5.64435 9.22827 5.50781 9.7702H3.7356C3.92786 8.75818 4.32684 7.8186 4.88708 6.99719ZM3.7356 12.537H5.50781C5.64435 13.0789 5.85919 13.59 6.13959 14.0576L4.88708 15.31C4.32684 14.4886 3.92792 13.549 3.7356 12.537ZM6.84357 17.2665L8.09607 16.014C8.5636 16.2944 9.07465 16.5092 9.61658 16.6458V18.418C8.60461 18.2257 7.66498 17.8268 6.84357 17.2665ZM12.3834 18.418V16.6458C12.9254 16.5092 13.4364 16.2944 13.9039 16.014L15.1564 17.2665C14.335 17.8268 13.3954 18.2257 12.3834 18.418ZM17.1129 15.31L15.8604 14.0576C16.1407 13.59 16.3557 13.0789 16.4922 12.537H18.2644C18.0721 13.549 17.6732 14.4886 17.1129 15.31ZM12.8466 9.94336L11.6364 11.1536L12.8466 12.3638C13.1529 12.2818 13.4908 12.3464 13.7311 12.5868C14.0896 12.9453 14.0896 13.5264 13.7311 13.8848C13.3727 14.2432 12.7916 14.2432 12.4332 13.8848C12.1928 13.6445 12.1282 13.3065 12.2103 13.0002L11 11.79L9.78973 13.0002C9.87177 13.3065 9.80719 13.6445 9.56677 13.8848C9.20831 14.2432 8.62726 14.2432 8.2688 13.8848C7.91034 13.5264 7.91034 12.9453 8.2688 12.5868C8.50909 12.3465 8.84705 12.2819 9.15332 12.3638L10.3636 11.1536L9.15332 9.94336C8.84705 10.0253 8.50909 9.96075 8.2688 9.7204C7.91034 9.36194 7.91034 8.78082 8.2688 8.42236C8.62726 8.06396 9.20831 8.06396 9.56677 8.42236C9.80713 8.66272 9.87164 9.00067 9.78973 9.30695L11 10.5172L12.2103 9.30695C12.1284 9.00067 12.1929 8.66272 12.4332 8.42236C12.7916 8.06396 13.3727 8.06396 13.7311 8.42236C14.0896 8.78082 14.0896 9.36194 13.7311 9.7204C13.4908 9.96075 13.1529 10.0253 12.8466 9.94336ZM18.7781 3.22186C16.7006 1.14423 13.9382 0 11 0C8.06177 0 5.29944 1.14423 3.2218 3.22186C1.14417 5.2995 0 8.06183 0 11C0 13.9382 1.14417 16.7006 3.2218 18.7782C5.29944 20.8558 8.06177 22 11 22C13.9382 22 16.7006 20.8558 18.7781 18.7782C20.8558 16.7006 22 13.9382 22 11C22 8.06183 20.8558 5.2995 18.7781 3.22186ZM17.364 17.364C15.6641 19.0638 13.404 20 11 20C8.59607 20 6.33594 19.0638 4.63605 17.364C2.93616 15.6641 2 13.404 2 11C2 8.59601 2.93616 6.33594 4.63605 4.63605C6.33594 2.93616 8.59601 2 11 2C13.404 2 15.6641 2.93616 17.364 4.63605C19.0638 6.336 20 8.59607 20 11C20 13.404 19.0638 15.6641 17.364 17.364Z"
                fill="#0F9658"
              ></path>
            </svg>
            <span className="hidden lg:inline">{t("header.casino")}</span>
            {/* Pseudo-element replacement */}
            <div
              className={`absolute bottom-0 left-0 w-full h-1 bg-[#0a893d] rounded-t transition-opacity duration-200 ease-in-out ${isActive("/all_games")
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
                }`}
            ></div>
          </Link>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-1.5 lg:gap-2 text-[#202040] font-medium text-xs lg:text-sm hover:text-[#0a893d] transition-colors"
            >
              <span className="hidden lg:inline">{t("header.more")}</span>
              <span className="w-4 h-4 flex items-center justify-center transition-transform">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="mx-auto"
                >
                  <circle cx="3" cy="8" r="1.5" fill="currentColor" />
                  <circle cx="8" cy="8" r="1.5" fill="currentColor" />
                  <circle cx="13" cy="8" r="1.5" fill="currentColor" />
                </svg>
              </span>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <Link
                  href="/bonuses"
                  className="flex items-center gap-3 px-4 py-3 text-[#202040] hover:bg-gray-50 transition-colors"
                  onClick={(e) => {
                    setIsDropdownOpen(false);
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0ZM11 20C6.03741 20 2 15.9626 2 11C2 6.03735 6.03741 2 11 2C15.9626 2 20 6.03735 20 11C20 15.9626 15.9626 20 11 20ZM11 3C6.58173 3 3 6.58173 3 11C3 15.4183 6.58173 19 11 19C15.4183 19 19 15.4183 19 11C19 6.58173 15.4183 3 11 3ZM11.5651 14.7502V16H10.335V14.836C9.49341 14.7993 8.67792 14.5787 8.20081 14.3089L8.57739 12.8752C9.1051 13.157 9.8454 13.4145 10.6609 13.4145C11.377 13.4145 11.8661 13.1447 11.8661 12.6545C11.8661 12.1887 11.4649 11.8945 10.5359 11.5883C9.19281 11.1472 8.276 10.5344 8.276 9.3457C8.276 8.26733 9.0545 7.42157 10.3977 7.16431V6H11.6276V7.07849C12.4688 7.11523 13.0336 7.28668 13.4479 7.48285L13.0842 8.86774C12.7573 8.73279 12.1799 8.45117 11.276 8.45117C10.4601 8.45117 10.1969 8.79425 10.1969 9.13733C10.1969 9.54169 10.6363 9.79907 11.7028 10.1913C13.1972 10.706 13.7992 11.3801 13.7992 12.483C13.7992 13.5737 13.0084 14.5049 11.5651 14.7502Z"
                      fill="#0F9658"
                    ></path>
                  </svg>
                  {t("header.bonuses")}
                </Link>
                <Link
                  href="/casino"
                  className="flex items-center gap-3 px-4 py-3 text-[#202040] hover:bg-gray-50 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.1369 9.91624L14.0838 0.863096C12.9329 -0.287699 11.067 -0.287699 9.91625 0.863096L0.86312 9.91624C-0.287739 11.0671 -0.287674 12.933 0.86312 14.0838L9.91625 23.1369C11.067 24.2877 12.9329 24.2877 14.0838 23.1368L23.1369 14.0838C24.2877 12.9329 24.2877 11.067 23.1369 9.91624ZM5.03682 13.0669C4.37329 13.7304 3.29709 13.7304 2.6333 13.0667C1.96957 12.4029 1.96957 11.3267 2.6331 10.6632C3.29709 9.99921 4.37329 9.99921 5.03702 10.663C5.70081 11.3267 5.70081 12.4029 5.03682 13.0669ZM9.05184 9.05189C8.38792 9.71581 7.31166 9.71581 6.64793 9.05208C5.98421 8.38836 5.98421 7.3121 6.64813 6.64817C7.31173 5.98457 8.38792 5.98464 9.05165 6.64837C9.71538 7.3121 9.71544 8.38829 9.05184 9.05189ZM10.6632 2.63308C11.3265 1.96981 12.4028 1.96981 13.0665 2.63354C13.7302 3.29726 13.7302 4.37353 13.0669 5.0368C12.4028 5.70098 11.3265 5.70098 10.6628 5.03725C9.99903 4.37353 9.99903 3.29726 10.6632 2.63308ZM13.3368 21.3669C12.6733 22.0304 11.5971 22.0305 10.9333 21.3667C10.2696 20.7029 10.2696 19.6267 10.9331 18.9631C11.597 18.2992 12.6733 18.2992 13.337 18.9629C14.0007 19.6267 14.0007 20.7029 13.3368 21.3669ZM17.3518 17.3518C16.6879 18.0158 15.6117 18.0158 14.9479 17.352C14.2841 16.6883 14.2841 15.6121 14.9481 14.9481C15.6117 14.2846 16.6879 14.2846 17.3516 14.9484C18.0154 15.6121 18.0154 16.6883 17.3518 17.3518ZM21.3669 13.3368C20.7027 14.001 19.6265 14.001 18.9627 13.3373C18.299 12.6735 18.299 11.5973 18.9632 10.9331C19.6265 10.2698 20.7027 10.2698 21.3664 10.9335C22.0302 11.5973 22.0302 12.6735 21.3669 13.3368Z"
                      fill="#0F9658"
                    ></path>
                  </svg>
                  {t("nav.live_games")}
                </Link>
              </div>
            )}
          </div>
        </nav>
        {/* Balance & Buttons */}
        <div className="flex items-center gap-2 lg:gap-3 min-w-[180px] lg:min-w-[220px] justify-end">
          {isAuthenticated && (
            <div className="text-right mr-1 lg:mr-2">
              <div className="text-[10px] lg:text-xs text-[#202040] font-medium">
                {t("header.balance")}
              </div>
              {balanceLoading ? (
                <Loader size="sm" color="blue" type="dots" className="mt-1" />
              ) : (
                <div className="flex items-center gap-1">
                  <div className="text-xs lg:text-sm font-bold text-[#202040]">
                    {userInfo.deposit}
                  </div>
                  <div className="text-xs lg:text-sm font-bold text-[#202040]">
                    {userInfo.currency}
                  </div>
                </div>
              )}
            </div>
          )}

          {isAuthenticated ? (
            <>
              <Link href="/deposit">
                <button className="bg-gradient-to-b cursor-pointer from-green-500 to-green-700 hover:scale-105 text-white font-bold py-1.5 lg:py-2 px-2 lg:px-4 rounded-md shadow-lg border-b-2 border-green-800 transition-transform duration-150 ease-in-out flex items-center gap-1 lg:gap-1.5 text-xs lg:text-sm h-[36px] lg:h-[40px]">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 lg:w-[14px] h-3 lg:h-[14px]"
                  >
                    <path
                      d="M7 0C3.14014 0 0 3.14014 0 7C0 10.8599 3.14014 14 7 14C10.8599 14 14 10.8599 14 7C14 3.14014 10.8599 0 7 0ZM7 12C4.24316 12 2 9.75684 2 7C2 4.24316 4.24316 2 7 2C9.75684 2 12 4.24316 12 7C12 9.75684 9.75684 12 7 12ZM10 7C10 7.55225 9.55225 8 9 8H8V9C8 9.55225 7.55225 10 7 10C6.44775 10 6 9.55225 6 9V8H5C4.44775 8 4 7.55225 4 7C4 6.44775 4.44775 6 5 6H6V5C6 4.44775 6.44775 4 7 4C7.55225 4 8 4.44775 8 5V6H9C9.55225 6 10 6.44775 10 7Z"
                      fill="white"
                    ></path>
                  </svg>
                  <span className="hidden lg:inline">{t("header.deposit")}</span>
                  <span className="lg:hidden">+</span>
                </button>
              </Link>
              <Link href="/profile">
                <button className="bg-gradient-to-b cursor-pointer from-[#F9B24B] to-[#e09a2a] hover:scale-105 text-white font-bold py-1.5 lg:py-2 px-2 lg:px-4 rounded-md shadow-lg border-b-2 border-[#c2791a] transition-transform duration-150 ease-in-out flex items-center gap-1 lg:gap-1.5 text-xs lg:text-sm h-[36px] lg:h-[40px]">
                  <UserRound className="w-4 lg:w-5 h-4 lg:h-5" />
                  <span className="hidden lg:inline">{t("header.account")}</span>
                  <EllipsisVertical className="w-4 lg:w-[17px] h-4 lg:h-[17px]" />
                </button>
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => openLogin()}
                className="bg-gradient-to-b cursor-pointer from-green-500 to-green-700 hover:scale-105 text-white font-bold py-1.5 lg:py-2 px-2 lg:px-4 rounded-md shadow-lg border-b-2 border-green-800 transition-transform duration-150 ease-in-out flex items-center gap-1 lg:gap-1.5 text-xs lg:text-sm h-[36px] lg:h-[40px]"
              >
                {t("header.login")}
              </button>
              <button
                onClick={() => openRegister()}
                className="bg-gradient-to-b cursor-pointer from-[#F9B24B] to-[#e09a2a] hover:scale-105 text-white font-bold py-1.5 lg:py-2 px-2 lg:px-4 rounded-md shadow-lg border-b-2 border-[#c2791a] transition-transform duration-150 ease-in-out flex items-center gap-1 lg:gap-1.5 text-xs lg:text-sm h-[36px] lg:h-[40px]"
              >
                {t("header.register")}
              </button>
            </>
          )}
        </div>
      </header>

      {/* Mobile Header */}
      <div className="md:hidden bg-white sticky top-0 z-50">
        {/* Mobile Balance Block - Separate at top */}
        {isAuthenticated && (
          <div className="flex items-center justify-end px-4 py-2 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center gap-2 px-3">
              <div className="w-6 h-6 flex items-center justify-center">
                <svg
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 0H5C3.34 0 2 1.34 2 3H1C0.45 3 0 3.45 0 4V8C0 8.55 0.45 9 1 9H2C2 10.66 3.34 12 5 12H11C12.66 12 14 10.66 14 9V3C14 1.34 12.66 0 11 0ZM1 8V4H7V8H1ZM6 6C6 6.55 5.55 7 5 7C4.45 7 4 6.55 4 6C4 5.45 4.45 5 5 5C5.55 5 6 5.45 6 6Z"
                    fill="#0A893D"
                  ></path>
                </svg>
              </div>
              <div className="flex items-center gap-1">
                <div className="text-xs text-gray-600 font-medium">{t("header.balance")}</div>
                <div className="text-sm font-bold text-green-600">
                  {balanceLoading ? (
                    <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <span>{userInfo.deposit}</span>
                      <span>{userInfo.currency}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Top section with logo and buttons */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <Link href="/" className="block">
              <LogoIcon />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link href="/deposit">
                  <button className="bg-gradient-to-b from-green-700 to-green-900 text-white font-bold py-2 px-3 rounded-md text-xs flex items-center h-9 min-h-[36px]">
                    {t("header.deposit")}
                  </button>
                </Link>
                <Link href="/profile">
                  <button className="bg-gradient-to-b from-[#F9B24B] to-[#e09a2a] text-white font-bold py-2 px-3 rounded-md text-xs flex items-center h-9 min-h-[36px]">
                    <UserRound />
                  </button>
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => openLogin()}
                  className="bg-gradient-to-b from-green-500 to-green-700 text-white font-bold py-2 px-3 rounded text-xs h-9 min-h-[36px]"
                >
                  Entrar
                </button>
                <button
                  onClick={() => openRegister()}
                  className="bg-gradient-to-b from-[#F9B24B] to-[#e09a2a] text-white font-bold py-2 px-3 rounded text-xs h-9 min-h-[36px]"
                >
                  Registro
                </button>
              </>
            )}
          </div>
        </div>

        {/* Bottom navigation menu - only show on home page and all_games page */}
        {(pathname === "/" || pathname === "/all_games") && (
          <nav className="grid grid-cols-6 items-end">
            <button
              className="flex flex-col items-center gap-1 py-3"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <span className="text-[#202040] text-xs">{t('header.menu')}</span>
            </button>
            <Link
              href="/"
              className="flex flex-col items-center gap-1 text-[#202040] text-xs relative py-3"
            >
              <svg
                width="27"
                height="25"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.78021 8L9.5929 20L0 8H4.78021ZM12.4072 20L22 8H17.2198L12.4072 20ZM11 8H6.21985L11 20L15.7802 8H11ZM7.53589 0H4.97864L0 7H4.78015L7.53589 0ZM11 7H15.7802L13.1313 0H8.86871L6.21985 7H11ZM22 7L17.0214 0H14.4641L17.2198 7H22Z"
                  fill="#0F9658"
                ></path>
              </svg>
              <span className="mt-1">{t('nav.home')}</span>
              {pathname === "/" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-900 rounded-t-lg"></div>
              )}
            </Link>
            <Link
              href="/game/aviator"
              className="flex flex-col items-center gap-1 text-[#202040] text-xs relative py-3"
            >
              <img src="/icons/aviator_1.svg" alt="" className="h-5" />
              <img src="/icons/aviator_2.svg" alt="" className="h-3 mt-3" />
            </Link>
            <Link
              href="/game/chicken-road"
              className="flex flex-col items-center gap-1 text-[#202040] text-xs relative py-3"
            >
              <img src="/icons/chicken_1.svg" alt="" />
              <img src="/icons/chicken_2.svg" alt="" className="h-5" />
            </Link>

            <Link
              href="/all_games"
              className="flex flex-col items-center gap-1 text-[#202040] text-xs relative py-3"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.8799 9.7702C18.6738 8.59296 18.2095 7.50348 17.5476 6.56244C17.0135 5.80292 16.3507 5.1402 15.5912 4.60596C14.6501 3.94415 13.5607 3.47974 12.3834 3.27368C11.9339 3.19495 11.4717 3.15363 11 3.15363C10.5283 3.15363 10.0661 3.19495 9.61658 3.27368C8.43933 3.47974 7.34991 3.94415 6.40881 4.60596C5.64929 5.1402 4.98651 5.80292 4.45233 6.56244C3.79047 7.50348 3.32617 8.59296 3.12006 9.7702C3.04138 10.2197 3 10.6819 3 11.1536C3 11.6253 3.04138 12.0875 3.12006 12.537C3.32617 13.7143 3.79053 14.8036 4.45233 15.7448C4.98657 16.5043 5.64929 17.1671 6.40881 17.7012C7.34991 18.3631 8.43933 18.8275 9.61658 19.0336C10.0661 19.1122 10.5283 19.1536 11 19.1536C11.4717 19.1536 11.9339 19.1122 12.3834 19.0336C13.5607 18.8275 14.6501 18.3631 15.5912 17.7012C16.3507 17.1671 17.0134 16.5043 17.5476 15.7448C18.2095 14.8036 18.6738 13.7143 18.8799 12.537C18.9586 12.0875 19 11.6253 19 11.1536C19 10.6819 18.9586 10.2197 18.8799 9.7702ZM18.2644 9.7702H16.4922C16.3557 9.22827 16.1407 8.71722 15.8604 8.24969L17.1129 6.99719C17.6732 7.8186 18.0721 8.75818 18.2644 9.7702ZM16.0581 11.1536C16.0581 11.6331 15.9911 12.0972 15.8658 12.537C15.7579 12.9163 15.6064 13.2773 15.4176 13.6147C14.9594 14.4338 14.2802 15.113 13.4611 15.5712C13.1237 15.7599 12.7626 15.9115 12.3834 16.0195C11.9435 16.1447 11.4795 16.2117 11 16.2117C10.5205 16.2117 10.0564 16.1447 9.61658 16.0195C9.23737 15.9115 8.87634 15.7599 8.53888 15.5712C7.71979 15.113 7.04053 14.4338 6.5824 13.6147C6.39362 13.2773 6.24213 12.9163 6.13416 12.537C6.00891 12.0972 5.94183 11.6331 5.94183 11.1536C5.94183 10.6741 6.00891 10.21 6.13416 9.7702C6.24213 9.39093 6.39362 9.02997 6.5824 8.6925C7.04053 7.87341 7.71973 7.19415 8.53882 6.73602C8.87634 6.54724 9.23737 6.39575 9.61658 6.28778C10.0564 6.16254 10.5205 6.09546 11 6.09546C11.4795 6.09546 11.9435 6.16254 12.3834 6.28778C12.7626 6.39575 13.1237 6.54724 13.4611 6.73602C14.2802 7.19415 14.9594 7.87335 15.4176 8.6925C15.6064 9.02997 15.7579 9.39093 15.8658 9.7702C15.9911 10.21 16.0581 10.6741 16.0581 11.1536ZM15.1564 5.04071L13.9039 6.29321C13.4364 6.01282 12.9254 5.79797 12.3834 5.66138V3.88922C13.3954 4.08148 14.335 4.48047 15.1564 5.04071ZM9.61658 3.88922V5.66138C9.07465 5.79797 8.5636 6.01282 8.09607 6.29321L6.84357 5.04071C7.66498 4.48047 8.60455 4.08148 9.61658 3.88922ZM4.88708 6.99719L6.13959 8.24969C5.85919 8.71722 5.64435 9.22827 5.50781 9.7702H3.7356C3.92786 8.75818 4.32684 7.8186 4.88708 6.99719ZM3.7356 12.537H5.50781C5.64435 13.0789 5.85919 13.59 6.13959 14.0576L4.88708 15.31C4.32684 14.4886 3.92792 13.549 3.7356 12.537ZM6.84357 17.2665L8.09607 16.014C8.5636 16.2944 9.07465 16.5092 9.61658 16.6458V18.418C8.60461 18.2257 7.66498 17.8268 6.84357 17.2665ZM12.3834 18.418V16.6458C12.9254 16.5092 13.4364 16.2944 13.9039 16.014L15.1564 17.2665C14.335 17.8268 13.3954 18.2257 12.3834 18.418ZM17.1129 15.31L15.8604 14.0576C16.1407 13.59 16.3557 13.0789 16.4922 12.537H18.2644C18.0721 13.549 17.6732 14.4886 17.1129 15.31ZM12.8466 9.94336L11.6364 11.1536L12.8466 12.3638C13.1529 12.2818 13.4908 12.3464 13.7311 12.5868C14.0896 12.9453 14.0896 13.5264 13.7311 13.8848C13.3727 14.2432 12.7916 14.2432 12.4332 13.8848C12.1928 13.6445 12.1282 13.3065 12.2103 13.0002L11 11.79L9.78973 13.0002C9.87177 13.3065 9.80719 13.6445 9.56677 13.8848C9.20831 14.2432 8.62726 14.2432 8.2688 13.8848C7.91034 13.5264 7.91034 12.9453 8.2688 12.5868C8.50909 12.3465 8.84705 12.2819 9.15332 12.3638L10.3636 11.1536L9.15332 9.94336C8.84705 10.0253 8.50909 9.96075 8.2688 9.7204C7.91034 9.36194 7.91034 8.78082 8.2688 8.42236C8.62726 8.06396 9.20831 8.06396 9.56677 8.42236C9.80713 8.66272 9.87164 9.00067 9.78973 9.30695L11 10.5172L12.2103 9.30695C12.1284 9.00067 12.1929 8.66272 12.4332 8.42236C12.7916 8.06396 13.3727 8.06396 13.7311 8.42236C14.0896 8.78082 14.0896 9.36194 13.7311 9.7204C13.4908 9.96075 13.1529 10.0253 12.8466 9.94336ZM18.7781 3.22186C16.7006 1.14423 13.9382 0 11 0C8.06177 0 5.29944 1.14423 3.2218 3.22186C1.14417 5.2995 0 8.06183 0 11C0 13.9382 1.14417 16.7006 3.2218 18.7782C5.29944 20.8558 8.06177 22 11 22C13.9382 22 16.7006 20.8558 18.7781 18.7782C20.8558 16.7006 22 13.9382 22 11C22 8.06183 20.8558 5.2995 18.7781 3.22186ZM17.364 17.364C15.6641 19.0638 13.404 20 11 20C8.59607 20 6.33594 19.0638 4.63605 17.364C2.93616 15.6641 2 13.404 2 11C2 8.59601 2.93616 6.33594 4.63605 4.63605C6.33594 2.93616 8.59601 2 11 2C13.404 2 15.6641 2.93616 17.364 4.63605C19.0638 6.336 20 8.59607 20 11C20 13.404 19.0638 15.6641 17.364 17.364Z"
                  fill="#0F9658"
                ></path>
              </svg>
              {t("header.casino")}
              {pathname === "/all_games" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-900 rounded-t-lg"></div>
              )}
            </Link>

            <Link
              href="/bonuses"
              className="flex flex-col items-center gap-1 text-[#202040] text-[9px] relative py-3"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0ZM11 20C6.03741 20 2 15.9626 2 11C2 6.03735 6.03741 2 11 2C15.9626 2 20 6.03735 20 11C20 15.9626 15.9626 20 11 20ZM11 3C6.58173 3 3 6.58173 3 11C3 15.4183 6.58173 19 11 19C15.4183 19 19 15.4183 19 11C19 6.58173 15.4183 3 11 3ZM11.5651 14.7502V16H10.335V14.836C9.49341 14.7993 8.67792 14.5787 8.20081 14.3089L8.57739 12.8752C9.1051 13.157 9.8454 13.4145 10.6609 13.4145C11.377 13.4145 11.8661 13.1447 11.8661 12.6545C11.8661 12.1887 11.4649 11.8945 10.5359 11.5883C9.19281 11.1472 8.276 10.5344 8.276 9.3457C8.276 8.26733 9.0545 7.42157 10.3977 7.16431V6H11.6276V7.07849C12.4688 7.11523 13.0336 7.28668 13.4479 7.48285L13.0842 8.86774C12.7573 8.73279 12.1799 8.45117 11.276 8.45117C10.4601 8.45117 10.1969 8.79425 10.1969 9.13733C10.1969 9.54169 10.6363 9.79907 11.7028 10.1913C13.1972 10.706 13.7992 11.3801 13.7992 12.483C13.7992 13.5737 13.0084 14.5049 11.5651 14.7502Z"
                  fill="#0F9658"
                ></path>
              </svg>
              {t('nav.bonuses')}
            </Link>
          </nav>
        )}
      </div>

      {/* Bottom Navigation Bar for Mobile */}
      <BottomNavigationBar />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#202040f2] backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Content */}
          <div className="absolute top-[20%] left-0 right-0 bottom-auto bg-[#302fa0]  p-6 overflow-y-auto shadow-2xl max-h-[70vh]">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 bg-[#ffb32c] rounded-lg flex items-center justify-center shadow-[0_4px_0_0_#e6a025] active:shadow-[0_2px_0_0_#e6a025] active:translate-y-0.5 transition-all duration-100 border-0"
              >
                <X />
              </button>

              {/* Search Bar */}
              <div className="flex-1 mx-4 relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full bg-transparent border-2 border-white rounded-lg px-4 py-2 pr-10 text-white placeholder-white/70"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* Casino */}
              <Link
                href="/casino"
                className="bg-white rounded-lg p-2 flex items-center justify-between h-12 shadow-[0_4px_0_0_#d1d5db] active:shadow-[0_2px_0_0_#d1d5db] active:translate-y-0.5 transition-all duration-100 border-0"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <CasinoIcon />
                </div>
                <span className="text-gray-800 font-bold text-sm text-center">
                  {t("header.casino")}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="#666"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              {/* Juegos */}
              <Link
                href="/all_games"
                className="bg-white rounded-lg p-2 flex items-center justify-between h-12 shadow-[0_4px_0_0_#d1d5db] active:shadow-[0_2px_0_0_#d1d5db] active:translate-y-0.5 transition-all duration-100 border-0"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <GamesIcon />
                </div>
                <span className="text-gray-800 font-bold text-sm text-center">
                  {t("header.games")}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="#666"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              {/* Juegos en vivo */}
              <Link
                href="/casino"
                className="bg-white rounded-lg p-2 flex items-center justify-between h-12 shadow-[0_4px_0_0_#d1d5db] active:shadow-[0_2px_0_0_#d1d5db] active:translate-y-0.5 transition-all duration-100 border-0"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <LiveIcon />
                </div>
                <span className="text-gray-800 font-bold text-sm text-center">
                  {t("header.live_games")}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="#666"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              {/* Bonificaciones */}
              <Link
                href="/bonuses"
                className="bg-white rounded-lg p-2 flex items-center justify-between h-12 shadow-[0_4px_0_0_#d1d5db] active:shadow-[0_2px_0_0_#d1d5db] active:translate-y-0.5 transition-all duration-100 border-0"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <BonusIcon />
                </div>
                <span className="text-gray-800 font-bold text-sm text-center">
                  {t("header.bonuses")}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="#666"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              {/* Aviator */}
              <Link
                href="/game/aviator"
                className="bg-white rounded-lg p-2 flex items-center justify-between h-12 shadow-[0_4px_0_0_#d1d5db] active:shadow-[0_2px_0_0_#d1d5db] active:translate-y-0.5 transition-all duration-100 border-0"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <AviatorIcon />
                </div>
                <span className="text-gray-800 font-medium text-xs text-center">
                  <AviatorTextIcon />
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="#666"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              {/* Chicken Road */}
              <Link
                href="/game/chicken-road"
                className="bg-white rounded-lg p-2 flex items-center justify-between h-12 shadow-[0_4px_0_0_#d1d5db] active:shadow-[0_2px_0_0_#d1d5db] active:translate-y-0.5 transition-all duration-100 border-0"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <img src="/icons/chicken_1.svg" alt="" className="h-32" />
                </div>
                <span className="text-gray-800 font-medium text-xs text-center">
                  <img src="/icons/chicken_2.svg" alt="" className="w-12" />
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="#666"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
