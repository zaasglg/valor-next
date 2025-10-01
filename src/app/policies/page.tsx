"use client"

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const policyTabs = [
    { id: 'user-agreement', label: 'User Agreement', href: '/policies?tab=user-agreement' },
    { id: 'responsible-gaming', label: 'Responsible Gaming', href: '/policies?tab=responsible-gaming' },
    { id: 'general-terms', label: 'General Terms', href: '/policies?tab=general-terms' },
    { id: 'risk-disclosure', label: 'Risk Disclosure', href: '/policies?tab=risk-disclosure' },
    { id: 'deposits-withdrawals', label: 'Deposits and Withdrawals', href: '/policies?tab=deposits-withdrawals' },
    { id: 'cancellation-policy', label: 'Cancellation Policy', href: '/policies?tab=cancellation-policy' },
    { id: 'refund-policy', label: 'Refund Policy', href: '/policies?tab=refund-policy' },
    { id: 'privacy-policy', label: 'Privacy Policy', href: '/policies?tab=privacy-policy' },
    { id: 'about-us', label: 'About Us', href: '/policies?tab=about-us' },
    { id: 'contact', label: 'Contact', href: '/policies?tab=contact' },
    { id: 'affiliate-program', label: 'Affiliate Program', href: '/policies?tab=affiliate-program' },
    { id: 'account-payments', label: 'Account, Payments, and Bonuses', href: '/policies?tab=account-payments' }
];

