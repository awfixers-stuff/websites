<template>
  <div class="min-h-screen bg-black text-white flex items-center justify-center px-4">
    <div class="fixed inset-0 bg-gradient-to-br from-black via-purple-950/20 to-black z-0" />
    <div 
      class="fixed inset-0 opacity-20 z-0" 
      :style="{ backgroundImage: patternUrl }"
    />
    
    <Card class="relative z-10 bg-gradient-to-br from-gray-900 to-black border-pink-500/30 rounded-none max-w-md w-full">
      <CardHeader class="text-center">
        <CardTitle class="text-3xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          SIGN IN
        </CardTitle>
        <CardDescription class="text-gray-400 text-lg">
          Access your exclusive VIP membership
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <Button
          @click="handleDiscordSignIn"
          :disabled="isLoading"
          class="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-lg py-6 rounded-none border-2 border-[#5865F2]/30 hover:border-[#4752C4] transition-all duration-300"
        >
          <template v-if="isLoading">
            <Loader2 class="w-5 h-5 mr-2 animate-spin" />
            CONNECTING...
          </template>
          <template v-else>
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            SIGN IN WITH DISCORD
          </template>
        </Button>
      </CardContent>
      <CardFooter class="flex justify-center">
        <Button
          variant="ghost"
          @click="navigate(ROUTES.home)"
          class="text-gray-500 hover:text-pink-400 border-transparent hover:border-pink-500/30 rounded-none"
        >
          Back to Home
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui'
import { authClient } from '@/lib/auth-client'
import { ROUTES } from '@/constants'
import { Loader2 } from 'lucide-vue-next'

const isLoading = ref(false)
const router = useRouter()

const patternUrl = "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-4H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"

const handleDiscordSignIn = async () => {
  isLoading.value = true
  try {
    await authClient.signIn.social({
      provider: 'discord',
      callbackURL: ROUTES.home
    })
  } catch (error) {
    console.error('Sign in error:', error)
    isLoading.value = false
  }
}

const navigate = (path: string) => {
  router.push(path)
}
</script>

