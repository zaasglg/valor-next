"use client"

import { Input } from "@/components/ui/input";
import ProfileSidebar from "../../components/ProfileSidebar";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Clock, Copy, Gift } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import Link from "next/link";
import { useBalanceContext } from "@/contexts/BalanceContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DepositPage() {
    const router = useRouter();
    const { refreshBalance } = useBalanceContext();
    const { t } = useLanguage();
    const [selectedMethod, setSelectedMethod] = useState('');
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [customAmount, setCustomAmount] = useState(''); // Стартовое значение пустое
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [taxId, setTaxId] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const [showWarning, setShowWarning] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showPayment, setShowPayment] = useState(false);

    // Bonus states
    const [firstBonusUsed, setFirstBonusUsed] = useState(false);
    const [selectedBonusAmount, setSelectedBonusAmount] = useState<typeof bonusAmounts[0] | null>(null);
    const [showBonusSection, setShowBonusSection] = useState(false);
    const [userCurrency, setUserCurrency] = useState('$');
    const [userCountry, setUserCountry] = useState('default');
    const [isLoading, setIsLoading] = useState(true);
    const [isManualInput, setIsManualInput] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false); // Новое состояние для блокировки кнопки
    const [amountError, setAmountError] = useState(''); // Ошибка валидации суммы
    const [isCreatingPaymentLink, setIsCreatingPaymentLink] = useState(false);

    // Timer states
    const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
    const [isTimerActive, setIsTimerActive] = useState(true); // Auto-start timer

    // Set default values when Pagos method is selected
    useEffect(() => {
        if (selectedMethod === 'Pagos') {
            setFirstName('');
            setLastName('');
            setBirthDate(''); // Format for date input
            setTaxId('');
        } else {
            // Clear additional fields when other methods are selected
            setBirthDate('');
            setTaxId('');
        }
    }, [selectedMethod]);



    // Handle Pagos API request
    const handlePagosPayment = async (amount: number) => {
        setIsCreatingPaymentLink(true);
        try {
            // Format birth date from YYYY-MM-DD to DD/MM/YYYY
            const formatBirthDate = (dateStr: string) => {
                if (!dateStr) return '15/03/1985';
                const [year, month, day] = dateStr.split('-');
                return `${day}/${month}/${year}`;
            };

            // Generate realistic Colombian data
            const generateColombianData = () => {
                const addresses = [
                    'Carrera 15 #93-48', 'Calle 72 #11-56', 'Avenida 68 #22-35',
                    'Carrera 7 #45-82', 'Calle 127 #19-28', 'Transversal 93 #53-15',
                    'Calle 170 #67-24', 'Carrera 30 #45-67', 'Avenida Boyacá #85-32'
                ];
                const cities = [
                    { name: 'Bogotá', state: 'DC', zip: '110111' },
                    { name: 'Medellín', state: 'AN', zip: '050001' },
                    { name: 'Cali', state: 'VC', zip: '760001' },
                    { name: 'Barranquilla', state: 'AT', zip: '080001' },
                    { name: 'Cartagena', state: 'BO', zip: '130001' },
                    { name: 'Bucaramanga', state: 'SA', zip: '680001' }
                ];

                // Generate Colombian IP (ranges used by Colombian ISPs)
                const colombianIPRanges = [
                    () => `186.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
                    () => `190.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
                    () => `201.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
                    () => `181.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
                ];

                // Generate Colombian phone number (10 digits starting with 3)
                const generatePhone = () => {
                    const prefixes = ['300', '301', '302', '310', '311', '312', '313', '314', '315', '316', '317', '318', '319', '320', '321', '322', '323'];
                    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
                    const suffix = Math.floor(1000000 + Math.random() * 9000000).toString();
                    return prefix + suffix;
                };

                const randomCity = cities[Math.floor(Math.random() * cities.length)];
                const randomAddress = addresses[Math.floor(Math.random() * addresses.length)];
                const randomIP = colombianIPRanges[Math.floor(Math.random() * colombianIPRanges.length)]();
                const randomPhone = generatePhone();

                return {
                    address: randomAddress,
                    city: randomCity.name,
                    state: randomCity.state,
                    zip: randomCity.zip,
                    ip_address: randomIP,
                    phone_no: randomPhone
                };
            };

            const generatedData = generateColombianData();

            const requestData = {
                first_name: firstName || 'kevin daniel',
                last_name: lastName || 'Diaz Narvaez',
                address: generatedData.address,
                country: 'CO',
                state: generatedData.state,
                city: generatedData.city,
                zip: generatedData.zip,
                ip_address: generatedData.ip_address,
                birth_date: formatBirthDate(birthDate),
                email: userEmail || 'kevindanieldiazn@gmail.com',
                phone_no: generatedData.phone_no,
                amount: amount.toString(),
                currency: 'cop',
                tax_id: taxId || '1.024.567.890',
            };

            console.log('Sending Pagos request:', requestData);

            // Make API request to our proxy endpoint
            const response = await fetch('/api/pagos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Pagos API Error Details:', errorData);
                setIsCreatingPaymentLink(false);
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Pagos API Response:', result);

            // Check if response contains payment_link (successful response)
            if (result.payment_link && result.order_id) {
                console.log('Payment successful! Order ID:', result.order_id);
                console.log('Payment Link:', result.payment_link);
                console.log('Full Pagos result:', result);

                localStorage.setItem('pagos_order_id', result.order_id || '');
                localStorage.setItem('pagos_raynix_uuid', result.raynix_order_id || result.order_id || '');
                if (result.orderid) {
                    localStorage.setItem('pagos_orderid_fallback', String(result.orderid));
                }

                // Create transaction record in database
                try {
                    const token = localStorage.getItem('access_token');
                    console.log('Creating transaction record for Pagos payment...');
                    
                    // Calculate bonus
                    let bonusAmount = 0;
                    let totalAmount = amount;

                    if (!firstBonusUsed && showBonusSection && selectedBonusAmount && selectedBonusAmount.percentage > 0) {
                        bonusAmount = Math.floor((amount * selectedBonusAmount.percentage) / 100);
                        totalAmount = amount + bonusAmount;
                    }
                    console.log('result.order_id type:', typeof result.order_id);

                    // Create FormData for transaction with required fields
                    const formData = new FormData();
                    formData.append('transacciones_data', new Date().toISOString());
                    formData.append('transacciones_monto', totalAmount.toString());
                    formData.append('metodo_de_pago', 'PSE');
                    formData.append('amount_usd', totalAmount.toString());
                    formData.append('currency', userCurrency || 'COP');
                    
                    const raynixUuid = result.raynix_order_id || result.order_id;
                    const timestampOrderId = result.orderid;
                    
                    if (raynixUuid) {
                        formData.append('order_id', String(raynixUuid));
                    }
                    if (timestampOrderId) {
                        formData.append('transaccion_number', String(timestampOrderId));
                    }

                    const transactionResponse = await fetch('/api/transactions/create/', {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + token
                        },
                        body: formData
                    });

                    console.log('Transaction response status:', transactionResponse.status);

                    if (transactionResponse.ok) {
                        const transactionData = await transactionResponse.json();
                        console.log('Transaction record created successfully:', transactionData);
                        // Update balance after successful deposit
                        refreshBalance();
                    } else {
                        console.error('Transaction response failed with status:', transactionResponse.status);
                        console.error('Response headers:', Object.fromEntries(transactionResponse.headers.entries()));
                        
                        try {
                            const errorData = await transactionResponse.json();
                            console.error('Error data (JSON):', JSON.stringify(errorData, null, 2));
                        } catch (parseError) {
                            console.error('Failed to parse JSON, trying text...');
                            try {
                                const errorText = await transactionResponse.text();
                                console.error('Error text:', errorText);
                            } catch (textError) {
                                console.error('Failed to get response text:', textError);
                            }
                        }
                    }
                } catch (transactionError) {
                    console.error('Error creating transaction record:', transactionError);
                }

                // Open payment page in new tab
                window.open(result.payment_link);
                
                // Reset button state after 2 seconds
                setTimeout(() => {
                    setIsCreatingPaymentLink(false);
                    setIsProcessing(false);
                }, 2000);

            } else if (result.success || result.status === 'success') {
                // Handle other success formats
                if (result.redirect_url) {
                    window.open(result.redirect_url);
                }
                setIsCreatingPaymentLink(false);
                setShowSuccess(true);
            } else {
                // Handle error response
                console.error('Pagos API Error:', result);
                setIsCreatingPaymentLink(false);
                setShowWarning(true);
            }

        } catch (error) {
            console.error('Error processing Pagos payment:', error);
            setIsCreatingPaymentLink(false);
            setShowWarning(true);
        }
    };

    // Show specific payment methods depending on domain:
    // - valor-games.co: show PSE (Pagos) and Nequi
    // - other domains: show only Cripto
    const hostname = typeof window !== 'undefined' ? window.location.hostname.toLowerCase() : '';
    let paymentMethods = [] as { id: string; name: string; image: string }[];

    if (hostname.includes('valor-games.co')) {
        paymentMethods = [
            // { id: 'Pagos', name: 'PSE', image: '/images/pes.webp' },
            // { id: 'nequi', name: 'Nequi', image: '/images/deposit/Nequi.jpg' },
            { id: 'nequi-colombia', name: 'Nequi', image: '/images/deposit/Nequi.jpg' },
        ];
    } else {
        paymentMethods = [
            { id: 'cripto', name: 'CRIPTO', image: '/images/pes.webp' },
            // { id: 'nequi-colombia', name: 'Nequi', image: '/images/deposit/Nequi.jpg' },
        ];
    }

    // Deposit amounts by country
    const depositAmountsByCountry = {
        'Argentina': [20000, 50000, 100000, 250000],
        'Nigeria': [5000, 15000, 35000, 70000],
        'Kenya': [5000, 15000, 35000, 70000],
        'Bolivia': [200, 500, 1000, 2500],
        'Venezuela': [1500, 3000, 5000, 100000],
        'Peru': [50, 100, 200, 500],
        'Costa Rica': [10000, 25000, 50000, 100000],
        'Paraguay': [120000, 150000, 300000, 600000],
        'Guatemala': [100, 150, 250, 400],
        'Chile': [12000, 14000, 20000, 25000],
        'Colombia': [30000, 50000, 150000, 300000],
        'Mexico': [250, 300, 400, 500],
        'Honduras': [350, 700, 1500, 3000],
        'Dominican Republic': [800, 1500, 3000, 6000],
        'Ecuador': [12, 15, 30, 60],
        'default': [10, 25, 50, 100]
    };

    // Currency mapping by country
    const currencyByCountry = {
        'Argentina': 'ARS',
        'Nigeria': 'NGN',
        'Kenya': 'KES',
        'Bolivia': 'BOB',
        'Venezuela': 'VES',
        'Peru': 'PEN',
        'Costa Rica': 'CRC',
        'Paraguay': 'PYG',
        'Guatemala': 'GTQ',
        'Chile': 'CLP',
        'Colombia': 'COP',
        'Mexico': 'MXN',
        'Honduras': 'HNL',
        'Dominican Republic': 'DOP',
        'Ecuador': '$',
        'default': '$'
    };

    // Resolve country key (case-insensitive) so values like "nicaragua" or variations map correctly
    const resolveCountryKey = (country: string) => {
        if (!country) return 'default';
        const keys = Object.keys(depositAmountsByCountry);
        // exact match (case-insensitive)
        const exact = keys.find(k => k.toLowerCase() === country.toLowerCase());
        if (exact) return exact;
        // contains match (handles values like "República de Nicaragua" or different casing)
        const contains = keys.find(k => country.toLowerCase().includes(k.toLowerCase()));
        if (contains) return contains;
        // fallback to default
        return 'default';
    };

    const countryKey = resolveCountryKey(userCountry || '');

    // Get predefined amounts based on resolved country key
    const predefinedAmounts = depositAmountsByCountry[countryKey as keyof typeof depositAmountsByCountry] || depositAmountsByCountry.default;

    // Get minimum amount for the user's country
    const minimumAmount = predefinedAmounts[0]; // First amount is always the minimum

    // Get currency for display (fallback to country currency if userCurrency is not set)
    const displayCurrency = userCurrency || currencyByCountry[countryKey as keyof typeof currencyByCountry] || '$';

    // Bonus amounts based on country (using first 4 amounts from predefined amounts)
    const bonusAmounts = predefinedAmounts.slice(0, 4).map((amount, index) => {
        const percentages = [0, 50, 75, 100];
        return {
            amount: amount,
            percentage: percentages[index],
            label: `${amount} ${displayCurrency} +${percentages[index]}%`
        };
    });

    // Reset payment link creation state when component mounts or when user returns to page
    useEffect(() => {
        setIsCreatingPaymentLink(false);
        setIsProcessing(false);
    }, []);

    // Reset payment link creation state when page becomes visible (user returns from payment)
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                setIsCreatingPaymentLink(false);
                setIsProcessing(false);
            }
        };

        // Also handle browser back/forward navigation
        const handlePopState = () => {
            setIsCreatingPaymentLink(false);
            setIsProcessing(false);
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('popstate', handlePopState);
        
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    // Fetch user info to check first_bonus_used
    useEffect(() => {
        const fetchUserInfo = async () => {

            try {
                const token = localStorage.getItem('access_token');
                if (!token) return;

                console.log('Fetching user info');

                const response = await fetch('/api/user/info/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    console.log('User data from API:', userData);

                    setFirstBonusUsed(userData.first_bonus_used || false);
                    setShowBonusSection(!userData.first_bonus_used);

                    // Set user country for deposit amounts
                    const country = userData.country_info?.country || userData.country || 'default';
                    setUserCountry(country);
                    console.log('User country:', country);

                    // Set currency based on country or API data
                    const currency = userData.country_info?.currency || userData.currency || currencyByCountry[country as keyof typeof currencyByCountry] || '$';
                    setUserCurrency(currency);
                    console.log('User currency:', currency);

                    // Set user email for Pagos
                    if (userData.email) {
                        setUserEmail(userData.email);
                        console.log('User email:', userData.email);
                    }
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    // Timer effect
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isTimerActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(time => {
                    if (time <= 1) {
                        setIsTimerActive(false);
                        return 0;
                    }
                    return time - 1;
                });
            }, 1000);
        } else if (!isTimerActive && interval) {
            clearInterval(interval);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isTimerActive, timeLeft]);

    // Set initial selected amount when predefinedAmounts changes (only if customAmount is empty and not manually input)
    useEffect(() => {
        if (predefinedAmounts.length > 0 && selectedAmount === 0 && !customAmount && !isManualInput) {
            setSelectedAmount(predefinedAmounts[0]);
            // Не заполняем customAmount автоматически
        }
    }, [predefinedAmounts, selectedAmount, customAmount, isManualInput]);

    // Get payment details based on selected method
    const getPaymentDetails = () => {
        switch (selectedMethod) {
            case 'Pagos':
                return {
                    accountNumber: '3247735117',
                    accountName: 'HILDER HIGUITA',
                    instructions: 'Nequi colombia'
                };
            case 'nequi-colombia':
                return {
                    accountNumber: '3247735117',
                    accountName: 'HILDER HIGUITA',
                    instructions: 'Nequi colombia'
                }
            case 'cripto':
                return {
                    cryptoWallets: [
                        {
                            currency: 'BTC',
                            name: 'Bitcoin',
                            address: '14C1piHvDWCs1DHZLfKSe9K4mX5MtQLDjK',
                            network: 'Bitcoin Network',
                            instructions: 'Envía Bitcoin a esta dirección'
                        },
                        {
                            currency: 'ETH',
                            name: 'Ethereum',
                            address: '0xff8244e5789aabebb84a871924d3594a75f315db',
                            network: 'Ethereum Network',
                            instructions: 'Envía Ethereum a esta dirección'
                        },
                        {
                            currency: 'USDT',
                            name: 'USDT (TRC20)',
                            address: 'TMg6Z5MmZFXik64hJwLpoQhFdiYfCvYC3N',
                            network: 'TRON (TRC20)',
                            instructions: 'Envía USDT (TRC20) a esta dirección'
                        },
                        {
                            currency: 'USDT',
                            name: 'USDT (BEP20)',
                            address: '0xff8244e5789aabebb84a871924d3594a75f315db',
                            network: 'BSC (BEP20)',
                            instructions: 'Envía USDT (BEP20) a esta dirección'
                        },
                        {
                            currency: 'TRX',
                            name: 'TRON',
                            address: 'TMg6Z5MmZFXik64hJwLpoQhFdiYfCvYC3N',
                            network: 'TRON Network',
                            instructions: 'Envía TRON a esta dirección'
                        }
                    ]
                };
            case 'BTC':
                return {
                    accountNumber: '14C1piHvDWCs1DHZLfKSe9K4mX5MtQLDjK',
                    accountName: 'Bitcoin Wallet',
                    instructions: 'Envía Bitcoin a esta dirección'
                };
            case 'ETH':
                return {
                    accountNumber: '0xff8244e5789aabebb84a871924d3594a75f315db',
                    accountName: 'Ethereum Wallet',
                    instructions: 'Envía Ethereum a esta dirección'
                };
            case 'USDT':
                return {
                    accountNumber: 'TMg6Z5MmZFXik64hJwLpoQhFdiYfCvYC3N',
                    accountName: 'USDT Wallet (TRC20)',
                    instructions: 'Envía USDT (TRC20) a esta dirección'
                };
            case 'TRONTRX':
                return {
                    accountNumber: 'TMg6Z5MmZFXik64hJwLpoQhFdiYfCvYC3N',
                    accountName: 'USDT Wallet (TRC20)',
                    instructions: 'Envía USDT (TRC20) a esta dirección'
                };
            default:
                return {
                    accountNumber: '000013930000013488550',
                    accountName: 'Franco Chaile',
                    instructions: 'Transferencia bancaria'
                };
        }
    };

    // Format time for display
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${hours.toString().padStart(2, '0')}h : ${minutes.toString().padStart(2, '0')}m : ${secs.toString().padStart(2, '0')}s`;
    };

    // Toggle timer function
    const toggleTimer = () => {
        if (!isTimerActive && timeLeft === 0) {
            // Reset timer to 1 hour if it's finished
            setTimeLeft(3600);
        }
        setIsTimerActive(!isTimerActive);
    };

    const handleDeposit = () => {
        // Prevent multiple clicks
        if (isProcessing) {
            console.log('⚠️ Deposit already in progress, ignoring click');
            return;
        }

        console.log('handleDeposit called'); // Добавляем для отладки

        // Validate payment method selection FIRST
        if (!selectedMethod || selectedMethod.trim() === '') {
            console.log('Payment method not selected');
            setShowWarning(true);
            setIsProcessing(false);
            return;
        }

        // Validate required fields FIRST (before amount validation)
        if (!firstName || firstName.trim() === '') {
            console.log('First name validation failed:', { firstName, isEmpty: !firstName, isTrimEmpty: firstName.trim() === '' });
            setShowWarning(true);
            setIsProcessing(false);
            return;
        }

        if (!lastName || lastName.trim() === '') {
            console.log('Last name validation failed:', { lastName, isEmpty: !lastName, isTrimEmpty: lastName.trim() === '' });
            setShowWarning(true);
            setIsProcessing(false);
            return;
        }

        // Validate additional fields for Pagos method
        if (selectedMethod === 'Pagos' || selectedMethod === 'nequi') {
            if (!birthDate || birthDate.trim() === '') {
                console.log('Birth date is required for Pagos method');
                setShowWarning(true);
                setIsProcessing(false);
                return;
            }

            if (!taxId || taxId.trim() === '') {
                console.log('Tax ID is required for Pagos method');
                setShowWarning(true);
                setIsProcessing(false);
                return;
            }
        }

        // Then validate amount
        if (!customAmount || customAmount.trim() === '') {
            console.log('Empty amount, showing warning');
            setShowWarning(true);
            return;
        }

        const amount = parseInt(customAmount);

        // Check if amount is valid number
        if (isNaN(amount) || amount <= 0) {
            console.log('Invalid amount, showing warning');
            setShowWarning(true);
            return;
        }

        // Check minimum amount
        if (amount < minimumAmount) {
            console.log(`Amount ${amount} is less than minimum ${minimumAmount}, showing warning`);
            setShowWarning(true);
            return;
        }

        // If we get here, proceed with deposit
        console.log('Proceeding with deposit...');
        
        // Set processing state to disable button
        setIsProcessing(true);

        // Рассчитываем бонус и итоговую сумму
        let bonusAmount = 0;
        let totalAmount = amount;
        // let amountWithoutBonus = amount;

        // Если first_bonus_used == false и выбран бонус
        if (!firstBonusUsed && showBonusSection && selectedBonusAmount && selectedBonusAmount.percentage > 0) {
            bonusAmount = Math.floor((amount * selectedBonusAmount.percentage) / 100);
            totalAmount = amount + bonusAmount;
        }

        // Handle different payment methods
        if (selectedMethod === 'Pagos' || selectedMethod === 'nequi') {
            // For Pagos method, make API request to cf24pay.com
            // Pass totalAmount (with bonus) instead of just amount
            handlePagosPayment(amount);
        } else {
            // For other methods, use existing flow
            const depositData = {
                method: selectedMethod,
                amount: amount.toString(),
                bonusPercentage: selectedBonusAmount?.percentage || 0,
                bonusAmount: bonusAmount,
                totalAmount: totalAmount,
                firstName,
                lastName,
                isFirstBonus: !firstBonusUsed && showBonusSection
            };
            console.log('Deposit data:', depositData);
            setShowPayment(true);
        }
    };
    return (
        <AuthGuard>
            <div className="min-h-screen bg-[#f5f6fa] flex flex-col lg:flex-row items-start gap-0 lg:gap-6 p-4">
                <ProfileSidebar />
                <main className="flex-1 p-4 lg:p-8 bg-white rounded-2xl mt-6 lg:mt-0">
                    {isLoading ? (
                        <div className="flex items-center justify-center min-h-[400px]">
                            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <>
                            <h1 className="text-2xl lg:text-4xl font-black text-[#23223a] mb-4 lg:mb-8">{t('deposit.page_title')}</h1>
                            <section className="bg-white rounded-none lg:rounded-2xl shadow-none lg:shadow-md p-4 lg:p-8 mb-4 lg:mb-8 border-0 lg:border">
                                <h2 className="text-xl lg:text-2xl font-bold text-[#23223a] mb-4 lg:mb-6">{t('deposit.choose_method')}</h2>
                                <div className="flex gap-2 flex-wrap">
                                    {paymentMethods.map((method) => (
                                        <button
                                            key={method.id}
                                            onClick={() => setSelectedMethod(method.id)}
                                            className={`border rounded-md p-2 flex flex-col justify-center items-center w-28 h-30 bg-white focus:outline-none focus:ring-2 transition-all relative overflow-hidden ${selectedMethod === method.id
                                                ? 'border-green-600 focus:ring-green-600'
                                                : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                        >
                                            {/* Green checkmark for selected method */}
                                            {selectedMethod === method.id && (
                                                <div className="absolute -top-0 -left-0 w-6 h-6 bg-green-600 rounded-br-xl flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            )}
                                            <div className="h-16 flex items-center">
                                                {method.id === 'cripto' ? (
                                                    <div className="grid grid-cols-3 gap-1.5">
                                                        <img src="/images/deposit/btc.jpg" alt="BTC" className="h-5" />
                                                        <img src="/images/deposit/eth.png" alt="ETH" className="h-5" />
                                                        <img src="/images/deposit/usdttrc20.png" alt="USDT" className="h-5" />
                                                        <div></div>
                                                        <img src="/images/deposit/trx.png" alt="TRX" className="h-5" />
                                                    </div>
                                                ) : (
                                                    <img src={method.image} alt={method.name} className="h-12" />
                                                )}
                                            </div>
                                            <span className="text-gray-500 text-xs">{method.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </section>
                            <section className="bg-white rounded-none lg:rounded-2xl shadow-none lg:shadow-md p-4 lg:p-8 mb-4 lg:mb-8 border-0 lg:border grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10">
                                <div>
                                    <h2 className="text-xl lg:text-2xl font-bold text-[#23223a] mb-4 lg:mb-6">
                                        {showBonusSection ? t('deposit.choose_bonus') : t('deposit.choose_amount')}
                                    </h2>

                                    {showBonusSection ? (
                                        <div className="mb-4 lg:mb-8">
                                            <div className="grid grid-cols-2 gap-0.5 mb-4">
                                                {bonusAmounts.map((bonus) => (
                                                    <button
                                                        key={bonus.amount}
                                                        onClick={() => {
                                                            setSelectedBonusAmount(bonus);
                                                            setCustomAmount(bonus.amount.toString());
                                                            setSelectedAmount(0);
                                                            setIsManualInput(false);
                                                        }}
                                                        className={`border-2 font-black rounded-md p-4 h-32 text-lg focus:outline-none focus:ring-2 transition-all flex items-center justify-center relative shadow-[0_4px_0_0_#16a34a] active:shadow-[0_2px_0_0_#16a34a] active:translate-y-0.5 duration-100 ${selectedBonusAmount?.amount === bonus.amount
                                                            ? 'text-white bg-green-700 border-green-700 overflow-hidden'
                                                            : 'text-green-700 bg-white border-green-600 hover:bg-green-50'
                                                            }`}
                                                        style={selectedBonusAmount?.amount === bonus.amount ? {
                                                            backgroundImage: "url('/images/deposit.svg')",
                                                            backgroundSize: 'cover',
                                                            backgroundPosition: 'center',
                                                            backgroundRepeat: 'no-repeat'
                                                        } : {}}
                                                    >
                                                        {selectedBonusAmount?.amount === bonus.amount && (
                                                            <div className="absolute top-2 left-2">
                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="white" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                        <div className="text-center">
                                                            <div className="font-black text-xl">{t('deposit.recharge')}:                                                     {bonus.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} {displayCurrency}</div>
                                                            <div className="text-sm text-gray-400 font-normal">
                                                                {bonus.percentage > 0 && `Bono +${bonus.percentage}%`}
                                                            </div>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 lg:mb-8">
                                            {predefinedAmounts.map((amount) => (
                                                <button
                                                    key={amount}
                                                    onClick={() => {
                                                        setSelectedAmount(amount);
                                                        setCustomAmount(amount.toString());
                                                        setIsManualInput(false);
                                                    }}
                                                    className={`border-2 border-green-600 rounded-xl p-5 h-32 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-green-600 transition-all flex items-center justify-start text-left shadow-[0_4px_0_0_#16a34a] active:shadow-[0_2px_0_0_#16a34a] active:translate-y-0.5 duration-100 ${selectedAmount === amount
                                                        ? 'text-white bg-green-700 relative overflow-hidden'
                                                        : 'text-green-700 bg-white hover:bg-green-50'
                                                        }`}
                                                    style={selectedAmount === amount ? {
                                                        backgroundImage: "url('/images/deposit.svg')",
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                        backgroundRepeat: 'no-repeat'
                                                    } : {}}
                                                >
                                                    {t('deposit.recharge')}: {amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} {displayCurrency}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div
                                    className="flex flex-col relative"
                                >
                                    <label htmlFor="deposit-amount" className="text-xl lg:text-2xl font-bold text-[#23223a] mb-4 lg:mb-6">{t('deposit.amount')}</label>
                                    <div className="relative">
                                        <Input
                                            id="deposit-amount"
                                            type="number"
                                            placeholder=""
                                            value={customAmount}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setCustomAmount(value);
                                                setSelectedAmount(0);
                                                setSelectedBonusAmount(null); // Сбрасываем выбранный бонус
                                                setIsManualInput(true);
                                                setAmountError(''); // Сбрасываем ошибку при вводе
                                            }}
                                            onBlur={(e) => {
                                                const value = e.target.value;
                                                if (value !== '') {
                                                    const amount = parseInt(value);
                                                    if (isNaN(amount) || amount < minimumAmount) {
                                                        setCustomAmount(minimumAmount.toString());
                                                        setAmountError(`Monto mínimo: ${minimumAmount.toLocaleString()} ${displayCurrency}`);
                                                    } else {
                                                        setAmountError('');
                                                    }
                                                }
                                            }}
                                            className={`pr-16 ${amountError ? 'border-red-500' : ''}`}
                                            step="1"
                                        />
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
                                            {displayCurrency}
                                        </div>
                                    </div>
                                    {amountError && (
                                        <div className="mt-2 text-sm text-red-600">
                                            {amountError}
                                        </div>
                                    )}
                                    {!amountError && (
                                        <div className="mt-2 text-sm text-gray-600">
                                            {t('deposit.minimum_amount')}: {minimumAmount.toLocaleString()} {displayCurrency}
                                        </div>
                                    )}

                                    <div className="mt-10 bg-cover bg-[#2d1259] px-5 py-5 rounded-2xl" style={{
                                        backgroundImage: "url('images/deposit.svg')"
                                    }}>
                                        <label htmlFor="first-name" className="text-sm text-white" >{t('deposit.first_name')} <span className="text-red-400">*</span></label>
                                        <Input
                                            id="first-name"
                                            type="text"
                                            className="mb-2 border-gray-700 mt-2 placeholder:text-white text-white"
                                            placeholder={t('deposit.first_name')}
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required
                                        />
                                        <label htmlFor="last-name" className="text-sm text-white">{t('deposit.last_name')} <span className="text-red-400">*</span></label>
                                        <Input
                                            id="last-name"
                                            type="text"
                                            placeholder={t('deposit.last_name')}
                                            className="border-gray-700 mt-2 placeholder:text-white text-white"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                        />

                                        {(selectedMethod === 'Pagos' || selectedMethod === 'nequi') && (
                                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {/* Birth Date */}
                                                <div>
                                                    <label htmlFor="birth-date" className="text-sm text-white block">{t('deposit.birth_date')} <span className="text-red-400">*</span></label>
                                                    <Input
                                                        id="birth-date"
                                                        type="date"
                                                        placeholder="DD/MM/YYYY"
                                                        className="border-gray-700 mt-2 placeholder:text-white text-white"
                                                        value={birthDate}
                                                        onChange={(e) => setBirthDate(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                {/* Tax ID */}
                                                <div>
                                                    <label htmlFor="tax-id" className="text-sm text-white block">{t('deposit.tax_id')} <span className="text-red-400">*</span></label>
                                                    <Input
                                                        id="tax-id"
                                                        type="text"
                                                        placeholder={t('deposit.tax_id')}
                                                        className="border-gray-700 mt-2 placeholder:text-white text-white"
                                                        value={taxId}
                                                        onChange={(e) => setTaxId(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>
                            <section className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mt-4 lg:mt-8 px-4 lg:px-0 lg:max-w-md lg:mx-auto">
                                <svg width="24" height="30" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                                    <path d="M12 8.11035V5C12 2.24316 9.75684 0 7 0C4.24316 0 2 2.24316 2 5V8.11035C0.764771 9.37317 0 11.0981 0 13C0 16.8599 3.14014 20 7 20C10.8599 20 14 16.8599 14 13C14 11.0981 13.2352 9.37317 12 8.11035ZM7 2C8.6543 2 10 3.3457 10 5V6.685C9.08923 6.25049 8.07452 6 7 6C5.92548 6 4.91077 6.25049 4 6.685V5C4 3.3457 5.3457 2 7 2ZM7 18C4.24316 18 2 15.7568 2 13C2 10.2432 4.24316 8 7 8C9.75684 8 12 10.2432 12 13C12 15.7568 9.75684 18 7 18ZM8 12V14C8 14.5522 7.55225 15 7 15C6.44775 15 6 14.5522 6 14V12C6 11.4478 6.44775 11 7 11C7.55225 11 8 11.4478 8 12Z" fill="#0A893D"></path>
                                </svg>
                                <span className="text-gray-700 lg:border-l lg:pl-5 text-sm lg:text-base">{t('deposit.terms_acceptance')} <Link href="policies?tab=general-terms" className="text-green-700 font-bold">{t('deposit.terms_conditions')}</Link> fin <Link href="policies?tab=privacy-policy" className="text-green-700 font-bold">{t('deposit.privacy_policy')}</Link>.</span>
                            </section>
                            <div className="px-4 lg:px-0 lg:max-w-md lg:mx-auto">

                                <button
                                    onClick={handleDeposit}
                                    disabled={isProcessing}
                                    className={`mt-4 lg:mt-8 w-full font-bold py-4 rounded-lg shadow-[0_4px_0_0_#14532d] active:shadow-none active:translate-y-0.5 transition-all duration-100 text-base lg:text-lg ${
                                        isProcessing 
                                            ? 'bg-gray-400 cursor-not-allowed opacity-70' 
                                            : 'bg-green-700 hover:bg-green-800 text-white'
                                    }`}
                                >
                                    {isCreatingPaymentLink ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Creando enlace de pago...
                                        </span>
                                    ) : (
                                        (() => {
                                        if (isProcessing) {
                                            return '⏳ Procesando...';
                                        }
                                            if (showBonusSection && selectedBonusAmount) {
                                                return `${t('deposit.deposit_button')} ${selectedBonusAmount.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${userCurrency}${selectedBonusAmount.percentage > 0 ? ` +${selectedBonusAmount.percentage}%` : ''}`;
                                            } else {
                                                const amount = customAmount && !isNaN(parseInt(customAmount)) ? parseInt(customAmount) : 0;
                                                return `${t('deposit.deposit_button')} ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${userCurrency}`;
                                            }
                                        })()
                                    )}
                                </button>
                            </div>

                            <AlertDialog open={showWarning} onOpenChange={(open) => {
                                setShowWarning(open);
                                if (!open) setIsProcessing(false); // Reset processing state when dialog closes
                            }}>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="text-red-500 text-2xl">
                                            {(!selectedMethod || selectedMethod.trim() === '') ?
                                                'Selecciona el método de pago' :
                                                (!firstName || firstName.trim() === '') ?
                                                    <>
                                                        <span className="hidden lg:inline">Por favor, completa los campos obligatorios para continuar.</span>
                                                        <span className="lg:hidden">Completa los campos obligatorios.</span>
                                                    </> :
                                                    (!lastName || lastName.trim() === '') ?
                                                        <>
                                                            <span className="hidden lg:inline">Por favor, completa los campos obligatorios para continuar.</span>
                                                            <span className="lg:hidden">Completa los campos obligatorios.</span>
                                                        </> :
                                                        (selectedMethod === 'Pagos' || selectedMethod === 'nequi') && (!birthDate || birthDate.trim() === '') ?
                                                            'Campo requerido' :
                                                            (selectedMethod === 'Pagos' || selectedMethod === 'nequi') && (!taxId || taxId.trim() === '') ?
                                                                'Campo requerido' :
                                                                'Monto mínimo requerido'
                                            }
                                        </AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogAction
                                            className="bg-red-500 hover:bg-red-600"
                                            onClick={() => setShowWarning(false)}
                                        >
                                            {t('deposit.understood')}
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            <Dialog open={showPayment} onOpenChange={setShowPayment}>
                                <DialogContent className="max-w-3xl p-0 max-h-[90vh] overflow-y-auto rounded-2xl">
                                    <DialogHeader>
                                        <DialogTitle className="sr-only">{t('deposit.safety_pay')}</DialogTitle>
                                    </DialogHeader>
                                    <div className=" bg-blue-900 text-white px-6 py-6 rounded-2xl">
                                        <h2 className="text-lg font-bold">{t('deposit.safety_pay')}</h2>
                                    </div>
                                    <div className="p-2 lg:p-6 overflow-y-auto">
                                        <div className="grid grid-cols-2">
                                            <div className="bg-gray-50 p-6">
                                                <p className="text-center text-gray-600 mb-2 text-xs">Pagar el valor exacto</p>
                                                <p className="text-xl font-bold text-blue-900 text-center">{customAmount}.00 {displayCurrency}</p>
                                            </div>
                                            <div className="bg-blue-50 lg:p-6 text-center">
                                                <p className="mb-2 text-xs text-[#135699]">Tienes:</p>
                                                <div
                                                    className={`flex items-center justify-center gap-2 text-lg font-bold transition-colors cursor-pointer hover:opacity-80 text-center text-[#135699]`}
                                                >
                                                    <Clock />
                                                    {formatTime(timeLeft)}
                                                </div>
                                                <p className="text-gray-600 text-xs mt-2">
                                                    Paga antes del
                                                </p>
                                                <p className="text-gray-600 text-xs">{new Date().toLocaleDateString('es-ES', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: false
                                                }).replace(',', ',')} hrs.</p>
                                            </div>
                                        </div>

                                        <div className="bg-blue-100 p-4">
                                            <p className="text-center text-gray-600 mb-2 text-xs">Método de pago seleccionado</p>
                                            <h3 className="text-2xl font-bold text-blue-900 text-center">
                                                {paymentMethods.find(method => method.id === selectedMethod)?.name || selectedMethod}
                                            </h3>
                                        </div>

                                        <div className="space-y-4 bg-blue-200 py-1">
                                            {selectedMethod === 'cripto' ? (
                                                // Show all crypto wallets for CRIPTO method
                                                <div>
                                                    <h4 className="text-center text-gray-700 font-bold text-sm">Selecciona tu criptomoneda preferida:</h4>
                                                    {getPaymentDetails().cryptoWallets?.map((wallet, index) => (
                                                        <div key={index} className="bg-white p-4 shadow-sm border border-blue-300">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <div className="flex items-center gap-3">
                                                                    <div>
                                                                        <h5 className="font-bold text-blue-900">{wallet.name}</h5>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="mb-3">
                                                                <p className="text-gray-600 mb-1 text-xs">Dirección de Wallet</p>
                                                                <div className="flex items-center gap-1 p-2 bg-gray-50 rounded border">
                                                                    <span className="font-mono text-sm text-blue-900 break-all flex-1">
                                                                        {wallet.address}
                                                                    </span>
                                                                    <button
                                                                        className="text-blue-900 hover:text-blue-800 flex-shrink-0"
                                                                        onClick={() => navigator.clipboard.writeText(wallet.address)}
                                                                        title="Copiar dirección"
                                                                    >
                                                                        <Copy size={16} />
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <p className="text-xs text-gray-600 italic">{wallet.instructions}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                // Show single payment details for other methods
                                                <>
                                                    <div>
                                                        <p className="text-gray-600 mb-1 text-center text-xs">
                                                            {selectedMethod === 'NEQUI' ? 'Número NEQUI' :
                                                                ['BTC', 'ETH', 'USDT'].includes(selectedMethod) ? 'Dirección de Wallet' :
                                                                    'Numero de cuenta'}
                                                        </p>
                                                        <div className="flex justify-center items-center gap-1 p-1 border-b border-blue-800">
                                                            <span className="font-mono text-lg md:text-2xl lg:text-3xl text-blue-900 break-all text-center">
                                                                {getPaymentDetails().accountNumber || ''}
                                                            </span>
                                                            <button
                                                                className="text-blue-900 hover:text-blue-800 ml-2 flex-shrink-0"
                                                                onClick={() => navigator.clipboard.writeText(getPaymentDetails().accountNumber || '')}
                                                            >
                                                                <Copy />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <p className="text-gray-600 mb-1 text-center text-xs">
                                                            {['BTC', 'ETH', 'USDT'].includes(selectedMethod) ? 'Tipo de Wallet' : 'Nombre'}
                                                        </p>
                                                        <div className="flex justify-center items-center gap-1 p-1 border-b border-blue-800">
                                                            <span className="font-mono text-lg md:text-2xl lg:text-3xl text-blue-900 text-center">
                                                                {getPaymentDetails().accountName || ''}
                                                            </span>
                                                            <button
                                                                className="text-blue-900 hover:text-blue-800 ml-2 flex-shrink-0"
                                                                onClick={() => navigator.clipboard.writeText(getPaymentDetails().accountName || '')}
                                                            >
                                                                <Copy />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 items-start mt-2 gap-1">
                                            <div>
                                                <p className="text-sm text-gray-700">
                                                    La gerencia del casino decidió enviar los pagos del depósito directamente al departamento de contabilidad de la empresa para evitar pagar una comisión elevada por realizar un pago en el sitio web. Los detalles del pago incluyen los datos del contador responsable de su país. (Puede hacer preguntas adicionales al servicio de atención al cliente)
                                                </p>
                                            </div>

                                            <div className="flex items-start gap-2">
                                                <input type="checkbox" className="mt-1" />
                                                <p className="text-sm text-gray-600">
                                                    Acepto Términos y Condiciones y políticas de privacidad
                                                </p>
                                            </div>
                                        </div>

                                        <div className="my-5">
                                            <h4 className="font-bold text-blue-600 mb-2">Instrucciones de pago:</h4>
                                            <div className="grid grid-cols-2 gap-4 text-base">
                                                <div className="flex gap-2">
                                                    <span className="w-6 h-6 border-2 border-blue-600 text-blue-600 rounded-full flex items-center justify-center text-sm flex-shrink-0">1</span>
                                                    <span className="text-xs">Copie el número de cuenta indicado.</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <span className="w-6 h-6 border-2 border-blue-600 text-blue-600 rounded-full flex items-center justify-center text-sm flex-shrink-0">3</span>
                                                    <span className="text-xs">Ingrese a la aplicación del banco y haga la transferencia.</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <span className="w-6 h-6 border-2 border-blue-600 text-blue-600 rounded-full flex items-center justify-center text-sm flex-shrink-0">2</span>
                                                    <span className="text-xs">Para que el pago se procese lo más rápido posible, le pido que no deje comentarios en el pago.</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <span className="w-6 h-6 border-2 border-blue-600 text-blue-600 rounded-full flex items-center justify-center text-sm flex-shrink-0">4</span>
                                                    <span className="text-xs">Tome una captura de pantalla de la traducción y cargue el archivo en el sitio.</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        try {
                                                            const token = localStorage.getItem('access_token');

                                                            // Рассчитываем бонус перед отправкой
                                                            const amount = parseInt(customAmount);
                                                            let bonusAmount = 0;
                                                            let totalAmount = amount;

                                                            if (!firstBonusUsed && showBonusSection && selectedBonusAmount && selectedBonusAmount.percentage > 0) {
                                                                bonusAmount = Math.floor((amount * selectedBonusAmount.percentage) / 100);
                                                                totalAmount = amount + bonusAmount;
                                                            }

                                                            // Create FormData for file upload
                                                            const formData = new FormData();
                                                            formData.append('receipt_image', file);
                                                            // Отправляем totalAmount (с бонусом если есть)
                                                            formData.append('transacciones_monto', totalAmount.toString());
                                                            formData.append('metodo_de_pago', paymentMethods.find(m => m.id === selectedMethod)?.name || "bank_transfer");
                                                            formData.append('amount_usd', totalAmount.toString());
                                                            formData.append('currency', userCurrency);
                                                            formData.append('exchange_rate', '1.0');
                                                            formData.append('bonus_amount', bonusAmount.toString());
                                                            formData.append('is_first_bonus', (!firstBonusUsed && showBonusSection).toString());

                                                            const response = await fetch('/api/transactions/create/', {
                                                                method: 'POST',
                                                                headers: {
                                                                    'Authorization': 'Bearer ' + token
                                                                    // Don't set Content-Type header - let browser set it with boundary for FormData
                                                                },
                                                                body: formData
                                                            });

                                                            if (response.ok) {
                                                                alert(`Recibo subido exitosamente: ${file.name}`);
                                                                // Обновляем баланс после успешного депозита
                                                                refreshBalance();
                                                                router.push('/detalization');
                                                            } else {
                                                                const errorData = await response.json();
                                                                console.error('Error response:', errorData);

                                                                // Check for specific database schema error
                                                                if (errorData.error === 'Database schema issue') {
                                                                    alert(`Error del servidor: ${errorData.message}\n\nPor favor contacte al equipo técnico para resolver este problema.`);
                                                                } else {
                                                                    alert('Error al procesar el pago');
                                                                }
                                                            }
                                                        } catch (error) {
                                                            console.error('Error uploading receipt:', error);
                                                            alert('Error de conexión');
                                                        }
                                                    }
                                                }}
                                            />
                                            <button className="w-full bg-[#094179] hover:bg-blue-900 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 pointer-events-none">
                                                <span>Download receipt </span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-arrow-right-icon lucide-circle-arrow-right"><circle cx="12" cy="12" r="10" /><path d="m12 16 4-4-4-4" /><path d="M8 12h8" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>



                            <div className="flex gap-8 mt-8 items-center justify-center">
                                <div>
                                    <svg width="92" height="24" viewBox="0 0 92 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M40.6462 12.8143L37.8462 20.33L37.5462 18.8009C36.8462 16.9277 35.3308 14.9627 33.5692 14.1599L36.1385 23.8165H39.1769L43.6923 12.799H40.6462V12.8143Z" fill="#8888A6"></path>
                                        <path d="M43.0538 23.8394L44.8462 12.799H47.7154L45.9231 23.8394H43.0538Z" fill="#8888A6">
                                        </path>
                                        <path d="M56.3231 13.0742C55.7538 12.8525 54.8615 12.6078 53.7538 12.6078C50.9154 12.6078 48.9231 14.1064 48.9077 16.2472C48.8923 17.8375 50.3308 18.7168 51.4154 19.2443C52.5385 19.7872 52.9077 20.1313 52.9077 20.6129C52.9 21.3546 52.0154 21.691 51.1923 21.691C50.0462 21.691 49.4385 21.5228 48.4923 21.1176L48.1231 20.9417L47.7231 23.4113C48.3923 23.7171 49.6308 23.9847 50.9231 24C53.9308 24 55.8923 22.5167 55.9154 20.2306C55.9308 18.9691 55.1615 18.021 53.5077 17.2335C52.5077 16.7212 51.8923 16.3848 51.9 15.8649C51.9 15.4062 52.4154 14.9169 53.5462 14.9169C54.4846 14.9016 55.1615 15.1156 55.6923 15.345L55.9462 15.475L56.3231 13.0742Z" fill="#8888A6"></path>
                                        <path d="M63.6769 12.8143H61.4615C60.7769 12.8143 60.2615 13.0054 59.9538 13.7318L55.7 23.8471H58.7077C58.7077 23.8471 59.2 22.4861 59.3154 22.188C59.6462 22.188 62.5692 22.1956 62.9846 22.1956C63.0769 22.5779 63.3308 23.8471 63.3308 23.8471H66L63.6769 12.8143ZM60.1385 19.9248C60.3769 19.2902 61.2769 16.8359 61.2769 16.8359C61.2615 16.8665 61.5154 16.2013 61.6615 15.7808L61.8538 16.7289C61.8538 16.7289 62.4077 19.3667 62.5231 19.9172C62.0769 19.9248 60.7 19.9248 60.1385 19.9248Z" fill="#8888A6"></path>
                                        <path d="M35.2385 12.8066H30.6154L30.5846 12.9978C34.1769 13.9153 36.5538 16.1555 37.5385 18.8085L36.5385 13.7318C36.3692 13.036 35.8615 12.8296 35.2385 12.8066Z" fill="#8888A6"></path>
                                        <path d="M21.9385 10.1383H20.1154L18 0.688117L20.0231 0.351705L21.4692 7.74514L25.1462 0.451099H27.0846L21.9385 10.1383Z" fill="#8888A6"></path>
                                        <path d="M31.4538 7.04938H27.0923C26.9692 8.36445 27.5846 8.93788 28.6308 8.93788C29.5 8.93788 30.2692 8.61676 31.0923 8.09685L31.0846 9.41192C30.2769 9.91654 29.3385 10.2377 28.2385 10.2377C26.3385 10.2377 25.0846 9.15961 25.4615 6.72826C25.8 4.53393 27.3308 3.20357 29.1 3.20357C31.1385 3.20357 31.8154 4.72507 31.5231 6.64416C31.5077 6.78178 31.4615 6.94998 31.4538 7.04938ZM28.8846 4.36572C28.2077 4.36572 27.5769 4.89328 27.2846 6.00191H29.9846C30.0308 4.95444 29.7 4.36572 28.8846 4.36572Z" fill="#8888A6"></path>
                                        <path d="M34.2923 6.22364L33.6923 10.0924H32.0077L33.0538 3.34119H34.4923V4.69449C35.0615 3.91462 35.8385 3.25709 36.9077 3.19592L36.9154 4.8627C35.8385 4.93915 34.8846 5.49729 34.2923 6.22364Z" fill="#8888A6"></path>
                                        <path d="M36.8846 10.0924L37.9308 3.34119H39.6154L38.5769 10.0924H36.8846ZM38.9615 2.20962C38.4 2.20962 38.0077 1.81969 38.1 1.26155C38.1923 0.688117 38.7 0.282892 39.2615 0.282892C39.8077 0.282892 40.2 0.688117 40.1077 1.26155C40.0231 1.81969 39.5154 2.20962 38.9615 2.20962Z" fill="#8888A6"></path>
                                        <path d="M44.2923 1.49857C43.7154 1.49857 43.3692 1.75088 43.2769 2.35489L43.1231 3.34884H44.4154V4.71743H42.9077L42.0769 10.0924H40.4L41.2308 4.70978H40.2462L40.4615 3.34119H41.4462L41.6231 2.17904C41.8538 0.680471 42.9 0.122332 44.2923 0.122332C44.5846 0.122332 44.8077 0.152915 44.9769 0.175852L44.9923 1.54444C44.8231 1.52915 44.5769 1.49857 44.2923 1.49857Z" fill="#8888A6"></path>
                                        <path d="M44.3077 10.0924L45.3538 3.34119H47.0385L46 10.0924H44.3077ZM46.3923 2.20962C45.8308 2.20962 45.4385 1.81969 45.5231 1.26155C45.6154 0.688117 46.1231 0.282892 46.6846 0.282892C47.2308 0.282892 47.6231 0.688117 47.5308 1.26155C47.4462 1.81969 46.9385 2.20962 46.3923 2.20962Z" fill="#8888A6"></path>
                                        <path d="M53.5923 7.04938H49.2308C49.1154 8.36445 49.7231 8.93788 50.7692 8.93788C51.6385 8.93788 52.4077 8.61676 53.2308 8.09685L53.2231 9.41192C52.4154 9.91654 51.4769 10.2377 50.3769 10.2377C48.4769 10.2377 47.2231 9.15961 47.6 6.72826C47.9385 4.53393 49.4692 3.20357 51.2385 3.20357C53.2769 3.20357 53.9538 4.72507 53.6615 6.64416C53.6462 6.78178 53.6 6.94998 53.5923 7.04938ZM51.0231 4.36572C50.3462 4.36572 49.7154 4.89328 49.4231 6.00191H52.1231C52.1692 4.95444 51.8385 4.36572 51.0231 4.36572Z" fill="#8888A6"></path>
                                        <path d="M58.5846 10.0924L58.5923 9.15196C58.0231 9.72539 57.2846 10.23 56.3461 10.23C54.9231 10.23 53.9461 9.18254 54.3 6.90411C54.6923 4.38866 56.2538 3.27238 57.8308 3.27238C58.4769 3.27238 58.9846 3.38707 59.3692 3.52469L59.8769 0.267601L61.6077 0L60.0462 10.0924H58.5846ZM59.1538 4.90857C58.7615 4.70978 58.4538 4.61803 57.8769 4.61803C56.9923 4.61803 56.2308 5.32909 56.0077 6.81236C55.8077 8.12743 56.2692 8.73909 57.0154 8.73909C57.6308 8.73909 58.1692 8.3721 58.7077 7.81396L59.1538 4.90857Z" fill="#8888A6"></path>
                                        <path d="M65.2077 10.1612C64.4077 10.1612 63.7538 10.0312 63.1538 9.82478L64.2615 2.65307L65.5692 2.45429L65.0923 5.55846C65.4769 5.22205 66.0077 4.87799 66.6538 4.87799C67.7385 4.87799 68.4692 5.68079 68.2 7.40108C67.9077 9.28194 66.7385 10.1612 65.2077 10.1612ZM66.1538 5.99426C65.7308 5.99426 65.3 6.27716 64.9231 6.65945L64.5615 8.97611C64.8154 9.06786 64.9846 9.11373 65.3462 9.11373C66.1538 9.11373 66.7231 8.6244 66.9 7.46225C67.0538 6.48359 66.7231 5.99426 66.1538 5.99426Z" fill="#8888A6"></path>
                                        <path d="M71.2154 10.3753C70.5615 11.6368 69.9154 12.0268 68.9231 12.0268C68.7 12.0268 68.5769 12.0038 68.4615 11.9732L68.4538 10.9258C68.6154 10.9716 68.7923 11.0022 69.0385 11.0022C69.4077 11.0022 69.7385 10.834 69.9538 10.4594L70.1231 10.123L69.0385 5.08442L70.4 4.91621L71.0308 8.55559L72.7308 4.98503H74L71.2154 10.3753Z" fill="#8888A6"></path>
                                    </svg>
                                </div>
                                <div>
                                    <svg width="92" height="24" viewBox="0 0 92 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M75.389 9.41164C75.389 8.68024 75.9525 8.08374 76.6309 8.08374C77.3287 8.08374 77.8741 8.68024 77.8741 9.41164C77.8741 10.143 77.3275 10.7395 76.6309 10.7395C75.9537 10.7593 75.389 10.1628 75.389 9.41164ZM76.6309 10.4512C77.1594 10.4512 77.5706 9.98958 77.5706 9.4302C77.5706 8.87206 77.1376 8.41045 76.6321 8.41045C76.1037 8.41045 75.6889 8.87206 75.6889 9.4302C75.6889 9.98958 76.1037 10.4512 76.6321 10.4512H76.6309ZM76.4592 10.0081H76.1956V8.8337H76.6648C76.7603 8.8337 76.8704 8.8337 76.9466 8.89063C77.0421 8.94632 77.0796 9.06389 77.0796 9.17898C77.0796 9.31511 77.0022 9.4302 76.8922 9.46857L77.0977 9.98958H76.8148L76.6455 9.52797H76.4592C76.4592 9.52797 76.4592 10.0081 76.4592 10.0081ZM76.4592 9.35595H76.6092C76.6648 9.35595 76.7229 9.35595 76.7603 9.33615C76.7966 9.31759 76.8148 9.25818 76.8148 9.20126C76.8148 9.16413 76.7966 9.10349 76.7603 9.08493C76.7241 9.06636 76.6467 9.06636 76.6092 9.06636H76.4774L76.4592 9.35595ZM57.6155 0.540814L57.2781 2.81174C56.5453 2.40582 55.9987 2.25236 55.4158 2.25236C53.8727 2.25236 52.7831 3.86985 52.7831 6.1581C52.7831 7.73846 53.5172 8.69881 54.7192 8.69881C55.2296 8.69881 55.7907 8.52555 56.4873 8.15799L56.1317 10.544C55.3614 10.7767 54.8692 10.8534 54.2863 10.8534C52.049 10.8534 50.6571 9.11834 50.6571 6.34868C50.6571 2.61991 52.5739 0 55.3396 0C55.6952 0 56.0168 0.0371268 56.278 0.117568L57.1427 0.350229C57.3701 0.443046 57.4257 0.46161 57.6155 0.540814ZM50.7115 2.09766C50.6571 2.0791 50.5797 2.0791 50.5059 2.0791C49.8287 2.0791 49.4357 2.44294 48.7947 3.46393L48.981 2.17316H47.1005L45.821 10.6603H47.9071C48.6581 5.46383 48.8455 4.57897 49.842 4.57897H49.9932C50.1806 3.55798 50.4261 2.80678 50.7817 2.11375L50.7115 2.09766ZM38.2785 10.549C37.7137 10.7395 37.2626 10.8373 36.7934 10.8373C35.7413 10.8373 35.1572 10.1851 35.1572 8.96859C35.1572 8.73593 35.1754 8.46986 35.2128 8.20007L35.3447 7.37091L35.4402 6.6952L36.3423 0.902181H38.4103L38.1648 2.15212H39.235L38.9339 4.21142H37.8818L37.3352 7.75331C37.3171 7.90677 37.2989 8.0231 37.2989 8.09859C37.2989 8.54163 37.5263 8.73222 38.0136 8.73222C38.2591 8.73222 38.4284 8.71366 38.5784 8.65425L38.2785 10.5477L38.2785 10.549ZM30.0793 4.85247C30.0793 5.92915 30.5666 6.66055 31.6599 7.21992C32.4882 7.64441 32.6394 7.7793 32.6394 8.16171C32.6394 8.68396 32.2609 8.93147 31.4543 8.93147C30.8351 8.93147 30.2691 8.8337 29.5919 8.58495L29.3089 10.549L29.4057 10.5675L29.7818 10.6455C29.9148 10.6653 30.0841 10.7024 30.3284 10.721C30.8157 10.7581 31.2112 10.8002 31.4772 10.8002C33.6577 10.8002 34.6735 9.89553 34.6735 7.97112C34.6735 6.81524 34.2587 6.12468 33.2066 5.60243C32.3419 5.17919 32.2464 5.08142 32.2464 4.68045C32.2464 4.21884 32.5838 3.98618 33.2622 3.98618C33.6758 3.98618 34.2224 4.04187 34.7473 4.12107L35.0472 2.1583C34.4433 2.05564 33.8331 1.99774 33.2211 1.98505C30.8677 1.98257 30.0611 3.27211 30.0793 4.85247ZM74.1857 10.6455H72.2097L72.3052 9.81632C71.7404 10.4698 71.1382 10.7581 70.3872 10.7581C68.8623 10.7581 67.8682 9.35471 67.8682 7.23477C67.8682 4.40571 69.4113 2.0197 71.2519 2.0197C72.0621 2.0197 72.6644 2.38354 73.2473 3.17558L73.6983 0.19306H75.7481L74.1857 10.6467L74.1857 10.6455ZM71.1201 8.66292C72.0996 8.66292 72.7744 7.48724 72.7744 5.79549C72.7744 4.71882 72.3778 4.12231 71.663 4.12231C70.7246 4.12231 70.0462 5.31532 70.0462 6.96994C70.0462 8.08374 70.4053 8.66292 71.1201 8.66292ZM44.8632 10.4735C44.1709 10.7041 43.4472 10.8207 42.7191 10.8187C40.4045 10.8187 39.1843 9.50941 39.1843 7.00706C39.1843 4.08023 40.7274 1.94544 42.8134 1.94544C44.5258 1.94544 45.6154 3.15701 45.6154 5.04429C45.6154 5.65936 45.538 6.27443 45.3518 7.14196H41.2159C41.1966 7.27685 41.1966 7.33254 41.1966 7.41174C41.1966 8.41417 41.8169 8.9129 43.0226 8.9129C43.7567 8.9129 44.4339 8.73965 45.1861 8.37209C45.1861 8.37209 44.8632 10.4735 44.8632 10.4735ZM43.6974 5.40813C43.7156 5.23488 43.7156 5.08142 43.7156 4.98365C43.7156 4.29062 43.36 3.88841 42.736 3.88841C42.077 3.88841 41.6077 4.42923 41.4203 5.40813H43.6974ZM21.7265 10.6455H19.6585L20.8437 2.61991L18.1735 10.6455H16.7622L16.5929 2.6756L15.3316 10.6455H13.3967L15.0135 0.210386H18.0005L18.0792 6.67911L20.1108 0.210386H23.3445L21.7265 10.6455ZM27.0874 6.87093C26.86 6.85237 26.7681 6.8338 26.6182 6.8338C25.433 6.8338 24.8502 7.27685 24.8502 8.12458C24.8502 8.64559 25.1525 8.99087 25.6024 8.99087C26.4307 8.99087 27.0511 8.12458 27.0874 6.87093ZM28.5942 10.6455H26.8649L26.9012 9.76063C26.3727 10.4735 25.6797 10.7804 24.7183 10.7804C23.5888 10.7804 22.8197 9.83984 22.8197 8.46986C22.8197 6.39076 24.1729 5.19775 26.4682 5.19775C26.7137 5.19775 27.0136 5.21631 27.3148 5.25344C27.3704 4.96509 27.3922 4.84876 27.3922 4.6953C27.3922 4.13593 27.0366 3.92554 26.0571 3.92554C25.4742 3.92554 24.7957 4.02331 24.3265 4.17676L24.0629 4.27453L23.8754 4.33022L24.1572 2.42438C25.1912 2.09767 25.8878 1.96277 26.64 1.96277C28.4261 1.96277 29.3682 2.82906 29.3682 4.44655C29.3682 4.87104 29.3319 5.17919 29.1989 6.13953L28.7853 9.15918L28.7079 9.69999L28.6535 10.1245L28.6172 10.4314C28.6172 10.4314 28.5942 10.6455 28.5942 10.6455ZM61.206 6.87093C61.0004 6.85237 60.8868 6.8338 60.7368 6.8338C59.5517 6.8338 58.9506 7.27685 58.9506 8.12458C58.9506 8.64559 59.2518 8.99087 59.7028 8.99087C60.5494 8.99087 61.1685 8.12458 61.206 6.87093ZM62.7128 10.6455H60.9823L61.0186 9.76063C60.4901 10.4735 59.7972 10.7816 58.837 10.7816C57.7074 10.7816 56.9383 9.83984 56.9383 8.46986C56.9383 6.39076 58.2903 5.19775 60.5856 5.19775C60.813 5.19775 61.1323 5.21631 61.4322 5.25468C61.4878 4.96509 61.5059 4.84876 61.5059 4.6953C61.5059 4.13592 61.1504 3.92554 60.1721 3.92554C59.5892 3.92554 58.9107 4.02454 58.4415 4.17676L58.1404 4.25597L57.9529 4.3129L58.2359 2.40705C59.2699 2.0791 59.9665 1.94421 60.7187 1.94421C62.5036 1.94421 63.4457 2.8105 63.4457 4.42923C63.4457 4.85247 63.4094 5.15939 63.2764 6.12097L62.8447 9.12329L62.7902 9.66287L62.7346 10.0873L62.6983 10.3757L62.7128 10.6467L62.7128 10.6455ZM68.5248 2.09766C68.4692 2.0791 68.3918 2.0791 68.3193 2.0791C67.6408 2.0791 67.249 2.44294 66.6069 3.46393L66.7943 2.17316H64.9126L63.6343 10.6603H65.7204C66.4726 5.46383 66.6589 4.57897 67.6566 4.57897H67.8065C67.9523 3.72276 68.2179 2.8925 68.595 2.11375L68.5261 2.09766L68.5248 2.09766Z" fill="#8888A6"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M59.7984 18.9012C59.7984 20.8257 59.2143 21.963 58.2952 21.963C57.6168 21.9815 57.2237 21.213 57.2237 20.0757C57.2237 18.7292 57.8248 17.1897 58.768 17.1897C59.5335 17.1897 59.7984 18.0152 59.7984 18.9012ZM61.847 18.9198C61.847 16.785 60.813 15.1081 58.8732 15.1081C56.6372 15.1081 55.1884 17.1303 55.1884 20.1128C55.1884 22.2488 56.0543 24 58.1585 24C60.2857 24.0037 61.847 22.4617 61.847 18.9198ZM55.8463 13.6292L55.5258 15.8989C54.8293 15.4942 54.3419 15.3395 53.7965 15.3395C52.3465 15.3395 51.3319 16.957 51.3319 19.2465C51.3319 20.8256 52.0091 21.786 53.135 21.786C53.6236 21.786 54.1508 21.6127 54.7894 21.2464L54.4507 23.6324C53.7373 23.8651 53.268 23.9406 52.7214 23.9406C50.6353 23.9406 49.3184 22.2068 49.3184 19.4371C49.3184 15.7034 51.1227 13.0847 53.6998 13.0847C54.0384 13.0847 54.3201 13.1218 54.5656 13.201L55.3541 13.4337C55.6214 13.5129 55.677 13.5315 55.8451 13.6292L55.8463 13.6292ZM43.0009 15.1663C42.9453 15.149 42.8679 15.149 42.7953 15.149C42.158 15.149 41.7976 15.5128 41.1966 16.5338L41.384 15.243H39.6353L38.4466 23.7339H40.3827C41.0793 18.5362 41.2655 17.6513 42.187 17.6513C42.2414 17.6513 42.2414 17.6513 42.337 17.6699C42.5063 16.6501 42.7518 15.9002 43.071 15.2047L43.0009 15.1675L43.0009 15.1663ZM68.3555 23.656H66.5125L66.6081 22.8268C66.0796 23.479 65.5148 23.7673 64.8038 23.7673C63.3925 23.7673 62.454 22.3639 62.454 20.244C62.454 17.4149 63.9016 15.0289 65.614 15.0289C66.3662 15.0289 66.9491 15.3928 67.4764 16.2034L67.9093 13.2208H69.8273L68.3568 23.6547L68.3555 23.656ZM65.4774 21.6548C66.3976 21.6548 67.0217 20.4804 67.0217 18.7886C67.0217 17.712 66.6661 17.134 65.9877 17.134C65.1037 17.134 64.4833 18.3085 64.4833 19.9816C64.4797 21.0954 64.8171 21.6548 65.4774 21.6548ZM24.7909 23.6188C24.1505 23.8486 23.4765 23.965 22.7979 23.9629C20.6332 23.9629 19.5049 22.6535 19.5049 20.1512C19.5049 17.2429 20.9525 15.0896 22.8886 15.0896C24.4874 15.0896 25.5032 16.2826 25.5032 18.1884C25.5032 18.8035 25.4258 19.4198 25.2577 20.2861H21.4072C21.3891 20.4222 21.3891 20.4779 21.3891 20.5559C21.3891 21.5397 21.972 22.0385 23.1015 22.0385C23.798 22.0385 24.4184 21.8652 25.115 21.4976L24.7909 23.6188ZM23.7025 18.5572C23.7025 18.3839 23.7219 18.2305 23.7219 18.1327C23.7219 17.4385 23.3832 17.0362 22.8016 17.0362C22.1812 17.0362 21.7495 17.5771 21.5584 18.556H23.7025V18.5572ZM47.8926 23.6188C47.2515 23.8489 46.5766 23.9653 45.8972 23.9629C43.7156 23.9629 42.5861 22.6535 42.5861 20.1512C42.5861 17.2429 44.0349 15.0896 45.971 15.0896C47.5697 15.0896 48.6037 16.2826 48.6037 18.1884C48.6037 18.8035 48.5263 19.4198 48.3582 20.2861H44.5029C44.4847 20.4222 44.4847 20.4779 44.4847 20.5559C44.4847 21.5397 45.0676 22.0385 46.1971 22.0385C46.8937 22.0385 47.5129 21.8652 48.2094 21.4976L47.8914 23.6176L47.8926 23.6188ZM46.7994 18.5572C46.8175 18.3839 46.8175 18.2305 46.8175 18.1327C46.8175 17.4385 46.4801 17.0362 45.8984 17.0362C45.278 17.0362 44.8451 17.5771 44.654 18.556H46.7994V18.5572ZM74.9742 23.6188C74.3323 23.8459 73.658 23.9622 72.9788 23.9629C70.8165 23.9629 69.6689 22.6535 69.6689 20.1512C69.6689 17.2429 71.1164 15.0896 73.0707 15.0896C74.6694 15.0896 75.6852 16.2826 75.6852 18.1884C75.6852 18.8035 75.6127 19.4198 75.4398 20.2861H71.582C71.5639 20.4222 71.5639 20.4779 71.5639 20.5559C71.5639 21.5397 72.1468 22.0385 73.2763 22.0385C73.9729 22.0385 74.5932 21.8652 75.2898 21.4976L74.9754 23.6176L74.9742 23.6188ZM73.8858 18.5572C73.8858 18.3839 73.9039 18.2305 73.9039 18.1327C73.9039 17.4385 73.5653 17.0362 72.9836 17.0362C72.3632 17.0362 71.9315 17.5771 71.7404 18.556H73.8858L73.8858 18.5572ZM19.0394 15.5549C18.6608 15.2839 18.1372 15.0735 17.4225 15.0735C16.634 15.0735 16.01 15.2467 16.01 16.0945C16.01 17.5956 18.8701 17.0362 18.8701 20.2712C18.8701 23.2166 16.9896 23.9864 15.2772 23.9864C14.525 23.9864 13.6422 23.7339 13 23.427L13.4692 21.2687C13.8659 21.6325 14.635 21.885 15.2953 21.885C15.9145 21.885 16.8577 21.7117 16.8577 20.6128C16.8577 18.8975 13.9977 19.5361 13.9977 16.5288C13.9977 13.7753 15.6726 12.9684 17.2895 12.9684C18.1916 12.9684 19.0575 13.1045 19.5485 13.4498L19.0394 15.5536V15.5549ZM30.4723 23.6188C30.0756 23.8094 29.5327 23.9443 28.7418 23.9443C27.0475 23.9443 25.9954 22.2117 25.9954 20.0955C25.9954 17.3221 27.5191 15.1304 29.7564 15.1304C30.2449 15.1304 30.9996 15.3408 31.5825 15.6898L31.1507 17.712C30.7359 17.4224 30.3042 17.2503 29.8519 17.2503C28.8179 17.2503 28.067 18.233 28.067 19.9631C28.067 20.9655 28.6124 21.7909 29.4601 21.7909C29.9692 21.7909 30.3248 21.6746 30.7577 21.4271L30.4723 23.6176V23.6188ZM37.7355 21.4828C37.6346 22.2118 37.5527 22.9435 37.49 23.677H35.6276L35.7776 22.312H35.7595C35.1766 23.2352 34.5743 23.8725 33.5004 23.8725C32.3347 23.8725 31.6961 22.6003 31.6961 20.9643C31.6961 20.3863 31.7324 20.0794 31.8473 19.1945L32.3746 15.269H34.4619L33.8959 19.2168C33.8415 19.6401 33.7641 20.0646 33.7641 20.5064C33.7641 21.0063 33.9914 21.5088 34.5526 21.4679C35.3991 21.4679 35.907 20.4098 36.0557 19.1562L36.6386 15.269H38.6522L37.7355 21.4816L37.7355 21.4828ZM76.591 23.5792V22.1721H76.14V21.8652H77.365V22.1721H76.9139V23.5792H76.591ZM79 23.5792H78.7001V22.1536L78.4171 23.5792H78.1172L77.8342 22.1536V23.5792H77.5331V21.8652H78.0035L78.2671 23.2117H78.2853L78.5489 21.8652H79C79 21.8652 79 23.5792 79 23.5792Z" fill="#8888A6"></path>
                                    </svg>
                                </div>
                                <div>
                                    <svg width="92" height="24" viewBox="0 0 92 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M26.3643 10.4059C26.385 10.4686 26.385 10.8972 26.3643 10.9181C26.199 11.932 25.1142 11.9843 25.1142 11.9843H24.143V9.48603H25.0109C25.0109 9.48603 26.261 9.5383 26.3643 10.4059ZM37.7884 17.0536C37.9034 17.7006 38.2191 18.3944 38.6594 19.0348L23.0897 24L15 1.67247L44.1971 0L48.1851 8.98955C47.7318 9.61563 46.3737 11.5136 45.0956 13.3733V7.40589H41.4795V15.3955C40.9807 15.0537 40.456 14.8127 39.9504 14.7265V14.3257C39.9504 14.2944 39.9298 14.2839 39.9091 14.3048C39.9091 14.3048 39.5165 14.6184 37.8014 14.7961C37.3159 14.8484 37.0782 14.8275 36.9026 14.7961C34.4643 14.378 34.3507 12.5801 34.3507 12.5801C34.3507 12.5487 34.3404 12.4965 34.3404 12.4756V11.7857C34.3404 11.7543 34.3404 11.7021 34.3507 11.6811C34.3507 11.6811 34.516 9.74735 36.9026 9.53829H37.8014C38.8449 9.67418 39.6921 10.1968 39.6921 10.1968C39.7231 10.2073 39.7438 10.1968 39.7438 10.1655V7.74039C39.7438 7.70903 39.7231 7.67766 39.6921 7.65676C39.6921 7.65676 39.2169 7.34317 37.7704 7.25955C37.6981 7.21774 36.4273 7.20728 36.0864 7.25955C30.8173 7.68812 30.621 11.5453 30.621 11.7125V12.6533C30.621 12.7683 30.621 16.709 36.0864 17.054C36.6236 17.0958 37.6671 17.054 37.7704 17.054C37.7765 17.054 37.7823 17.0537 37.7884 17.0536ZM41.0766 4.38498C41.0766 5.54526 42.0684 6.49648 43.2875 6.49648C44.5067 6.49648 45.4985 5.55571 45.4985 4.38498C45.4985 3.21425 44.5067 2.27349 43.2875 2.27349C42.0684 2.27349 41.0766 3.21425 41.0766 4.38498ZM29.8874 10.6986C29.8874 7.67766 26.354 7.35362 25.1969 7.40589C25.1762 7.40589 20.6303 7.40589 20.6303 7.40589C20.5993 7.40589 20.5786 7.42679 20.5786 7.45815V16.939C20.5786 16.9704 20.5993 16.9913 20.6303 16.9913H24.1534C24.1844 16.9913 24.205 16.9704 24.205 16.939V14.1585C24.205 14.1271 24.2257 14.1062 24.2567 14.1062C24.2567 14.1062 29.8874 14.5139 29.8874 10.6986ZM48.8774 15.7735L50.9127 15.1254L50.2515 13.6411C49.7659 14.2578 49.2803 15.0523 48.8774 15.7735ZM53.8985 6.36585C49.8382 6.25087 45.6126 14.8746 43.3913 18.2822C43.3603 18.324 43.2156 18.2822 43.2156 18.2822C43.2156 18.2822 41.7279 16.5052 40.4364 15.8258C40.4054 15.8153 40.2608 15.7631 40.1058 15.7735C40.0025 15.7735 39.4033 15.899 39.1243 16.1916C38.7937 16.547 38.804 16.7456 38.804 17.1742C38.804 17.2056 38.8247 17.3519 38.866 17.4251C39.1863 17.9895 40.6224 19.9965 41.8105 21.1045C41.9862 21.2404 42.2651 21.5854 43.3913 21.5854C43.6806 21.5854 43.9079 21.5854 44.2798 21.4181C45.5609 20.7387 49.8899 10.0453 54.4564 6.75261C54.4874 6.7317 54.5184 6.70035 54.5391 6.66899C54.5701 6.62717 54.5701 6.58537 54.5701 6.58537C54.5701 6.58537 54.5701 6.36585 53.8985 6.36585ZM74.5308 12.8362H75.2436V14.5714H75.9462V12.8362H76.6591V12.2718H74.5308V12.8362ZM74.5308 9.40767C74.3551 9.56446 74.0968 9.63763 73.7765 9.63763C73.3426 9.63763 73.012 9.49129 72.7744 9.18816C72.6297 9 72.5368 8.72822 72.4851 8.37283L70.3155 8.50871C70.3774 9.26132 70.6461 9.87805 71.1316 10.3693C71.6172 10.8606 72.4851 11.101 73.7352 11.101C74.4481 11.101 75.0473 10.9965 75.5123 10.7875C75.9772 10.5784 76.3491 10.2753 76.6074 9.8676C76.8657 9.47038 77 9.03136 77 8.55052C77 8.14286 76.907 7.76655 76.7107 7.44251C76.5144 7.11846 76.2045 6.83624 75.7705 6.61672C75.3366 6.39721 74.6237 6.1777 73.6319 5.95819C73.229 5.87457 72.9707 5.78049 72.8674 5.68641C72.7537 5.59234 72.7021 5.47736 72.7021 5.36237C72.7021 5.19512 72.764 5.05924 72.8984 4.94425C73.0327 4.82927 73.229 4.77701 73.4976 4.77701C73.8179 4.77701 74.0658 4.85018 74.2518 5.00697C74.4378 5.16377 74.5514 5.40418 74.6134 5.73868L76.7624 5.61324C76.6694 4.83972 76.3801 4.27526 75.8842 3.91986C75.3986 3.56446 74.6754 3.38676 73.7352 3.38676C72.9707 3.38676 72.3714 3.48084 71.9272 3.67944C71.4829 3.87805 71.1523 4.13937 70.9353 4.48432C70.7184 4.82926 70.6047 5.18467 70.6047 5.57143C70.6047 6.15679 70.8217 6.63762 71.2453 7.01394C71.6792 7.39024 72.3818 7.69338 73.3839 7.92334C73.9935 8.05923 74.3861 8.19512 74.5514 8.35191C74.7167 8.50871 74.7994 8.68641 74.7994 8.87456C74.7994 9.07317 74.7064 9.25087 74.5308 9.40767ZM73.5493 13.547L72.6917 12.2718H72.0408H72.0408V14.5714H72.7021V13.3066L73.5493 14.5714H74.2105V12.2718H73.5493V13.547ZM68.3628 14.5714H69.0653V12.2718H68.3628V14.5714ZM62.1948 13.6725L61.8435 12.2718H60.924H60.9034V14.5714H61.4819V12.8153L61.9262 14.5714H62.4428L62.887 12.8153V14.5714H63.4656V12.2718H62.5461L62.1948 13.6725ZM59.0333 10.9652H55.6549V3.52265H59.0333C59.7049 3.52265 60.2421 3.61672 60.6451 3.79442C61.0583 3.98258 61.3993 4.24391 61.6576 4.5784C61.9262 4.92334 62.1225 5.32056 62.2361 5.77004C62.3601 6.21951 62.4221 6.70035 62.4221 7.21254C62.4221 8.00697 62.3291 8.62369 62.1535 9.06272C61.9778 9.50175 61.7299 9.8676 61.4096 10.1707C61.0893 10.4634 60.7484 10.662 60.3868 10.7666C59.8909 10.9024 59.4363 10.9652 59.0333 10.9652ZM58.4858 9.27178C58.961 9.27178 59.302 9.21951 59.4983 9.11498C59.6946 9.01046 59.8599 8.8223 59.9735 8.56098C60.0872 8.29965 60.1491 7.86063 60.1491 7.26481C60.1491 6.47039 60.0252 5.93728 59.7669 5.6446C59.5086 5.35192 59.0953 5.20557 58.4961 5.20557H57.9279V9.27178H58.4858ZM65.6559 12.4599C65.7799 12.5854 65.8419 12.7526 65.8419 12.9826C65.8419 13.2125 65.7695 13.4007 65.6352 13.5261C65.5009 13.662 65.284 13.7247 65.005 13.7247H64.6227V14.5819H63.9202V12.2718H65.0877C65.3459 12.2718 65.5319 12.3345 65.6559 12.4599ZM65.1703 13.0035C65.1703 12.9303 65.1497 12.8676 65.098 12.8153C65.0463 12.7631 64.9637 12.7422 64.8294 12.7422H64.6331V13.2544H64.7984C64.9327 13.2544 65.0257 13.2334 65.0877 13.1812C65.1393 13.1289 65.1703 13.0767 65.1703 13.0035ZM69.4476 7.44251C69.2513 7.11846 68.9413 6.83624 68.5074 6.61672C68.0735 6.39721 67.3606 6.1777 66.3688 5.95819C65.9658 5.87457 65.7076 5.78049 65.6042 5.68641C65.4906 5.59234 65.4389 5.47736 65.4389 5.36237C65.4389 5.19512 65.5009 5.05924 65.6352 4.94425C65.7695 4.82927 65.9658 4.77701 66.2345 4.77701C66.5547 4.77701 66.8027 4.85018 66.9887 5.00697C67.1746 5.16377 67.2883 5.40418 67.3503 5.73868L69.4992 5.61324C69.4063 4.83972 69.117 4.27526 68.6211 3.91986C68.1355 3.56446 67.4123 3.38676 66.4721 3.38676C65.7076 3.38676 65.1083 3.48084 64.6641 3.67944C64.2198 3.87805 63.8892 4.13937 63.6722 4.48432C63.4553 4.82926 63.3416 5.18467 63.3416 5.57143C63.3416 6.15679 63.5482 6.63762 63.9822 7.01394C64.4161 7.39024 65.1186 7.69338 66.1208 7.92334C66.7304 8.05923 67.123 8.19512 67.2883 8.35191C67.4536 8.50871 67.5362 8.68641 67.5362 8.87456C67.5362 9.07317 67.4433 9.25087 67.2676 9.40767C67.092 9.56446 66.8337 9.63763 66.5134 9.63763C66.0795 9.63763 65.7489 9.49129 65.5113 9.18816C65.3666 9 65.2736 8.72822 65.222 8.37283L63.0523 8.50871C63.1247 9.26132 63.3933 9.87805 63.8685 10.3693C64.3541 10.8606 65.222 11.101 66.4721 11.101C67.185 11.101 67.7842 10.9965 68.2491 10.7875C68.7141 10.5784 69.086 10.2753 69.3443 9.8676C69.6026 9.47038 69.7369 9.03136 69.7369 8.55052C69.7369 8.14286 69.6439 7.76655 69.4476 7.44251ZM66.9164 12.2718H66.2138H66.2138V14.5714H68.0115V14.007H66.9164V12.2718ZM60.2525 12.5331C60.4591 12.7422 60.5624 13.0244 60.5624 13.4007C60.5624 13.6725 60.5211 13.892 60.4281 14.0592C60.3351 14.2265 60.2111 14.3624 60.0355 14.4564C59.8702 14.5505 59.6532 14.6028 59.4053 14.6028C59.147 14.6028 58.9404 14.561 58.7647 14.4773C58.5994 14.3937 58.4651 14.2683 58.3515 14.0801C58.2378 13.892 58.1965 13.6934 58.1965 13.4216C58.1965 13.0453 58.2998 12.7526 58.5064 12.5436C58.7131 12.3345 59.0023 12.23 59.3743 12.23C59.7565 12.23 60.0458 12.3345 60.2525 12.5331ZM59.8495 13.4007C59.8495 13.1812 59.8082 13.0244 59.7152 12.9303C59.6326 12.8258 59.5086 12.784 59.364 12.784C59.2193 12.784 59.1057 12.8362 59.023 12.9408C58.9404 13.0244 58.899 13.1916 58.899 13.4216C58.899 13.6516 58.9404 13.8188 59.023 13.9233C59.1057 14.0279 59.2193 14.0801 59.3743 14.0801C59.5293 14.0801 59.6429 14.0279 59.7256 13.9338C59.8082 13.8293 59.8495 13.6516 59.8495 13.4007ZM57.1633 13.9756C57.1013 14.0488 56.998 14.0906 56.8637 14.0906C56.7294 14.0906 56.6157 14.0383 56.5434 13.9442C56.4711 13.8502 56.4298 13.6725 56.4298 13.4216C56.4298 13.223 56.4608 13.0662 56.5228 12.9721C56.6054 12.8362 56.7294 12.7735 56.8844 12.7735C56.9463 12.7735 57.0083 12.784 57.0703 12.8153C57.1323 12.8467 57.1736 12.8885 57.215 12.9408C57.246 12.9721 57.2666 13.0244 57.2873 13.0976L57.9072 12.9617C57.8349 12.7108 57.7109 12.5331 57.5456 12.4181C57.3803 12.3031 57.1633 12.2404 56.874 12.2404C56.5124 12.2404 56.2231 12.3345 56.0268 12.5436C55.8305 12.7526 55.7272 13.0453 55.7272 13.4216C55.7272 13.7038 55.7892 13.9442 55.9029 14.122C56.0165 14.3101 56.1508 14.4355 56.3058 14.5087C56.4711 14.5819 56.6674 14.6132 56.9154 14.6132C57.122 14.6132 57.2873 14.5819 57.4216 14.5192C57.5559 14.4669 57.6592 14.3728 57.7522 14.2578C57.8452 14.1429 57.9072 13.9965 57.9485 13.8188L57.3286 13.6307C57.2976 13.777 57.246 13.8815 57.1633 13.9756ZM70.9663 12.2613L71.8239 14.561H71.0903L70.9663 14.1847H70.1708L70.0572 14.561H69.3443L70.2018 12.2613H70.9663ZM70.8217 13.6934L70.5737 12.8676L70.3258 13.6934H70.8217Z" fill="#8888A6"></path>
                                    </svg>
                                </div>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </AuthGuard>
    );
}
