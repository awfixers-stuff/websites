<template>
  <Layout>
    <!-- Hero Section - Enhanced -->
    <section class="relative pt-32 md:pt-48 pb-32 px-4 z-10">
      <div class="max-w-7xl mx-auto text-center">
        <div class="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Badge class="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 text-sm font-bold tracking-wider px-4 py-1.5 shadow-lg shadow-pink-500/20">
            PREMIUM ACCESS ONLY
          </Badge>
        </div>
        <h1 class="text-6xl md:text-8xl lg:text-9xl font-black mb-6 bg-gradient-to-r from-white via-pink-500 to-purple-600 bg-clip-text text-transparent tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          AWFixer
          <span class="text-4xl md:text-6xl lg:text-7xl text-pink-500 block md:inline">.VIP</span>
        </h1>
        <p class="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto font-light tracking-wide animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          UNLOCK THE VAULT • EXCLUSIVE CONTENT • VIP ACCESS
        </p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <Magnet :padding="80" :magnet-strength="3">
            <Button
              as-child
              size="lg"
              class="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-black font-black text-lg px-8 py-6 rounded-lg border-2 border-pink-500/30 hover:border-pink-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50"
            >
              <a :href="HERO_BUTTONS.unlockAccess.link">
                <Crown class="w-6 h-6 mr-3" />
                {{ HERO_BUTTONS.unlockAccess.text }}
                <ArrowRight class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </Magnet>
          <Magnet :padding="80" :magnet-strength="3">
            <Button
              as-child
              variant="outline"
              size="lg"
              class="border-2 border-pink-500/50 text-pink-400 hover:bg-pink-500/10 hover:border-pink-400 rounded-lg font-bold text-lg px-8 py-6 backdrop-blur-sm bg-black/20"
            >
              <a :href="HERO_BUTTONS.previewContent.link">
                <Eye class="w-6 h-6 mr-3" />
                {{ HERO_BUTTONS.previewContent.text }}
              </a>
            </Button>
          </Magnet>
        </div>
      </div>
    </section>

    <!-- Pricing Section - Enhanced -->
    <section id="pricing" class="relative py-32 px-4 z-10">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 class="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            CHOOSE YOUR TIER
          </h2>
          <p class="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            SELECT YOUR ACCESS LEVEL • UNLOCK EXCLUSIVE BENEFITS
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          <Card
            v-for="(plan, index) in PRICING_PLANS"
            :key="plan.id"
            v-memo="[plan.id, plan.price]"
            :id="plan.id"
            :class="[
              'relative bg-gradient-to-br from-pink-900/30 via-purple-900/20 to-black/90 backdrop-blur-sm border-2 rounded-2xl overflow-hidden group animate-in fade-in slide-in-from-bottom-4 duration-700',
              plan.borderColor,
              ANIMATIONS.transitionSlow,
              'hover:shadow-[0_0_60px_rgba(255,0,110,0.4)]'
            ]"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="absolute inset-0 bg-gradient-to-t from-pink-600/10 via-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-purple-600/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <CardHeader class="text-center pb-8 relative z-10 pt-8">
              <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-600 to-pink-700 rounded-xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-pink-500/30">
                <component :is="plan.icon" class="w-10 h-10 text-black" />
              </div>
              <Badge :class="['absolute top-6 left-6 font-black px-3 py-1 shadow-lg', plan.badgeColor]">
                {{ plan.badge }}
              </Badge>
              <CardTitle :class="['text-3xl md:text-4xl font-black mb-2', plan.textColor]">{{ plan.name }}</CardTitle>
              <CardDescription class="text-gray-300 text-lg">{{ plan.description }}</CardDescription>
              <div class="mt-8">
                <span :class="['text-6xl md:text-7xl font-black', plan.textColor]">${{ plan.price }}</span>
                <span class="text-gray-400 text-xl">/{{ plan.period }}</span>
              </div>
            </CardHeader>
            
            <CardContent class="space-y-5 relative z-10 px-6">
              <div
                v-for="(feature, idx) in plan.features"
                :key="idx"
                class="flex items-start gap-4 group/item"
              >
                <div class="w-2 h-2 bg-pink-500 rounded-full mt-2 group-hover/item:scale-150 transition-transform" />
                <span class="text-gray-200 font-medium text-base flex-1">{{ feature }}</span>
              </div>
            </CardContent>
            
            <CardFooter class="pt-8 pb-6 relative z-10 px-6">
              <Magnet :padding="60" :magnet-strength="2.5">
                <Button
                  as-child
                  :class="[
                    'w-full rounded-xl font-bold text-lg py-6 shadow-lg',
                    plan.buttonColor,
                    ANIMATIONS.transition,
                    plan.id === 'superpremium' ? ANIMATIONS.scale : ''
                  ]"
                >
                  <a :href="plan.buttonLink">
                    <Crown v-if="plan.id === 'superpremium'" class="w-5 h-5 mr-2" />
                    {{ plan.buttonText }}
                    <ArrowRight class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </Magnet>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>

    <!-- Features Section - Enhanced -->
        <section id="features" class="relative py-32 px-4 bg-gradient-to-b from-pink-950/20 via-purple-900/10 to-transparent z-10">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 class="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
            PREMIUM FEATURES
          </h2>
          <p class="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            EXCLUSIVE BENEFITS • VIP PERKS • PREMIUM ACCESS
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 lg:gap-10">
          <a
            v-for="feature in FEATURES"
            :key="feature.id"
            v-memo="[feature.id]"
            :href="feature.link"
            class="block no-underline"
          >
            <Card
              :class="[
                'relative bg-gradient-to-br from-pink-900/30 via-purple-900/20 to-black/90 backdrop-blur-sm border-2 rounded-2xl overflow-hidden group cursor-pointer h-full',
                feature.borderColor,
                ANIMATIONS.transitionSlow,
                'hover:shadow-[0_0_40px_rgba(255,0,110,0.4)]'
              ]"
            >
               <div class="absolute inset-0 bg-gradient-to-br from-pink-600/10 via-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader class="text-center pt-8 relative z-10">
                <div :class="['inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r rounded-xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg', feature.iconColor]">
                  <component :is="feature.icon" class="w-10 h-10 text-black" />
                </div>
                <CardTitle class="text-2xl font-black text-pink-400 mb-3">{{ feature.name }}</CardTitle>
              </CardHeader>
              <CardContent class="text-center pb-8 relative z-10">
                <CardDescription class="text-gray-300 text-base leading-relaxed">
                  {{ feature.description }}
                </CardDescription>
                <div class="mt-6 flex items-center justify-center gap-2 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span class="text-sm font-semibold">Learn more</span>
                  <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </a>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script setup lang="ts">
import Magnet from '@/components/Magnet.vue'
import { Button } from '@/components/ui'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui'
import { Badge } from '@/components/ui'
import { Crown, Eye, ArrowRight } from 'lucide-vue-next'
import { PRICING_PLANS, FEATURES, ANIMATIONS, HERO_BUTTONS } from '@/constants'
import Layout from '@/components/Layout.vue'
</script>

