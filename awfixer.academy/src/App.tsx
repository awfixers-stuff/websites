import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  MessageCircle,
  BookOpen,
  Users,
  Award,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Menu,
  X,
  Search,
  Star,
} from "lucide-react";
import { useState, useEffect } from "react";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const courses = [
    {
      id: 1,
      title: "Introduction to Development",
      level: "Beginner",
      description: "Master the fundamentals of modern development practices",
      duration: "10+ hours",
      features: ["Hands-on projects", "Community support", "Expert feedback"],
      enrolled: 1234,
      rating: 4.8
    },
    {
      id: 2,
      title: "Advanced Techniques",
      level: "Intermediate",
      description: "Dive deep into advanced concepts and best practices",
      duration: "15+ hours",
      features: ["Real-world case studies", "1-on-1 mentorship", "Portfolio projects"],
      enrolled: 856,
      rating: 4.9
    },
    {
      id: 3,
      title: "Expert Masterclass",
      level: "Advanced",
      description: "Master-level course for experienced professionals",
      duration: "20+ hours",
      features: ["Industry projects", "Expert certification", "Career coaching"],
      enrolled: 423,
      rating: 5.0
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === "all" || course.level.toLowerCase() === selectedLevel.toLowerCase();
    return matchesSearch && matchesLevel;
  });

  const faqs = [
    {
      question: "How do I enroll in courses?",
      answer: "Simply join our Discord server and browse the available courses in the #courses channel."
    },
    {
      question: "Are the courses self-paced?",
      answer: "Yes! All our courses are designed to be flexible and learn at your own pace."
    },
    {
      question: "Do I get a certificate?",
      answer: "Yes, certificates are awarded upon successful completion of each course."
    },
    {
      question: "Can I interact with instructors?",
      answer: "Absolutely! Our instructors are active on Discord and regularly host live sessions."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className={`border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 transition-shadow ${scrollY > 10 ? 'shadow-sm' : ''}`}>
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 min-w-0">
              <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
              <span className="font-bold text-lg sm:text-xl truncate">
                Awfixer Academy
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <a href="#courses">Courses</a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="#features">Features</a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="#faq">FAQ</a>
              </Button>
              <ThemeToggle />
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://discord.awfixer.academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Join Discord
                  <ArrowRight className="h-4 w-4 flex-shrink-0" />
                </a>
              </Button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="h-9 w-9"
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t">
              <div className="flex flex-col gap-2">
                <Button variant="ghost" size="sm" className="justify-start" asChild>
                  <a href="#courses" onClick={() => setIsMobileMenuOpen(false)}>Courses</a>
                </Button>
                <Button variant="ghost" size="sm" className="justify-start" asChild>
                  <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
                </Button>
                <Button variant="ghost" size="sm" className="justify-start" asChild>
                  <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
                </Button>
                <Button variant="outline" size="sm" className="justify-start" asChild>
                  <a
                    href="https://discord.awfixer.academy"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2"
                  >
                    Join Discord
                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 animate-fade-in">
          <Badge variant="secondary" className="mb-2 sm:mb-4 animate-scale-in">
            <Sparkles className="h-3 w-3 mr-1" />
            Learn on Discord
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight px-2 animate-slide-up">
            Welcome to <span className="text-primary">Awfixer Academy</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Join our Discord community to access expert courses, live sessions,
            and connect with fellow learners. Your journey to mastery starts
            here.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4 px-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" className="w-full sm:w-auto hover:scale-105 transition-transform duration-200" asChild>
              <a
                href="https://discord.awfixer.academy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <span>Join Our Discord</span>
                <MessageCircle className="h-4 w-4 flex-shrink-0" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto hover:scale-105 transition-transform duration-200"
              asChild
            >
              <a href="#courses" className="flex items-center justify-center">
                <span>Explore Courses</span>
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 px-2">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              Why Learn on Discord?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Our Discord-based academy offers a unique learning experience that
              combines structured courses with real-time community interaction.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: MessageCircle,
                title: "Live Community",
                description: "Interact with instructors and peers in real-time through Discord channels"
              },
              {
                icon: BookOpen,
                title: "Structured Courses",
                description: "Access well-organized course materials, assignments, and resources"
              },
              {
                icon: Users,
                title: "Peer Learning",
                description: "Collaborate with fellow students and build your professional network"
              },
              {
                icon: Award,
                title: "Certifications",
                description: "Earn certificates upon course completion to showcase your skills"
              },
              {
                icon: Clock,
                title: "Flexible Schedule",
                description: "Learn at your own pace with 24/7 access to course materials"
              },
              {
                icon: CheckCircle2,
                title: "Expert Instructors",
                description: "Learn from industry professionals with years of real-world experience"
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-primary/20 group cursor-pointer"
                >
                  <CardHeader>
                    <Icon className="h-10 w-10 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <CardTitle className="group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                    <CardDescription>
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section
        id="courses"
        className="container mx-auto px-4 sm:px-6 py-12 sm:py-16"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 px-2">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              Featured Courses
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive course catalog designed to take your
              skills to the next level
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedLevel === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel("all")}
              >
                All Levels
              </Button>
              <Button
                variant={selectedLevel === "beginner" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel("beginner")}
              >
                Beginner
              </Button>
              <Button
                variant={selectedLevel === "intermediate" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel("intermediate")}
              >
                Intermediate
              </Button>
              <Button
                variant={selectedLevel === "advanced" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel("advanced")}
              >
                Advanced
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-all hover:scale-105 group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge 
                      variant={
                        course.level === "Beginner" ? "secondary" :
                        course.level === "Intermediate" ? "default" : "destructive"
                      }
                      className="w-fit"
                    >
                      {course.level}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.enrolled} enrolled</span>
                    </div>
                  </div>
                  <Accordion type="single" collapsible className="mb-4">
                    <AccordionItem value="features">
                      <AccordionTrigger className="text-sm">What you'll learn</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-1 text-sm">
                          {course.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle2 className="h-3 w-3 text-primary" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1">
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{course.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <p>{course.description}</p>
                          <div className="space-y-2">
                            <h4 className="font-medium">Course Features:</h4>
                            <ul className="space-y-1 text-sm">
                              {course.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <CheckCircle2 className="h-3 w-3 text-primary" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>{course.duration}</span>
                            <span>{course.enrolled} students enrolled</span>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button className="flex-1" asChild>
                      <a
                        href="https://discord.awfixer.academy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <span>Enroll</span>
                        <ArrowRight className="h-4 w-4 flex-shrink-0" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No courses found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedLevel("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Separator />

      {/* FAQ Section */}
      <section id="faq" className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 px-2">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Got questions? We've got answers.
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <AccordionItem value={`faq-${index}`} className="border-0">
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </Card>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="text-center px-4 sm:px-6 pt-6 sm:pt-6">
              <MessageCircle className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-3 sm:mb-4" />
              <CardTitle className="text-2xl sm:text-3xl mb-3 sm:mb-4">
                Ready to Start Learning?
              </CardTitle>
              <CardDescription className="text-base sm:text-lg px-2">
                Join our Discord community today and get access to all courses,
                live sessions, and a supportive learning environment.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center px-4 sm:px-6 pb-6 sm:pb-6">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <a
                  href="https://discord.awfixer.academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <span className="hidden sm:inline">
                    Join Awfixer Academy on Discord
                  </span>
                  <span className="sm:hidden">Join on Discord</span>
                  <MessageCircle className="h-5 w-5 flex-shrink-0" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <span className="font-semibold text-sm sm:text-base">
                Awfixer Academy
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-right">
              © {new Date().getFullYear()} Awfixer Academy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
