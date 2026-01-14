<template>
  <div class="card-nav-auth-container">
    <!-- Show user info when authenticated -->
    <div v-if="session && !isPending" class="user-info flex items-center gap-3">
      <div class="user-avatar">
        <div class="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-black font-bold text-sm">
          {{ userInitial }}
        </div>
      </div>
      <div class="user-details">
        <div class="text-white text-sm font-medium">
          {{ session.user?.name || 'VIP Member' }}
        </div>
        <div class="text-gray-400 text-xs">
          PREMIUM ACCESS
        </div>
      </div>
      <Button
        @click="handleSignOut"
        variant="ghost"
        class="text-gray-400 hover:text-pink-400 border-transparent hover:border-pink-500/30 rounded-lg px-3 py-1 text-xs transition-all duration-300"
      >
        Sign Out
      </Button>
    </div>
    
    <!-- Show Get Started button when not authenticated -->
    <a
      v-else-if="!isPending"
      :href="ROUTES.getStarted"
      class="card-nav-cta-button hidden md:inline-flex border-0 rounded-[calc(0.75rem-0.2rem)] px-4 items-center h-full font-medium cursor-pointer transition-colors duration-300 hover:opacity-90"
      :style="{ backgroundColor: buttonBgColor, color: buttonTextColor }"
    >
      Get Started
    </a>
    
    <!-- Loading state -->
    <div v-else class="w-16 h-8 flex items-center justify-center">
      <div class="w-4 h-4 border-2 border-pink-500/30 border-t-pink-500 rounded-full animate-spin"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSession, signOut } from '@/lib/auth-client'
import { Button } from '@/components/ui'
import { ROUTES } from '@/constants'

interface CardNavAuthProps {
  buttonBgColor?: string
  buttonTextColor?: string
}

const props = withDefaults(defineProps<CardNavAuthProps>(), {
  buttonBgColor: '#ff006e',
  buttonTextColor: '#000000'
})

const { data: session, isPending } = useSession()

const userInitial = computed(() => {
  if (!session.value?.user?.name) return 'V'
  return session.value.user.name.charAt(0).toUpperCase()
})

const handleSignOut = async () => {
  try {
    await signOut()
    // Navigate to home after sign out
    window.location.href = ROUTES.home
  } catch (error) {
    console.error('Sign out error:', error)
  }
}
</script>