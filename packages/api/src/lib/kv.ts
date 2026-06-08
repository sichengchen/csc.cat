import { surlRecordSchema, type SurlRecord } from "@csc/shared";
import { createSlugResourceKv } from "./slug-resource-kv";

const surlKv = createSlugResourceKv<SurlRecord>({
  itemPrefix: "slug",
  userPrefix: "user",
  parseRecord(value) {
    const result = surlRecordSchema.safeParse(value);
    return result.success ? result.data : null;
  },
});

export const slugKey = surlKv.itemKey;
export const userKey = surlKv.userKey;
export const getSurl = surlKv.getRecord;
export const putSurl = surlKv.putRecord;
export const deleteSurl = surlKv.deleteRecord;
export const getUserSlugs = surlKv.getUserSlugs;
export const addUserSlug = surlKv.addUserSlug;
export const removeExpiredSurl = surlKv.removeRecord;
