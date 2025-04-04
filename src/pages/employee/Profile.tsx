
import { useState } from "react";
import EmployeeDashboardLayout from "@/layouts/EmployeeDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Briefcase, Mail, MapPin, Phone, User, Calendar, GraduationCap, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  const userData = {
    fullName: "John Doe",
    position: "Software Engineer",
    department: "Engineering",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "January 15, 2023",
    manager: "Jane Wilson",
    about: "Experienced software engineer with expertise in web development, focusing on modern JavaScript frameworks and responsive design.",
    education: [
      { degree: "M.S. Computer Science", institution: "Stanford University", year: "2020-2022" },
      { degree: "B.S. Computer Science", institution: "University of California, Berkeley", year: "2016-2020" }
    ],
    experience: [
      { position: "Software Engineer", company: "Tech Innovations Inc.", period: "2022-Present" },
      { position: "Junior Developer", company: "WebSolutions Ltd.", period: "2020-2022" },
      { position: "Intern", company: "CodeLab", period: "Summer 2019" }
    ],
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "UI/UX Design", "Git", "Agile Methodologies"]
  };

  return (
    <EmployeeDashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">My Profile</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="h-24 w-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-medium mb-4">
                    JD
                  </div>
                  <h3 className="text-xl font-bold">{userData.fullName}</h3>
                  <p className="text-gray-500">{userData.position}</p>
                  <div className="w-full border-t my-4"></div>
                  <div className="w-full space-y-3">
                    <div className="flex items-center text-sm">
                      <Briefcase className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{userData.department}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{userData.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{userData.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{userData.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                      <span>Joined {userData.joinDate}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <User className="h-4 w-4 text-gray-500 mr-2" />
                      <span>Reports to {userData.manager}</span>
                    </div>
                  </div>
                  <div className="w-full mt-6">
                    <Button variant="outline" className="w-full" onClick={() => setIsEditing(!isEditing)}>
                      {isEditing ? "Cancel Editing" : "Edit Profile"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input id="fullName" defaultValue={userData.fullName} />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" defaultValue={userData.email} />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" defaultValue={userData.phone} />
                          </div>
                          <div>
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" defaultValue={userData.location} />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="about">About Me</Label>
                          <textarea
                            id="about"
                            className="w-full p-2 border rounded-md"
                            rows={4}
                            defaultValue={userData.about}
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                          <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">About Me</h4>
                            <p>{userData.about}</p>
                          </div>
                          <div className="border-t pt-4">
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Skills & Expertise</h4>
                            <div className="flex flex-wrap gap-2">
                              {userData.skills.map((skill, index) => (
                                <span 
                                  key={index}
                                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="education" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Education Background</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userData.education.map((edu, index) => (
                      <div 
                        key={index} 
                        className={`flex items-start ${index > 0 ? 'mt-6' : ''}`}
                      >
                        <div className="mr-4">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <GraduationCap className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium">{edu.degree}</h4>
                          <p className="text-gray-500">{edu.institution}</p>
                          <p className="text-sm text-gray-400">{edu.year}</p>
                        </div>
                      </div>
                    ))}
                    
                    {isEditing && (
                      <div className="mt-6 border-t pt-4">
                        <Button variant="outline">+ Add Education</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="experience" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Work Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userData.experience.map((exp, index) => (
                      <div 
                        key={index} 
                        className={`flex items-start ${index > 0 ? 'mt-6' : ''}`}
                      >
                        <div className="mr-4">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <Briefcase className="h-5 w-5 text-green-600" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium">{exp.position}</h4>
                          <p className="text-gray-500">{exp.company}</p>
                          <p className="text-sm text-gray-400">{exp.period}</p>
                        </div>
                      </div>
                    ))}
                    
                    {isEditing && (
                      <div className="mt-6 border-t pt-4">
                        <Button variant="outline">+ Add Experience</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="documents" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>My Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <FileText className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Employee Contract</h4>
                          <p className="text-sm text-gray-500">PDF • Uploaded Jan 15, 2023</p>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                      
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <FileText className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Resume</h4>
                          <p className="text-sm text-gray-500">PDF • Uploaded Jan 10, 2023</p>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                      
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <FileText className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">ID Proof</h4>
                          <p className="text-sm text-gray-500">JPG • Uploaded Jan 12, 2023</p>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                      
                      {isEditing && (
                        <div className="mt-4">
                          <Button variant="outline">Upload Document</Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </EmployeeDashboardLayout>
  );
};

export default ProfilePage;
