"use client"

import { useMemo } from "react"
import * as THREE from "three"

/** Graceful curve: disordered left → structured right */
export function useJourneyCurve() {
  return useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-4.2, 0.35, 0.4),
        new THREE.Vector3(-2.6, 0.15, 0.55),
        new THREE.Vector3(-1.2, 0.05, 0.2),
        new THREE.Vector3(0.2, 0, 0),
        new THREE.Vector3(1.6, -0.05, -0.15),
        new THREE.Vector3(3.0, -0.08, -0.25),
        new THREE.Vector3(4.2, -0.05, -0.1),
      ]),
    [],
  )
}

/** Normalized positions along the curve for the five chambers */
export const CHAMBER_US = [0.12, 0.32, 0.5, 0.68, 0.86] as const

export function chamberPositions(curve: THREE.CatmullRomCurve3) {
  return CHAMBER_US.map((u) => curve.getPointAt(u))
}
