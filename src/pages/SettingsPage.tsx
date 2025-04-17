
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function SettingsPage() {
  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your dashboard preferences</p>
        </div>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and basic settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Administrator Name</Label>
                  <Input id="name" defaultValue="Admin User" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="admin@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Time Zone</Label>
                  <select 
                    id="timezone" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Time (EST)</option>
                    <option value="CST">Central Time (CST)</option>
                    <option value="MST">Mountain Time (MST)</option>
                    <option value="PST" selected>Pacific Time (PST)</option>
                  </select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Customize how and when you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-muted-foreground text-sm">
                      Receive email notifications about doctor updates
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="email-notifications"
                      className="h-4 w-4 rounded border-gray-300 text-medical-primary focus:ring-medical-primary"
                      defaultChecked
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="browser-notifications">Browser Notifications</Label>
                    <p className="text-muted-foreground text-sm">
                      Receive browser notifications when you're online
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="browser-notifications"
                      className="h-4 w-4 rounded border-gray-300 text-medical-primary focus:ring-medical-primary"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize how the dashboard looks and feels.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border-2 border-primary p-2 rounded-md text-center cursor-pointer">
                      <div className="h-10 mb-2 rounded bg-white border"></div>
                      <span className="text-sm">Light</span>
                    </div>
                    <div className="border-2 border-gray-200 p-2 rounded-md text-center cursor-pointer">
                      <div className="h-10 mb-2 rounded bg-gray-900"></div>
                      <span className="text-sm">Dark</span>
                    </div>
                    <div className="border-2 border-gray-200 p-2 rounded-md text-center cursor-pointer">
                      <div className="h-10 mb-2 rounded bg-gradient-to-r from-white to-gray-900"></div>
                      <span className="text-sm">System</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="density">Density</Label>
                  <select 
                    id="density" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="comfortable">Comfortable</option>
                    <option value="compact" selected>Compact</option>
                  </select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
