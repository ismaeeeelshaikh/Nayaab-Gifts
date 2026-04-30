"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, Linkedin, Mail, Code2, Rocket, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function DeveloperPage() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">

            {/* Background Decoration */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-300/30 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-lg z-10">
                <Link href="/" className="inline-block mb-8">
                    <motion.div
                        whileHover={{ x: -5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <Button variant="ghost" className="gap-2 text-slate-600 hover:text-primary hover:bg-white/50 backdrop-blur-sm">
                            <ArrowLeft className="h-4 w-4" /> Back to Store
                        </Button>
                    </motion.div>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white/50"
                >
                    <div className="relative h-32 bg-gradient-to-r from-violet-600 to-indigo-600">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                    </div>

                    <div className="px-8 pb-8 text-center relative">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                            className="relative w-32 h-32 mx-auto -mt-16 mb-4"
                        >
                            <div className="absolute inset-0 rounded-full bg-white p-1 shadow-lg">
                                <Image
                                    src="/photo.jpg"
                                    alt="Ismaeel Shaikh"
                                    fill
                                    className="rounded-full object-cover object-top"
                                />
                            </div>
                            <div className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white" title="Available for hire"></div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl font-bold text-slate-800 mb-1"
                        >
                            Ismaeel Shaikh
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-6"
                        >
                            <Code2 className="h-3.5 w-3.5" />
                            Full Stack Developer
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-slate-600 mb-8 leading-relaxed"
                        >
                            The architect behind Nayaab Gifts. Passionate about crafting pixel-perfect, high-performance web applications that deliver exceptional user experiences.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex justify-center gap-4"
                        >
                            <Link href="mailto:shaikhismaeel75123@gmail.com" target="_blank">
                                <Button
                                    size="icon"
                                    className="rounded-full w-12 h-12 bg-white text-slate-600 hover:text-white hover:bg-red-500 border border-slate-200 shadow-sm transition-all duration-300"
                                >
                                    <Mail className="h-5 w-5" />
                                </Button>
                            </Link>

                            <Link href="https://github.com/ismaeeeelshaikh" target="_blank">
                                <Button
                                    size="icon"
                                    className="rounded-full w-12 h-12 bg-white text-slate-600 hover:text-white hover:bg-slate-900 border border-slate-200 shadow-sm transition-all duration-300"
                                >
                                    <Github className="h-5 w-5" />
                                </Button>
                            </Link>

                            <Link href="https://www.linkedin.com/in/ismaeel-shaikh-04a141286/" target="_blank">
                                <Button
                                    size="icon"
                                    className="rounded-full w-12 h-12 bg-white text-slate-600 hover:text-white hover:bg-blue-600 border border-slate-200 shadow-sm transition-all duration-300"
                                >
                                    <Linkedin className="h-5 w-5" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>

                    <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                            <Rocket className="h-3 w-3" />
                            Built with Next.js & Tailwind
                        </span>
                        <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3 text-red-400 fill-red-400" />
                            Made in 2025
                        </span>
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center text-slate-400 text-xs mt-8"
                >
                    &copy; {new Date().getFullYear()} Ismaeel Shaikh. All rights reserved.
                </motion.p>
            </div>
        </div>
    );
}
