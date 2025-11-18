import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ReceiptTextIcon } from "lucide-react";
import AddReports from "./add-reports";

export default function Page() {
  return (
    <div>
      <Card>
        <CardHeader className=" flex justify-between items-center">
          <CardTitle className="text-2xl">Companies</CardTitle>
        </CardHeader>
        <CardContent>
          <AddReports />
        </CardContent>
        <CardFooter>
          <Button size={"lg"}>
            <ReceiptTextIcon /> Generate Report
          </Button>
        </CardFooter>
      </Card>
      <Card className="mt-6">
        <CardHeader className=" flex justify-between items-center">
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
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
