"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'es' | 'en' | 'pt' | 'ar' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  es: {
    // Header
    'header.balance': 'Saldo',
    'header.deposit': 'Recargar en 1 clic',
    'header.login': 'Iniciar sesión',
    'header.register': 'Registrarse',
    'header.games': 'Juegos',
    'header.casino': 'Casino',
    'header.bonuses': 'Bonificaciones',
    'header.live_games': 'Juegos en vivo',
    'header.more': 'Más',
    
    // Navigation
    'nav.home': 'Inicio',
    'nav.aviator': 'Aviator',
    'nav.games': 'Juegos',
    'nav.casino': 'Casino',
    'nav.bonuses': 'Bonificaciones',
    'nav.live_games': 'Juegos en vivo',
    
    // Footer
    'footer.general_terms': 'Condiciones generales',
    'footer.responsible_gaming': 'Juego responsable',
    'footer.contact': 'Contacto',
    'footer.affiliate_program': 'Programa de Afiliados',
    'footer.privacy_policy': 'Política de Privacidad',
    'footer.about_us': 'Sobre nosotros',
    'footer.account_payments': 'Cuenta, Pagos y Bonos',
    
    // Common
    'common.loading': 'Cargando...',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.continue': 'Continuar',
    'common.back': 'Volver',
    'common.next': 'Siguiente',
    'common.previous': 'Anterior',
    'common.close': 'Cerrar',
    'common.submit': 'Enviar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.confirm': 'Confirmar',
    'common.yes': 'Sí',
    'common.no': 'No',
    
    // Pages
    'page.deposit': 'Recargar',
    'page.withdrawal': 'Retiro de fondos',
    'page.profile': 'Mi perfil',
    'page.verification': 'Verificación',
    'page.detalization': 'Detalización',
    'page.games': 'Juegos',
    'page.casino': 'Casino',
    'page.bonuses': 'Bonificaciones',
    'page.policies': 'Políticas',
  },
  en: {
    // Header
    'header.balance': 'Balance',
    'header.deposit': 'Deposit in 1 click',
    'header.login': 'Login',
    'header.register': 'Register',
    'header.games': 'Games',
    'header.casino': 'Casino',
    'header.bonuses': 'Bonuses',
    'header.live_games': 'Live Games',
    'header.more': 'More',
    
    // Navigation
    'nav.home': 'Home',
    'nav.aviator': 'Aviator',
    'nav.games': 'Games',
    'nav.casino': 'Casino',
    'nav.bonuses': 'Bonuses',
    'nav.live_games': 'Live Games',
    
    // Footer
    'footer.general_terms': 'General Terms and Conditions',
    'footer.responsible_gaming': 'Responsible Gaming',
    'footer.contact': 'Contact',
    'footer.affiliate_program': 'Affiliate Program',
    'footer.privacy_policy': 'Privacy Policy',
    'footer.about_us': 'About Us',
    'footer.account_payments': 'Account, Payments, and Bonuses',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.continue': 'Continue',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.close': 'Close',
    'common.submit': 'Submit',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.confirm': 'Confirm',
    'common.yes': 'Yes',
    'common.no': 'No',
    
    // Pages
    'page.deposit': 'Deposit',
    'page.withdrawal': 'Withdrawal',
    'page.profile': 'My Profile',
    'page.verification': 'Verification',
    'page.detalization': 'Detalization',
    'page.games': 'Games',
    'page.casino': 'Casino',
    'page.bonuses': 'Bonuses',
    'page.policies': 'Policies',
  },
  pt: {
    // Header
    'header.balance': 'Saldo',
    'header.deposit': 'Depositar em 1 clique',
    'header.login': 'Entrar',
    'header.register': 'Registrar',
    'header.games': 'Jogos',
    'header.casino': 'Cassino',
    'header.bonuses': 'Bônus',
    'header.live_games': 'Jogos ao Vivo',
    'header.more': 'Mais',
    
    // Navigation
    'nav.home': 'Início',
    'nav.aviator': 'Aviator',
    'nav.games': 'Jogos',
    'nav.casino': 'Cassino',
    'nav.bonuses': 'Bônus',
    'nav.live_games': 'Jogos ao Vivo',
    
    // Footer
    'footer.general_terms': 'Termos e Condições Gerais',
    'footer.responsible_gaming': 'Jogo Responsável',
    'footer.contact': 'Contato',
    'footer.affiliate_program': 'Programa de Afiliados',
    'footer.privacy_policy': 'Política de Privacidade',
    'footer.about_us': 'Sobre Nós',
    'footer.account_payments': 'Conta, Pagamentos e Bônus',
    
    // Common
    'common.loading': 'Carregando...',
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.continue': 'Continuar',
    'common.back': 'Voltar',
    'common.next': 'Próximo',
    'common.previous': 'Anterior',
    'common.close': 'Fechar',
    'common.submit': 'Enviar',
    'common.edit': 'Editar',
    'common.delete': 'Excluir',
    'common.confirm': 'Confirmar',
    'common.yes': 'Sim',
    'common.no': 'Não',
    
    // Pages
    'page.deposit': 'Depósito',
    'page.withdrawal': 'Saque',
    'page.profile': 'Meu Perfil',
    'page.verification': 'Verificação',
    'page.detalization': 'Detalização',
    'page.games': 'Jogos',
    'page.casino': 'Cassino',
    'page.bonuses': 'Bônus',
    'page.policies': 'Políticas',
  },
  ar: {
    // Header
    'header.balance': 'الرصيد',
    'header.deposit': 'إيداع بنقرة واحدة',
    'header.login': 'تسجيل الدخول',
    'header.register': 'التسجيل',
    'header.games': 'الألعاب',
    'header.casino': 'الكازينو',
    'header.bonuses': 'المكافآت',
    'header.live_games': 'الألعاب المباشرة',
    'header.more': 'المزيد',
    
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.aviator': 'أفييتور',
    'nav.games': 'الألعاب',
    'nav.casino': 'الكازينو',
    'nav.bonuses': 'المكافآت',
    'nav.live_games': 'الألعاب المباشرة',
    
    // Footer
    'footer.general_terms': 'الشروط والأحكام العامة',
    'footer.responsible_gaming': 'اللعب المسؤول',
    'footer.contact': 'اتصل بنا',
    'footer.affiliate_program': 'برنامج الشراكة',
    'footer.privacy_policy': 'سياسة الخصوصية',
    'footer.about_us': 'معلومات عنا',
    'footer.account_payments': 'الحساب والمدفوعات والمكافآت',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.continue': 'متابعة',
    'common.back': 'رجوع',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.close': 'إغلاق',
    'common.submit': 'إرسال',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.confirm': 'تأكيد',
    'common.yes': 'نعم',
    'common.no': 'لا',
    
    // Pages
    'page.deposit': 'إيداع',
    'page.withdrawal': 'سحب',
    'page.profile': 'ملفي الشخصي',
    'page.verification': 'التحقق',
    'page.detalization': 'التفاصيل',
    'page.games': 'الألعاب',
    'page.casino': 'الكازينو',
    'page.bonuses': 'المكافآت',
    'page.policies': 'السياسات',
  },
  fr: {
    // Header
    'header.balance': 'Solde',
    'header.deposit': 'Dépôt en 1 clic',
    'header.login': 'Connexion',
    'header.register': 'S\'inscrire',
    'header.games': 'Jeux',
    'header.casino': 'Casino',
    'header.bonuses': 'Bonus',
    'header.live_games': 'Jeux en Direct',
    'header.more': 'Plus',
    
    // Navigation
    'nav.home': 'Accueil',
    'nav.aviator': 'Aviator',
    'nav.games': 'Jeux',
    'nav.casino': 'Casino',
    'nav.bonuses': 'Bonus',
    'nav.live_games': 'Jeux en Direct',
    
    // Footer
    'footer.general_terms': 'Conditions Générales',
    'footer.responsible_gaming': 'Jeu Responsable',
    'footer.contact': 'Contact',
    'footer.affiliate_program': 'Programme d\'Affiliation',
    'footer.privacy_policy': 'Politique de Confidentialité',
    'footer.about_us': 'À Propos',
    'footer.account_payments': 'Compte, Paiements et Bonus',
    
    // Common
    'common.loading': 'Chargement...',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.continue': 'Continuer',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.previous': 'Précédent',
    'common.close': 'Fermer',
    'common.submit': 'Soumettre',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.confirm': 'Confirmer',
    'common.yes': 'Oui',
    'common.no': 'Non',
    
    // Pages
    'page.deposit': 'Dépôt',
    'page.withdrawal': 'Retrait',
    'page.profile': 'Mon Profil',
    'page.verification': 'Vérification',
    'page.detalization': 'Détail',
    'page.games': 'Jeux',
    'page.casino': 'Casino',
    'page.bonuses': 'Bonus',
    'page.policies': 'Politiques',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['es', 'en', 'pt', 'ar', 'fr'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
