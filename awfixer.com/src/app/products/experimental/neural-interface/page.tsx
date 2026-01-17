import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Dna, AlertTriangle } from "lucide-react";

import { Background } from "@/components/background";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Neural Interface SDK | Experimental | AWFixer",
  description: "Brain-computer interface development kit for experimental applications.",
};

export default function NeuralInterfacePage() {
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
              <span className="font-semibold">Alpha Status - High Risk</span>
            </div>
            <p className="text-red-700 dark:text-red-300 text-sm mt-2">
              This is an alpha release with significant stability and security concerns. Not for production use.
            </p>
          </div>
        </div>

        <div className="text-center mb-16">
          <div className="p-4 bg-red-500/10 rounded-lg inline-block mb-6">
            <Dna className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Neural Interface SDK
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Brain-computer interface development kit for experimental neural applications.
          </p>
          <div className="bg-red-50 dark:bg-red-950/50 mx-auto max-w-2xl rounded-2xl p-4 border border-red-200 dark:border-red-800">
            <p className="text-red-800 dark:text-red-200 font-mono text-sm tracking-wide">
              ALPHA • BCI TECHNOLOGY • VERY HIGH RISK
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>Current experimental capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                  EEG signal processing
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                  Real-time neural pattern recognition
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                  Machine learning integration
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                  Safety-first architecture
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Safety Protocols</CardTitle>
              <CardDescription>Implemented safety measures</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                  Signal amplitude limiting
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                  Emergency shutdown protocols
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                  Real-time monitoring systems
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                  FDA compliance tracking
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center bg-red-50 dark:bg-red-950/30 rounded-2xl p-8 lg:p-12 border border-red-200 dark:border-red-800">
          <h2 className="text-3xl font-bold mb-4 text-red-900 dark:text-red-100">
            Access Neural Interface SDK
          </h2>
          <p className="text-red-800 dark:text-red-200 mb-6 max-w-2xl mx-auto">
            Download the experimental SDK and start developing brain-computer interface applications 
            with our comprehensive development toolkit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-red-600 hover:bg-red-700">
              Download SDK
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
              Safety Documentation
            </Button>
          </div>
        </div>
      </div>
    </Background>
  );
}