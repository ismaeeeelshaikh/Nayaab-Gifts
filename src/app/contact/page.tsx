"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, Instagram } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function ContactPage() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message"),
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast({
                    title: "Message Sent",
                    description: "We've received your message and will get back to you soon!",
                });
                (e.target as HTMLFormElement).reset();
            } else {
                toast({
                    title: "Error",
                    description: "Failed to send message. Please try again.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-12 px-4 md:px-6 max-w-5xl flex flex-col justify-center items-center min-h-[80vh] mx-auto">
            <div className="mb-12 text-center w-full">
                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Have a question about our products or need help with a custom order?
                    We're here to help!
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 w-full">
                {/* Contact Information */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Get in Touch</CardTitle>
                            <CardDescription>
                                Reach out to us through any of these channels.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <Mail className="w-6 h-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-semibold">Email</h3>
                                    <p className="text-muted-foreground">founder@nayaabgifts.me</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <Phone className="w-6 h-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-semibold">Phone</h3>
                                    <p className="text-muted-foreground">+91 84248 13572</p>
                                    <p className="text-sm text-muted-foreground">(Mon-Sat, 9 AM - 6 PM)</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <MapPin className="w-6 h-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-semibold">Address</h3>
                                    <p className="text-muted-foreground">
                                        123, Business Park,<br />
                                        Mumbai, Maharashtra,<br />
                                        India - 400001
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <Instagram className="w-6 h-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-semibold">Instagram</h3>
                                    <a
                                        href="https://www.instagram.com/um_gift_store/?hl=en"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-primary"
                                    >
                                        @um_gift_store
                                    </a>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Contact Form */}
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Send us a Message</CardTitle>
                            <CardDescription>
                                Fill out the form below and we'll reply as soon as possible.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" placeholder="Your Name" required />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input id="subject" name="subject" placeholder="What is this regarding?" required />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="Type your message here..."
                                        className="min-h-[150px]"
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? (
                                        "Sending..."
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="ml-2 w-4 h-4" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div >
    );
}
