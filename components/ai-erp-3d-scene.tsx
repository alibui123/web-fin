"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

/* ─── Types ──────────────────────────────────────────────────────────────── */
type ModuleNode = {
  label: string
  accent: string
  accentHex: number
  angle: number
  radius: number
  baseY: number
  group: THREE.Group
  line: THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>
  pulseOffset: number
  dataParticles: DataParticle[]
}

type DataParticle = {
  mesh: THREE.Mesh
  progress: number
  speed: number
  active: boolean
}

/* ─── Canvas texture helpers ─────────────────────────────────────────────── */
function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  w: number, h: number,
  r: number,
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

function createModuleTexture(label: string, accent: string, icon: string) {
  const W = 640, H = 224
  const canvas = document.createElement("canvas")
  canvas.width = W; canvas.height = H
  const ctx = canvas.getContext("2d")!

  /* glass background */
  const bg = ctx.createLinearGradient(0, 0, W, H)
  bg.addColorStop(0, "rgba(8,18,38,0.97)")
  bg.addColorStop(1, "rgba(6,14,28,0.90)")
  ctx.fillStyle = bg
  roundedRect(ctx, 4, 4, W - 8, H - 8, 20)
  ctx.fill()

  /* subtle inner highlight (top sheen) */
  const sheen = ctx.createLinearGradient(0, 4, 0, H * 0.5)
  sheen.addColorStop(0, "rgba(255,255,255,0.07)")
  sheen.addColorStop(1, "rgba(255,255,255,0)")
  ctx.fillStyle = sheen
  roundedRect(ctx, 4, 4, W - 8, H * 0.55, 20)
  ctx.fill()

  /* accent border */
  ctx.strokeStyle = accent
  ctx.lineWidth = 3
  ctx.shadowColor = accent
  ctx.shadowBlur = 14
  roundedRect(ctx, 4, 4, W - 8, H - 8, 20)
  ctx.stroke()
  ctx.shadowBlur = 0

  /* left accent stripe */
  const stripe = ctx.createLinearGradient(0, 0, 0, H)
  stripe.addColorStop(0, accent)
  stripe.addColorStop(1, "rgba(0,0,0,0)")
  ctx.fillStyle = stripe
  roundedRect(ctx, 4, 4, 6, H - 8, 3)
  ctx.fill()

  /* icon area */
  ctx.font = "bold 56px serif"
  ctx.textAlign = "left"
  ctx.textBaseline = "middle"
  ctx.fillStyle = accent
  ctx.shadowColor = accent
  ctx.shadowBlur = 18
  ctx.fillText(icon, 36, H / 2 - 10)
  ctx.shadowBlur = 0

  /* module label */
  ctx.fillStyle = "#ffffff"
  ctx.textAlign = "left"
  ctx.textBaseline = "alphabetic"
  ctx.font = "700 52px 'Inter', 'Arial', sans-serif"
  ctx.fillText(label, 108, H / 2 + 4)

  /* "ERP MODULE" tag */
  ctx.font = "400 23px 'Inter', 'Arial', sans-serif"
  ctx.fillStyle = accent
  ctx.globalAlpha = 0.75
  ctx.fillText("ERP MODULE", 110, H / 2 + 32)
  ctx.globalAlpha = 1

  /* live indicator dot */
  ctx.beginPath()
  ctx.arc(W - 38, 36, 9, 0, Math.PI * 2)
  ctx.fillStyle = accent
  ctx.shadowColor = accent
  ctx.shadowBlur = 16
  ctx.fill()
  ctx.shadowBlur = 0

  /* corner grid lines (subtle decoration) */
  ctx.strokeStyle = "rgba(255,255,255,0.04)"
  ctx.lineWidth = 1
  for (let i = 0; i < 4; i++) {
    ctx.beginPath()
    ctx.moveTo(W - 8, 50 + i * 18)
    ctx.lineTo(W - 30, 50 + i * 18)
    ctx.stroke()
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.needsUpdate = true
  return tex
}

function createHubTexture() {
  const W = 512, H = 512
  const canvas = document.createElement("canvas")
  canvas.width = W; canvas.height = H
  const ctx = canvas.getContext("2d")!
  const cx = W / 2, cy = H / 2

  /* radial glow rings */
  for (let r = 200; r >= 20; r -= 30) {
    const g = ctx.createRadialGradient(cx, cy, r - 12, cx, cy, r)
    g.addColorStop(0, "rgba(56,189,248,0)")
    g.addColorStop(0.5, `rgba(56,189,248,${0.018 + (200 - r) * 0.0005})`)
    g.addColorStop(1, "rgba(56,189,248,0)")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)
  }

  /* concentric tech rings */
  const radii = [48, 82, 120, 160]
  radii.forEach((r) => {
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(56,189,248,${0.15 - r * 0.0004})`
    ctx.lineWidth = 0.8
    ctx.stroke()
  })

  /* tick marks on outer ring */
  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * Math.PI * 2
    const inner = i % 3 === 0 ? 148 : 152
    ctx.beginPath()
    ctx.moveTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner)
    ctx.lineTo(cx + Math.cos(a) * 160, cy + Math.sin(a) * 160)
    ctx.strokeStyle = i % 3 === 0 ? "rgba(56,189,248,0.6)" : "rgba(56,189,248,0.2)"
    ctx.lineWidth = i % 3 === 0 ? 1.2 : 0.6
    ctx.stroke()
  }

  /* AI text */
  ctx.font = "bold 64px 'Inter','Arial',sans-serif"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillStyle = "rgba(56,189,248,0.9)"
  ctx.shadowColor = "#38bdf8"
  ctx.shadowBlur = 24
  ctx.fillText("AI", cx, cy)
  ctx.shadowBlur = 0

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.needsUpdate = true
  return tex
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function AiErp3DScene({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    /* ── Scene & Renderer ─────────────────────────────────────────────── */
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0a1322, 0.026)

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 120)
    camera.position.set(0, 2.2, 13.5)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block;mix-blend-mode:screen;opacity:0.92;pointer-events:none;"
    container.appendChild(renderer.domElement)

    const root = new THREE.Group()
    scene.add(root)

    /* ── Lighting ─────────────────────────────────────────────────────── */
    scene.add(new THREE.AmbientLight(0x123050, 1.2))

    const key = new THREE.DirectionalLight(0xc8e8ff, 1.8)
    key.position.set(6, 10, 10)
    scene.add(key)

    const fill = new THREE.DirectionalLight(0x001833, 0.8)
    fill.position.set(-8, -4, 4)
    scene.add(fill)

    const coreGlow = new THREE.PointLight(0x38bdf8, 2.6, 16)
    coreGlow.position.set(0, 0, 0)
    scene.add(coreGlow)

    const rimCyan = new THREE.PointLight(0x06b6d4, 1.3, 24)
    rimCyan.position.set(-5, 3, 6)
    scene.add(rimCyan)

    const rimAmber = new THREE.PointLight(0xf59e0b, 0.65, 20)
    rimAmber.position.set(5.5, -2, 5)
    scene.add(rimAmber)

    const rimPurple = new THREE.PointLight(0x7c3aed, 0.55, 20)
    rimPurple.position.set(0, -4, -6)
    scene.add(rimPurple)

    /* ── Star field (2 layers) ────────────────────────────────────────── */
    const makeStars = (count: number, spread: number, size: number, color: number, opacity: number) => {
      const geo = new THREE.BufferGeometry()
      const pos = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * spread
        pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.7
        pos[i * 3 + 2] = (Math.random() - 0.5) * spread - 4
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
      return new THREE.Points(
        geo,
        new THREE.PointsMaterial({ color, size, transparent: true, opacity }),
      )
    }
    scene.add(makeStars(160, 56, 0.022, 0xc8e4ff, 0.32))
    scene.add(makeStars(80, 42, 0.016, 0x7ec8e3, 0.2))

    /* ── Hub ──────────────────────────────────────────────────────────── */
    const hubGroup = new THREE.Group()
    root.add(hubGroup)

    /* outer glass sphere */
    const hubOuter = new THREE.Mesh(
      new THREE.SphereGeometry(1.05, 48, 48),
      new THREE.MeshPhysicalMaterial({
        color: 0x0a1e3a,
        transmission: 0.88,
        thickness: 1.2,
        roughness: 0.04,
        metalness: 0.0,
        ior: 1.45,
        clearcoat: 1,
        clearcoatRoughness: 0.02,
        transparent: true,
        opacity: 0.88,
        emissive: 0x0a2240,
        emissiveIntensity: 0.45,
      }),
    )
    hubGroup.add(hubOuter)

    /* inner glowing core sphere */
    const hubCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0x001020,
        emissive: 0x38bdf8,
        emissiveIntensity: 2.2,
        roughness: 0.1,
        metalness: 0.05,
      }),
    )
    hubGroup.add(hubCore)

    /* hub sprite texture */
    const hubTex = createHubTexture()
    const hubSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: hubTex, transparent: true, depthWrite: false }),
    )
    hubSprite.scale.set(2.4, 2.4, 1)
    hubGroup.add(hubSprite)

    /* rotating tech rings around hub */
    const makeTechRing = (radius: number, tubeR: number, color: number, tiltX: number, tiltZ: number) => {
      const mesh = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tubeR, 8, 128),
        new THREE.MeshStandardMaterial({
          color,
          emissive: color,
          emissiveIntensity: 0.7,
          roughness: 0.2,
          metalness: 0.3,
          transparent: true,
          opacity: 0.75,
        }),
      )
      mesh.rotation.x = tiltX
      mesh.rotation.z = tiltZ
      return mesh
    }
    const ring1 = makeTechRing(1.48, 0.022, 0x38bdf8, Math.PI / 2, 0)
    const ring2 = makeTechRing(1.65, 0.015, 0x7c3aed, 0.4, 0.9)
    const ring3 = makeTechRing(1.82, 0.010, 0x06b6d4, -0.5, 0.3)
    root.add(ring1, ring2, ring3)

    /* ── Module definitions ───────────────────────────────────────────── */
    const moduleDefs = [
      { label: "Finance",    accent: "#22d3ee", accentHex: 0x22d3ee, icon: "💰" },
      { label: "CRM",        accent: "#818cf8", accentHex: 0x818cf8, icon: "🤝" },
      { label: "Inventory",  accent: "#fb923c", accentHex: 0xfb923c, icon: "📦" },
      { label: "Operations", accent: "#34d399", accentHex: 0x34d399, icon: "⚙️" },
      { label: "Analytics",  accent: "#f472b6", accentHex: 0xf472b6, icon: "📊" },
    ]

    const RADIUS = 3.8

    /* ── Data particle helper ─────────────────────────────────────────── */
    const makeDataParticle = (accentHex: number): DataParticle => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 8, 8),
        new THREE.MeshStandardMaterial({
          color: accentHex,
          emissive: accentHex,
          emissiveIntensity: 2.5,
        }),
      )
      root.add(mesh)
      return { mesh, progress: Math.random(), speed: 0.004 + Math.random() * 0.006, active: true }
    }

    /* ── Build modules ────────────────────────────────────────────────── */
    const modules: ModuleNode[] = moduleDefs.map((def, i) => {
      const group = new THREE.Group()

      /* card body */
      const cardMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(def.accentHex).multiplyScalar(0.08),
        emissive: new THREE.Color(def.accentHex),
        emissiveIntensity: 0.12,
        roughness: 0.15,
        metalness: 0.55,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.88,
      })
      const card = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.62, 0.08), cardMat)
      group.add(card)

      /* card edge glow frame (thin emissive outline) */
      const edgeGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.18, 0.62, 0.08))
      const edgeLine = new THREE.LineSegments(
        edgeGeo,
        new THREE.LineBasicMaterial({ color: def.accentHex, transparent: true, opacity: 0.6 }),
      )
      group.add(edgeLine)

      /* status dot */
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.065, 12, 12),
        new THREE.MeshStandardMaterial({
          color: def.accentHex,
          emissive: def.accentHex,
          emissiveIntensity: 3.0,
        }),
      )
      dot.position.set(0.42, 0.18, 0.08)
      group.add(dot)

      /* label texture sprite */
      const tex = createModuleTexture(def.label, def.accent, def.icon)
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }),
      )
      sprite.scale.set(2.6, 0.9, 1)
      sprite.position.set(0, 0.86, 0.06)
      group.add(sprite)

      root.add(group)

      /* connection line */
      const lineMat = new THREE.LineBasicMaterial({
        color: def.accentHex,
        transparent: true,
        opacity: 0.35,
        linewidth: 1,
      })
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
      const line = new THREE.Line(lineGeo, lineMat)
      root.add(line)

      /* data particles along connection */
      const dataParticles = [makeDataParticle(def.accentHex), makeDataParticle(def.accentHex)]

      return {
        label: def.label,
        accent: def.accent,
        accentHex: def.accentHex,
        angle: (Math.PI * 2 * i) / moduleDefs.length,
        radius: RADIUS,
        baseY: i % 2 === 0 ? 0.28 : -0.14,
        group,
        line,
        pulseOffset: (i / moduleDefs.length) * Math.PI * 2,
        dataParticles,
      }
    })

    /* ── Outer decorative orbit ring ──────────────────────────────────── */
    const outerRing = new THREE.Mesh(
      new THREE.TorusGeometry(RADIUS * 1.1, 0.012, 6, 256),
      new THREE.MeshStandardMaterial({
        color: 0x1a2a40,
        emissive: 0x1e3a55,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.4,
      }),
    )
    outerRing.rotation.x = Math.PI / 2 + 0.15
    root.add(outerRing)

    /* small markers on outer ring at module angles */
    modules.forEach((m) => {
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 8, 8),
        new THREE.MeshStandardMaterial({
          color: m.accentHex,
          emissive: m.accentHex,
          emissiveIntensity: 1.8,
        }),
      )
      root.add(marker)
    })

    /* ── Mouse interaction ────────────────────────────────────────────── */
    const mouse = new THREE.Vector2()
    const targetRot = new THREE.Vector2()
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const onPointerMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect()
      mouse.x = ((e.clientX - r.left) / r.width - 0.5)
      mouse.y = ((e.clientY - r.top) / r.height - 0.5)
      targetRot.x = mouse.y * 0.18
      targetRot.y = mouse.x * 0.26
    }
    const onPointerLeave = () => { targetRot.set(0, 0) }

    const resize = () => {
      const w = container.clientWidth, h = container.clientHeight
      if (!w || !h) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
    }
    window.addEventListener("resize", resize)
    container.addEventListener("pointermove", onPointerMove)
    container.addEventListener("pointerleave", onPointerLeave)
    resize()

    /* ── Animation loop ───────────────────────────────────────────────── */
    const clock = new THREE.Clock()
    let rafId = 0

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      /* root rotation */
      const autoY = prefersReduced ? 0 : t * 0.075
      root.rotation.x = THREE.MathUtils.lerp(root.rotation.x, targetRot.x, 0.055)
      root.rotation.y = THREE.MathUtils.lerp(root.rotation.y, autoY + targetRot.y, 0.048)

      /* hub animations */
      hubGroup.rotation.y = t * 0.35
      hubOuter.scale.setScalar(1 + Math.sin(t * 1.2) * 0.022)
      hubCore.scale.setScalar(1 + Math.sin(t * 2.8) * 0.045)
      hubCore.material.emissiveIntensity = 2.0 + Math.sin(t * 1.8) * 0.35

      /* core glow pulse */
      coreGlow.intensity = 2.2 + Math.sin(t * 2.2) * 0.35

      /* rings */
      ring1.rotation.z = t * 0.22
      ring2.rotation.y = t * 0.18
      ring2.rotation.x = 0.4 + Math.sin(t * 0.3) * 0.08
      ring3.rotation.z = -t * 0.14
      ring3.rotation.x = -0.5 + Math.cos(t * 0.25) * 0.06

      /* modules + data particles */
      modules.forEach((m, idx) => {
        const orbit = m.angle + t * 0.065
        const yOsc = Math.sin(t * 0.55 + idx * 1.2) * 0.065
        const x = Math.cos(orbit) * m.radius
        const z = Math.sin(orbit) * m.radius

        m.group.position.set(x, m.baseY + yOsc, z)
        m.group.lookAt(new THREE.Vector3(0, 0.15, 0))

        /* pulse emissive on card */
        const card = m.group.children[0] as THREE.Mesh
        const mat = card.material as THREE.MeshPhysicalMaterial
        mat.emissiveIntensity = 0.08 + Math.sin(t * 1.6 + m.pulseOffset) * 0.06

        /* connection line with animated opacity */
        const lp = m.line.geometry.attributes.position as THREE.BufferAttribute
        lp.setXYZ(0, 0, 0, 0)
        lp.setXYZ(1, x * 0.9, (m.baseY + yOsc) * 0.85, z * 0.9)
        lp.needsUpdate = true
        m.line.material.opacity = 0.25 + Math.sin(t * 2.0 + m.pulseOffset) * 0.18

        /* data particles traveling along connection */
        m.dataParticles.forEach((dp, pi) => {
          dp.progress += dp.speed
          if (dp.progress > 1) dp.progress = 0
          const p = dp.progress
          const px = x * 0.9 * p
          const py = (m.baseY + yOsc) * 0.85 * p
          const pz = z * 0.9 * p
          dp.mesh.position.set(px, py, pz)
          // fade at ends
          const fade = Math.sin(p * Math.PI)
          ;(dp.mesh.material as THREE.MeshStandardMaterial).opacity = fade
          ;(dp.mesh.material as THREE.MeshStandardMaterial).transparent = true
          _ = pi
        })
      })

      renderer.render(scene, camera)
    }

    let _ = 0
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", resize)
      container.removeEventListener("pointermove", onPointerMove)
      container.removeEventListener("pointerleave", onPointerLeave)
      scene.traverse((obj) => {
        const m = obj as THREE.Mesh
        if (m.geometry) m.geometry.dispose()
        if (Array.isArray(m.material)) m.material.forEach((x) => x.dispose())
        else if (m.material) (m.material as THREE.Material).dispose()
      })
      renderer.dispose()
      if (renderer.domElement.parentNode === container)
        container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[280px] ${className}`}
      aria-hidden="true"
    />
  )
}