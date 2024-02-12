import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";

export const listSites = query({
  args: { user: v.id("users") },
  handler: async (ctx, args): Promise<Doc<"website">[]> => {
    const websites = await ctx.db.query("website").collect();
    const userWebsites = (websites ?? []).filter((website) => {
      const u = website.users.some((user) => user === args.user);
      return u && website;
    });
    return userWebsites;
  },
});

export const createWebsite = mutation({
  args: {
    user: v.id("users"),
    name: v.string(),
    bannerImage: v.optional(v.string()),
  },
  handler: async (ctx, { name, user, bannerImage }) => {
    const website = { name, bannerImage, users: [user] };
    await ctx.db.insert("website", website);
  },
});
