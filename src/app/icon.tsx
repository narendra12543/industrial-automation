import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  const logoPath = path.join(process.cwd(), "public", "aven-logo.png");
  const logoBuffer = fs.readFileSync(logoPath);
  const logoBase64 = logoBuffer.toString("base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
        }}
      >
        <img
          src={`data:image/png;base64,${logoBase64}`}
          width={24}
          height={24}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    { ...size }
  );
}