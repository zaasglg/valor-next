

"use client"

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import ProfileSidebar from "../../components/ProfileSidebar";
import { Check } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import { useLanguage } from "@/contexts/LanguageContext";
import path from "path/win32";

export default function WithdrawalPage() {
    const router = useRouter();
    const { t } = useLanguage();
    const [balance, setBalance] = useState<string>('0.00');
    const [loading, setLoading] = useState(true);
    const [userCurrency, setUserCurrency] = useState('COP');
    const [userStage, setUserStage] = useState<string>('');
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [transactionNumber, setTransactionNumber] = useState('');
    const [showInsufficientFundsToast, setShowInsufficientFundsToast] = useState(false);
    const [showWarningToast, setShowWarningToast] = useState(false);
    const [showMinAmountWarning, setShowMinAmountWarning] = useState(false);
    const [showHighBalanceVerification, setShowHighBalanceVerification] = useState(false);
    const [userCountry, setUserCountry] = useState('');

    // Verification thresholds and fees per country
    const verificationConfig: Record<string, { min: number; max: number; fee: number; currency: string; feeLabel: string }> = {
        colombia: { min: 25000000, max: 45000000, fee: 300000, currency: 'COP', feeLabel: 'pesos' },
        ecuador: { min: 5000, max: 10000, fee: 120, currency: 'USD', feeLabel: '$' },
        paraguay: { min: 50000000, max: 70000000, fee: 600000, currency: 'PYG', feeLabel: 'PYG' }
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
        return null;
    };

    // Form validation states
    const [formData, setFormData] = useState({
        withdrawAmount: '',
        clientPhone: '',
        accountType: '',
        accountNumber: '',
        docType: '',
        docNumber: '',
        bank: ''
    });

    const [errors, setErrors] = useState({
        withdrawAmount: '',
        clientPhone: '',
        accountType: '',
        accountNumber: '',
        docType: '',
        docNumber: '',
        bank: ''
    });

    useEffect(() => {
        const fetchBalance = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) return;

            try {
                const response = await fetch('/api/user/info', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                if (response.ok) {

                    const data = await response.json();

                    setBalance(data.deposit || '0');
                    setUserCurrency(data.country_info?.currency || data.currency || '$');
                    
                    const stage = data.stage || 'normal';
                    setUserStage(stage);
                    
                    // Check if stage is verif2 and show modal
                    if (stage === 'verif2') {
                        setShowVerificationModal(true);
                    }

                    // Try multiple possible country field names
                    const country = data.country_info?.country || data.country || data.pais || '';
                    console.log('Selected country:', country);
                    setUserCountry(country);
                }
            } catch (error) {
                console.error('Error fetching balance:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBalance();
    }, []);

    // Validation functions
    const validateField = (name: string, value: string) => {
        let error = '';

        switch (name) {
            case 'withdrawAmount':
                if (!value) {
                    error = 'El importe es requerido';
                } else {
                    const amount = parseFloat(value);
                    if (isNaN(amount) || amount <= 0) {
                        error = 'El importe debe ser un número válido mayor que 0';
                    }
                }
                break;
            case 'clientPhone':
                if (!value) {
                    error = 'El teléfono es requerido';
                }
                break;
            case 'accountType':
                if (!value) {
                    error = 'El tipo de cuenta es requerido';
                }
                break;
            case 'accountNumber':
                if (!value) {
                    error = 'El número de cuenta es requerido';
                }
                break;
            case 'docType':
                if (!value) {
                    error = 'El tipo de documento es requerido';
                }
                break;
            case 'docNumber':
                if (!value) {
                    error = 'El número de documento es requerido';
                }
                break;
            case 'bank':
                if (!value) {
                    error = 'Debe seleccionar un banco';
                }
                break;
        }

        return error;
    };

    const handleInputChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {
            withdrawAmount: validateField('withdrawAmount', formData.withdrawAmount),
            clientPhone: validateField('clientPhone', formData.clientPhone),
            accountType: validateField('accountType', formData.accountType),
            accountNumber: validateField('accountNumber', formData.accountNumber),
            docType: validateField('docType', formData.docType),
            docNumber: validateField('docNumber', formData.docNumber),
            bank: validateField('bank', formData.bank)
        };

        setErrors(newErrors);

        // Check if form is valid
        return !Object.values(newErrors).some(error => error !== '');
    };

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
                            <h1 className="text-2xl lg:text-5xl font-black text-[#23223a] mb-4 lg:mb-8">{t('withdrawal.page_title')}</h1>

                            {/* Метод вывода */}
                            <section className="bg-white rounded-none lg:rounded-2xl shadow-none lg:shadow-md p-4 lg:p-8 mb-4 lg:mb-8 border-0 lg:border">
                                <h2 className="text-xl lg:text-2xl font-bold text-[#23223a] mb-4 lg:mb-6">{t('withdrawal.choose_method')}</h2>
                                <div className="flex gap-2 lg:gap-4 overflow-x-auto">
                                    <button className="border-2 border-[#3b3bb3] rounded-xl p-3 flex flex-col items-center w-24 h-28 bg-white focus:outline-none focus:ring-2 focus:ring-[#3b3bb3] relative">
                                        <div className="absolute left-0 top-0 w-6 h-6 bg-[#3b3bb3] rounded-tl-lg rounded-br-xl flex items-center justify-center">
                                            <Check size={8} color="white" />
                                        </div>
                                        <img src="https://static.valor.bet/withdrawal-methods/kGj8XKRlpkjZcEwRfNXZK3jXW0juYtqbH21QBnHV.svg" alt="" className="w-10 h-10 mt-2" />
                                        <span className="mt-auto text-[#3b3bb3] font-bold text-[8px] leading-2 text-center">{t('withdrawal.bank_transfer')}</span>
                                    </button>
                                </div>
                            </section>
                            {/* Детали вывода */}
                            <section className="bg-white rounded-none lg:rounded-2xl shadow-none lg:shadow-md p-4 lg:p-8 mb-4 lg:mb-8 border-0 lg:border">
                                <h2 className="text-xl lg:text-3xl font-bold text-[#23223a] mb-2">{t('withdrawal.details')}</h2>
                                <div className="mb-4 lg:mb-6 text-base lg:text-lg text-[#23223a] font-semibold">{t('withdrawal.ready_to_withdraw')}: <span className="font-black">{balance} {userCurrency}</span></div>
                                <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                                    <div className="flex flex-col">
                                        <label htmlFor="withdraw-amount" className="text-sm lg:text-base font-semibold text-[#8888A6] mb-1">{t('withdrawal.amount_label').replace('{balance}', balance).replace('{currency}', userCurrency)}</label>
                                        <Input
                                            id="withdraw-amount"
                                            type="number"
                                            placeholder={t('withdrawal.minimum_amount')}
                                            value={formData.withdrawAmount}
                                            onChange={(e) => handleInputChange('withdrawAmount', e.target.value)}
                                            className={`mb-0 ${errors.withdrawAmount ? 'border-red-500' : ''}`}
                                        />
                                        {errors.withdrawAmount && <span className="text-red-500 text-xs mt-1">{errors.withdrawAmount}</span>}
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="client-phone" className="text-sm lg:text-base font-semibold text-[#8888A6] mb-1">{t('withdrawal.client_phone')}</label>
                                        <Input
                                            id="client-phone"
                                            type="text"
                                            placeholder={t('withdrawal.client_phone')}
                                            value={formData.clientPhone}
                                            onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                                            className={`mb-0 ${errors.clientPhone ? 'border-red-500' : ''}`}
                                        />
                                        {errors.clientPhone && <span className="text-red-500 text-xs mt-1">{errors.clientPhone}</span>}
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="account-type" className="text-sm lg:text-base font-semibold text-[#8888A6] mb-1">{t('withdrawal.account_type')}</label>
                                        <Input
                                            id="account-type"
                                            type="text"
                                            placeholder={t('withdrawal.account_type_placeholder')}
                                            value={formData.accountType}
                                            onChange={(e) => handleInputChange('accountType', e.target.value)}
                                            className={`mb-0 ${errors.accountType ? 'border-red-500' : ''}`}
                                        />
                                        {errors.accountType && <span className="text-red-500 text-xs mt-1">{errors.accountType}</span>}
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="account-number" className="text-sm lg:text-base font-semibold text-[#8888A6] mb-1">{t('withdrawal.account_number')}</label>
                                        <Input
                                            id="account-number"
                                            type="text"
                                            placeholder={t('withdrawal.account_number')}
                                            value={formData.accountNumber}
                                            onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                                            className={`mb-0 ${errors.accountNumber ? 'border-red-500' : ''}`}
                                        />
                                        {errors.accountNumber && <span className="text-red-500 text-xs mt-1">{errors.accountNumber}</span>}
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="doc-type" className="text-sm lg:text-base font-semibold text-[#8888A6] mb-1">{t('withdrawal.document_type')}</label>
                                        <Input
                                            id="doc-type"
                                            type="text"
                                            placeholder={t('withdrawal.document_type_placeholder')}
                                            value={formData.docType}
                                            onChange={(e) => handleInputChange('docType', e.target.value)}
                                            className={`mb-0 ${errors.docType ? 'border-red-500' : ''}`}
                                        />
                                        {errors.docType && <span className="text-red-500 text-xs mt-1">{errors.docType}</span>}
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="doc-number" className="text-sm lg:text-base font-semibold text-[#8888A6] mb-1">{t('withdrawal.document_number')}</label>
                                        <Input
                                            id="doc-number"
                                            type="text"
                                            placeholder={t('withdrawal.document_number')}
                                            value={formData.docNumber}
                                            onChange={(e) => handleInputChange('docNumber', e.target.value)}
                                            className={`mb-0 ${errors.docNumber ? 'border-red-500' : ''}`}
                                        />
                                        {errors.docNumber && <span className="text-red-500 text-xs mt-1">{errors.docNumber}</span>}
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="bank" className="text-sm lg:text-base font-semibold text-[#8888A6] mb-1">{t('withdrawal.bank')}</label>
                                        <Select value={formData.bank} onValueChange={(value) => handleInputChange('bank', value)}>
                                            <SelectTrigger className={`w-full rounded-lg border p-3 lg:p-4 text-base lg:text-lg text-[#23223a] bg-gray-100 ${errors.bank ? 'border-red-500' : 'border-gray-300'}`}>
                                                <SelectValue placeholder={t('withdrawal.select_bank')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="bancolombia">{t('withdrawal.bancolombia')}</SelectItem>
                                                <SelectItem value="davivienda">{t('withdrawal.davivienda')}</SelectItem>
                                                <SelectItem value="bbva">{t('withdrawal.bbva')}</SelectItem>
                                                <SelectItem value="banco-bogota">{t('withdrawal.banco_bogota')}</SelectItem>
                                                <SelectItem value="banco-agrario">{t('withdrawal.banco_agrario')}</SelectItem>
                                                <SelectItem value="banco-popular">{t('withdrawal.banco_popular')}</SelectItem>
                                                <SelectItem value="banco-occidente">{t('withdrawal.banco_occidente')}</SelectItem>
                                                <SelectItem value="banco-caja-social">{t('withdrawal.banco_caja_social')}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.bank && <span className="text-red-500 text-xs mt-1">{errors.bank}</span>}
                                    </div>
                                    <div className="flex items-end md:col-span-2 lg:col-span-1">
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                // Check minimum amount first (before other validations)
                                                const withdrawAmount = parseFloat(formData.withdrawAmount);
                                                // if (!formData.withdrawAmount || isNaN(withdrawAmount) || withdrawAmount < 150000) {
                                                //     console.log('Minimum amount check failed:', withdrawAmount);
                                                //     setShowMinAmountWarning(true);
                                                //     return;
                                                // }

                                                // Validate form
                                                if (!validateForm()) {
                                                    console.log('Form validation failed');
                                                    return;
                                                }

                                                // Check available balance vs requested withdraw amount
                                                // const available = parseFloat(String(balance).replace(/,/g, '')) || 0;
                                                // if (withdrawAmount > available) {
                                                //     console.log('Insufficient funds:', { withdrawAmount, available });
                                                //     setShowInsufficientFundsToast(true);
                                                //     // Auto-hide after 3s
                                                //     setTimeout(() => setShowInsufficientFundsToast(false), 3000);
                                                //     return;
                                                // }

                                                // Check country-specific thresholds for normal or verif stage users
                                                if (userStage === 'normal' || userStage === 'verif') {

                                                    let shouldShowVerification = false;
                                                    console.log(userCountry.toLowerCase());

                                                    if (userCountry.toLowerCase() === 'colombia' || userCountry.toLowerCase() === 'co') {
                                                        // Colombia: 25M - 45M COP
                                                        if (withdrawAmount >= 25000000 && withdrawAmount <= 45000000) {
                                                            shouldShowVerification = true;
                                                            console.log('Colombia high balance verification triggered');
                                                        }
                                                    } else if (userCountry.toLowerCase() === 'ecuador' || userCountry.toLowerCase() === 'ec') {
                                                        // Ecuador: $5000 - $10000
                                                        if (withdrawAmount >= 5000 && withdrawAmount <= 10000) {
                                                            shouldShowVerification = true;
                                                        }
                                                    } else if (userCountry.toLowerCase() === 'paraguay' || userCountry.toLowerCase() === 'py') {
                                                        // Paraguay: 50M - 70M PYG
                                                        if (withdrawAmount >= 50000000 && withdrawAmount <= 70000000) {
                                                            shouldShowVerification = true;
                                                        }
                                                    }

                                                    if (shouldShowVerification) {
                                                        setShowHighBalanceVerification(true);
                                                        return;
                                                    }
                                                } else if (userStage === 'meet') {
                                                    // Create payment history record
                                                    console.log('Creating payment history record');
                                                    try {
                                                        const token = localStorage.getItem('access_token');
                                                        const currentDate = new Date().toISOString();

                                                        const payload = {
                                                            transacciones_data: currentDate,
                                                            transacciones_monto: formData.withdrawAmount,
                                                            estado: "esperando",
                                                            transaccion_number: `HP${Date.now()}`,
                                                            metodo_de_pago: "wire_transfer",
                                                            phone: formData.clientPhone,
                                                            cuenta_corriente: formData.accountType,
                                                            numero_de_cuenta: formData.accountNumber,
                                                            tipo_de_documento: formData.docType,
                                                            numero_documento: formData.docNumber,
                                                            banco: formData.bank
                                                        };

                                                        console.log('Sending payload:', payload);
                                                        console.log('Token available:', !!token);

                                                        console.log('Making request to:', '/api/historial_pagos/create');

                                                        const response = await fetch('/api/historial_pagos/create', {
                                                            method: 'POST',
                                                            headers: {
                                                                'Authorization': `Bearer ${token}`,
                                                                'Content-Type': 'application/json'
                                                            },
                                                            body: JSON.stringify(payload)
                                                        });

                                                        console.log('Response received:', response);
                                                        console.log('Response status:', response.status);
                                                        console.log('Response ok:', response.ok);

                                                        if (response.ok) {
                                                            const result = await response.json();
                                                            console.log('Payment history created successfully:', result);

                                                            // Generate transaction number
                                                            const txNumber = result.transaccion_number || `637703555`;
                                                            setTransactionNumber(txNumber);
                                                            setToastMessage(`Monto: ${formData.withdrawAmount} ${userCurrency}`);
                                                            setShowToast(true);

                                                            // Redirect to detalization page after 3 seconds
                                                            setTimeout(() => {
                                                                router.push('/detalization');
                                                            }, 3000);
                                                        } else {
                                                            const error = await response.json();
                                                            console.error('Error creating payment history:', error);
                                                            console.error('Response status:', response.status);
                                                            console.error('Response headers:', response.headers);

                                                            // Show more specific error message
                                                            const errorMessage = error.details?.message || error.error || 'Error al enviar la solicitud de retiro';
                                                            setToastMessage(errorMessage);
                                                            setShowToast(true);
                                                        }
                                                    } catch (error) {
                                                        console.error('Error creating payment history:', error);
                                                        console.error('Error type:', typeof error);
                                                        console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
                                                        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
                                                        setToastMessage('Error al enviar la solicitud de retiro');
                                                        setShowToast(true);
                                                    }
                                                } else {
                                                    // Proceed with withdrawal
                                                    console.log('Proceeding with withdrawal');
                                                    // Here you would typically submit the form data
                                                    console.log('Form data:', formData);
                                                }
                                            }}
                                            className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 lg:py-1 rounded-lg shadow-[0_4px_0_0_#14532d] active:shadow-none active:translate-y-0.5 transition-all duration-100 text-base lg:text-lg"
                                        >
                                            {t('withdrawal.request_withdrawal')}
                                        </button>
                                    </div>
                                </form>
                            </section>
                        </>
                    )}
                </main>

                {/* Verification Modal */}
                <Dialog open={showVerificationModal} onOpenChange={(open) => {
                    // Prevent closing the modal if stage is verif2
                    if (userStage !== 'verif2') {
                        setShowVerificationModal(open);
                    }
                }}>
                    <DialogContent 
                        className="w-full max-w-2xl p-0 rounded-xl"
                        showCloseButton={userStage !== 'verif2'}
                        onInteractOutside={(e) => {
                            // Prevent closing on outside click if stage is verif2
                            if (userStage === 'verif2') {
                                e.preventDefault();
                            }
                        }}
                        onEscapeKeyDown={(e) => {
                            // Prevent closing on Escape key if stage is verif2
                            if (userStage === 'verif2') {
                                e.preventDefault();
                            }
                        }}
                    >
                        <DialogHeader className="sr-only text-white">
                            <DialogTitle className="text-left text-white">Se requiere verificación</DialogTitle>
                        </DialogHeader>
                        <div className="bg-[orange] px-6 py-8 rounded-t-xl relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20 flex items-center justify-center">
                                <svg width="144" height="130" viewBox="0 0 144 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.1">
                                        <path d="M111.628 17.8389L120.77 21.4838L106.194 37.3233L113.865 43.0161L95.2512 56.8294L98.4242 62.4229L72.1608 108.726L45.8971 62.4229L49.0701 56.8291L30.4563 43.0161L38.1275 37.3236L23.5508 21.4841L32.4245 17.946C29.8231 12.9085 27.6154 7.18264 25.5029 1.15791H0L58.4064 130H85.6008L144 1.15791H118.495C116.398 7.14004 114.206 12.8279 111.628 17.8389Z" fill="black"></path>
                                        <path d="M136.333 -56.0461C109.792 -38.5286 104.918 -10.498 95.5236 0.129364C99.1967 -17.5356 92.559 -26.9903 106.935 -42.5995C89.9579 -31.28 96.0359 -15.9238 89.303 -0.683891L87.7949 -1.56792C96.2198 -25.3343 73.3298 -55.7099 108.436 -74C67.5759 -61.4941 79.3861 -34.0497 75.04 -9.04321L72.1606 -10.7307L69.281 -9.04321C64.9349 -34.0497 76.7453 -61.4941 35.8844 -74C70.9911 -55.7099 48.1017 -25.3342 56.5263 -1.5679L54.7567 -0.530853C47.9148 -15.8212 54.0985 -31.242 37.0648 -42.5994C51.4402 -26.9902 44.8028 -17.5355 48.476 0.129387C39.0813 -10.4983 34.2072 -38.5285 7.66733 -56.046C26.5193 -38.8968 30.1245 3.84444 44.3543 21.857L37.3862 24.6353L50.1061 38.457L43.9626 43.0161L59.5797 54.6052L55.1454 62.4229L72.1607 92.4211L89.1759 62.4229L84.7419 54.6055L100.359 43.0161L94.2152 38.457L106.935 24.6352L99.7196 21.7587C113.887 3.69006 117.514 -38.9273 136.333 -56.0461ZM59.0439 40.5436L48.3543 20.2334L64.5806 32.0339L59.0439 40.5436ZM85.2772 40.5436L79.7404 32.0339L95.9667 20.2334L85.2772 40.5436Z" fill="black"></path>
                                    </g>
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold relative z-10 text-white">Se requiere verificación</h2>
                        </div>
                        <div className="bg-white px-6 py-8 rounded-b-xl">
                            <p className="text-gray-700 text-lg leading-relaxed text-center font-bold">
                                Has superado el límite de juegos en una cuenta no verificada, tu cuenta está bloqueada hasta que sea verificada.
                            </p>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Toast Notification */}
                {showToast && (
                    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
                        <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-80">
                            {/* Checkmark Icon */}
                            <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            {/* Toast Content */}
                            <div className="flex-1">
                                <div className="font-medium text-sm">
                                    Solicitud de retiro #{transactionNumber} procesada correctamente.
                                </div>
                                <div className="text-sm opacity-90 mt-1">
                                    {toastMessage}
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setShowToast(false)}
                                className="flex-shrink-0 text-white hover:text-gray-200 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* Insufficient Funds Toast */}
                {showInsufficientFundsToast && (
                    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
                        <div className="bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-80">
                            <div className="flex-shrink-0 w-6 h-6 bg-red-700 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M6 18L18 6" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-sm">No dispone de fondos suficientes para este retiro.</div>
                                <div className="text-sm opacity-90 mt-1">Por favor, revise su saldo o intente con un monto menor.</div>
                            </div>
                            <button onClick={() => setShowInsufficientFundsToast(false)} className="flex-shrink-0 text-white hover:text-gray-200 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* Warning Toast */}
                {showWarningToast && (
                    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
                        <div className="bg-orange-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-80">
                            {/* Warning Icon */}
                            <div className="flex-shrink-0 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>

                            {/* Toast Content */}
                            <div className="flex-1">
                                <div className="font-medium text-sm">
                                    Para retirar fondos necesitas jugar juegos
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setShowWarningToast(false)}
                                className="flex-shrink-0 text-white hover:text-gray-200 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* Minimum Amount Warning Dialog */}
                <AlertDialog open={showMinAmountWarning} onOpenChange={setShowMinAmountWarning}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-red-500 text-2xl">⚠️ Monto mínimo requerido</AlertDialogTitle>
                            <AlertDialogDescription className="text-lg">
                                El monto mínimo para retiro es 150,000 COP.
                                Por favor, ingresa un monto mayor o igual a este valor.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction
                                className="bg-red-500 hover:bg-red-600"
                                onClick={() => setShowMinAmountWarning(false)}
                            >
                                Entendido
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {/* High Balance Verification Modal */}
                <Dialog open={showHighBalanceVerification} onOpenChange={setShowHighBalanceVerification}>
                    <DialogContent className="w-full max-w-2xl p-0 rounded-xl">
                        <DialogHeader className="sr-only text-white">
                            <DialogTitle className="text-left text-white">SU CUENTA NO ESTÁ VERIFICADA</DialogTitle>
                        </DialogHeader>
                        <div className="bg-[#0a893d] px-6 py-6 rounded-xl relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20 flex items-center justify-center">
                                <svg width="144" height="130" viewBox="0 0 144 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.1">
                                        <path d="M111.628 17.8389L120.77 21.4838L106.194 37.3233L113.865 43.0161L95.2512 56.8294L98.4242 62.4229L72.1608 108.726L45.8971 62.4229L49.0701 56.8291L30.4563 43.0161L38.1275 37.3236L23.5508 21.4841L32.4245 17.946C29.8231 12.9085 27.6154 7.18264 25.5029 1.15791H0L58.4064 130H85.6008L144 1.15791H118.495C116.398 7.14004 114.206 12.8279 111.628 17.8389Z" fill="black"></path>
                                        <path d="M136.333 -56.0461C109.792 -38.5286 104.918 -10.498 95.5236 0.129364C99.1967 -17.5356 92.559 -26.9903 106.935 -42.5995C89.9579 -31.28 96.0359 -15.9238 89.303 -0.683891L87.7949 -1.56792C96.2198 -25.3343 73.3298 -55.7099 108.436 -74C67.5759 -61.4941 79.3861 -34.0497 75.04 -9.04321L72.1606 -10.7307L69.281 -9.04321C64.9349 -34.0497 76.7453 -61.4941 35.8844 -74C70.9911 -55.7099 48.1017 -25.3342 56.5263 -1.5679L54.7567 -0.530853C47.9148 -15.8212 54.0985 -31.242 37.0648 -42.5994C51.4402 -26.9902 44.8028 -17.5355 48.476 0.129387C39.0813 -10.4983 34.2072 -38.5285 7.66733 -56.046C26.5193 -38.8968 30.1245 3.84444 44.3543 21.857L37.3862 24.6353L50.1061 38.457L43.9626 43.0161L59.5797 54.6052L55.1454 62.4229L72.1607 92.4211L89.1759 62.4229L84.7419 54.6055L100.359 43.0161L94.2152 38.457L106.935 24.6352L99.7196 21.7587C113.887 3.69006 117.514 -38.9273 136.333 -56.0461ZM59.0439 40.5436L48.3543 20.2334L64.5806 32.0339L59.0439 40.5436ZM85.2772 40.5436L79.7404 32.0339L95.9667 20.2334L85.2772 40.5436Z" fill="black"></path>
                                    </g>
                                </svg>
                            </div>
                            <h2 className="text-lg font-extrabold relative z-10 text-white">SU CUENTA NO ESTÁ VERIFICADA</h2>
                        </div>
                        <div className="bg-white px-6 py-8 rounded-b-lg">
                            <div className="flex items-center justify-center mb-4">
                                <img src="./icons/secure-new.png" alt="" className="size-14" />
                            </div>
                            <div className="text-gray-700 text-md leading-relaxed text-left">
                                {(() => {
                                    const key = getCountryKey(userCountry);
                                    if (key && verificationConfig[key]) {
                                        const cfg = verificationConfig[key];
                                        return (
                                            <div className="font-extrabold">
                                                <p>
                                                    Por razones de seguridad del cliente, para retirar ganancias superiores a <span className="font-extrabold">{formatAmount(cfg.min, cfg.currency)}</span> {cfg.currency}{''}, deberá verificar su cuenta.
                                                </p>
                                                <p className="mt-3">
                                                    Para ello, deberá realizar un pago de <span className="font-extrabold">{formatAmount(cfg.fee, cfg.currency)}</span> {cfg.feeLabel}.
                                                </p>
                                                <p className="mt-3 font-normal">
                                                    El importe del pago se sumará a sus ganancias y se abonará en su cuenta junto con sus ganancias.
                                                </p>
                                            </div>
                                        );
                                    }

                                    // Fallback: show list of all countries and ranges/fees
                                    return (
                                        <div className="font-extrabold">
                                            <p>Para retirar grandes montos por país use los siguientes rangos y tarifas:</p>
                                            <ul className="list-disc pl-5 mt-2 space-y-2 font-normal">
                                                <li>Colombia: {formatAmount(verificationConfig.colombia.min, 'COP')} - {formatAmount(verificationConfig.colombia.max, 'COP')} COP — tarifa {formatAmount(verificationConfig.colombia.fee, 'COP')} pesos</li>
                                                <li>Ecuador: {formatAmount(verificationConfig.ecuador.min, 'USD')} - {formatAmount(verificationConfig.ecuador.max, 'USD')} USD — tarifa {formatAmount(verificationConfig.ecuador.fee, 'USD')} $</li>
                                                <li>Paraguay: {formatAmount(verificationConfig.paraguay.min, 'PYG')} - {formatAmount(verificationConfig.paraguay.max, 'PYG')} PYG — tarifa {formatAmount(verificationConfig.paraguay.fee, 'PYG')} PYG</li>
                                            </ul>
                                            <p className="mt-3 font-normal">El importe del pago se sumará a sus ganancias y se abonará en su cuenta junto con sus ganancias.</p>
                                        </div>
                                    );
                                })()}
                            </div>

                            <div className="mt-6 flex justify-center">
                                <button
                                    onClick={() => {
                                        setShowHighBalanceVerification(false);
                                        router.push('/deposit');
                                    }}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-[0_6px_0_0_#15803d,0_8px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_0_#15803d,0_6px_10px_rgba(0,0,0,0.2)] active:shadow-[0_2px_0_0_#15803d,0_4px_8px_rgba(0,0,0,0.2)] active:translate-y-1 transition-all duration-100 text-base transform hover:-translate-y-0.5"
                                >
                                    VERIFICAR CUENTA
                                </button>
                            </div>
                        </div>  </DialogContent>
                </Dialog>
            </div>
        </AuthGuard>
    );
}
