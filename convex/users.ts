import { Doc, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
/**
 * Get all users data
 */
export const list = query(async (ctx): Promise<Doc<"users">[]> => {
  return await ctx.db.query("users").collect();
});

type arrType =  {
  _id: Id<"users">;
  profileImage?: string | undefined;
  name: string;
  email: string;
}[]
export const getUser = query({
  args: { ids: v.array(v.id("users")) },
  handler: async (ctx, { ids }) => {
    let arr: arrType = [];
    await Promise.all(ids.map(async (ele) => {
      let user = await ctx.db.get(ele);
      if (user) arr.push(user);
    }));
    return arr;
  },
});

/**
 * Insert or update the user in a Convex table then return the document's ID.
 *
 * The `UserIdentity.tokenIdentifier` string is a stable and unique value we use
 * to look up identities.
 *
 * Keep in mind that `UserIdentity` has a number of optional fields, the
 * presence of which depends on the identity provider chosen. It's up to the
 * application developer to determine which ones are available and to decide
 * which of those need to be persisted. For Clerk the fields are determined
 * by the JWT token's Claims config.
 */
export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    // Check if we've already stored this identity before.
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (user !== null) {
      // If we've seen this identity before but the name has changed, patch the value.
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, { name: identity.name });
      }
      return user;
    }
    // If it's a new identity, create a new `User`.
    const uid = await ctx.db.insert("users", {
      name: identity.name!,
      tokenIdentifier: identity.tokenIdentifier,
      email: identity.email!,
      profileImage: identity.pictureUrl ?? "",
    });
    return {
        _id: uid,
        name: identity.name!,
        tokenIdentifier: identity.tokenIdentifier,
        email: identity.email!,
        profileImage: identity.pictureUrl ?? "",
    };
  },
});
