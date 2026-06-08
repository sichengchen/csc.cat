import { pasteRecordSchema, type PasteRecord } from "@csc/shared";
import { createSlugResourceKv } from "./slug-resource-kv";

const pasteKv = createSlugResourceKv<PasteRecord>({
  itemPrefix: "paste",
  userPrefix: "paste-user",
  parseRecord(value) {
    const result = pasteRecordSchema.safeParse(value);
    return result.success ? result.data : null;
  },
});

export const pasteSlugKey = pasteKv.itemKey;
export const pasteUserKey = pasteKv.userKey;
export const getPaste = pasteKv.getRecord;
export const putPaste = pasteKv.putRecord;
export const deletePaste = pasteKv.deleteRecord;
export const getUserPasteSlugs = pasteKv.getUserSlugs;
export const addUserPasteSlug = pasteKv.addUserSlug;
export const removeExpiredPaste = pasteKv.removeRecord;
