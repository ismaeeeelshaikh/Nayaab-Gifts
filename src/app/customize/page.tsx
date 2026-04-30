"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Package, Truck, Zap, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function CorporateGiftingPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    product: "",
    quantity: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/corporate/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit inquiry");

      toast({
        title: "Inquiry Submitted!",
        description: "We've received your request and will contact you shortly.",
      });

      // Reset form
      setFormData({
        name: "",
        company: "",
        email: "",
        product: "",
        quantity: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-900 dark:bg-card text-white py-20 px-4 md:px-6 border-b border-border/40">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Elevate Your Corporate Brand
          </h1>
          <p className="text-lg md:text-xl text-slate-300 dark:text-muted-foreground mb-8">
            Premium custom gifts that leave a lasting impression.
            Perfect for employee recognition, client appreciation, and events.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold" onClick={() => document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" })}>
            Request a Quote
          </Button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Why Partner With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-sm border border-border/50">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Precision Engraving</h3>
              <p className="text-muted-foreground">State-of-the-art laser technology ensures your logo looks perfect on every item.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-sm border border-border/50">
              <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Volume Discounts</h3>
              <p className="text-muted-foreground">Attractive pricing tiers for bulk orders. The more you gift, the more you save.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-sm border border-border/50">
              <div className="h-12 w-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Turnaround</h3>
              <p className="text-muted-foreground">Priority processing for corporate clients ensures you never miss a deadline.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Trust Banner */}
      <section className="py-12 bg-background border-y border-border">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 text-muted-foreground font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-green-500 h-5 w-5" />
            <span>Premium Leather Goods</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-green-500 h-5 w-5" />
            <span>Metal & Wood Engraving</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-green-500 h-5 w-5" />
            <span>Dedicated Account Manager</span>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="enquiry-form" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Get a Custom Quote</h2>
              <p className="text-muted-foreground">Tell us about your requirements and we'll get back to you within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 border border-border p-8 rounded-2xl bg-card shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Full Name <span className="text-red-500">*</span></label>
                  <Input id="name" required value={formData.name} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">Company Name</label>
                  <Input id="company" value={formData.company} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Work Email <span className="text-red-500">*</span></label>
                <Input id="email" type="email" required value={formData.email} onChange={handleChange} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="product" className="text-sm font-medium">Product Interest <span className="text-red-500">*</span></label>
                  <Select onValueChange={(val) => handleSelectChange("product", val)} value={formData.product}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wallets">Custom Wallets</SelectItem>
                      <SelectItem value="pens">Premium Pens</SelectItem>
                      <SelectItem value="keychains">Keychains</SelectItem>
                      <SelectItem value="other">Other / Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="quantity" className="text-sm font-medium">Estimated Quantity <span className="text-red-500">*</span></label>
                  <Select onValueChange={(val) => handleSelectChange("quantity", val)} value={formData.quantity}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10-50">10 - 50</SelectItem>
                      <SelectItem value="50-100">50 - 100</SelectItem>
                      <SelectItem value="100-500">100 - 500</SelectItem>
                      <SelectItem value="500+">500+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Additional Requirements</label>
                <Textarea
                  id="message"
                  className="min-h-[120px]"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                {loading ? "Submitting..." : "Submit Inquiry"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
