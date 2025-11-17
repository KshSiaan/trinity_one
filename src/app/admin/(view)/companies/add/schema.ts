import { z } from "zod";

export const companyFormSchema = z.object({
  company_name: z
    .string()
    .min(1, "Company name is required")
    .min(2, "Company name must be at least 2 characters"),
  company_email: z
    .string()
    .min(1, "Company email is required")
    .email("Invalid email address"),
  company_phone: z
    .string()
    .min(1, "Company phone is required"),
  company_address: z
    .string()
    .min(1, "Company address is required")
    .min(10, "Company address must be at least 10 characters"),
  manager_full_name: z
    .string()
    .min(1, "Manager name is required")
    .min(2, "Manager name must be at least 2 characters"),
  manager_email: z
    .string()
    .min(1, "Manager email is required")
    .email("Invalid email address"),
  manager_phone: z
    .string()
    .min(1, "Manager phone is required"),
  manager_code: z
    .string()
    .min(1, "Manager code is required")
    .min(3, "Manager code must be at least 3 characters"),
  send_welcome_email: z.boolean().default(false),
  company_logo: z.instanceof(File).optional(),
});

export type CompanyFormData = z.infer<typeof companyFormSchema>;
