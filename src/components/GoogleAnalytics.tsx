"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GA_ID = "G-3X1RFELSVG";
const CONSENT_KEY = "cookie-consent";

export default function GoogleAnalytics() {
  const [consent, setConsent] = useState<"granted" | "denied" | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "granted") {
      setConsent("granted");
    } else if (stored === "denied") {
      setConsent("denied");
    } else {
      // No stored preference — show the banner
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "granted");
    setConsent("granted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, "denied");
    setConsent("denied");
    setShowBanner(false);
  };

  return (
    <>
      {/* Only load GA scripts after user grants consent */}
      {consent === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {/* Cookie Consent Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
          >
            <div className="mx-auto max-w-4xl rounded-xl border border-border bg-card/95 backdrop-blur-md p-4 md:p-6 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="flex-1 space-y-2">
                  <h3 className="text-sm font-semibold text-foreground">
                    🍪 We value your privacy
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We use cookies and Google Analytics to understand how you
                    interact with our site and improve your experience. No
                    personal data is sold to third parties.
                  </p>
                </div>
                <button
                  onClick={handleDecline}
                  className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDecline}
                  className="text-muted-foreground"
                >
                  Decline
                </Button>
                <Button size="sm" onClick={handleAccept}>
                  Accept Cookies
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
