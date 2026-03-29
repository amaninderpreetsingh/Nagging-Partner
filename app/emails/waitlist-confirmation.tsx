import * as React from "react";

interface WaitlistConfirmationProps {
  position: number;
  referralCode: string;
  referralUrl: string;
}

export default function WaitlistConfirmation({
  position,
  referralUrl,
}: WaitlistConfirmationProps) {
  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif",
        backgroundColor: "#0a0a0a",
        color: "#FAFAFA",
        padding: "40px 20px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 700,
            margin: "0 0 8px",
            color: "#FAFAFA",
          }}
        >
          You&apos;re in! 🎉
        </h1>
        <p style={{ fontSize: "16px", color: "#A1A1A1", margin: 0 }}>
          Welcome to The Nagging Partner waitlist
        </p>
      </div>

      {/* Position badge */}
      <div
        style={{
          textAlign: "center",
          margin: "24px 0",
          padding: "24px",
          backgroundColor: "#141414",
          borderRadius: "16px",
          border: "1px solid #262626",
        }}
      >
        <p
          style={{ fontSize: "14px", color: "#A1A1A1", margin: "0 0 8px" }}
        >
          Your position
        </p>
        <p
          style={{
            fontSize: "48px",
            fontWeight: 700,
            color: "#FF6B35",
            margin: 0,
          }}
        >
          #{position}
        </p>
      </div>

      {/* Referral section */}
      <div
        style={{
          margin: "24px 0",
          padding: "24px",
          backgroundColor: "#141414",
          borderRadius: "16px",
          border: "1px solid #262626",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: 600,
            margin: "0 0 8px",
            color: "#FAFAFA",
          }}
        >
          Move up the list
        </h2>
        <p
          style={{ fontSize: "14px", color: "#A1A1A1", margin: "0 0 16px" }}
        >
          Share your link — every friend who joins moves you up one spot.
        </p>
        <div
          style={{
            padding: "12px 16px",
            backgroundColor: "#0a0a0a",
            borderRadius: "8px",
            border: "1px solid #262626",
            wordBreak: "break-all",
          }}
        >
          <a
            href={referralUrl}
            style={{
              color: "#FF6B35",
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            {referralUrl}
          </a>
        </div>
      </div>

      {/* What happens next */}
      <div style={{ margin: "24px 0" }}>
        <h2
          style={{
            fontSize: "18px",
            fontWeight: 600,
            margin: "0 0 12px",
            color: "#FAFAFA",
          }}
        >
          What happens next?
        </h2>
        <ul
          style={{
            fontSize: "14px",
            color: "#A1A1A1",
            lineHeight: "24px",
            paddingLeft: "20px",
            margin: 0,
          }}
        >
          <li>We&apos;ll send you monthly updates on our progress</li>
          <li>You&apos;ll get an access code when we launch</li>
          <li>Early users get a free forever tier</li>
        </ul>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          marginTop: "32px",
          paddingTop: "24px",
          borderTop: "1px solid #262626",
        }}
      >
        <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>
          The Nagging Partner — Let AI do the nagging for you.
        </p>
      </div>
    </div>
  );
}
