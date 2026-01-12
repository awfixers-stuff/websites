import { ref, computed, onMounted } from 'vue'
import { createAuthClient } from "better-auth/client"

const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  // For server-side rendering - use import.meta.env for Vite
  return import.meta.env.VITE_BETTER_AUTH_URL || 
    (import.meta.env.VITE_VERCEL_URL ? `https://${import.meta.env.VITE_VERCEL_URL}` : "http://localhost:5173");
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  basePath: "/api/auth",
});

// Vue composable for session
export function useSession() {
  const session = ref<any>(null)
  const isPending = ref(true)

  const fetchSession = async () => {
    try {
      const response = await fetch(`${getBaseURL()}/api/auth/session`, {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        session.value = data
      } else {
        session.value = null
      }
    } catch (error) {
      console.error('Session fetch error:', error)
      session.value = null
    } finally {
      isPending.value = false
    }
  }

  onMounted(() => {
    fetchSession()
  })

  return {
    data: computed(() => session.value),
    isPending: computed(() => isPending.value)
  }
}

export const signIn = authClient.signIn
export const signOut = authClient.signOut
