"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Send } from "lucide-react";

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mailtoLink = `mailto:ktpatrick1@gmail.com?subject=${encodeURIComponent(
      `Dream Compass Support: ${formData.subject}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoLink;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-semibold text-foreground">
            Dream Compass
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-4xl">
          {/* Page Title */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl text-balance">
              We're here to help
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Have a question or need assistance? Send us a message and we'll
              get back to you as soon as possible.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Email Us</CardTitle>
                  <CardDescription>
                    We typically respond within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href="mailto:ktpatrick1@gmail.com"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    ktpatrick1@gmail.com
                  </a>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <MessageSquare className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Support Hours</CardTitle>
                  <CardDescription>
                    Our team is available to assist you
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="border-border md:col-span-2">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll respond to your inquiry
                  shortly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your question or issue..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="resize-none bg-background"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Dream Compass. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
