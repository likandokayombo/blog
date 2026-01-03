"use client";
import MoodBoardCanvas from "@components/mood-board-canvas";
import MoodBoardGrid from "@components/mood-board-grid";

export default function MoodBoardPage() {
  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-6 space-y-8 sm:space-y-12">
      <p className="text-center text-gray-600 max-w-2xl mx-auto">
        Leave a sign, drawing, or message for the community. Remember to be
        kind.
      </p>

      <MoodBoardCanvas />

      <div className="pt-10">
        <h2 className="text-2xl font-semibold mb-6">Community Submissions</h2>
        <MoodBoardGrid />
      </div>
    </div>
  );
}
