import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditIcon, EyeIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <Card className="h-full w-full">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-2xl text-muted-foreground">
          Subscription Plan
        </CardTitle>
        <Button asChild>
          <Link href={"/admin/subscription/add"}>
            <PlusIcon />
            Create Plan
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plan Name</TableHead>
              <TableHead>Features</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Dream Starter</TableCell>
              <TableCell>
                <Button variant={"outline"} className="text-xs!">
                  <EyeIcon />
                  View Features
                </Button>
              </TableCell>
              <TableCell>Monthly</TableCell>
              <TableCell>$65/mo</TableCell>
              <TableCell>
                <Badge className="bg-green-200 text-green-600">Active</Badge>
              </TableCell>
              <TableCell>
                <Button variant={"ghost"} size={"icon"}>
                  <EditIcon />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
