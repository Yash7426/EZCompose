import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const getWebpage = query({
  args: { id: v.id("webpage") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const deleteWebpage = mutation({
  args: { id: v.id("webpage"),websiteId:v.id("website") },
  handler: async (ctx, args) => {
    const website = await ctx.db.get(args.websiteId);
    await ctx.db.delete(args.id);
    return website?.pages[0].pageId
  },
});

export const getPageByName = query({
  args: { pageName: v.string(),websiteId:v.id("website") },
  handler: async (ctx, args) => {
    const website = await ctx.db.get(args.websiteId);

    const page = (website?.pages??[]).filter((item)=>{
      return item.pageName==args.pageName
    })

    const webPage = await ctx.db.get(page[0].pageId)
    return webPage;
  },
})

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
        weights: v.optional(v.array(v.string())),
      })
    ),
    websiteId: v.id("website"),
    elements: v.array(v.any()),
    settingMode: v.optional(v.int64()),
    pageMode: v.optional(v.int64()),
    prevImageUri: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const website = await ctx.db.get(args.websiteId);
    let arr= [] as {
      pageId: Id<"webpage">,
      pageName: string,
    }[]
    if(website){
      arr=[...website.pages]
    }
    const webpageId= await ctx.db.insert("webpage", args);
    arr.push({
      pageId:webpageId,
      pageName: args.title
    })
    await ctx.db.patch(args.websiteId, { pages: arr});
    return webpageId;
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
          weights: v.optional(v.array(v.string())),
        })
      )
    ),
    elements: v.optional(v.array(v.any())),
    settingMode: v.optional(v.int64()),
    pageMode: v.optional(v.int64()),
    prevImageUri: v.optional(v.string()),
    _creationTime:v.optional(v.number())
  },
  handler: async (ctx, { webpageId, ...args }) => {
    return await ctx.db.patch(webpageId, args);
  },
});
