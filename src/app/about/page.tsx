"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ShoppingBag, Heart, Sparkles, Stethoscope, Briefcase, Watch, Utensils } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const products = [
    { name: "Wallets", icon: <Briefcase className="h-6 w-6" />, color: "bg-amber-100 text-amber-700" },
    { name: "Kada", icon: <Sparkles className="h-6 w-6" />, color: "bg-purple-100 text-purple-700" },
    { name: "Bottles", icon: <ShoppingBag className="h-6 w-6" />, color: "bg-blue-100 text-blue-700" },
    { name: "Watches", icon: <Watch className="h-6 w-6" />, color: "bg-slate-100 text-slate-700" },
    { name: "Kitchen Items", icon: <Utensils className="h-6 w-6" />, color: "bg-orange-100 text-orange-700" },
    { name: "Dr. Kits", icon: <Stethoscope className="h-6 w-6" />, color: "bg-green-100 text-green-700" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto"
          >
            <Badge variant="outline" className="px-4 py-1.5 text-sm border-primary/20 text-primary bg-primary/5 rounded-full backdrop-blur-sm">
              Modern + Trendy 🧿
            </Badge>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-primary to-slate-900 p-2">
              Your Brand, Your Style <br />
              <span className="text-slate-900">Customised Products</span>
            </h1>

            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl font-medium">
              Shopping & Retail redefined. We turn everyday items into personalized statements.
              <br className="hidden sm:inline" />
              <span className="text-primary font-semibold">"Crafting feelings into gifts, kyuki gifting happiness hai! ✨"</span>
            </p>
          </motion.div>
        </div>

        {/* Abstract Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-200 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-64 h-64 bg-pink-200 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* What We Offer Grid */}
      <section className="container px-4 md:px-6 py-12">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {products.map((product) => (
            <motion.div key={product.name} variants={item}>
              <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow bg-white hover:scale-105 duration-200">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <div className={`p-3 rounded-full ${product.color}`}>
                    {product.icon}
                  </div>
                  <h3 className="font-semibold text-slate-800">{product.name}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="container px-4 md:px-6 py-16 lg:py-24">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-8 bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

              <div className="space-y-4 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold">Visit Us</h2>
                <p className="text-slate-400 text-lg">Come say hi! We'd love to show you our collection in person.</p>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Location</h3>
                    <p className="text-slate-300 leading-relaxed mt-1">
                      Nag Devi cross line 96 building,<br />
                      Mumbai, Maharashtra 400003
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <p className="text-slate-300">8424813572</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-slate-300">founder@nayaabgifts.me</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder or Image */}
            <div className="bg-slate-100 flex items-center justify-center min-h-[300px] lg:min-h-full relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-slate-200/50"></div>
              <div className="text-center p-8 relative z-10 space-y-4">
                <div className="mx-auto bg-white p-4 rounded-full shadow-lg w-16 h-16 flex items-center justify-center mb-4 text-3xl animate-bounce">
                  👋
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Ready to customize?</h3>
                <p className="text-slate-600">Drop by or give us a call!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
