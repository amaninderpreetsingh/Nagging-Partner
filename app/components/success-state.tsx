"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { trackEvent } from "@/app/lib/analytics";

interface SuccessStateProps {
  position: number;
  referralCode: string;
  referralUrl: string;
}

export default function SuccessState({
  position,
  referralUrl,
}: SuccessStateProps) {
  const [copied, setCopied] = useState(false);

  const shareMessage = `I just joined the waitlist for an app that nags your partner as a Drunk Irish Guy. Get on the list: ${referralUrl}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    trackEvent({ name: "share_click", properties: { platform: "copy_link" } });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareClick = (platform: "twitter" | "whatsapp" | "imessage") => {
    trackEvent({ name: "share_click", properties: { platform } });
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareMessage)}`,
    sms: `sms:?body=${encodeURIComponent(shareMessage)}`,
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="text-center"
    >
      <h3
        className="text-2xl font-bold text-text-primary mb-2"
        tabIndex={-1}
        autoFocus
      >
        You&apos;re in! 🎉
      </h3>

      <p className="text-text-secondary my-4">
        You&apos;re on the list. We&apos;ll send you an access code when we launch.
      </p>

      <p className="text-sm text-text-secondary mb-4">
        Share your link — get your friends on the list too.
      </p>

      {/* Share buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShareClick("twitter")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border text-sm text-text-primary hover:bg-surface-hover transition-colors"
          aria-label="Share on Twitter"
        >
          𝕏 Twitter
        </a>
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShareClick("whatsapp")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border text-sm text-text-primary hover:bg-surface-hover transition-colors"
          aria-label="Share on WhatsApp"
        >
          💬 WhatsApp
        </a>
        <a
          href={shareLinks.sms}
          onClick={() => handleShareClick("imessage")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border text-sm text-text-primary hover:bg-surface-hover transition-colors"
          aria-label="Share via iMessage"
        >
          💬 iMessage
        </a>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border text-sm text-text-primary hover:bg-surface-hover transition-colors cursor-pointer"
          aria-label="Copy referral link"
        >
          {copied ? "✓ Copied!" : "📋 Copy Link"}
        </button>
      </div>
    </motion.div>
  );
}
