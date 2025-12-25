import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  moodBoard: defineTable({
    fileId: v.optional(v.id("_storage")),
    createdAt: v.number(),
    username: v.optional(v.string()),
    message: v.optional(v.string()),
    strokes: v.optional(
      v.array(
        v.object({
          x: v.number(),
          y: v.number(),
          color: v.string(),
          size: v.number(),
        }),
      ),
    ),
  }),
});
