import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  website: defineTable({
    name: v.string(),
    bannerImage: v.optional(v.string()),
    users: v.array(v.id("users")),
  }),
  webpage: defineTable({
    title: v.string(),
    author: v.id("users"),
    url: v.string(),
    isPublished: v.boolean(),
    analyticsId: v.optional(v.string()),
    dropIndex: v.optional(v.int64()),
    fonts: v.array(
      v.object({
        font: v.string(),
        weight: v.optional(v.int64()),
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
