"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, Gem, PenTool } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
    {
        icon: Gem,
        title: "Premium Quality",
        description: "Crafted with the finest materials for durability and elegance.",
    },
    {
        icon: PenTool,
        title: "Fully Customizable",
        description: "Add your name, logo, or message to make it truly yours.",
    },
    {
        icon: Truck,
        title: "Fast Delivery",
        description: "Quick turnaround times to get your gifts when you need them.",
    },
    {
        icon: ShieldCheck,
        title: "Secure Payment",
        description: "100% secure payment processing with Cashfree.",
    },
];

export default function Features() {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-center mb-12">
                        Why Choose Nayaab Gifts?
                    </h2>
                    <p className="mt-4 text-muted-foreground text-lg">
                        Experience the difference with our tailored services.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow duration-300 bg-background/50 backdrop-blur-sm">
                                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                                        <feature.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="font-semibold text-xl">{feature.title}</h3>
                                    <p className="text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
