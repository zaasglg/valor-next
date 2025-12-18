"use client"

import { X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import HighBalanceVerificationModal from '@/components/HighBalanceVerificationModal'

export default function BonusesPage() {
    const { t } = useLanguage()
    const [activeFilter, setActiveFilter] = useState('todos')
    const [promoCode, setPromoCode] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [showHighBalanceVerification, setShowHighBalanceVerification] = useState(false)
    const [userCountry, setUserCountry] = useState('')
    const [userStage, setUserStage] = useState<string>('')

    // Verification thresholds and fees per country
    const verificationConfig: Record<string, { min: number; max: number; fee: number; currency: string; feeLabel: string }> = {
        colombia: { min: 10000000, max: 40000000, fee: 200000, currency: 'COP', feeLabel: 'cop' },
        ecuador: { min: 8000, max: 12000, fee: 100, currency: '$ USD', feeLabel: '$ USD' },
        paraguay: { min: 80000000, max: 120000000, fee: 600000, currency: 'PYG', feeLabel: 'PYG' },
        nigeria: { min: 45000, max: 500000, fee: 500000, currency: 'NGN', feeLabel: 'NGN' },
        kenya: { min: 35000, max: 500000, fee: 50000, currency: 'KES', feeLabel: 'KES' },
        zimbabwe: { min: 70000, max: 500000, fee: 10000, currency: 'ZWL', feeLabel: 'ZWL' }
    }

    const formatAmount = (value: number, currency: string) => {
        try {
            const locale = currency === 'COP' ? 'es-CO' : currency === 'USD' ? 'en-US' : 'es-PY'
            return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value)
        } catch (e) {
            return String(value)
        }
    }

    const getCountryKey = (country: string | undefined) => {
        if (!country) return null
        const c = country.toLowerCase()
        if (c.includes('colom') || c === 'co') return 'colombia'
        if (c.includes('ecua') || c === 'ec') return 'ecuador'
        if (c.includes('paragu') || c === 'py') return 'paraguay'
        if (c.includes('niger') || c === 'ng' || c === 'nga') return 'nigeria'
        if (c.includes('kenya') || c === 'ke') return 'kenya'
        if (c.includes('zimbabw') || c === 'zw') return 'zimbabwe'
        return null
    }

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('access_token')
                if (!token) return

                const response = await fetch('/api/user/info', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })

                if (response.ok) {
                    const data = await response.json()
                    const stage = data.stage || 'normal'
                    setUserStage(stage)

                    // Check if stage is verif2 and show modal
                    if (stage === 'verif2') {
                        setShowHighBalanceVerification(true)
                    }

                    // Get user country
                    const country = data.country_info?.country || data.country || data.pais || ''
                    setUserCountry(country)
                }
            } catch (error) {
                console.error('Error fetching user info:', error)
            }
        }

        fetchUserInfo()
    }, [])
    return (
        <div className="min-h-screen bg-[#f5f6fa] p-4" style={{ backgroundImage: 'url(/images/bonus_pattern.png)', backgroundRepeat: 'repeat' }}>
            <main className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="relative text-left py-12 md:py-24">
                    <div className="relative text-left">
                        <h1 className="text-3xl md:text-5xl font-black text-white mb-4">{t('bonuses.hero_title')}</h1>
                    </div>
                </div>


                <section>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-start gap-5 mb-4 md:mb-8">
                        <h2 className="text-2xl md:text-5xl font-bold text-white mb-4 md:mb-0 text-left">{t('bonuses.all_bonuses')}</h2>
                        
                        {/* Filter Tabs */}
                        <div className="hidden lg:flex flex-wrap gap-1 md:gap-2">
                            <button 
                                onClick={() => setActiveFilter('todos')}
                                className={`px-2 py-1 rounded-sm text-xs md:text-sm font-medium flex items-center gap-1 transition-colors ${
                                    activeFilter === 'todos' 
                                        ? 'bg-[#302fa0] text-white hover:bg-[#302fa0]' 
                                        : 'text-white hover:bg-[#302fa0]'
                                }`}
                            >
                                {t('bonuses.all_bonuses')}
                                <span className="bg-gray-600 text-white text-xs px-1 py-0.5 rounded-sm">0</span>
                            </button>
                            <button 
                                onClick={() => setActiveFilter('activos')}
                                className={`px-2 py-1 rounded-sm text-xs md:text-sm font-medium flex items-center gap-1 transition-colors ${
                                    activeFilter === 'activos' 
                                        ? 'bg-[#302fa0] text-white hover:bg-[#302fa0]' 
                                        : 'text-white hover:bg-[#302fa0]'
                                }`}
                            >
                                {t('bonuses.my_active_bonuses')}
                                <span className="bg-gray-600 text-white text-xs px-1 py-0.5 rounded-sm">0</span>
                            </button>
                            <button 
                                onClick={() => setActiveFilter('disponibles')}
                                className={`px-2 py-1 rounded-sm text-xs md:text-sm font-medium flex items-center gap-1 transition-colors ${
                                    activeFilter === 'disponibles' 
                                        ? 'bg-[#302fa0] text-white hover:bg-[#302fa0]' 
                                        : 'text-white hover:bg-[#302fa0]'
                                }`}
                            >
                                {t('bonuses.available_for_me')}
                                <span className="bg-gray-600 text-white text-xs px-1 py-0.5 rounded-sm">0</span>
                            </button>
                            <button 
                                onClick={() => setActiveFilter('archivo')}
                                className={`px-2 py-1 rounded-sm text-xs md:text-sm font-medium flex items-center gap-1 transition-colors ${
                                    activeFilter === 'archivo' 
                                        ? 'bg-[#302fa0] text-white hover:bg-[#302fa0]' 
                                        : 'text-white hover:bg-[#302fa0]'
                                }`}
                            >
                                {t('bonuses.archive')}
                                <span className="bg-gray-600 text-white text-xs px-1 py-0.5 rounded-sm">0</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Promo Code Section */}
                <section className="w-full md:w-4/12 bg-[#20204080] rounded-3xl p-3 md:p-3 relative overflow-hidden shadow-2xl">
                    {/* Background Pattern */}
                    <div className="">
                        <div className="rounded-2xl" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            backgroundRepeat: 'repeat'
                        }}>
                            <img src="/images/gygs8bif.png" alt="" className="rounded-2xl" />
                        </div>
                    </div>


                    {/* Text Section */}
                    <div className="text-center my-4 md:my-8 px-2 md:px-5">
                        <h2 className="text-lg md:text-xl font-black text-white mb-2 md:mb-4 text-left">
                            {t('bonuses.promo_title')}
                        </h2>
                        <p className="text-left text-white text-sm md:text-lg opacity-90">
                            {t('bonuses.promo_description')}
                        </p>
                    </div>

                    {/* Input and Button Section */}
                    <div className="px-2 md:px-5">
                        <div className="mb-3 md:mb-4">
                            <input
                                type="text"
                                placeholder={t('bonuses.promo_placeholder')}
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                className="w-full px-3 md:px-4 py-2 rounded-md text-base md:text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg bg-white"
                            />
                        </div>
                        <button 
                            onClick={() => {
                                if (promoCode.trim()) {
                                    setShowModal(true)
                                }
                            }}
                            className="w-full bg-[#fda700] text-white font-bold py-2 md:py-2 px-4 md:px-6 rounded-md active:shadow-[0_0.5px_0_0_#d97706] active:translate-y-1 transform transition-all duration-150 text-base md:text-lg border-b-2 md:border-b-3 border-orange-600 hover:border-orange-700 active:border-orange-800"
                        >
                            {t('bonuses.confirm')}
                        </button>
                    </div>
                </section>
            </main>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-end justify-center z-50">
                    <div className="bg-[#2d1259] rounded-t-lg p-6 max-w-md w-full mx-4">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center">
                                    <X color='#fda700' size={44} />
                                </div>
                                <h3 className="text-white text-lg font-semibold">{t('bonuses.activation_error')}</h3>
                            </div>
                        </div>
                        
                        {/* Message */}
                        <div className="mb-6">
                            <p className="text-white text-base font-bold">
                                {t('bonuses.promo_not_found')}
                            </p>
                        </div>
                        
                        {/* Button */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full bg-[#fda700] text-white font-bold py-2 md:py-2 px-4 md:px-6 rounded-md active:shadow-[0_0.5px_0_0_#d97706] active:translate-y-1 transform transition-all duration-150 text-base md:text-lg border-b-2 md:border-b-3 border-orange-600 hover:border-orange-700 active:border-orange-800"
                        >
                            {t('bonuses.ok')}
                        </button>
                    </div>
                </div>
            )}

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
    );
}