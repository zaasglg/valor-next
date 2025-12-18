import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";

interface VerificationConfig {
    min: number;
    max: number;
    fee: number;
    currency: string;
    feeLabel: string;
}

interface HighBalanceVerificationModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    userCountry: string;
    verificationConfig: Record<string, VerificationConfig>;
    getCountryKey: (country: string) => string | null;
    formatAmount: (value: number, currency: string) => string;
}

export default function HighBalanceVerificationModal({
    open,
    onOpenChange,
    userCountry,
    verificationConfig,
    getCountryKey,
    formatAmount
}: HighBalanceVerificationModalProps) {
    const router = useRouter();
    const { t } = useLanguage();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full max-w-2xl p-0 rounded-xl">
                <DialogHeader className="sr-only text-white">
                    <DialogTitle className="text-left text-white">{t('high_verification.title')}</DialogTitle>
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
                    <h2 className="text-lg font-extrabold relative z-10 text-white">{t('high_verification.title')}</h2>
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
                                const min = formatAmount(cfg.min, cfg.currency);
                                const fee = formatAmount(cfg.fee, cfg.currency);
                                return (
                                    <div className="font-extrabold">
                                        <p>
                                            {t('high_verification.reason')
                                                .replace('{min}', min)
                                                .replace('{currency}', cfg.currency)}
                                        </p>
                                        <p className="mt-3">
                                            {t('high_verification.fee')
                                                .replace('{fee}', fee)
                                                .replace('{feeLabel}', cfg.feeLabel)}
                                        </p>
                                        <p className="mt-3 font-normal">
                                            {t('high_verification.note')}
                                        </p>
                                    </div>
                                );
                            }

                            return (
                                <div className="font-extrabold">
                                    <p>{t('high_verification.fallback_intro')}</p>
                                    <ul className="list-disc pl-5 mt-2 space-y-2 font-normal">
                                        <li>
                                            {t('high_verification.fallback_item_colombia')
                                                .replace('{min}', formatAmount(verificationConfig.colombia.min, 'COP'))
                                                .replace('{max}', formatAmount(verificationConfig.colombia.max, 'COP'))
                                                .replace('{currency}', 'COP')
                                                .replace('{fee}', formatAmount(verificationConfig.colombia.fee, 'COP'))
                                                .replace('{feeLabel}', 'pesos')}
                                        </li>
                                        <li>
                                            {t('high_verification.fallback_item_ecuador')
                                                .replace('{min}', formatAmount(verificationConfig.ecuador.min, 'USD'))
                                                .replace('{max}', formatAmount(verificationConfig.ecuador.max, 'USD'))
                                                .replace('{currency}', 'USD')
                                                .replace('{fee}', formatAmount(verificationConfig.ecuador.fee, 'USD'))
                                                .replace('{feeLabel}', '$')}
                                        </li>
                                        <li>
                                            {t('high_verification.fallback_item_paraguay')
                                                .replace('{min}', formatAmount(verificationConfig.paraguay.min, 'PYG'))
                                                .replace('{max}', formatAmount(verificationConfig.paraguay.max, 'PYG'))
                                                .replace('{currency}', 'PYG')
                                                .replace('{fee}', formatAmount(verificationConfig.paraguay.fee, 'PYG'))
                                                .replace('{feeLabel}', 'PYG')}
                                        </li>
                                    </ul>
                                    <p className="mt-3 font-normal">{t('high_verification.note')}</p>
                                </div>
                            );
                        })()}
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={() => {
                                onOpenChange(false);
                                router.push('/deposit');
                            }}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-[0_6px_0_0_#15803d,0_8px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_0_#15803d,0_6px_10px_rgba(0,0,0,0.2)] active:shadow-[0_2px_0_0_#15803d,0_4px_8px_rgba(0,0,0,0.2)] active:translate-y-1 transition-all duration-100 text-base transform hover:-translate-y-0.5"
                        >
                            {t('withdrawal.verify_account')}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
