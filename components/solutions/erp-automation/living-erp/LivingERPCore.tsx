"use client"

import { useMemo } from "react"
import ERPModule from "./ERPModule"
import DataStreams from "./DataStreams"
import EnterpriseConnections from "./EnterpriseConnections"
import ParticleField from "./ParticleField"
import CameraRig from "./CameraRig"
import Lighting from "./Lighting"
import Effects from "./Effects"
import {
  ErpAnimProvider,
  stackPositions,
  useErpAnimationController,
  useParallax,
} from "./hooks/useERPAnimation"
import { ERP_DOMAINS, type ErpQuality } from "./hooks/useErpQuality"

type Props = {
  quality: ErpQuality
}

function CoreInner({ quality }: Props) {
  const domains = useMemo(() => {
    if (quality.isMobile) {
      const ids = ["finance", "crm", "inventory", "operations"] as const
      return ERP_DOMAINS.filter((d) => ids.includes(d.id as (typeof ids)[number]))
    }
    return ERP_DOMAINS.slice(0, quality.moduleCount)
  }, [quality.isMobile, quality.moduleCount])

  const positions = useMemo(
    () => stackPositions(domains.length, quality.spacing),
    [domains.length, quality.spacing],
  )

  const api = useErpAnimationController(domains.length)
  const parallax = useParallax(0.09)

  return (
    <ErpAnimProvider api={api}>
      <Lighting />
      <group
        ref={parallax}
        scale={quality.scale}
        onPointerOver={() => {
          api.setHovered(true)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          api.setHovered(false)
          document.body.style.cursor = "auto"
        }}
      >
        <ParticleField
          count={quality.ambientCount}
          modulePositions={positions}
        />
        <DataStreams positions={positions} count={quality.packetCount} />
        <EnterpriseConnections positions={positions} />
        {domains.map((domain, i) => (
          <ERPModule
            key={domain.id}
            index={i}
            domain={domain.id}
            basePosition={positions[i]}
          />
        ))}
      </group>
      <CameraRig />
      <Effects enabled={quality.enableSoftFx} />
    </ErpAnimProvider>
  )
}

/**
 * Living ERP Core — stacked enterprise modules that separate, sync, and reunite.
 */
export default function LivingERPCore({ quality }: Props) {
  return <CoreInner quality={quality} />
}
