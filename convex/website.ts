import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";
import { internal } from "./_generated/api";

export const listuserSites = query({
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

export const getWebSite = query({
  args: { id: v.id("website") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});



export const addUsertoSite = mutation({
  args: { websiteId: v.id("website"), email: v.string() },
  handler: async (ctx, args) => {
    const users = await ctx.db.query("users").collect();
    const user = users.filter((user) => {
      return user.email === args.email;
    });
    const website = await ctx.db.get(args.websiteId);
    const websiteUsers = website?.users || [];
    websiteUsers.push(user[0]._id);
    const sharedwebsite = await ctx.db.query("sharedwebsite").collect();
    const userShared = sharedwebsite.filter((website) => {
      return website.userId === user[0]._id;
    });
    if (userShared.length == 0) {
      // insert
      await ctx.db.insert("sharedwebsite", {
        userId: user[0]._id,
        websites: [args.websiteId],
      });
    } else {
      // update
      await ctx.db.patch(userShared[0]._id, {
        websites: [...userShared[0].websites, args.websiteId],
      });
    }
    return await ctx.db.patch(args.websiteId, { users: websiteUsers });
  },
});

export const createWebsite = mutation({
  args: {
    user: v.id("users"),
    name: v.string(),
    bannerImage: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, { name, user, bannerImage, description }) => {
    const website = {
      name,
      bannerImage,
      users: [user],
      pages: [],
      description,
    };
    const web = await ctx.db.insert("website", website);
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
export const schedulePublish = mutation({
  args: {
    id: v.id("webpage"),
    dateTime : v.any()
  },
  handler: async (ctx, args) => {
    await ctx.scheduler.runAfter(args.dateTime, internal.website.publish , {
      id: args.id
    });
  },
});

export const publish = internalMutation({
  args: {
    id: v.id("webpage")
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { isPublished: true });
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
