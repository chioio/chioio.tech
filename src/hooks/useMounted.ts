import { useRef, useEffect } from 'react'

/**
 * Hook to use to track mounted state.
 *
 * @param fn callback when window mounted.
 */
export const useMounted = (fn: Function) => {
  // Mounted ref
  const mounted = useRef(false)

  useEffect(() => {
    mounted.current = true
    // Run callback when mounted
    fn()
  }, [mounted.current])
}
