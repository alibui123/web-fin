"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Users, FileText, ArrowRight, Bot, ShieldCheck, Cpu, HeartPulse, Wrench, Sparkles, Database, ClipboardList, Mail, Building2, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useRouter } from "next/navigation";
import { CALENDLY_URL } from "@/lib/site";

// Magnetic Button Component
function MagneticButton({ children, href, className, external }: { children: React.ReactNode, href: string, className?: string, external?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.2);
    y.set((clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className={className}
    >
      {children}
    </motion.div>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} prefetch={true}>
      {inner}
    </Link>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [industriesDropdownOpen, setIndustriesDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const router = useRouter();

  const solutionsMenu = [
    { name: "Workflow automation", description: "End-to-end chains inside your systems", href: "/solutions/workflow-automation", icon: <Cpu className="h-6 w-6" /> },
    { name: "AI agent development", description: "Build, integrate, and operate the agent", href: "/solutions/ai-agent-development", icon: <Bot className="h-6 w-6" /> },
    { name: "ERP and Odoo automation", description: "Back office that runs under sign-off", href: "/solutions/erp-automation", icon: <Database className="h-6 w-6" /> },
    { name: "Custom AI development", description: "Document intelligence and bespoke agents", href: "/solutions/custom-ai-development", icon: <Sparkles className="h-6 w-6" /> },
    { name: "AI quality and governance", description: "QualiCore scores every interaction", href: "/solutions/ai-quality-assurance", icon: <ShieldCheck className="h-6 w-6" /> },
    { name: "AI consulting and audit", description: "Map where an agent pays off first", href: "/solutions/ai-consulting", icon: <ClipboardList className="h-6 w-6" /> },
  ];

  const industriesMenu = [
    { name: "Healthcare", description: "Front desk, intake, reminders, verification", href: "/industries/healthcare", icon: <HeartPulse className="h-5 w-5" /> },
    { name: "Financial services", description: "Banks, fintechs, and financial operators", href: "/industries/financial-services", icon: <Building2 className="h-5 w-5" /> },
    { name: "Government", description: "ERP and public-sector automation", href: "/industries/government", icon: <Landmark className="h-5 w-5" /> },
    { name: "Home services", description: "Trades and field businesses", href: "/industries/home-services", icon: <Wrench className="h-5 w-5" /> },
  ];

  const resourcesMenu = [
    { name: "Products", description: "Awaaz, Qualicall, AI ERP, Mehman Nawaz", href: "/products", icon: <Cpu className="h-6 w-6" /> },
    { name: "Portfolio", description: "Delivered work and outcomes", href: "/portfolio", icon: <FileText className="h-6 w-6" /> },
    { name: "Blog", description: "Insights and industry news", href: "/blog", icon: <FileText className="h-6 w-6" /> },
    { name: "About", description: "The team behind the tech", href: "/about", icon: <Users className="h-6 w-6" /> },
    { name: "Contact", description: "Start the conversation", href: "/contact", icon: <Mail className="h-6 w-6" /> },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setMobileSolutionsOpen(false);
      setMobileIndustriesOpen(false);
      setMobileResourcesOpen(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { name: "Solutions", href: "/solutions" },
    { name: "Industries", href: "/industries" },
    { name: "How it works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "Resources", href: "/blog" },
  ];

  useEffect(() => {
    navItems.forEach((item) => router.prefetch(item.href));
    solutionsMenu.forEach((s) => router.prefetch(s.href));
    industriesMenu.forEach((i) => router.prefetch(i.href));
    resourcesMenu.forEach((r) => router.prefetch(r.href));
  }, [router]);

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
    setMobileSolutionsOpen(false);
    setMobileIndustriesOpen(false);
    setMobileResourcesOpen(false);
  };

  const menuContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 font-mono text-sm uppercase tracking-widest",
        isScrolled
          ? "bg-black/40 backdrop-blur-3xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-6",
        mobileMenuOpen ? "bg-finova-midnight/95 backdrop-blur-2xl" : "",
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 flex items-center min-h-[60px] relative">
        <Link href="/" className="flex items-center gap-2 relative z-[60]" prefetch={true}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="relative h-10 w-40">
              <Image
                src="/images/logo.png"
                alt="FinovaSolutions Logo"
                fill
                className="object-contain"
                priority={true}
                sizes="(max-width: 768px) 160px, 160px"
              />
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="flex-1 flex justify-center">
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => {
              const isDropdown = item.name === "Solutions" || item.name === "Industries" || item.name === "Resources";
              let isOpen = false;
              let setOpen: any = () => {};
              let menuItems: any[] = [];
              let featuredTitle = "";
              let featuredDesc = "";

              if (item.name === "Solutions") {
                isOpen = solutionsDropdownOpen;
                setOpen = setSolutionsDropdownOpen;
                menuItems = solutionsMenu;
                featuredTitle = "Our Solutions";
                featuredDesc = "Six solutions from one agentic core, built inside your tools and run by us.";
              } else if (item.name === "Industries") {
                isOpen = industriesDropdownOpen;
                setOpen = setIndustriesDropdownOpen;
                menuItems = industriesMenu;
                featuredTitle = "Industries";
                featuredDesc = "Built around how your business actually runs, with more coming.";
              } else if (item.name === "Resources") {
                isOpen = resourcesDropdownOpen;
                setOpen = setResourcesDropdownOpen;
                menuItems = resourcesMenu;
                featuredTitle = "Resources";
                featuredDesc = "Products, delivered work, and insights from the Finova team.";
              }

              if (isDropdown) {
                return (
                  <motion.div
                    key={item.name}
                    className="relative"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                  >
                    <Link
                      href={item.href}
                      prefetch={true}
                      className="text-white/70 hover:text-white transition-colors relative group flex items-center gap-1.5 py-6"
                    >
                      <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-finova-cyan group-hover:to-finova-magenta transition-all duration-300">
                        {item.name}
                      </span>
                      <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", isOpen && "rotate-180 text-finova-cyan")} />
                      <span className="absolute bottom-4 left-0 w-0 h-[2px] bg-gradient-to-r from-finova-cyan to-finova-magenta transition-all duration-300 group-hover:w-full" />
                    </Link>

                    {/* Bento Dropdown Menu */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95, filter: "blur(10px)" }}
                          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(5px)" }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className={cn(
                            "absolute top-[calc(100%-10px)] z-50",
                            item.name === "Resources" ? "right-0" : "left-0"
                          )}
                        >
                          <div className={cn(
                            "max-w-[min(100vw-2rem,800px)] bg-finova-midnight/90 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.8),0_0_40px_-10px_rgba(14,165,233,0.1)] overflow-hidden",
                            item.name === "Industries" ? "w-[min(calc(100vw-2rem),650px)]" : "w-[min(calc(100vw-2rem),800px)]"
                          )}>
                            {/* Inner ambient glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-finova-cyan/10 blur-[80px] rounded-full pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-finova-magenta/10 blur-[80px] rounded-full pointer-events-none" />

                            <motion.div
                              variants={menuContainerVariants}
                              initial="hidden"
                              animate="show"
                              className="relative z-10 grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,0.9fr)_minmax(0,2.1fr)]"
                            >
                              {/* Featured Card */}
                              <motion.div variants={menuItemVariants} className="min-h-0">
                                <Link href={item.href} className="group h-full min-h-[180px] relative flex flex-col justify-end p-6 rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                                  <div className="absolute inset-0 bg-gradient-to-br from-finova-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                  <div className="relative z-10">
                                    <h3 className="text-lg font-bold text-white mb-2 font-sans tracking-tight">
                                      {featuredTitle}
                                    </h3>
                                    <p className="text-xs text-white/50 leading-relaxed mb-4 font-sans normal-case tracking-normal">
                                      {featuredDesc}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-finova-cyan font-bold tracking-widest group-hover:text-white transition-colors">
                                      EXPLORE ALL <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                  </div>
                                </Link>
                              </motion.div>

                              {/* Menu grid stays in the right columns so row 3 does not slip under the featured card */}
                              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2">
                                {menuItems.map((subItem) => (
                                  <motion.div variants={menuItemVariants} key={subItem.name}>
                                    <Link href={subItem.href} className="group relative flex items-start gap-4 p-4 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300">
                                      <div className="absolute inset-0 bg-gradient-to-r from-finova-cyan/0 to-finova-magenta/0 group-hover:from-finova-cyan/5 group-hover:to-finova-magenta/5 rounded-xl transition-all duration-500" />
                                      {subItem.icon && (
                                        <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/60 group-hover:text-finova-cyan group-hover:border-finova-cyan/30 group-hover:bg-finova-cyan/10 transition-all duration-300 shrink-0 relative z-10">
                                          {subItem.icon}
                                        </div>
                                      )}
                                      <div className="flex flex-col relative z-10">
                                        <span className="text-sm text-white/80 group-hover:text-white font-bold transition-colors">
                                          {subItem.name}
                                        </span>
                                        <span className="text-[10px] text-white/40 group-hover:text-white/60 mt-1 font-sans normal-case tracking-normal">
                                          {subItem.description}
                                        </span>
                                      </div>
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link href={item.href} prefetch={true} className="text-white/70 hover:text-white transition-colors relative group py-6 flex">
                    <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-finova-cyan group-hover:to-finova-magenta transition-all duration-300">
                      {item.name}
                    </span>
                    <span className="absolute bottom-4 left-0 w-0 h-[2px] bg-gradient-to-r from-finova-cyan to-finova-magenta transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>

        {/* Book a call – right side */}
        <motion.div
          className="hidden md:flex items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <MagneticButton href={CALENDLY_URL} external>
            <div className="relative px-6 py-2.5 bg-gradient-to-r from-finova-cyan to-finova-magenta rounded-full text-white font-mono text-xs overflow-hidden group transition-all duration-300 shadow-[0_0_20px_rgba(217,70,239,0.25)]">
              <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              <span className="relative z-10 font-bold tracking-widest uppercase flex items-center gap-2">
                BOOK A CALL
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </MagneticButton>
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="relative z-[60] text-white hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(30px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 w-full min-h-screen bg-black/90 z-[55] flex flex-col items-center justify-center overflow-y-auto"
            style={{ top: "0", height: "100vh" }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-finova-cyan/10 blur-[100px] rounded-full pointer-events-none" />

            <nav className="flex flex-col items-center gap-8 py-20 w-full px-6 relative z-10">
              {navItems.map((item, index) => {
                const isDropdown = item.name === "Solutions" || item.name === "Industries" || item.name === "Resources";
                let isOpen = false;
                let setOpen: any = () => {};
                let menuItems: any[] = [];

                if (item.name === "Solutions") {
                  isOpen = mobileSolutionsOpen;
                  setOpen = setMobileSolutionsOpen;
                  menuItems = solutionsMenu;
                } else if (item.name === "Industries") {
                  isOpen = mobileIndustriesOpen;
                  setOpen = setMobileIndustriesOpen;
                  menuItems = industriesMenu;
                } else if (item.name === "Resources") {
                  isOpen = mobileResourcesOpen;
                  setOpen = setMobileResourcesOpen;
                  menuItems = resourcesMenu;
                }

                if (isDropdown) {
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex flex-col items-center w-full"
                    >
                      <button
                        onClick={() => setOpen(!isOpen)}
                        className="text-white/80 hover:text-white transition-colors text-3xl font-bold flex items-center gap-3 uppercase"
                      >
                        {item.name}
                        <ChevronDown className={cn("h-6 w-6 transition-transform duration-300 text-finova-cyan", isOpen && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col items-center gap-4 mt-6 overflow-hidden w-full"
                          >
                            {menuItems.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                prefetch={true}
                                className="text-white/60 hover:text-finova-cyan transition-colors text-lg flex items-center gap-4 bg-white/[0.03] border border-white/10 w-full max-w-[320px] p-4 rounded-xl justify-center"
                                onClick={handleMobileNavClick}
                              >
                                {subItem.icon && <span className="text-finova-cyan/70">{subItem.icon}</span>}
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      prefetch={true}
                      className="text-white/80 hover:text-finova-cyan transition-colors text-3xl font-bold uppercase"
                      onClick={handleMobileNavClick}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="mt-8"
              >
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" onClick={handleMobileNavClick}>
                  <div className="px-10 py-4 bg-gradient-to-r from-finova-cyan to-finova-magenta rounded-full text-white font-bold tracking-widest text-sm shadow-[0_0_30px_rgba(217,70,239,0.3)] text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                    <span className="relative z-10">BOOK A CALL</span>
                  </div>
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
