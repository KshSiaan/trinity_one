import { TeammemberType } from "@/lib/api/manager-dashboard-type";
import { howl, idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useCookies } from "react-cookie";

const LineChart = () => {
  const [{ token }] = useCookies(["token"]);

  // Fetch reports
  const { data, isPending } = useQuery({
    queryKey: ["report"],
    queryFn: (): idk => howl(`/manager/dashboard`, { method: "GET", token }),
  });

  const teamMember: TeammemberType[] = data?.data?.team_members || [];

  console.log("manager data is", teamMember);
  return (
    <div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Risk Assessment & Engagement Tracking
          </CardTitle>
          <CardDescription>
            Monitor team member engagement and identify potential risks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Risk Factor</TableHead>
                <TableHead className="hidden md:table-cell">Issue</TableHead>
                <TableHead>Suggested Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMember.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.member}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-yellow-50 text-yellow-800 border-yellow-200"
                    >
                      {item.engagement}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {item.kpi_status}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
                    >
                      ✨Generate AI summary
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LineChart;
