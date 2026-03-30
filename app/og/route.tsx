import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#FAFAFA",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          The Nagging Partner
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#FF6B35",
            marginTop: 16,
            textAlign: "center",
          }}
        >
          Stop nagging. Let AI do it.
        </div>
        <div
          style={{
            fontSize: 80,
            marginTop: 40,
            display: "flex",
            gap: "32px",
          }}
        >
          <span>👵</span>
          <span>🍺</span>
          <span>🎖️</span>
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#A1A1A1",
            marginTop: 40,
            textAlign: "center",
          }}
        >
          Assign tasks. Pick a persona. They get nagged until it&apos;s done.
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
