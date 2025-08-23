import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@radix-ui/react-select";
import { ReceiptTextIcon } from "lucide-react";

export default function Page() {
  return (
    <div>
      <Card>
        <CardHeader className=" flex justify-between items-center">
          <CardTitle className="text-2xl">Companies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label>Report Name</Label>
              <Input />
            </div>
            <div className="space-y-4">
              <Label>Schedule</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select schedule " />
                </SelectTrigger>
              </Select>
            </div>
          </div>
          <div className="space-y-4 mt-4">
            <Label>Description</Label>
            <Textarea />
          </div>
          <div className="space-y-4 mt-4">
            <Label>Description</Label>
            <div className="grid grid-cols-6 gap-4">
              {Array(8)
                .fill("")
                .map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <div className="border p-4 flex flex-row gap-2" key={i + 1}>
                    <div className="flex justify-center items-center">
                      <Checkbox />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-sm">Engagement Scores</span>
                      <p className="text-xs text-muted-foreground">
                        Perfomance
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="grid grid-cols-6 gap-4">
              <div className="space-y-4">
                <Label>Schedule</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                </Select>
              </div>
              <div className="space-y-4">
                <Label>Department filter</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                </Select>
              </div>
            </div>
          </div>
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
