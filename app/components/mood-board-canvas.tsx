"use client";

import { useMutation } from "convex/react";
import { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

import { api } from "@/convex/_generated/api";

export default function MoodBoardCanvas() {
  const sigRef = useRef<SignatureCanvas>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"drawing" | "text">("drawing");

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const create = useMutation(api.moodBoard.create);

  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 300 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        // Maintain 2:1 aspect ratio but cap height for mobile
        const height = Math.min(width * 0.5, 400);
        setCanvasSize({ width, height });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const clear = () => {
    if (mode === "drawing") {
      sigRef.current?.clear();
    } else {
      setMessage("");
    }
  };

  const submit = async () => {
    setLoading(true);

    try {
      let storageId: string | undefined;

      // Handle Drawing Mode
      if (mode === "drawing") {
        if (!sigRef.current || sigRef.current.isEmpty()) {
          setLoading(false);
          return;
        }

        const dataUrl = sigRef.current.getCanvas().toDataURL("image/png");
        const blob = await (await fetch(dataUrl)).blob();

        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": blob.type },
          body: blob,
        });
        const json = await result.json();
        storageId = json.storageId;

        await create({ storageId: storageId as any });
        sigRef.current.clear();
      }
      // Handle Text Mode
      else {
        if (!message.trim()) {
          setLoading(false);
          return;
        }
        await create({ message });
        setMessage("");
      }
    } catch (error) {
      console.error("Failed to submit:", error);
      // eslint-disable-next-line no-alert
      alert("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex gap-2">
        <button
          className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
            mode === "drawing"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setMode("drawing")}
        >
          ✏️ Drawing
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
            mode === "text"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setMode("text")}
        >
          📝 Text Message
        </button>
      </div>

      {/* Input Area */}
      <div
        ref={containerRef}
        className={`border rounded-b-lg rounded-tr-lg p-4 bg-white ${mode === "text" ? "border-t-0 rounded-tl-none" : ""}`}
      >
        {mode === "drawing" ? (
          <div className="border border-dashed border-gray-300 rounded bg-gray-50 overflow-hidden">
            <SignatureCanvas
              ref={sigRef}
              canvasProps={{
                width: canvasSize.width,
                height: canvasSize.height,
                className: "cursor-crosshair",
              }}
              penColor="black"
            />
            <p className="text-xs text-gray-400 text-center py-1 select-none">
              Draw something above!
            </p>
          </div>
        ) : (
          <textarea
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black min-h-[250px]"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            value={message}
          />
        )}
      </div>

      <div className="flex gap-3 justify-end">
        <button
          className="px-4 py-2 text-sm text-gray-600 hover:text-red-500 transition-colors"
          onClick={clear}
        >
          Clear
        </button>

        <button
          className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          disabled={loading}
          onClick={submit}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
