import { useEffect, useRef } from 'react'

export default function AnimatedBackground3D() {
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const handlePointerMove = (e: PointerEvent) => {
      const rect = scene.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      scene.style.setProperty('--tilt-x', `${y * -12}deg`)
      scene.style.setProperty('--tilt-y', `${x * 12}deg`)
      scene.style.setProperty('--parallax-x', `${x * 30}px`)
      scene.style.setProperty('--parallax-y', `${y * 30}px`)
    }

    const handlePointerLeave = () => {
      scene.style.setProperty('--tilt-x', '0deg')
      scene.style.setProperty('--tilt-y', '0deg')
      scene.style.setProperty('--parallax-x', '0px')
      scene.style.setProperty('--parallax-y', '0px')
    }

    scene.addEventListener('pointermove', handlePointerMove)
    scene.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      scene.removeEventListener('pointermove', handlePointerMove)
      scene.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  return (
    <div className="bg-3d" ref={sceneRef} aria-hidden="true">
      <div className="bg-3d__gradient" />
      <div className="bg-3d__mesh" />

      <div className="bg-3d__scene">
        <div className="bg-3d__grid" />

        <div className="bg-3d__orb bg-3d__orb--1" />
        <div className="bg-3d__orb bg-3d__orb--2" />
        <div className="bg-3d__orb bg-3d__orb--3" />

        <div className="bg-3d__ring bg-3d__ring--1" />
        <div className="bg-3d__ring bg-3d__ring--2" />
        <div className="bg-3d__ring bg-3d__ring--3" />

        <div className="bg-3d__cube bg-3d__cube--1">
          <div className="bg-3d__cube-face bg-3d__cube-face--front" />
          <div className="bg-3d__cube-face bg-3d__cube-face--back" />
          <div className="bg-3d__cube-face bg-3d__cube-face--right" />
          <div className="bg-3d__cube-face bg-3d__cube-face--left" />
          <div className="bg-3d__cube-face bg-3d__cube-face--top" />
          <div className="bg-3d__cube-face bg-3d__cube-face--bottom" />
        </div>

        <div className="bg-3d__cube bg-3d__cube--2">
          <div className="bg-3d__cube-face bg-3d__cube-face--front" />
          <div className="bg-3d__cube-face bg-3d__cube-face--back" />
          <div className="bg-3d__cube-face bg-3d__cube-face--right" />
          <div className="bg-3d__cube-face bg-3d__cube-face--left" />
          <div className="bg-3d__cube-face bg-3d__cube-face--top" />
          <div className="bg-3d__cube-face bg-3d__cube-face--bottom" />
        </div>

        <div className="bg-3d__particles">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="bg-3d__particle"
              style={{
                '--i': i,
                left: `${5 + i * 5.2}%`,
                top: `${10 + (i % 7) * 12}%`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      <div className="bg-3d__noise" />
    </div>
  )
}
