import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";

export const listuserSites = query({
  args: { user: v.id("users") },
  handler: async (ctx, args): Promise<Doc<"website">[]> => {
    console.log("W");
    const websites = await ctx.db.query("website").collect();
    const userWebsites = (websites ?? []).filter((website) => {
      const u = website.users.some((user) => user === args.user);
      return u && website;
    });
    return userWebsites;
  },
});

export const getWebSite = query({
  args: { id: v.id("website") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const createWebsite = mutation({
  args: {
    user: v.id("users"),
    name: v.string(),
    bannerImage: v.optional(v.string()),
    description : v.optional(v.string())
  },
  handler: async (ctx, { name, user, bannerImage, description }) => {
    const website = { name, bannerImage, users: [user], pages: [] , description};
    const web = await ctx.db.insert("website", website);
    console.log(web);
    return web;
  },
});

export const getSitePages = query({
  args: { website: v.id("website") },
  handler: async (ctx, args): Promise<Doc<"webpage">[]> => {
    const webpages = await ctx.db.query("webpage").collect();
    const websitesPages = (webpages ?? []).filter((webpage) => {
      webpage.websiteId === args.website;
    });
    return websitesPages;
  },
});

export const updateWebsite = mutation({
  args: {
    id: v.id("website"),
    user: v.optional(v.id("users")),
    name: v.optional(v.string()),
    bannerImage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const website = await ctx.db.get(args.id);
    const users = website?.users || [];
    let updateObj: Partial<Doc<"website">> = {};
    if (args.user) {
      users.push(args.user);
      updateObj.users = users;
    }
    if (args.name) {
      updateObj.name = args.name;
    }
    if (args.bannerImage) {
      updateObj.bannerImage = args.bannerImage;
    }
    return await ctx.db.patch(args.id, updateObj);
  },
});

export const deleteWebsite = mutation({
  args: { id: v.id("website") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const generateUploadUrl = mutation({
  args: {
    // ...
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    // Return an upload URL
    return await ctx.storage.generateUploadUrl();
  },
});

export const generateServeUrl = mutation({
  args: {
    // ...
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }
    // Return an upload URL
    return await ctx.storage.getUrl(args.storageId);
  },
});
