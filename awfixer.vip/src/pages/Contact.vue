<template>
  <Layout>
    <section class="relative pt-32 md:pt-48 pb-32 px-4">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 class="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-pink-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
            CONTACT US
          </h1>
          <p class="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">
            GET IN TOUCH • WE'RE HERE TO HELP • VIP SUPPORT
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 mb-12">
          <Card class="bg-gradient-to-br from-gray-900/90 via-gray-900/50 to-black/90 backdrop-blur-sm border-2 border-pink-500/30 hover:border-pink-400/60 rounded-2xl overflow-hidden group">
            <CardHeader>
              <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-600 to-pink-700 rounded-xl mb-4">
                <Mail class="w-8 h-8 text-black" />
              </div>
              <CardTitle class="text-2xl font-black text-pink-400">EMAIL SUPPORT</CardTitle>
              <CardDescription class="text-gray-300 text-base">
                For general inquiries and support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a 
                href="mailto:support@awfixer.vip" 
                class="text-pink-400 hover:text-pink-300 transition-colors text-lg font-semibold"
              >
                support@awfixer.vip
              </a>
            </CardContent>
          </Card>

          <Card class="bg-gradient-to-br from-gray-900/90 via-gray-900/50 to-black/90 backdrop-blur-sm border-2 border-purple-500/30 hover:border-purple-400/60 rounded-2xl overflow-hidden group">
            <CardHeader>
              <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl mb-4">
                <MessageSquare class="w-8 h-8 text-black" />
              </div>
              <CardTitle class="text-2xl font-black text-purple-400">QUICK RESPONSE</CardTitle>
              <CardDescription class="text-gray-300 text-base">
                VIP members get priority support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-gray-300 text-base">
                Response time: 24-48 hours for standard inquiries. VIP members receive priority support.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card class="bg-gradient-to-br from-gray-900/90 via-gray-900/50 to-black/90 backdrop-blur-sm border-2 border-pink-500/30 hover:border-pink-400/60 rounded-2xl overflow-hidden">
          <CardHeader>
            <CardTitle class="text-3xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              SEND US A MESSAGE
            </CardTitle>
            <CardDescription class="text-gray-300 text-lg">
              Fill out the form below and we'll get back to you as soon as possible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form class="space-y-6" @submit.prevent>
              <div class="space-y-2">
                <Label for="name" class="text-gray-300 font-semibold">
                  NAME
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  class="bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-pink-500 focus:ring-pink-500"
                />
              </div>
              <div class="space-y-2">
                <Label for="email" class="text-gray-300 font-semibold">
                  EMAIL
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  class="bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-pink-500 focus:ring-pink-500"
                />
              </div>
              <div class="space-y-2">
                <Label for="subject" class="text-gray-300 font-semibold">
                  SUBJECT
                </Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="What's this about?"
                  class="bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-pink-500 focus:ring-pink-500"
                />
              </div>
              <div class="space-y-2">
                <Label for="message" class="text-gray-300 font-semibold">
                  MESSAGE
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more..."
                  :rows="6"
                  class="bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-pink-500 focus:ring-pink-500 resize-none"
                />
              </div>
              <Button
                type="submit"
                class="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-black font-black text-lg px-8 py-6 rounded-lg border-2 border-pink-500/30 hover:border-pink-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50"
              >
                <Send class="w-5 h-5 mr-2" />
                SEND MESSAGE
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  </Layout>
</template>

<script setup lang="ts">
import { Mail, MessageSquare, Send } from 'lucide-vue-next'
import { Button, Input, Textarea, Label } from '@/components/ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import Layout from '@/components/Layout.vue'
</script>

