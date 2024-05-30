"use server";

import { UpdateProfileValues, updateProfileSchema } from "@/lib/validations";

export async function updateProfile(values: UpdateProfileValues) {
  const { name } = updateProfileSchema.parse(values);
}
