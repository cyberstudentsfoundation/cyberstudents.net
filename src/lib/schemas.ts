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
    ["none", "hs1", "hs2", "hs3", "hs4", "college1", "college2", "college3", "college4", "college5", "other"],
    { message: "Schooling status is invalid" },
  ),
  accessCode: z.string().optional(),
});

export const checkAccessCodeSchema = z.object({
  code: z.string(),
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

export const editChallengeSchema = z.object({
  id: z.string().optional(), // if optional, it's a new challenge
  authorId: z.string(),
  title: z.string(),
  category: z.string(),
  points: z.number(),
  description: z.string(),
  hints: z.array(z.object({ number: z.number(), title: z.string(), content: z.string(), points: z.number() })),
  files: z.array(z.string()),
  globalFlags: z.array(z.string()),
  areGlobalFlagsCaseSensitive: z.boolean(),
  globalRegexFlags: z.array(z.string()),
  publishDate: z.date(),
  submissionsEnabled: z.boolean(),
});

export const deleteChallengeSchema = z.object({
  id: z.string(),
});

export const verificationSubmitSchema = z.object({
  isStudent: z.boolean(),
  schoolName: z.string().optional(),
  schoolYear: z.enum(
    ["none", "hs1", "hs2", "hs3", "hs4", "college1", "college2", "college3", "college4", "college5", "other"],
    { message: "Schooling status is invalid" },
  ),
  fullName: z.string(),
  birthdate: z.date(),
  country: z.string().refine((country) => getCodes().includes(country.toUpperCase())),
  verificationMethod: z.enum(["verify-email", "verify-id", "verify-other"]),
  schoolEmail: z.string().optional(),
  idFile: z.string().optional(),
  idFileType: z.enum(["image/jpeg", "image/png"]).optional(),
  comments: z.string().optional(),
});

export const getVerificationSchema = z.object({
  id: z.string(),
});
