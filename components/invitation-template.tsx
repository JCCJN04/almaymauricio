"use client"

import { useState, useEffect, useMemo, useId, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface InvitationTemplateProps {
  guestName?: string
  guestMessage?: string
  guestDetails?: string[]
}

type IconProps = {
  className?: string
}

function OrnateCrossIcon({ className }: IconProps) {
  const uniqueId = useId()
  const gradientId = `${uniqueId}-cross-gradient`
  const glowId = `${uniqueId}-cross-glow`
  const haloId = `${uniqueId}-cross-halo`

  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-hidden="true"
      className={className ? `${className} shrink-0` : "shrink-0"}
    >
      <defs>
        <radialGradient id={glowId} cx="32" cy="32" r="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f8f0e4" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#f0dcc0" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#e0c19a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={gradientId} x1="18" y1="16" x2="46" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef6e8" />
          <stop offset="45%" stopColor="#f3d9ad" />
          <stop offset="100%" stopColor="#caa777" />
        </linearGradient>
        <linearGradient id={haloId} x1="32" y1="6" x2="32" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fff7ec" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#d9b58c" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="29" fill={`url(#${glowId})`} />
      <circle cx="32" cy="32" r="30" stroke={`url(#${haloId})`} strokeWidth="1.6" fill="none" />
      <path
        d="M32 12v40"
        stroke={`url(#${gradientId})`}
        strokeWidth="5.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 26h24"
        stroke={`url(#${gradientId})`}
        strokeWidth="5.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 26v-8c0-1.6 1.3-2.9 2.9-2.9h6.2c1.6 0 2.9 1.3 2.9 2.9v8"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.85"
      />
    </svg>
  )
}

function RadiantBloomIcon({ className }: IconProps) {
  const uniqueId = useId()
  const petalId = `${uniqueId}-bloom-petal`
  const centerId = `${uniqueId}-bloom-center`

  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-hidden="true"
      className={className ? `${className} shrink-0` : "shrink-0"}
    >
      <defs>
        <radialGradient id={petalId} cx="32" cy="32" r="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fff1ea" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#f8d5c6" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#e6b2a3" stopOpacity="0.1" />
        </radialGradient>
        <radialGradient id={centerId} cx="32" cy="32" r="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffe7d4" />
          <stop offset="60%" stopColor="#f2c4a9" />
          <stop offset="100%" stopColor="#d1a187" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="26" fill={`url(#${petalId})`} />
      <path
        d="M32 16c-5.8 0-10.5 4.7-10.5 10.5 0 2.6 0.9 4.9 2.5 6.8C20 33 16 35.8 16 40.6 16 46 20.4 50 25.8 50c2.7 0 5.1-1 6.9-2.7 1.8 1.7 4.2 2.7 6.9 2.7C44 50 48 46 48 40.6c0-4.8-4-7.6-8-7.3 1.6-1.9 2.5-4.2 2.5-6.8C42.5 20.7 37.8 16 32 16Z"
        fill={`url(#${petalId})`}
        opacity="0.9"
      />
      <circle cx="32" cy="32" r="7.8" fill={`url(#${centerId})`} />
      <path
        d="M32 24v16"
        stroke="#f5d1b5"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="M24 32h16"
        stroke="#f5d1b5"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  )
}

function EnvelopeIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-hidden="true"
      className={className ? `${className} shrink-0` : "shrink-0"}
    >
      <rect
        x="8"
        y="16"
        width="48"
        height="32"
        rx="6"
        ry="6"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <path
        d="M10 20.5 32 36.5 54 20.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 44 24.5 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
      <path
        d="M54 44 39.5 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
    </svg>
  )
}

const PARENT_MEMBER_ICONS = {
  cross: OrnateCrossIcon,
  blossom: RadiantBloomIcon,
} as const

type ParentIconVariant = keyof typeof PARENT_MEMBER_ICONS

interface ParentMember {
  name: string
  note?: string
  icon: ParentIconVariant
}

interface ParentGroup {
  title: string
  dedication: string
  gradient: string
  members: ParentMember[]
}

