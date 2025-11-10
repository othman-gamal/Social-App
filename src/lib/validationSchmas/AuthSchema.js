import * as z from "zod";

export const regSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(5, "Name must be at least 5 chars")
      .max(15, "Max char 15"),
    email: z.string().email("Email is required"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(5, "Password must be at least 5 chars")
      .max(15, "Max char 15"),
    rePassword: z.string(),
    dateOfBirth: z.coerce.date().refine(
      (date) => {
        const currentYear = new Date().getFullYear();
        const birthYear = new Date(date).getFullYear();
        const age = currentYear - birthYear;
        return age >= 18;
      },
      { message: "Must be at least 18 YO" }
    ),
    gender: z.string().nonempty("Select your gender"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords must match",
  });

export const loginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 chars")
    .max(15, "Max char 15"),
});
