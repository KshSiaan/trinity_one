"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, ArrowLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { companyFormSchema, type CompanyFormData } from "../../add/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCompanyDetailsApi, updateCompanyApi } from "@/lib/api/admin";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { idk } from "@/lib/utils";
import { useRouter, useParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";

export default function EditCompanyPage() {
  const [logoPreview, setLogoPreview] = React.useState<string>("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const qcl = useQueryClient();
  const router = useRouter();
  const params = useParams();
  const companyId = params.id as string;
  const [{ token }] = useCookies(["token"]);

  const form = useForm({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      company_name: "",
      company_email: "",
      company_phone: "",
      company_address: "",
      manager_full_name: "",
      manager_email: "",
      manager_phone: "",
      password: "",
      send_welcome_email: false,
      company_logo: undefined,
    } as CompanyFormData,
  });

  // Fetch company details
  const { data: companyData, isPending: isLoading } = useQuery({
    queryKey: ["company_details", companyId],
    queryFn: () => getCompanyDetailsApi(companyId, token),
    enabled: !!companyId && !!token,
  });

  // Populate form when company data is loaded
  React.useEffect(() => {
    if (companyData?.data) {
      const company = companyData.data;
      form.reset({
        company_name: company.company_name,
        company_email: company.company_email,
        company_phone: company.company_phone,
        company_address: company.company_address,
        manager_full_name: company.manager_full_name,
        manager_email: company.manager_email,
        manager_phone: company.manager_phone,
        password: company.manager_code ?? "",
        send_welcome_email: company.send_welcome_email === 1,
        company_logo: undefined,
      });
      if (company.company_logo) {
        setLogoPreview(company.company_logo);
      }
    }
  }, [companyData, form]);

  const { mutate, isPending: isMutating } = useMutation({
    mutationKey: ["update_company", companyId],
    mutationFn: (body: FormData) => {
      return updateCompanyApi(companyId, body, token);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to update company");
    },
    onSuccess: (res: idk) => {
      qcl.invalidateQueries({ queryKey: ["companies_data"] });
      qcl.invalidateQueries({ queryKey: ["company_details"] });
      router.push("/admin/companies");
      toast.success(res.message ?? "Company updated successfully!");
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("company_logo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: CompanyFormData) => {
    const formData = new FormData();

    // Append text fields
    formData.append("company_name", data.company_name);
    formData.append("company_email", data.company_email);
    formData.append("company_phone", data.company_phone);
    formData.append("company_address", data.company_address);
    formData.append("manager_full_name", data.manager_full_name);
    formData.append("manager_email", data.manager_email);
    formData.append("manager_phone", data.manager_phone);
    formData.append("password", data.password);
    formData.append("send_welcome_email", data.send_welcome_email ? "1" : "0");

    // Append file if present
    if (data.company_logo) {
      formData.append("company_logo", data.company_logo);
    }

    mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2Icon className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-semibold">Edit Company</h1>
        </div>

        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle className="text-xl font-medium text-muted-foreground">
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar and Upload Section */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={logoPreview} />
                  <AvatarFallback className="bg-green-400">
                    <div className="w-full h-full bg-green-400 rounded-full flex items-center justify-center">
                      <div className="text-white text-2xl">👤</div>
                    </div>
                  </AvatarFallback>
                </Avatar>
              </div>
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-2 text-gray-600 bg-transparent"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4" />
                Upload Photo
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Company Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-muted-foreground">
                        Company Name<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Bitopia Group"
                          className="border-gray-300"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-muted-foreground">
                        Company Email<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. bitopia@gmail.com"
                          type="email"
                          className="border-gray-300"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Company Phone */}
              <FormField
                control={form.control}
                name="company_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-muted-foreground">
                      Company Phone<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 000 0000000"
                        className="border-gray-300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Company Address */}
              <FormField
                control={form.control}
                name="company_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-muted-foreground">
                      Company Address<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g. Aqua Tower, Mohakhali, Dhaka, Bangladesh"
                        className="border-gray-300 min-h-[80px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="manager_full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-muted-foreground">
                      Manager Full Name<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Jone Dee"
                        className="border-gray-300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="manager_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-muted-foreground">
                      Manager Email<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. jone@gmail.com"
                        type="email"
                        className="border-gray-300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="manager_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-muted-foreground">
                      Manager Phone<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 000 000000000"
                        className="border-gray-300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-muted-foreground">
                      Manager Code<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 123123"
                        className="border-gray-300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-muted-foreground">
                      This code will be used by employees to join this company
                    </p>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <p className="font-medium mb-4">Send Welcome Email</p>
              <FormField
                control={form.control}
                name="send_welcome_email"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      Send account activation instruction to user's email
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isMutating}>
              {isMutating ? (
                <>
                  <Loader2Icon className="mr-2 w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Company"
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
