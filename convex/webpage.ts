import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getWebpage = query({
  args: { id: v.id("webpage") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const deleteWebpage = mutation({
  args: { id: v.id("webpage") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const createWebpage = mutation({
  args: {
    faviconUri: v.optional(v.string()),
    description: v.optional(v.string()),
    socialImage: v.optional(v.string()),
    title: v.string(),
    author: v.id("users"),
    url: v.string(),
    isPublished: v.boolean(),
    isDropEnabled: v.optional(v.boolean()),
    analyticsId: v.optional(v.string()),
    dropIndex: v.optional(v.int64()),
    fonts: v.array(
      v.object({
        font: v.string(),
        weight: v.optional(v.array(v.string())),
      })
    ),
    websiteId: v.id("website"),
    elements: v.array(v.any()),
    settingMode: v.optional(v.int64()),
    pageMode: v.optional(v.int64()),
    prevImageUri: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("webpage", args);
  },
});

export const updateWebpage = mutation({
  args: {
    webpageId: v.id("webpage"),
    websiteId: v.id("website"),
    author: v.id("users"),
    faviconUri: v.optional(v.string()),
    description: v.optional(v.string()),
    socialImage: v.optional(v.string()),
    title: v.optional(v.string()),
    url: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
    isDropEnabled: v.optional(v.boolean()),
    analyticsId: v.optional(v.string()),
    dropIndex: v.optional(v.int64()),
    fonts: v.optional(
      v.array(
        v.object({
          font: v.string(),
          weight: v.optional(v.array(v.string())),
        })
      )
    ),
    elements: v.optional(v.array(v.any())),
    settingMode: v.optional(v.int64()),
    pageMode: v.optional(v.int64()),
    prevImageUri: v.optional(v.string()),
  },
  handler: async (ctx, { webpageId, ...args }) => {
    return await ctx.db.patch(webpageId, args);
  },
});