"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { useFrame } from "@react-three/fiber"
import gsap from "gsap"
import type { Group } from "three"

type EntranceApi = {
  progress: number
  ready: boolean
}

const EntranceCtx = createContext<EntranceApi>({ progress: 0, ready: false })

export function useEntrance() {
  return useContext(EntranceCtx)
}

export function phase(p: number, start: number, end: number) {
  if (p <= start) return 0
  if (p >= end) return 1
  const t = (p - start) / (end - start)
  return t * t * (3 - 2 * t)
}

export function EntranceProvider({
  children,
  active,
}: {
  children: ReactNode
  active: boolean
}) {
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const proxy = useRef({ t: 0 })

  useEffect(() => {
    if (!active) return
    proxy.current.t = 0
    setProgress(0)
    setReady(false)

    const tween = gsap.to(proxy.current, {
      t: 1,
      duration: 2.0,
      ease: "power3.out",
      onUpdate: () => setProgress(proxy.current.t),
      onComplete: () => {
        setProgress(1)
        setReady(true)
      },
    })

    return () => {
      tween.kill()
    }
  }, [active])

  const value = useMemo(() => ({ progress, ready }), [progress, ready])
  return <EntranceCtx.Provider value={value}>{children}</EntranceCtx.Provider>
}

export function EntranceGroup({ children }: { children: ReactNode }) {
  const group = useRef<Group>(null)
  const { progress } = useEntrance()

  useFrame(() => {
    if (!group.current) return
    const s = 0.9 + phase(progress, 0, 0.45) * 0.1
    group.current.scale.setScalar(s)
    group.current.visible = progress > 0.02
  })

  return <group ref={group}>{children}</group>
}
