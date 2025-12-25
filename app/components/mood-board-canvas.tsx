"use client";

import { useMutation } from "convex/react";
import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

import { api } from "@/convex/_generated/api";

export default function MoodBoardCanvas() {
  const sigRef = useRef<SignatureCanvas>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"drawing" | "text">("drawing");

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const create = useMutation(api.moodBoard.create);

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
    }
    catch (error) {
      console.error("Failed to submit:", error);
      alert("Failed to submit. Please try again.");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode("drawing")}
          className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
            mode === "drawing"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          ✏️ Drawing
        </button>
        <button
          onClick={() => setMode("text")}
          className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
            mode === "text"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          📝 Text Message
        </button>
      </div>

      {/* Input Area */}
      <div className={`border rounded-b-lg rounded-tr-lg p-4 bg-white ${mode === "text" ? "border-t-0 rounded-tl-none" : ""}`}>
        {mode === "drawing"
          ? (
              <div className="border border-dashed border-gray-300 rounded bg-gray-50">
                <SignatureCanvas
                  ref={sigRef}
                  penColor="black"
                  canvasProps={{
                    width: 500,
                    height: 250,
                    className: "w-full cursor-crosshair",
                  }}
                />
                <p className="text-xs text-gray-400 text-center py-1 select-none">Draw something above!</p>
              </div>
            )
          : (
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black min-h-[250px]"
              />
            )}
      </div>

      <div className="flex gap-3 justify-end">
        <button
          onClick={clear}
          className="px-4 py-2 text-sm text-gray-600 hover:text-red-500 transition-colors"
        >
          Clear
        </button>

        <button
          onClick={submit}
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
