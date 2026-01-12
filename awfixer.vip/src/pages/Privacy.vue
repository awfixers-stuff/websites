<template>
  <Layout>
    <section class="relative pt-32 md:pt-48 pb-32 px-4">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 class="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-pink-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
            PRIVACY POLICY
          </h1>
          <p class="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">
            YOUR PRIVACY MATTERS • SECURE & PROTECTED • TRANSPARENT PRACTICES
          </p>
          <p class="text-gray-400 mt-4 text-sm">
            Last updated: {{ lastUpdated }}
          </p>
        </div>

        <Card class="bg-gradient-to-br from-gray-900/90 via-gray-900/50 to-black/90 backdrop-blur-sm border-2 border-pink-500/30 rounded-2xl overflow-hidden mb-12">
          <CardHeader>
            <CardTitle class="text-3xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
              OUR COMMITMENT TO PRIVACY
            </CardTitle>
            <CardDescription class="text-gray-300 text-lg leading-relaxed">
              At AWFixer.VIP, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our premium membership platform. 
              We are committed to protecting your personal data and ensuring transparency in our practices.
            </CardDescription>
          </CardHeader>
        </Card>

        <div class="space-y-8">
          <Card
            v-for="(section, index) in sections"
            :key="index"
            :class="[
              'bg-gradient-to-br from-gray-900/90 via-gray-900/50 to-black/90 backdrop-blur-sm border-2 rounded-2xl overflow-hidden group transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,0,110,0.3)]',
              section.borderColor
            ]"
          >
            <CardHeader>
              <div class="flex items-center gap-4 mb-4">
                <div :class="['inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r rounded-xl', section.color]">
                  <component :is="section.icon" class="w-8 h-8 text-black" />
                </div>
                <CardTitle class="text-2xl md:text-3xl font-black text-pink-400">
                  {{ section.title }}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul class="space-y-3">
                <li v-for="(item, idx) in section.content" :key="idx" class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                  <span class="text-gray-300 text-base leading-relaxed">{{ item }}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card class="bg-gradient-to-br from-gray-900/90 via-gray-900/50 to-black/90 backdrop-blur-sm border-2 border-purple-500/30 rounded-2xl overflow-hidden mt-12">
          <CardHeader>
            <CardTitle class="text-2xl font-black bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent mb-4">
              CONTACT US ABOUT PRIVACY
            </CardTitle>
            <CardDescription class="text-gray-300 text-base leading-relaxed">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data 
              practices, please contact us at: 
              <a href="mailto:privacy@awfixer.vip" class="text-pink-400 hover:text-pink-300 transition-colors">
                privacy@awfixer.vip
              </a>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-gray-400 text-sm">
              We reserve the right to update this Privacy Policy at any time. We will notify you of any 
              changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  </Layout>
</template>

<script setup lang="ts">
import { Shield, Lock, Eye, FileText } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import Layout from '@/components/Layout.vue'

const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

const sections = [
  {
    icon: Shield,
    title: 'INFORMATION WE COLLECT',
    content: [
      'Account information: email address, username, and password',
      'Payment information: processed securely through our payment providers',
      'Usage data: how you interact with our platform and services',
      'Device information: browser type, device type, and IP address'
    ],
    color: 'from-pink-600 to-pink-700',
    borderColor: 'border-pink-500/30 hover:border-pink-400/60'
  },
  {
    icon: Lock,
    title: 'HOW WE USE YOUR INFORMATION',
    content: [
      'To provide and maintain our premium services',
      'To process payments and manage your membership',
      'To communicate with you about your account and services',
      'To improve our platform and develop new features',
      'To send you important updates and exclusive content (with your consent)'
    ],
    color: 'from-purple-600 to-purple-700',
    borderColor: 'border-purple-500/30 hover:border-purple-400/60'
  },
  {
    icon: Eye,
    title: 'DATA SECURITY',
    content: [
      'We use industry-standard encryption to protect your data',
      'All payment information is processed through secure, PCI-compliant providers',
      'We implement strict access controls and security measures',
      'Regular security audits and updates to protect against threats'
    ],
    color: 'from-pink-600 to-purple-600',
    borderColor: 'border-pink-500/30 hover:border-purple-400/60'
  },
  {
    icon: FileText,
    title: 'YOUR RIGHTS',
    content: [
      'Access: You can request a copy of your personal data',
      'Correction: You can update or correct your information at any time',
      'Deletion: You can request deletion of your account and data',
      'Opt-out: You can unsubscribe from marketing communications',
      'Portability: You can request your data in a portable format'
    ],
    color: 'from-purple-600 to-pink-600',
    borderColor: 'border-purple-500/30 hover:border-pink-400/60'
  }
]
</script>


