
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun, Monitor } from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  const handleSave = () => {
    toast.success("Theme settings saved successfully");
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your dashboard preferences</p>
        </div>
        
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
                <div 
                  className={`border-2 ${theme === 'light' ? 'border-primary' : 'border-gray-200'} p-2 rounded-md text-center cursor-pointer`}
                  onClick={() => setTheme('light')}
                >
                  <div className="h-10 mb-2 rounded bg-white border flex items-center justify-center">
                    <Sun className="h-5 w-5" />
                  </div>
                  <span className="text-sm">Light</span>
                </div>
                <div 
                  className={`border-2 ${theme === 'dark' ? 'border-primary' : 'border-gray-200'} p-2 rounded-md text-center cursor-pointer`}
                  onClick={() => setTheme('dark')}
                >
                  <div className="h-10 mb-2 rounded bg-gray-900 flex items-center justify-center">
                    <Moon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm">Dark</span>
                </div>
                <div 
                  className={`border-2 ${theme === 'system' ? 'border-primary' : 'border-gray-200'} p-2 rounded-md text-center cursor-pointer`}
                  onClick={() => setTheme('system')}
                >
                  <div className="h-10 mb-2 rounded bg-gradient-to-r from-white to-gray-900 flex items-center justify-center">
                    <Monitor className="h-5 w-5" />
                  </div>
                  <span className="text-sm">System</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSave}>Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
