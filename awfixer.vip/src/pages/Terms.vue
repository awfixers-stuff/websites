<template>
  <Layout>
    <section class="relative pt-32 md:pt-48 pb-32 px-4">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 class="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-pink-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
            TERMS OF SERVICE
          </h1>
          <p class="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">
            LEGAL AGREEMENT • MEMBERSHIP TERMS • USER RIGHTS & RESPONSIBILITIES
          </p>
          <p class="text-gray-400 mt-4 text-sm">
            Last updated: {{ lastUpdated }}
          </p>
        </div>

        <Card class="bg-gradient-to-br from-gray-900/90 via-gray-900/50 to-black/90 backdrop-blur-sm border-2 border-pink-500/30 rounded-2xl overflow-hidden mb-12">
          <CardHeader>
            <CardTitle class="text-3xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
              AGREEMENT TO TERMS
            </CardTitle>
            <CardDescription class="text-gray-300 text-lg leading-relaxed">
              These Terms of Service ("Terms") govern your access to and use of AWFixer.VIP ("we," "us," or "our"). 
              By accessing or using our premium membership platform, you agree to be bound by these Terms. 
              Please read them carefully before using our services.
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
              CONTACT & DISPUTE RESOLUTION
            </CardTitle>
            <CardDescription class="text-gray-300 text-base leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at: 
              <a href="mailto:legal@awfixer.vip" class="text-pink-400 hover:text-pink-300 transition-colors">
                legal@awfixer.vip
              </a>
              or 
              <a href="/contact" class="text-pink-400 hover:text-pink-300 transition-colors">
                use our contact form
              </a>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-gray-300 text-base mb-4">
              <strong class="text-pink-400">Governing Law:</strong> These Terms shall be governed by and 
              construed in accordance with applicable laws, without regard to conflict of law provisions.
            </p>
            <p class="text-gray-400 text-sm">
              We reserve the right to update these Terms of Service at any time. We will notify you of any 
              material changes by posting the new Terms on this page and updating the "Last updated" date.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  </Layout>
</template>

<script setup lang="ts">
import { FileText, Scale, AlertCircle, CheckCircle, XCircle } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import Layout from '@/components/Layout.vue'

const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

const sections = [
  {
    icon: FileText,
    title: 'ACCEPTANCE OF TERMS',
    content: [
      'By accessing and using AWFixer.VIP, you accept and agree to be bound by these Terms of Service.',
      'If you do not agree to these terms, you must not use our services.',
      'We reserve the right to modify these terms at any time, and such modifications will be effective immediately.',
      'Your continued use of the service after changes constitutes acceptance of the modified terms.'
    ],
    color: 'from-pink-600 to-pink-700',
    borderColor: 'border-pink-500/30 hover:border-pink-400/60'
  },
  {
    icon: CheckCircle,
    title: 'MEMBERSHIP & SUBSCRIPTION',
    content: [
      'Membership is available in two tiers: Exclusive and Super Premium.',
      'Subscriptions are billed monthly and automatically renew unless cancelled.',
      'You are responsible for maintaining the confidentiality of your account credentials.',
      'You must be at least 18 years old to create an account and subscribe to our services.',
      'We reserve the right to refuse service to anyone at any time.'
    ],
    color: 'from-purple-600 to-purple-700',
    borderColor: 'border-purple-500/30 hover:border-purple-400/60'
  },
  {
    icon: Scale,
    title: 'PAYMENT & REFUNDS',
    content: [
      'All fees are charged in advance on a monthly basis.',
      'Payments are processed through secure third-party payment processors.',
      'Refunds are available within 7 days of initial subscription, subject to our refund policy.',
      'Price changes will be communicated 30 days in advance for existing subscribers.',
      'Failure to pay may result in suspension or termination of your account.'
    ],
    color: 'from-pink-600 to-purple-600',
    borderColor: 'border-pink-500/30 hover:border-purple-400/60'
  },
  {
    icon: XCircle,
    title: 'PROHIBITED USES',
    content: [
      'You may not share, distribute, or resell any content from our platform.',
      'You may not use automated systems to access or scrape our content.',
      'You may not attempt to reverse engineer or compromise our platform security.',
      'You may not use our services for any illegal or unauthorized purpose.',
      'Violation of these terms may result in immediate account termination without refund.'
    ],
    color: 'from-purple-600 to-pink-600',
    borderColor: 'border-purple-500/30 hover:border-pink-400/60'
  },
  {
    icon: AlertCircle,
    title: 'INTELLECTUAL PROPERTY',
    content: [
      'All content on AWFixer.VIP, including wallpapers, designs, and platform features, is protected by copyright.',
      'Content is licensed for personal use only and may not be redistributed.',
      'You retain ownership of any content you submit, but grant us a license to use it on our platform.',
      'Unauthorized use of our content may result in legal action.'
    ],
    color: 'from-pink-600 to-pink-700',
    borderColor: 'border-pink-500/30 hover:border-pink-400/60'
  },
  {
    icon: Scale,
    title: 'LIMITATION OF LIABILITY',
    content: [
      'AWFixer.VIP is provided "as is" without warranties of any kind.',
      'We are not liable for any indirect, incidental, or consequential damages.',
      'Our total liability is limited to the amount you paid in the last 12 months.',
      'We do not guarantee uninterrupted or error-free service.',
      'You use our services at your own risk.'
    ],
    color: 'from-purple-600 to-purple-700',
    borderColor: 'border-purple-500/30 hover:border-purple-400/60'
  }
]
</script>


