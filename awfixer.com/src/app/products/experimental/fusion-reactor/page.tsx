import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, TestTube, AlertTriangle } from "lucide-react";

import { Background } from "@/components/background";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Compact Fusion Reactor | Experimental | AWFixer",
  description: "Miniature fusion reactor prototype for clean energy generation.",
};

export default function FusionReactorPage() {
  return (
    <Background>
      <div className="container mx-auto px-4 py-24 md:py-32 lg:pt-44">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/products/experimental">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Experimental Products
            </Link>
          </Button>
          
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-semibold">Research Status - Extreme Risk</span>
            </div>
            <p className="text-red-700 dark:text-red-300 text-sm mt-2">
              This is a research prototype with extreme safety hazards. Requires specialized facilities and training.
            </p>
          </div>
        </div>

        <div className="text-center mb-16">
          <div className="p-4 bg-red-500/10 rounded-lg inline-block mb-6">
            <TestTube className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Compact Fusion Reactor
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Miniature fusion reactor prototype for clean energy generation and research applications.
          </p>
          <div className="bg-red-50 dark:bg-red-950/50 mx-auto max-w-2xl rounded-2xl p-4 border border-red-200 dark:border-red-800">
            <p className="text-red-800 dark:text-red-200 font-mono text-sm tracking-wide">
              RESEARCH • CLEAN ENERGY • EXTREME RISK
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Reactor Specifications</CardTitle>
              <CardDescription>Technical parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                  Reactor type: Compact tokamak
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                  Plasma temperature: 100 million °C
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                  Magnetic field: 5 Tesla
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                  Expected output: 10 MW thermal
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Safety Systems</CardTitle>
              <CardDescription>Multiple redundant safety measures</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                  Plasma containment monitoring
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                  Emergency quench systems
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                  Radiation shielding protocols
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                  Automated shutdown procedures
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center bg-red-50 dark:bg-red-950/30 rounded-2xl p-8 lg:p-12 border border-red-200 dark:border-red-800">
          <h2 className="text-3xl font-bold mb-4 text-red-900 dark:text-red-100">
            Research Access Program
          </h2>
          <p className="text-red-800 dark:text-red-200 mb-6 max-w-2xl mx-auto">
            Apply for access to our fusion reactor research facility. Requires proper credentials, 
            safety training, and institutional approval.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-red-600 hover:bg-red-700">
              Apply for Research Access
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
              Safety Protocols
            </Button>
          </div>
        </div>
      </div>
    </Background>
  );
}