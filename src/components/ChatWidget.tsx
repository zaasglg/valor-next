'use client';

import Script from 'next/script';

export default function ChatWidget() {
  return (
    <Script
      id="chat-widget-loader"
      src="https://crm.valor-games.world/widget/widget.js"
      strategy="lazyOnload"
      onLoad={() => {
        (window as any).chatWidget?.('init', 'JXDFjhHLt2r1zlxIdoqCNJ9cpCp8TFaq');
      }}
    />
  );
}
