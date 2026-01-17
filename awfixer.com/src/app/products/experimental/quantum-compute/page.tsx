import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Microscope, AlertTriangle } from "lucide-react";

import { Background } from "@/components/background";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Quantum Compute Engine | Experimental | AWFixer",
  description: "Experimental quantum computing framework for next-generation processing.",
};

export default function QuantumComputePage() {
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
              <span className="font-semibold">Prototype Status - Unstable</span>
            </div>
            <p className="text-red-700 dark:text-red-300 text-sm mt-2">
              This is a prototype implementation and may contain critical bugs or security vulnerabilities.
            </p>
          </div>
        </div>

        <div className="text-center mb-16">
          <div className="p-4 bg-red-500/10 rounded-lg inline-block mb-6">
            <Microscope className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Quantum Compute Engine
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Experimental quantum computing framework for next-generation processing capabilities.
          </p>
          <div className="bg-red-50 dark:bg-red-950/50 mx-auto max-w-2xl rounded-2xl p-4 border border-red-200 dark:border-red-800">
            <p className="text-red-800 dark:text-red-200 font-mono text-sm tracking-wide">
              PROTOTYPE • QUANTUM COMPUTING • EXPERIMENTAL
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
                  Quantum circuit simulation
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                  Hybrid classical-quantum algorithms
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                  Real-time quantum state visualization
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                  API for quantum experimentation
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technical Specifications</CardTitle>
              <CardDescription>Implementation details</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                  Qubit count: Up to 127 simulated qubits
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                  Gate fidelity: 99.5% (simulated)
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                  Coherence time: 100μs (simulated)
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                  Programming model: Qiskit-compatible
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center bg-red-50 dark:bg-red-950/30 rounded-2xl p-8 lg:p-12 border border-red-200 dark:border-red-800">
          <h2 className="text-3xl font-bold mb-4 text-red-900 dark:text-red-100">
            Start Quantum Experimentation
          </h2>
          <p className="text-red-800 dark:text-red-200 mb-6 max-w-2xl mx-auto">
            Access the quantum compute engine API and start building quantum applications 
            with our experimental framework.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-red-600 hover:bg-red-700">
              Access Quantum API
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </Background>
  );
}