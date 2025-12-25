import { query, mutation } from "./_generated/server";
import { v } from "convex/values";


// List query
export const list = query({
  args: { 
    paginationOpts: v.object({
      numItems: v.number(),
      cursor: v.union(v.string(), v.null()),
      id: v.number(),
    })
  },
  handler: async (ctx, args) => {
    const paginatedDocs = await ctx.db
      .query("moodBoard")
      .order("desc")
      .paginate(args.paginationOpts);

    return {
      ...paginatedDocs,
      page: await Promise.all(
        paginatedDocs.page.map(async (entry) => ({
          ...entry,
          url: entry.fileId ? await ctx.storage.getUrl(entry.fileId) : null,
        }))
      ),
    };
  },
});

// Create mutation
export const create = mutation({
  args: {
    storageId: v.optional(v.id("_storage")),
    message: v.optional(v.string()),
  },
  handler: async (ctx, { storageId, message }) => {
    return await ctx.db.insert("moodBoard", {
      fileId: storageId,
      message,
      createdAt: Date.now(),
    });
  },
});
