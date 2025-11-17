"use client";
import React from "react";
import Link from "next/link";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { EditIcon, EyeIcon, Loader2Icon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCompaniesApi, deleteCompanyApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { imgCreator } from "@/lib/functions";

interface CompaniesProps {
  currentPage: number;
  onTotalPagesChange: (pages: number) => void;
  search: string;
}

interface Company {
  id: number;
  company_name: string;
  company_email: string;
  company_phone: string;
  company_address: string;
  company_logo: string;
  manager_full_name: string;
  manager_email: string;
  manager_phone: string;
  manager_code: string;
  send_welcome_email: number;
  created_at: string;
  updated_at: string;
}

export default function Companies({
  currentPage,
  onTotalPagesChange,
  search,
}: CompaniesProps) {
  const [{ token }] = useCookies(["token"]);
  const [selectedCompany, setSelectedCompany] = React.useState<Company | null>(
    null
  );
  const [companyToDelete, setCompanyToDelete] = React.useState<Company | null>(
    null
  );
  const qcl = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["companies_data", currentPage, search],
    queryFn: () => {
      return getCompaniesApi(token, {
        search: search,
        page: currentPage,
        per_page: 10,
      });
    },
  });

  const { mutate: deleteCompany, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteCompanyApi(id, token),
    onError: (err: any) => {
      toast.error(err.message ?? "Failed to delete company");
    },
    onSuccess: (res: any) => {
      qcl.invalidateQueries({ queryKey: ["companies_data"] });
      setCompanyToDelete(null);
      toast.success(res.message ?? "Company deleted successfully!");
    },
  });

  // Update total pages when data changes
  React.useEffect(() => {
    if (data?.data?.last_page) {
      onTotalPagesChange(data.data.last_page);
    }
  }, [data?.data?.last_page, onTotalPagesChange]);

  if (isPending) {
    return (
      <TableRow>
        <TableCell colSpan={6} className="text-center">
          <div className={`flex justify-center items-center h-24 mx-auto`}>
            <Loader2Icon className={`animate-spin`} />
          </div>
        </TableCell>
      </TableRow>
    );
  }

  const companies = data?.data?.data || [];
  if (!companies || companies.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={6} className="text-center text-muted-foreground">
          No companies found
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {companies.map((company) => (
        <TableRow key={company.id}>
          <TableCell className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={imgCreator(String(company.company_logo))} />
              <AvatarFallback>{company.company_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p>{company.company_name}</p>
          </TableCell>
          <TableCell>{company.manager_full_name}</TableCell>
          <TableCell>
            <Badge variant={"secondary"}>{company.manager_code}</Badge>
          </TableCell>
          <TableCell>
            {new Date(company.created_at).toLocaleDateString()}
          </TableCell>
          <TableCell>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={() => setSelectedCompany(company)}
                >
                  <EyeIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Company Details</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6">
                  <div className="flex items-start gap-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage
                        src={imgCreator(String(selectedCompany?.company_logo))}
                      />
                      <AvatarFallback className="text-2xl">
                        {selectedCompany?.company_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">
                        {selectedCompany?.company_name}
                      </h3>
                      <Badge className="mt-2">
                        {selectedCompany?.manager_code}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Company Email
                      </p>
                      <p className="font-medium">
                        {selectedCompany?.company_email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Company Phone
                      </p>
                      <p className="font-medium">
                        {selectedCompany?.company_phone}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">
                        Company Address
                      </p>
                      <p className="font-medium">
                        {selectedCompany?.company_address}
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-4">Manager Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Manager Name
                        </p>
                        <p className="font-medium">
                          {selectedCompany?.manager_full_name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Manager Code
                        </p>
                        <p className="font-medium">
                          {selectedCompany?.manager_code}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Manager Email
                        </p>
                        <p className="font-medium">
                          {selectedCompany?.manager_email}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Manager Phone
                        </p>
                        <p className="font-medium">
                          {selectedCompany?.manager_phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-4">
                      Additional Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Welcome Email Sent
                        </p>
                        <p className="font-medium">
                          {selectedCompany?.send_welcome_email ? "Yes" : "No"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Created Date
                        </p>
                        <p className="font-medium">
                          {selectedCompany?.created_at &&
                            new Date(
                              selectedCompany.created_at
                            ).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Last Updated
                        </p>
                        <p className="font-medium">
                          {selectedCompany?.updated_at &&
                            new Date(
                              selectedCompany.updated_at
                            ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant={"ghost"} size={"icon"} asChild>
              <Link href={`/admin/companies/${company.id}/edit`}>
                <EditIcon />
              </Link>
            </Button>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="text-destructive"
              onClick={() => setCompanyToDelete(company)}
            >
              <Trash2Icon />
            </Button>
          </TableCell>
        </TableRow>
      ))}

      {/* Single AlertDialog rendered once outside the loop */}
      <AlertDialog
        open={!!companyToDelete}
        onOpenChange={(open) => !open && setCompanyToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Company</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{companyToDelete?.company_name}</strong>? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteCompany(companyToDelete?.id as number)}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
