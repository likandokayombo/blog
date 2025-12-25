"use client";
import MoodBoardCanvas from "@components/mood-board-canvas";
import MoodBoardGrid from "@components/mood-board-grid";

export default function MoodBoardPage() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-10">
      
      <p className="text-center text-gray-600">
        Leave a sign, drawing, or message for the community remember to be kind.
      </p>

      <MoodBoardCanvas />

      <h2 className="text-2xl font-semibold mt-10">Community Submissions</h2>
      <MoodBoardGrid />
    </div>
  );
}
