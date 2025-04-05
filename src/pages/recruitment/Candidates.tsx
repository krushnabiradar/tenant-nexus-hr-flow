
import RecruitmentDashboardLayout from "@/layouts/RecruitmentDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Eye, MessageSquare, Star, UserPlus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CandidatesPage = () => {
  const candidates = [
    { id: "C001", name: "Jessica Lee", position: "Senior Frontend Developer", stage: "Interview", rating: 4, applied: "3 days ago" },
    { id: "C002", name: "Michael Smith", position: "UX/UI Designer", stage: "Assessment", rating: 5, applied: "1 week ago" },
    { id: "C003", name: "Emma Johnson", position: "Product Manager", stage: "Screening", rating: 3, applied: "2 days ago" },
    { id: "C004", name: "David Wilson", position: "DevOps Engineer", stage: "Interview", rating: 4, applied: "5 days ago" },
    { id: "C005", name: "Sarah Brown", position: "Marketing Specialist", stage: "Offer", rating: 5, applied: "1 week ago" },
    { id: "C006", name: "James Taylor", position: "HR Coordinator", stage: "Screening", rating: 3, applied: "3 days ago" },
    { id: "C007", name: "Olivia Davis", position: "Data Analyst", stage: "Assessment", rating: 4, applied: "4 days ago" },
  ];

  // Function to render stars based on rating
  const renderRating = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ))
  };

  return (
    <RecruitmentDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Candidates</h2>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <UserPlus className="mr-2 h-4 w-4" /> Add Candidate
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Candidate Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search candidates..." 
                  className="pl-9"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Position</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead className="hidden md:table-cell">Rating</TableHead>
                    <TableHead className="hidden sm:table-cell">Applied</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {candidates.map((candidate) => (
                    <TableRow key={candidate.id}>
                      <TableCell className="font-medium">{candidate.id}</TableCell>
                      <TableCell>{candidate.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{candidate.position}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${candidate.stage === 'Interview' ? 'bg-blue-100 text-blue-800' : 
                            candidate.stage === 'Assessment' ? 'bg-purple-100 text-purple-800' : 
                            candidate.stage === 'Screening' ? 'bg-yellow-100 text-yellow-800' : 
                            candidate.stage === 'Offer' ? 'bg-green-100 text-green-800' : 
                            'bg-gray-100 text-gray-800'}`
                        }>
                          {candidate.stage}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex">
                          {renderRating(candidate.rating)}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{candidate.applied}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </RecruitmentDashboardLayout>
  );
};

export default CandidatesPage;
