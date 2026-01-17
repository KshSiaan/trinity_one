"use client";
import { useState } from "react";
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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import Companies from "./companies";
import { useDebounce } from "@/hooks/use-debounce";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);
  return (
    <section className="w-full h-full">
      <Card>
        <CardHeader className=" flex justify-between items-center">
          <CardTitle className="text-2xl">Companies</CardTitle>
          <Button asChild>
            <Link href={"companies/add"}>
              <PlusIcon /> Add Company
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="">
          <div className="w-full flex gap-6">
            <div className="w-full border rounded-md shadow-xs flex items-center px-2">
              <SearchIcon className="size-5 text-muted-foreground" />
              <Input
                className="border-0! w-full ring-0!  shadow-none! outline-0! bg-transparent!"
                placeholder="Search by company or manager..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            {/* <Select>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
            </Select> */}
          </div>
          <div className="mt-6 w-full">
            <Table>
              <TableHeader className="bg-secondary">
                <TableRow>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Manager</TableHead>
                  {/* <TableHead>Manager Code</TableHead> */}
                  {/* <TableHead>Employees</TableHead> */}
                  <TableHead>Created Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <Companies
                  currentPage={currentPage}
                  onTotalPagesChange={setTotalPages}
                  search={debouncedSearch}
                />
              </TableBody>
            </Table>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end items-center">
          <div className="">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={page === currentPage}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
