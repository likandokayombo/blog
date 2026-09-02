import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

// Image generation
export default async function Icon() {
  // Read the existing favicon.ico file from the public directory
  const faviconPath = join(process.cwd(), "public", "favicon.ico");
  const faviconBuffer = await readFile(faviconPath);

  // Convert the file to a base64 data URL
  const faviconBase64 = faviconBuffer.toString("base64");
  const faviconDataUrl = `data:image/x-icon;base64,${faviconBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        {/* eslint-disable-next-line next/no-img-element */}
        <img
          src={faviconDataUrl}
          alt="Favicon"
          width={size.width}
          height={size.height}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