export function InvitationTemplate({ guestName, guestMessage, guestDetails }: InvitationTemplateProps) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Fecha del evento - PERSONALIZAR AQUÍ
  const eventDate = useMemo(() => new Date("2025-11-22T17:00:00-06:00"), [])

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const diff = eventDate.getTime() - now.getTime()

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const totalSeconds = Math.floor(diff / 1000)
      const days = Math.floor(totalSeconds / (24 * 3600))
      const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60

      setCountdown({ days, hours, minutes, seconds })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [eventDate])

  const personalizedNote = guestMessage?.trim().length
    ? guestMessage
    : "Es un honor contar con su presencia en nuestro gran día. Agradecemos confirmar su asistencia.";
  const detailLines = (guestDetails ?? []).map((item) => item.trim()).filter(Boolean)
  const parentsGroups: ParentGroup[] = [
    {
      title: "Papás del Novio",
      dedication: "Con amor eterno en nuestra memoria.",
      gradient: "from-invitation-accent/18 via-invitation-surface/96 to-invitation-surface",
      members: [
        { name: "Ricardo Parra Quiriz", icon: "cross", note: "En memoria" },
        { name: "María Elena Hernández Molina", icon: "blossom", note: "Guía amorosa" },
      ],
    },
    {
      title: "Papás de la Novia",
      dedication: "Siempre presentes en nuestro corazón.",
      gradient: "from-invitation-accent/18 via-invitation-surface/96 to-invitation-surface",
      members: [
        { name: "Juan González Morales", icon: "cross", note: "En memoria" },
        { name: "María Bertha Plata Jalomo", icon: "cross", note: "En memoria" },
      ],
    },
  ]

  const formCardRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const lastScrollPositionRef = useRef(0)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      const currentScroll = scrollContainer.scrollTop
      
      // Limpiar timeout anterior
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // Si el usuario ha scrolleado hacia abajo significativamente
      if (currentScroll > 200) {
        // Esperar 2 segundos después de que deje de scrollear
        scrollTimeoutRef.current = setTimeout(() => {
          // Hacer scroll automático hacia arriba para mostrar el mensaje de confirmación
          scrollContainer.scrollTo({ top: 0, behavior: "smooth" })
        }, 2000)
      }
      
      lastScrollPositionRef.current = currentScroll
    }

    scrollContainer.addEventListener("scroll", handleScroll)
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-invitation-bg relative">
      {/* Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "url('/5529143.jpg')",
          backgroundSize: "620px 620px",
          backgroundRepeat: "repeat",
          backgroundAttachment: "fixed",
          opacity: 0.26,
        }}
      />
      <div
        className="fixed inset-0 opacity-40 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(185, 147, 101, 0.18) 1px, transparent 1px), radial-gradient(rgba(185, 147, 101, 0.12) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
          backgroundPosition: "0 0, 45px 45px",
        }}
      />

      {/* Hero Section */}
      <header className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-invitation-border">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src="/casados1.jpg" alt="Alma y Mauricio celebrando su amor" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="font-body text-invitation-surface/85 uppercase tracking-[0.46em] text-xs md:text-sm mb-6 flex items-center justify-center gap-6">
            <span className="w-12 h-px bg-invitation-surface/60" />
            Nuestra Boda
            <span className="w-12 h-px bg-invitation-surface/60" />
          </p>

          <div className="space-y-2 mb-6">
            <h1 className="font-serif text-5xl md:text-7xl text-white uppercase tracking-[0.24em] leading-tight">
              Alma
            </h1>
            <div className="flex items-center justify-center gap-6 my-4">
              <span className="w-24 md:w-32 h-px bg-invitation-surface/55" />
              <span className="font-serif text-4xl md:text-5xl text-invitation-accent">&</span>
              <span className="w-24 md:w-32 h-px bg-invitation-surface/55" />
            </div>
            <h1 className="font-serif text-5xl md:text-7xl text-white uppercase tracking-[0.24em] leading-tight">
              Mauricio
            </h1>
          </div>

          <p className="font-body text-invitation-surface/82 text-base md:text-lg max-w-md mx-auto">
            Con gozo compartimos la dicha de nuestra unión ante Dios.
          </p>
        </div>

        {/* Countdown */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
          <div
            className="flex gap-6 px-8 py-4 bg-black/40 backdrop-blur-md border border-white/30 rounded-full"
            role="timer"
            aria-live="polite"
            aria-label="Cuenta regresiva para la boda"
          >
            {[
              { label: "Días", value: countdown.days },
              { label: "Horas", value: countdown.hours },
              { label: "Minutos", value: countdown.minutes },
              { label: "Segundos", value: countdown.seconds },
            ].map((item, index) => (
              <div key={item.label} className="relative flex flex-col items-center min-w-[70px]">
                {index > 0 && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-px h-12 bg-white/28" />
                )}
                <span className="font-serif text-3xl md:text-4xl text-white tracking-wider">
                  {String(item.value).padStart(2, "0")}
                </span>
                <span className="font-body text-[0.65rem] uppercase tracking-[0.32em] text-white/78 mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {guestName && (
          <section className="py-14 px-6 bg-invitation-surface/80">
            <div className="max-w-3xl mx-auto">
              <Card className="p-8 md:p-10 bg-invitation-surface border-invitation-border shadow-invitation text-center">
                <p className="font-body text-sm uppercase tracking-[0.28em] text-invitation-accent-dark mb-3">
                  Invitación especial para
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-invitation-text tracking-[0.22em] uppercase mb-4">
                  {guestName}
                </h2>
                <p className="font-body text-base md:text-lg text-invitation-muted leading-relaxed">{personalizedNote}</p>
                {detailLines.length > 0 && (
                  <ul className="mt-6 space-y-3 text-left font-body text-base text-invitation-muted">
                    {detailLines.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 block h-2 w-2 rounded-full bg-invitation-accent" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </div>
          </section>
        )}

        {/* Message Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="font-body text-lg md:text-xl text-invitation-muted leading-relaxed mb-10">
              Nuestros corazones se entrelazan con gratitud infinita. Te invitamos a ser testigo de una promesa que
              elevamos a Dios: celebrar el amor, la fe y la familia como cimiento de nuestra nueva historia.
            </p>

            <Card className="relative overflow-hidden p-10 md:p-12 bg-gradient-to-b from-invitation-surface to-invitation-surface/92 border border-invitation-border shadow-invitation text-center">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,rgba(149,114,75,0.45),transparent_60%)]" />
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="w-12 h-px bg-invitation-accent/60" />
                  <span className="font-body text-xs uppercase tracking-[0.5em] text-invitation-accent-dark">
                    Cantar de los Cantares
                  </span>
                  <span className="w-12 h-px bg-invitation-accent/60" />
                </div>
                <p className="font-body text-2xl md:text-[1.75rem] text-invitation-muted italic leading-relaxed mb-6">
                  "Me encontré con el amor de mi vida; lo abracé y no lo solté."
                </p>
                <cite className="font-body text-sm uppercase tracking-[0.16em] text-invitation-accent-dark not-italic">
                  Cantares 3:4
                </cite>
                <p className="font-body text-sm md:text-base text-invitation-muted/80 mt-6">
                  Esta promesa bíblica nos inspira a vivir un matrimonio sólido, donde la fe sea el lazo que fortalece
                  cada paso.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Parents Section */}
        <section className="py-16 px-6 bg-invitation-surface/70">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-12 text-invitation-text uppercase tracking-[0.3em]">
              Con la bendición de Dios, nuestros padres
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {parentsGroups.map((group) => (
                <Card
                  key={group.title}
                  className="relative overflow-hidden border border-invitation-border bg-invitation-surface shadow-invitation"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${group.gradient}`} aria-hidden="true" />
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,rgba(149,114,75,0.6),transparent_60%)]" />
                  <div className="relative z-10 p-8">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-serif text-2xl text-invitation-text tracking-[0.2em] uppercase">
                        {group.title}
                      </h3>
                      <span className="h-px flex-1 bg-invitation-border" />
                      <span className="font-body text-xs uppercase tracking-[0.4em] text-invitation-accent-dark">
                        Familia
                      </span>
                    </div>
                    <p className="font-body text-sm text-invitation-muted mt-4">
                      {group.dedication}
                    </p>
                    <ul className="mt-6 space-y-4">
                      {group.members.map((member) => {
                        const IconComponent = PARENT_MEMBER_ICONS[member.icon]
                        return (
                          <li
                            key={member.name}
                            className="flex items-center justify-between gap-4 font-body text-invitation-text"
                          >
                          <div className="flex items-center gap-3">
                              <span
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-invitation-accent/35 bg-invitation-accent/15 shadow-[0_4px_14px_rgba(53,37,16,0.12)]"
                                aria-hidden="true"
                              >
                                <IconComponent className="h-5 w-5" />
                              </span>
                            <span className="text-lg">{member.name}</span>
                          </div>
                          {member.note && (
                            <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-invitation-accent-dark">
                              {member.note}
                            </span>
                          )}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Unity Reflection Section */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <figure className="relative overflow-hidden rounded-3xl border border-invitation-border shadow-invitation flex justify-center">
                <img
                  src="/casados2.jpg"
                  alt="Alma y Mauricio compartiendo una sonrisa llena de alegría"
                  className="w-auto h-auto max-w-full transition-transform duration-500 hover:scale-105"
                />
              </figure>
              <figure className="relative overflow-hidden rounded-3xl border border-invitation-border shadow-invitation flex justify-center">
                <img
                  src="/casados3.jpg"
                  alt="Alma y Mauricio tomados de la mano en un paseo sereno"
                  className="w-auto h-auto max-w-full transition-transform duration-500 hover:scale-105"
                />
              </figure>
            </div>
          </div>
        </section>

        {/* Bible Verse Section */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <Card className="relative overflow-hidden p-12 bg-gradient-to-br from-invitation-accent/16 via-invitation-surface to-invitation-surface border border-invitation-accent/35 shadow-invitation text-center">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,rgba(185,147,101,0.45),transparent_65%)]" />
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="w-16 h-px bg-invitation-accent/60" />
                  <span className="font-body text-xs uppercase tracking-[0.4em] text-invitation-accent-dark">
                    Frase bíblica especial
                  </span>
                  <span className="w-16 h-px bg-invitation-accent/60" />
                </div>
                <blockquote className="font-body text-xl md:text-2xl text-invitation-muted italic leading-relaxed mb-6">
                  “Uno solo puede ser vencido, pero dos juntos pueden resistir. Y el cordón de tres hilos no se rompe
                  fácilmente.”
                </blockquote>
                <p className="font-body text-sm uppercase tracking-[0.24em] text-invitation-accent-dark mb-3">
                  Eclesiastés 4:12
                </p>
                <p className="font-body text-base text-invitation-muted">
                  Nuestro matrimonio se fortalece con Dios como el tercer hilo; Él es la fuerza que envuelve nuestras
                  vidas, guía nuestras decisiones y sostiene nuestra alegría diaria.
                </p>
              </div>
            </Card>
            <div className="mt-10 flex flex-col gap-6 items-center">
              <figure className="relative overflow-hidden rounded-3xl border border-invitation-border shadow-invitation flex justify-center">
                <img
                  src="/casados4.jpg"
                  alt="Alma y Mauricio abrazados celebrando su unión"
                  className="w-auto h-auto max-w-full transition-transform duration-500 hover:scale-105"
                />
              </figure>
              <figure className="relative overflow-hidden rounded-3xl border border-invitation-border shadow-invitation flex justify-center">
                <img
                  src="/casados5.jpg"
                  alt="Alma y Mauricio compartiendo un momento íntimo"
                  className="w-auto h-auto max-w-full transition-transform duration-500 hover:scale-105"
                />
              </figure>
            </div>
          </div>
        </section>

        {/* Ceremony Section */}
        <section className="py-16 px-6 bg-invitation-surface/70">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-12 text-invitation-text uppercase tracking-[0.3em]">
              Ceremonia religiosa
            </h2>

            <Card className="p-10 bg-invitation-surface border-invitation-border shadow-invitation text-center">
              <div className="mb-6 overflow-hidden rounded-3xl border border-invitation-border/50 shadow-[0_18px_42px_rgba(24,24,24,0.12)] bg-invitation-bg/30">
                <img
                  src="/iglesia.jpg"
                  alt="Capilla San Miguel Arcángel y su ubicación"
                  className="w-full h-auto object-contain"
                />
              </div>
              <h3 className="font-body text-2xl mb-4 text-invitation-text">Capilla San Miguel Arcángel</h3>
              <p className="font-body text-lg text-invitation-accent-dark mb-4">5:00 PM</p>
              <address className="font-body text-invitation-muted not-italic mb-8">
                C. Zuazua 314, San Miguel, Cdad. Apodaca, N.L., 66649
              </address>
              <Button
                asChild
                className="bg-invitation-accent hover:bg-invitation-accent-dark text-invitation-surface px-10 py-6 rounded-full uppercase tracking-wider font-semibold"
              >
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Capilla+San+Miguel+Arc%C3%A1ngel%2C+Calle+Zuazua+314%2C+San+Miguel%2C+Apodaca%2C+NL+66649"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver ubicación
                </a>
              </Button>
            </Card>
          </div>
        </section>

        {/* Reception Section */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-12 text-invitation-text uppercase tracking-[0.3em]">
              Recepción
            </h2>

            <Card className="p-10 bg-invitation-surface border-invitation-border shadow-invitation text-center">
              <div className="mb-6 overflow-hidden rounded-3xl border border-invitation-border/50 shadow-[0_18px_42px_rgba(24,24,24,0.12)] bg-invitation-bg/30">
                <img
                  src="/salondeeventos.png"
                  alt="Campanario Eventos y su ubicación"
                  className="w-full h-auto object-contain"
                />
              </div>
              <h3 className="font-body text-2xl mb-4 text-invitation-text">Campanario Eventos</h3>
              <p className="font-body text-lg text-invitation-accent-dark mb-4">
                7:30 PM
              </p>
              <address className="font-body text-invitation-muted not-italic mb-8">
                Blvd Julian Treviño Elizondo 300, El Milagro, 66634 Cdad. Apodaca, N.L., México
                <br />
                Tel. 52 81 1086 1161
              </address>
              <Button
                asChild
                className="bg-invitation-accent hover:bg-invitation-accent-dark text-invitation-surface px-10 py-6 rounded-full uppercase tracking-wider font-semibold"
              >
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Campanario+Eventos%2C+Blvd+Julian+Trevi%C3%B1o+Elizondo+300%2C+El+Milagro%2C+Apodaca%2C+NL+66634"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver ubicación
                </a>
              </Button>
            </Card>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 px-6 bg-invitation-surface/70">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-12 text-invitation-text uppercase tracking-[0.3em]">
              Programa del gran día
            </h2>

            <Card className="p-4 md:p-6 bg-invitation-surface border-invitation-border shadow-invitation">
              <div className="flex justify-center">
                <img
                  src="/itinerario.png"
                  alt="Itinerario del gran día de Alma Nelly y Mauricio"
                  className="w-auto h-auto max-w-full rounded-[1.75rem] shadow-[0_18px_42px_rgba(24,24,24,0.08)]"
                />
              </div>
            </Card>
          </div>
        </section>

        {/* Love Story Gallery */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-[0.28em] text-invitation-text">
                Nuestra historia en momentos
              </h2>
              <p className="font-body text-lg text-invitation-muted mt-4 max-w-2xl mx-auto">
                Cada instante ha sido una bendición que nos ha traído hasta este día. Queremos compartir algunos
                recuerdos que nos recuerdan por qué celebramos el milagro del amor.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <figure className="relative overflow-hidden rounded-3xl border border-invitation-border shadow-invitation flex justify-center">
                <img
                  src="/casados6.jpg"
                  alt="Alma y Mauricio celebrando con alegría"
                  className="w-auto h-auto max-w-full transition-transform duration-500 hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6 py-5 text-white font-body text-sm leading-relaxed">
                  Celebramos la dicha de unir nuestras vidas con quienes han sido parte de nuestra historia.
                </figcaption>
              </figure>

              <figure className="relative overflow-hidden rounded-3xl border border-invitation-border shadow-invitation flex justify-center">
                <img
                  src="/casados7.jpg"
                  alt="Alma y Mauricio caminando hacia un nuevo comienzo"
                  className="w-auto h-auto max-w-full transition-transform duration-500 hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6 py-5 text-white font-body text-sm leading-relaxed">
                  Caminamos de la mano hacia el futuro, guiados por la gracia y la esperanza que compartimos.
                </figcaption>
              </figure>

              <figure className="relative overflow-hidden rounded-3xl border border-invitation-border shadow-invitation md:col-span-2 flex justify-center">
                <img
                  src="/casados8.jpg"
                  alt="Alma y Mauricio compartiendo una sonrisa sincera"
                  className="w-auto h-auto max-w-full transition-transform duration-500 hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/45 to-transparent px-8 py-6 text-white font-body text-base leading-relaxed">
                  Sonrisas que nacen del alma y se convierten en recuerdos eternos que alimentan nuestra historia.
                </figcaption>
              </figure>

              <div className="md:col-span-2 flex justify-center">
                <figure className="relative overflow-hidden rounded-3xl border border-invitation-border shadow-invitation">
                  <img
                    src="/casados9.jpg"
                    alt="Alma y Mauricio disfrutando de un atardecer juntos"
                    className="w-auto h-auto max-w-full transition-transform duration-500 hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6 py-5 text-white font-body text-sm leading-relaxed">
                    Entre atardeceres y promesas, agradecemos el amor que nos sostiene día tras día.
                  </figcaption>
                </figure>
              </div>

              <figure className="relative overflow-hidden rounded-3xl border border-invitation-border shadow-invitation md:col-span-2 flex justify-center">
                <img
                  src="/casados10.jpg"
                  alt="Alma y Mauricio celebrando su compromiso con familiares y amigos"
                  className="w-auto h-auto max-w-full transition-transform duration-500 hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-8 py-6 text-white font-body text-base leading-relaxed">
                  Rodeados de quienes amamos, celebramos un amor que florece en cada nuevo comienzo.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Envelope Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-[0.3em] text-invitation-text mb-6">
              Regalos
            </h2>
            <p className="font-body text-lg md:text-xl text-invitation-muted leading-relaxed max-w-2xl mx-auto">
              Tu presencia es nuestro mejor regalo. Si deseas bendecirnos con un detalle, te agradecemos hacerlo en un sobre.
            </p>
            <div className="mt-10 flex flex-col items-center gap-6">
              <span className="inline-flex h-28 w-28 items-center justify-center rounded-full border border-invitation-accent/35 bg-invitation-accent/12 shadow-[0_14px_38px_rgba(53,37,16,0.14)] text-invitation-accent">
                <EnvelopeIcon className="h-16 w-16" />
              </span>
              <p className="font-body text-base md:text-lg text-invitation-accent-dark max-w-xl">
                Gracias por ser parte de esta nueva etapa; cada gesto de cariño lo atesoramos con el corazón.
              </p>
            </div>
          </div>
        </section>

        {/* RSVP Section */}
        <section className="py-16 px-6 bg-invitation-surface/70">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-[0.3em] text-invitation-text mb-8">
              Confirma tu asistencia
            </h2>
            <div className="mx-auto max-w-3xl space-y-6">
              <p className="font-body text-lg md:text-xl text-invitation-muted leading-relaxed">
                ¡Queremos compartir este momento contigo! Ayúdanos confirmando antes del 10 de noviembre de 2025.
                Agradecemos tu comprensión: No Niños.
              </p>

              <Card ref={formCardRef} className="mx-auto w-full max-w-[640px] gap-0 overflow-hidden border-invitation-border bg-invitation-surface shadow-invitation p-0 md:w-[640px]">
                <div className="relative h-[520px] w-full overflow-hidden">
                  <div ref={scrollContainerRef} className="h-full w-full overflow-y-auto scrollbar-none">
                    <div className="relative h-[880px]">
                      <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSd8fFHEvViweRJXrWuPb158vZ7_z2DSDX9zTN9i0THMcc85Kg/viewform?embedded=true"
                        title="Confirmación de asistencia"
                        className="absolute left-0 top-0 h-[880px] w-full min-w-0"
                        allow="camera; microphone; geolocation"
                        scrolling="no"
                      >
                        Cargando…
                      </iframe>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-invitation-surface to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-invitation-surface to-transparent" />
                </div>
              </Card>

              <p className="font-body text-sm text-invitation-muted">
                Si prefieres abrirlo en una nueva ventana, puedes hacerlo
                <a
                  className="ml-1 text-invitation-accent hover:underline"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSd8fFHEvViweRJXrWuPb158vZ7_z2DSDX9zTN9i0THMcc85Kg/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  aquí.
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Dress Code Section */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-[0.3em] text-invitation-text mb-8">
              Vestimenta sugerida
            </h2>
            <Card className="p-10 bg-invitation-surface border-invitation-border shadow-invitation text-center">
              <div className="space-y-8">
                <div className="rounded-3xl border border-invitation-border/80 shadow-lg overflow-hidden bg-invitation-surface flex justify-center">
                  <img
                    src="/vestimenta.jpeg"
                    alt="Propuesta de vestimenta elegante para la boda de Alma y Mauricio"
                    className="w-auto h-auto max-w-full"
                  />
                </div>
                <p className="font-body text-lg md:text-xl text-invitation-muted leading-relaxed">
                  Deseamos crear un ambiente elegante y lleno de estilo. Tu presencia hará que la celebración sea inolvidable.
                </p>
              </div>
            </Card>
          </div>
        </section>

        
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 text-center border-t border-invitation-border">
        <p className="font-body text-invitation-muted mb-2">Alma Nelly & Mauricio</p>
        <p className="font-body text-invitation-muted">Con amor, esperamos celebrar contigo.</p>
      </footer>
    </div>
  )
}
