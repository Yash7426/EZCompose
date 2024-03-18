import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  website: defineTable({
    name: v.string(),
    bannerImage: v.optional(v.string()),
    users: v.array(v.id("users")),
    description : v.optional(v.string()),
    pages: v.array(
      v.object({
        pageId: v.id("webpage"),
        pageName: v.string(),
      })
    ),
  }),
  sharedwebsite: defineTable({
    userId: v.id("users"),
    websites: v.array(v.id("website"))
  }),
  webpage: defineTable({
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
        weights: v.optional(v.array(v.string())),
      })
    ),
    websiteId: v.id("website"),
    elements: v.array(v.any()),
    settingMode: v.optional(v.int64()),
    pageMode: v.optional(v.int64()),
    prevImageUri: v.optional(v.string()),
  }),
  users: defineTable({
    name: v.string(),
    profileImage: v.optional(v.string()),
    email: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
});
