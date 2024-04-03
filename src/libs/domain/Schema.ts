import { z } from "zod";

export const Schema = {
  fullName: () =>
    z
      .string({
        required_error: "pleas enter your full name",
      })
      .min(3, "full name length cant be smaller than 3 character")
      .trim(),
  gender: () => z.string(),
};
