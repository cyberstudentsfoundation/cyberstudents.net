import { z } from "zod";
import { getCodes } from "country-list";

export const registerSchema = z.object({
  preferredEmail: z
    .string({ message: "Missing preferred email address" })
    .email({ message: "Invalid preferred email address" }),
  country: z
    .string({ message: "Country of residence is required" })
    .refine((country) => getCodes().includes(country.toUpperCase()), { message: "Country of residence is invalid" }),
  schoolingStatus: z.enum(
    ["none", "ms", "hs1", "hs2", "hs3", "hs4", "college1", "college2", "college3", "college4", "college5", "other"],
    { message: "Schooling status is invalid" },
  ),
});

export const challengeFetchSchema = z.object({
  event: z.string(),
  fetchExtended: z.boolean(),
});

export const challengeFetchPreviewSchema = z.object({
  event: z.string(),
});

export const submitFlagSchema = z.object({
  challenge: z.string(),
  flag: z.string(),
});

export const getLeaderboardSchema = z.object({
  event: z.string(),
  onlyShowCurrentUser: z.boolean(),
});
