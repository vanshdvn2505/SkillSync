import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
  
const monthlyData = [
  { month: "Jan", attended: 4, hosted: 2 },
  { month: "Feb", attended: 6, hosted: 3 },
  { month: "Mar", attended: 5, hosted: 4 },
  { month: "Apr", attended: 8, hosted: 5 },
  { month: "May", attended: 7, hosted: 6 },
  { month: "Jun", attended: 10, hosted: 7 },
];

const sessionStats = [
  { name: "Completed", value: 40 },
  { name: "Upcoming", value: 5 },
];

const COLORS = ["#784cf8", "#10B981"];

const Charts = ({ isStudent }: { isStudent: boolean }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl text-primary-foreground font-bold mb-4">Your Meeting Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-popover border-none text-primary-foreground shadow-md">
          <CardHeader>
            <CardTitle>Monthly {isStudent ? "Sessions Attended" : "Sessions Hosted"}</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <XAxis dataKey="month" stroke="white"/>
                <YAxis stroke="white" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={isStudent ? "attended" : "hosted"}
                  stroke={isStudent ? "#4F46E5" : "#10B981"}
                  name={isStudent ? "Meetings Attended" : "Meetings Hosted"}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-popover shadow-md border-none text-primary-foreground">
          <CardHeader>
            <CardTitle>Sessions Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sessionStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {sessionStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>     
    </div>
  );
};

export default Charts;
