import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Instagram } from "lucide-react";

export function CompanyInfoCard() {
  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-gray-900">
          Company Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar and Upload Section */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/cartoon-character-with-green-background.png" />
              <AvatarFallback className="bg-green-400">
                <div className="w-full h-full bg-green-400 rounded-full flex items-center justify-center">
                  <div className="text-white text-2xl">👤</div>
                </div>
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
              <Instagram className="w-3 h-3 text-white" />
            </div>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 text-gray-600 bg-transparent"
          >
            <Upload className="w-4 h-4" />
            Upload Photo
          </Button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Company Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Company Name<span className="text-red-500">*</span>
              </label>
              <Input placeholder="e.g. zetanest" className="border-gray-300" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Company Email<span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="e.g. contact@gmail.com"
                type="email"
                className="border-gray-300"
              />
            </div>
          </div>

          {/* Company Phone */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Company Phone<span className="text-red-500">*</span>
            </label>
            <Input placeholder="e.g. zetanest" className="border-gray-300" />
          </div>

          {/* Company Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Company Address<span className="text-red-500">*</span>
            </label>
            <Textarea
              placeholder="e.g. zetanest"
              className="border-gray-300 min-h-[80px] resize-none"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
