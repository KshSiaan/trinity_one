"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ArrowRight, Shield, Users } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-background/95">
      {/* <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-foreground">
              {"<"}Raven/{">"}
            </span>
          </div>
          <div className="">- Your front end dev</div>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Here is Your Dashboard
            <span className="text-primary block">Navigator</span>
          </h1>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            This is here for as long as the development is ongoing. and it will
            be gone as soon as it it on production level
          </p>

          {/* Dashboard Access Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            <Card className="bg-card border-border hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  Admin Dashboard
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Full system control, user management, and advanced analytics
                </p>
                <Button asChild>
                  <Link href={"/admin"}>
                    Access Admin Panel
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  Manager Dashboard
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Team oversight, project tracking, and performance metrics
                </p>
                <Button asChild>
                  <Link href={"/manager"}>
                    Access Manager Panel
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              asChild
            >
              <Link href="/admin/login">
                Admin Login
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-muted bg-transparent"
              asChild
            >
              <Link href={"/manager/login"}>
                Manager Login
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
