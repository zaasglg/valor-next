import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="mt-2 px-8">
            {/* Top section with logo and text */}
            <div className="px-8 py-6 bg-white rounded-lg shadow-lg">
                <div className="flex items-center gap-1">
                    <div className="w-12 h-12">
                        <svg width="35" height="38" viewBox="0 0 35 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27 14L16.0502 38H10.9512L0 14H4.78186C5.17795 15.1223 5.59184 16.1889 6.07959 17.1273L4.41583 17.7863L5.90118 19.3898L7.14896 20.7368L5.71055 21.7971L7.34529 23.0023L9.2007 24.3701L9.02873 24.6713L8.60577 25.4121L9.02873 26.153L12.2191 31.7408L13.5302 34.0372L14.8413 31.7408L18.0316 26.153L18.4545 25.4121L18.0316 24.6713L17.8597 24.3702L19.7151 23.0023L21.3497 21.7971L19.9114 20.7367L21.1591 19.3897L22.6445 17.7862L20.9303 17.1072C21.4137 16.1738 21.8246 15.1143 22.2179 14H27Z" fill="#302FA0"></path>
                            <path d="M26 3.34436C20.8432 6.60742 19.8961 11.8288 18.0707 13.8084C18.7844 10.5179 17.4947 8.75671 20.2879 5.84912C16.9893 7.95764 18.1702 10.8181 16.862 13.6569L16.569 13.4922C18.206 9.06519 13.7584 3.40699 20.5797 0C12.6404 2.32953 14.9351 7.44171 14.0907 12.0998L13.5312 11.7855L12.9717 12.0998C12.1272 7.44172 14.422 2.32953 6.48266 7.6e-06C13.304 3.40699 8.85652 9.06519 10.4934 13.4923L10.1496 13.6854C8.82019 10.8372 10.0217 7.96473 6.71201 5.84913C9.50519 8.75672 8.21553 10.5179 8.92924 13.8084C7.10381 11.8287 6.15677 6.60743 1 3.34437C4.66299 6.53883 5.36349 14.5004 8.12839 17.8557L6.77446 18.3732L9.24598 20.9479L8.05227 21.7971L11.0867 23.9559L10.2251 25.4121L13.5312 31L16.8373 25.4121L15.9758 23.9559L19.0102 21.7971L17.8165 20.9479L20.2879 18.3732L18.886 17.8374C21.6387 14.4717 22.3435 6.53314 26 3.34436ZM10.9826 21.3366L8.90559 17.5533L12.0584 19.7514L10.9826 21.3366ZM16.0798 21.3365L15.004 19.7514L18.1568 17.5533L16.0798 21.3365Z" fill="#FDA700"></path>
                        </svg>
                    </div>
                    <div className="text-sm text-gray-600 leading-relaxed max-w-4xl">
                        <p className="mb-2 text-xs">The information on the site is provided by the site operator - the company ValorBet N.V., registered at the address: Palm Avenue 10, Rosebank, Sint Maarten.
                            The activity of the company ValorBet N.V. is licensed and regulated by IslandGames N.V. (license number: No. 1234/JAZ2021-567; valid until December 31, 2025) and by the legislation of Sint Maarten.
                            Payments are processed by Global Invest Solutions Ltd (registration number: HE 654321, address: Ocean Drive 22, Mesa Verde, 5678, Limassol, Cyprus), a subsidiary of ValorBet N.V.</p>
                        <p className='text-xs'>© 2021 - 2025. ValorCasino. All Rights Reserved</p>
                    </div>
                </div>
            </div>

            {/* Links section */}
            <div className="px-8 py-6 bg-white rounded-lg shadow-lg mt-5">
                <div className="grid grid-cols-5 gap-3">
                    <div>
                        <a href="#" className="text-gray-600 hover:text-gray-800 text-xs text-left">General Terms and Conditions</a>
                    </div>
                    <div>
                        <a href="#" className="text-gray-600 hover:text-gray-800 text-xs text-left">Responsible Gaming</a>
                    </div>
                    <div>
                        <a href="#" className="text-gray-600 hover:text-gray-800 text-xs text-left">Contact</a>
                    </div>
                    <div>
                        <a href="#" className="text-gray-600 hover:text-gray-800 text-xs text-left">Affiliate Program</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjMDA1MkI0Ii8+CjxyZWN0IHg9IjgiIHk9IjgiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=" alt="UK Flag" className="w-5 h-4" />
                        <span className="text-gray-600">English</span>
                    </div>
                    <div>
                        <a href="#" className="text-gray-600 hover:text-gray-800 text-xs text-left">Privacy Policy</a>
                    </div>
                    <div>
                        <a href="#" className="text-gray-600 hover:text-gray-800 text-xs text-left">About Us</a>
                    </div>
                    <div>
                        <a href="#" className="text-gray-600 hover:text-gray-800 text-xs text-left">Account, Payments, and Bonuses</a>
                    </div>
                </div>
            </div>

            {/* Certificates section */}
            <div className="px-8 py-6">
                <div className="flex justify-center items-center gap-8">
                    <img src="/images/rgc.png" alt="RGC" className="h-8 w-auto" />
                    <img src="/images/begambleaware.png" alt="BeGambleAware" className="h-4" />
                    <img src="/images/18+.svg" alt="18+" className="h-8 w-8" />
                </div>
            </div>

            {/* Payment methods */}
            <div className="px-8 py-6">
                <div className="flex justify-center items-center gap-6 flex-wrap">
                    <img src="/images/payment-methods/307b7b315b7597e6513c760304c7c94fe003e175.png" alt="payment method" className="h-16 w-32 border border-gray-300 rounded-lg p-1 object-contain" />
                    <img src="/images/payment-methods/327e939dab2ca92f266aebd9b7243ce38582e17d.webp" alt="payment method" className="h-16 w-32 border border-gray-300 rounded-lg p-1 object-contain" />
                    <img src="/images/payment-methods/33efc8ead2414bf349ca93bcb62d3f7ad925ad88.webp" alt="payment method" className="h-16 w-32 border border-gray-300 rounded-lg p-1 object-contain" />
                    <img src="/images/payment-methods/397f7bdb61cef2095cc631cf2f1badff6036e860.webp" alt="payment method" className="h-16 w-32 border border-gray-300 rounded-lg p-1 object-contain" />
                    <img src="/images/payment-methods/5a63e45e802d93da96a501216c32e1409ff85913.webp" alt="payment method" className="h-16 w-32 border border-gray-300 rounded-lg p-1 object-contain" />
                    <img src="/images/payment-methods/72698307473a26ea6b15973628f47d7739283ba6.webp" alt="payment method" className="h-16 w-32 border border-gray-300 rounded-lg p-1 object-contain" />
                    <img src="/images/payment-methods/7ae673bfb8eb4cb84305ad9d4901e2b5ba4485c6.webp" alt="payment method" className="h-16 w-32 border border-gray-300 rounded-lg p-1 object-contain" />
                    <img src="/images/payment-methods/8244c9f24968b8fe98f63426d8f082fed00959f2.png" alt="payment method" className="h-16 w-32 border border-gray-300 rounded-lg p-1 object-contain" />
                    <img src="/images/payment-methods/9f64cca67d82187701c87f3b5c3e2850a7d8c74d.webp" alt="payment method" className="h-16 w-32 border border-gray-300 rounded-lg p-1 object-contain" />
                    <img src="/images/payment-methods/c597fb320ff5ae4add7a6549d0bce15970773f8f.webp" alt="payment method" className="h-16 w-32 border border-gray-300 rounded-lg p-1 object-contain" />
                    <img src="/images/payment-methods/c9ddf68a7b7be62b1b5142978d6bbf8626dade69.png" alt="payment method" className="h-16 w-32 border border-gray-300 rounded-lg p-1 object-contain" />
                    <img src="/images/payment-methods/e4d15b3adf888755bb668d654f9b4e1a5163998c.webp" alt="payment method" className="h-16 w-32 border border-gray-300 rounded-lg p-1 object-contain" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