const policyContent = {
    'user-agreement': {
        title: 'User Agreement',
        subtitle: 'Download Policy',
        content: `
            <p>www.Valor.Bet is committed to protecting your personal information. This Privacy Policy informs you about what information we collect when you use our services, why we collect this information and how we use the collected information.</p>
            
            <p>Please note that this Privacy Policy will be agreed between you and www.Valor.Bet ('We', 'Our' or 'Us', as applicable). This Privacy Policy is an integral part of the www.Valor.Bet Terms and Conditions.</p>
            
            <p>The website www.Valor.Bet ("Casino", "Website", "Company", "We", "Our")</p>
            
            <p>We may make periodic changes to this Privacy Policy and will notify you of these changes by posting the modified terms on our platforms. We recommend that you review this Privacy Policy regularly.</p>
            
            <h3>1. PRIVACY</h3>
            <p>We consider information that can be used to identify a person, including but not limited to first and last name, date of birth, home or other physical address, email address, telephone number or other relevant information as personal information.</p>
            
            <h3>2. COLLECTION OF INFORMATION</h3>
            <p>We collect information that you provide directly to us, such as when you create an account, make a deposit, or contact us for support.</p>
            
            <h3>3. USE OF INFORMATION</h3>
            <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
        `
    },
    'responsible-gaming': {
        title: 'Responsible Gaming',
        subtitle: 'Play Safely',
        content: `
            <h3>What is Responsible Gaming?</h3>
            <p>Responsible gaming means enjoying our games in a way that is safe, fun, and within your means. We are committed to providing a safe and enjoyable gaming environment for all our players.</p>
            
            <h3>Setting Limits</h3>
            <p>You can set daily, weekly, or monthly deposit limits to help control your spending. These limits can be adjusted at any time through your account settings.</p>
            
            <h3>Self-Exclusion</h3>
            <p>If you feel that you need a break from gaming, you can request a self-exclusion period. During this time, you will not be able to access your account or place any bets.</p>
            
            <h3>Getting Help</h3>
            <p>If you or someone you know has a gambling problem, please seek help from professional organizations such as Gamblers Anonymous or your local support services.</p>
        `
    },
    'general-terms': {
        title: 'General Terms and Conditions',
        subtitle: 'Terms of Service',
        content: `
            <h3>1. ACCEPTANCE OF TERMS</h3>
            <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
            
            <h3>2. USE LICENSE</h3>
            <p>Permission is granted to temporarily download one copy of the materials on Valor Casino's website for personal, non-commercial transitory viewing only.</p>
            
            <h3>3. DISCLAIMER</h3>
            <p>The materials on Valor Casino's website are provided on an 'as is' basis. Valor Casino makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            
            <h3>4. LIMITATIONS</h3>
            <p>In no event shall Valor Casino or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Valor Casino's website.</p>
        `
    },
    'risk-disclosure': {
        title: 'Risk Disclosure',
        subtitle: 'Important Information',
        content: `
            <h3>GAMBLING RISKS</h3>
            <p>Gambling involves risk. You should never gamble more than you can afford to lose. Please ensure that gambling is legal in your jurisdiction before participating.</p>
            
            <h3>FINANCIAL RISKS</h3>
            <p>All gambling activities carry financial risk. Past performance does not guarantee future results. You may lose some or all of your deposited funds.</p>
            
            <h3>ADDICTION RISKS</h3>
            <p>Gambling can be addictive. If you feel you may have a gambling problem, please seek help immediately.</p>
            
            <h3>REGULATORY RISKS</h3>
            <p>Gambling regulations vary by jurisdiction. It is your responsibility to ensure compliance with local laws.</p>
        `
    },
    'deposits-withdrawals': {
        title: 'Deposits and Withdrawals',
        subtitle: 'Payment Information',
        content: `
            <h3>DEPOSIT METHODS</h3>
            <p>We accept various payment methods including credit cards, bank transfers, and digital wallets. All deposits are processed securely and immediately.</p>
            
            <h3>WITHDRAWAL PROCESS</h3>
            <p>Withdrawals are processed within 24-48 hours after verification. You may be required to provide additional documentation for security purposes.</p>
            
            <h3>MINIMUM AMOUNTS</h3>
            <p>Minimum deposit and withdrawal amounts vary by payment method. Please check the specific limits for your chosen payment method.</p>
            
            <h3>FEES</h3>
            <p>We do not charge fees for deposits or withdrawals. However, your payment provider may charge fees.</p>
        `
    },
    'cancellation-policy': {
        title: 'Cancellation Policy',
        subtitle: 'Cancellation Terms',
        content: `
            <h3>BET CANCELLATION</h3>
            <p>Bets cannot be cancelled once placed. Please review your selections carefully before confirming your bet.</p>
            
            <h3>ACCOUNT CANCELLATION</h3>
            <p>You may close your account at any time by contacting our support team. Any remaining balance will be returned to you.</p>
            
            <h3>BONUS CANCELLATION</h3>
            <p>Bonuses may be cancelled if terms and conditions are not met. Please read all bonus terms before accepting.</p>
        `
    },
    'refund-policy': {
        title: 'Refund Policy',
        subtitle: 'Refund Information',
        content: `
            <h3>REFUND ELIGIBILITY</h3>
            <p>Refunds are only available in specific circumstances, such as technical errors or duplicate transactions.</p>
            
            <h3>REFUND PROCESS</h3>
            <p>To request a refund, please contact our support team with your account details and reason for the refund request.</p>
            
            <h3>PROCESSING TIME</h3>
            <p>Refunds are typically processed within 5-7 business days after approval.</p>
        `
    },
    'privacy-policy': {
        title: 'Privacy Policy',
        subtitle: 'Data Protection',
        content: `
            <h3>INFORMATION WE COLLECT</h3>
            <p>We collect information you provide directly to us, such as when you create an account, make a deposit, or contact us for support.</p>
            
            <h3>HOW WE USE YOUR INFORMATION</h3>
            <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
            
            <h3>INFORMATION SHARING</h3>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
            
            <h3>DATA SECURITY</h3>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
        `
    },
    'about-us': {
        title: 'About Us',
        subtitle: 'Our Story',
        content: `
            <h3>WHO WE ARE</h3>
            <p>Valor Casino is a leading online gaming platform committed to providing the best gaming experience to our players worldwide.</p>
            
            <h3>OUR MISSION</h3>
            <p>To deliver exceptional gaming entertainment while maintaining the highest standards of security, fairness, and responsible gaming.</p>
            
            <h3>OUR VALUES</h3>
            <p>We are committed to transparency, integrity, and player satisfaction in everything we do.</p>
            
            <h3>LICENSING</h3>
            <p>Valor Casino is licensed and regulated by the appropriate gaming authorities to ensure fair and secure gaming.</p>
        `
    },
    'contact': {
        title: 'Contact Us',
        subtitle: 'Get in Touch',
        content: `
            <h3>SUPPORT</h3>
            <p>For technical support or account-related questions, please contact our support team:</p>
            <p>Email: support@valorcasino.com</p>
            <p>Live Chat: Available 24/7</p>
            
            <h3>BUSINESS INQUIRIES</h3>
            <p>For business partnerships or media inquiries:</p>
            <p>Email: business@valorcasino.com</p>
            
            <h3>COMPLAINTS</h3>
            <p>If you have a complaint about our services, please contact our complaints department:</p>
            <p>Email: complaints@valorcasino.com</p>
        `
    },
    'affiliate-program': {
        title: 'Affiliate Program',
        subtitle: 'Partner with Us',
        content: `
            <h3>JOIN OUR AFFILIATE PROGRAM</h3>
            <p>Earn commissions by promoting Valor Casino to your audience. Our affiliate program offers competitive rates and reliable payments.</p>
            
            <h3>COMMISSION STRUCTURE</h3>
            <p>We offer up to 45% revenue share on player losses, with monthly payments and detailed reporting.</p>
            
            <h3>MARKETING TOOLS</h3>
            <p>Access banners, landing pages, and promotional materials to help you promote our casino effectively.</p>
            
            <h3>HOW TO APPLY</h3>
            <p>Contact our affiliate team at affiliates@valorcasino.com to get started with your application.</p>
        `
    },
    'account-payments': {
        title: 'Account, Payments, and Bonuses',
        subtitle: 'Account Information',
        content: `
            <h3>ACCOUNT CREATION</h3>
            <p>Creating an account is free and takes just a few minutes. You'll need to provide basic information and verify your identity.</p>
            
            <h3>PAYMENT METHODS</h3>
            <p>We accept various payment methods including credit cards, bank transfers, e-wallets, and cryptocurrencies.</p>
            
            <h3>BONUS TERMS</h3>
            <p>All bonuses come with specific terms and conditions. Please read these carefully before accepting any bonus offers.</p>
            
            <h3>ACCOUNT VERIFICATION</h3>
            <p>For security purposes, you may be required to verify your identity by providing additional documentation.</p>
        `
    }
};

function PoliciesContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('user-agreement');

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab && policyTabs.find(t => t.id === tab)) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        router.push(`/policies?tab=${tabId}`);
    };

    const currentContent = policyContent[activeTab as keyof typeof policyContent];

    return (
        <div className="min-h-screen bg-[#f5f6fa] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#f8f9fa] border-r border-gray-200 p-6">
                <div className="space-y-2">
                    {policyTabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                activeTab === tab.id
                                    ? 'bg-purple-100 text-purple-800 border-l-4 border-purple-500'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <p className="text-orange-500 text-sm font-medium mb-2">{currentContent.subtitle}</p>
                        <h1 className="text-3xl font-bold text-gray-900">{currentContent.title}</h1>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <div 
                            className="prose prose-gray max-w-none"
                            dangerouslySetInnerHTML={{ __html: currentContent.content }}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function PoliciesPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        }>
            <PoliciesContent />
        </Suspense>
    );
}
