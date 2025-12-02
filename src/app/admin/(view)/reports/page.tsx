"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Trash2Icon, DownloadIcon, ReceiptTextIcon } from "lucide-react";
import AddReports from "./add-reports";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { howl, idk } from "@/lib/utils";
import { useCookies } from "react-cookie";

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

import React from "react";
import { toast } from "sonner";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Page() {
  const qcl = useQueryClient();
  const [{ token }] = useCookies(["token"]);

  // Fetch reports
  const { data, isPending } = useQuery({
    queryKey: ["report"],
    queryFn: (): idk =>
      howl(`/admin-dashboard/get-report`, { method: "GET", token }),
  });

  // Dialog state
  const [reportToDelete, setReportToDelete] = React.useState<any>(null);

  // ---- DELETE API ----
  async function deleteReportAPI(id: number) {
    return howl(`/admin-dashboard/delete-report/${id}`, {
      method: "DELETE",
      token,
    });
  }

  const { mutate: deleteReport, isPending: isDeleting } = useMutation({
    mutationFn: deleteReportAPI,
    onError: (err: any) => {
      toast.error(err?.message ?? "Failed to delete report");
    },
    onSuccess: (res: any) => {
      qcl.invalidateQueries({ queryKey: ["report"] });
      setReportToDelete(null);
      toast.success(res?.message ?? "Report deleted successfully!");
    },
  });

  // ---- DOWNLOAD REPORT CLIENT-SIDE ----
  function downloadReportLocal(report: any) {
    const wsData = [
      ["Report Name", "Schedule", "Last Generated"], // header
      [report.name, report.schedule, report.last_generated_at],
      // If metrics are available, add them:
      // ...report.metrics?.map((m: any) => [m.name, m.value])
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(blob, `${report.name}_${Date.now()}.xlsx`);
  }

  return (
    <div>
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-2xl">Companies</CardTitle>
        </CardHeader>

        <CardContent>
          <AddReports />
        </CardContent>

        <CardFooter>
          <Button size="lg">
            <ReceiptTextIcon className="mr-2" /> Generate Report
          </Button>
        </CardFooter>
      </Card>

      {/* REPORT TABLE */}
      <Card className="mt-6">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-2xl">Scheduled Reports</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Metrics</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Last Generated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.data?.map((r, id: number) => (
                <TableRow key={id}>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.metrics?.engagement_score}</TableCell>
                  <TableCell>{r.schedule}</TableCell>
                  <TableCell>{r.last_generated_at}</TableCell>

                  <TableCell className="flex items-center gap-3">
                    {/* Download */}
                    <button
                      type="button"
                      onClick={() => downloadReportLocal(r)}
                      className=""
                    >
                      <DownloadIcon size={18} />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => setReportToDelete(r)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2Icon size={18} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* DELETE DIALOG */}
      <AlertDialog
        open={!!reportToDelete}
        onOpenChange={(open) => !open && setReportToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Report</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{reportToDelete?.name}</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={() => deleteReport(reportToDelete?.id as number)}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
