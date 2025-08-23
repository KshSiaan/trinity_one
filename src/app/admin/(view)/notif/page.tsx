import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  EditIcon,
  EyeIcon,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <section className="w-full h-full">
      <Card>
        <CardHeader className=" flex justify-between items-center">
          <CardTitle className="text-2xl">Manage Notification</CardTitle>
          <Button>
            <PlusIcon /> Create Notification
          </Button>
        </CardHeader>
        <CardContent className="">
          <div className="mt-6 w-full">
            <Table>
              <TableHeader className="bg-secondary">
                <TableRow>
                  <TableHead>TITLE</TableHead>
                  <TableHead>AUDIENCE</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>DATE</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Raven</TableCell>
                  <TableCell>150</TableCell>
                  <TableCell>
                    <Badge variant={"secondary"}>Draft</Badge>
                  </TableCell>
                  <TableCell>02-12-2025</TableCell>
                  <TableCell>
                    <Button variant={"ghost"} size={"icon"}>
                      <EyeIcon />
                    </Button>
                    <Button variant={"ghost"} size={"icon"}>
                      <EditIcon />
                    </Button>
                    <Button variant={"ghost"} size={"icon"}>
                      <Trash2Icon />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end items-center">
          <div className="">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
