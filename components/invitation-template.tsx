"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface InvitationTemplateProps {
  guestName?: string
  guestMessage?: string
  guestDetails?: string[]
}

export function InvitationTemplate({ guestName, guestMessage, guestDetails }: InvitationTemplateProps) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const audioRef = useRef<HTMLAudioElement>(null)

  // Fecha del evento - PERSONALIZAR AQUÍ
  const eventDate = useMemo(() => new Date("2025-12-20T17:00:00-06:00"), [])

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

  useEffect(() => {
    const player = audioRef.current
    if (!player) {
      return
    }

    player.loop = true
    player.preload = "auto"
    player.setAttribute("playsinline", "")

    let resumeRequested = false

    const applyPlaybackPreferences = () => {
      player.volume = 0.65
      player.muted = false
    }

    const interactionEvents: string[] = [
      "pointerdown",
      "touchstart",
      "touchend",
      "mousedown",
      "keydown",
      "click",
    ]

    const interactionTargets: Array<EventTarget | null> = [window, document, document.body]

    const removeInteractionListeners = () => {
      interactionTargets.forEach((target) => {
        if (!target) {
          return
        }

        interactionEvents.forEach((eventName) => {
          target.removeEventListener(eventName, resumePlayback as EventListener)
        })
      })
    }

    const resumePlayback = () => {
      const attempt = player.play()

      if (attempt && typeof attempt.then === "function") {
        attempt
          .then(() => {
            applyPlaybackPreferences()
            resumeRequested = false
            removeInteractionListeners()
          })
          .catch(() => {
            resumeRequested = false
            requestResumeOnInteraction()
          })
      } else {
        applyPlaybackPreferences()
        resumeRequested = false
        removeInteractionListeners()
      }
    }

    const requestResumeOnInteraction = () => {
      if (resumeRequested) {
        return
      }

      resumeRequested = true

      interactionTargets.forEach((target) => {
        if (!target) {
          return
        }

        interactionEvents.forEach((eventName) => {
          target.addEventListener(eventName, resumePlayback as EventListener, { once: true })
        })
      })
    }

    const attemptAutoplay = () => {
      const playPromise = player.play()

      if (playPromise && typeof playPromise.then === "function") {
        playPromise
          .then(() => {
            applyPlaybackPreferences()
          })
          .catch(() => {
            requestResumeOnInteraction()
          })
      } else {
        applyPlaybackPreferences()
      }
    }

    const handleEnded = () => {
      player.currentTime = 0
      attemptAutoplay()
    }

    const handleVisibilityChange = () => {
      if (!document.hidden && player.paused) {
        attemptAutoplay()
      }
    }

    attemptAutoplay()
    player.addEventListener("ended", handleEnded)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      removeInteractionListeners()
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      player.removeEventListener("ended", handleEnded)
      player.pause()
      player.currentTime = 0
    }
  }, [])

  const personalizedNote = guestMessage?.trim().length
    ? guestMessage
    : "Es un honor contar con su presencia en nuestro gran día. Agradecemos confirmar su asistencia.";
  const detailLines = (guestDetails ?? []).map((item) => item.trim()).filter(Boolean)
  const parentsGroups = [
    {
      title: "Papás del Novio",
      dedication: "Con amor eterno en nuestra memoria.",
      gradient: "from-invitation-accent/18 via-invitation-surface/96 to-invitation-surface",
      members: [
        { name: "Ricardo Parra Quiriz", symbol: "✝", note: "En memoria" },
        { name: "María Elena Hernández Molina", symbol: "♠", note: "Guía amorosa" },
      ],
    },
    {
      title: "Papás de la Novia",
      dedication: "Siempre presentes en nuestro corazón.",
      gradient: "from-invitation-accent/18 via-invitation-surface/96 to-invitation-surface",
      members: [
        { name: "Juan González Morales", symbol: "✝", note: "En memoria" },
        { name: "María Bertha Plata Jalomo", symbol: "✝", note: "En memoria" },
      ],
    },
  ]

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

      <audio ref={audioRef} preload="auto" loop playsInline>
        <source src="/ElvisPresleyCantHelpFallingInLove.mp4" type="audio/mp4" />
      </audio>

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
                      {group.members.map((member) => (
                        <li key={member.name} className="flex items-center justify-between gap-4 font-body text-invitation-text">
                          <div className="flex items-center gap-3">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-invitation-accent/20 border border-invitation-accent/40 text-invitation-accent-dark text-base" aria-hidden="true">
                              {member.symbol}
                            </span>
                            <span className="text-lg">{member.name}</span>
                          </div>
                          {member.note && (
                            <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-invitation-accent-dark">
                              {member.note}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
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
          </div>
        </section>

        {/* Ceremony Section */}
        <section className="py-16 px-6 bg-invitation-surface/70">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-12 text-invitation-text uppercase tracking-[0.3em]">
              Ceremonia religiosa
            </h2>

            <Card className="p-10 bg-invitation-surface border-invitation-border shadow-invitation text-center">
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
              <h3 className="font-body text-2xl mb-4 text-invitation-text">Campanario Eventos</h3>
              <p className="font-body text-lg text-invitation-accent-dark mb-4">
                Seguimos celebrando después de la ceremonia
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
              <div className="relative -mx-4 sm:-mx-8 md:mx-auto md:max-w-2xl">
                <img
                  src="/itinerario-boda-alma-y-mauricio.png"
                  alt="Itinerario del gran día de Alma Nelly y Mauricio"
                  className="w-full h-auto rounded-[1.75rem] shadow-[0_18px_42px_rgba(24,24,24,0.08)] md:scale-100 scale-[1.18] origin-top transition-transform duration-500"
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
              <figure className="relative overflow-hidden rounded-3xl border border-invitation-border shadow-invitation">
                <img
                  src="/casados2.jpg"
                  alt="Alma y Mauricio sonriendo juntos"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6 py-5 text-white font-body text-sm leading-relaxed">
                  Día tras día, aprendimos que el amor se construye con detalles que iluminan el corazón.
                </figcaption>
              </figure>

              <figure className="relative overflow-hidden rounded-3xl border border-invitation-border shadow-invitation">
                <img
                  src="/casados3.jpg"
                  alt="Alma y Mauricio tomados de la mano en un paseo"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6 py-5 text-white font-body text-sm leading-relaxed">
                  Compartimos caminos, sueños y promesas que hoy celebramos con quienes amamos.
                </figcaption>
              </figure>

              <figure className="relative overflow-hidden rounded-3xl border border-invitation-border shadow-invitation md:col-span-2">
                <img
                  src="/casados4.jpg"
                  alt="Alma y Mauricio abrazándose"
                  className="w-full h-[340px] md:h-[420px] object-cover transition-transform duration-500 hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-8 py-6 text-white font-body text-base leading-relaxed">
                  "El amor es paciente, es bondadoso" — cada abrazo nos recuerda que Dios guía nuestro camino.
                </figcaption>
              </figure>

              <figure className="relative overflow-hidden rounded-3xl border border-invitation-border shadow-invitation">
                <img
                  src="/casados5.jpg"
                  alt="Alma y Mauricio en un momento íntimo"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6 py-5 text-white font-body text-sm leading-relaxed">
                  Sabemos que este vínculo se sostiene con fe, respeto y alegría compartida.
                </figcaption>
              </figure>

              <figure className="relative overflow-hidden rounded-3xl border border-invitation-border shadow-invitation">
                <img
                  src="/casados6.jpg"
                  alt="Alma y Mauricio celebrando"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6 py-5 text-white font-body text-sm leading-relaxed">
                  Celebramos la dicha de unir nuestras vidas con quienes han sido parte de nuestra historia.
                </figcaption>
              </figure>

              <figure className="relative overflow-hidden rounded-3xl border border-invitation-border shadow-invitation md:col-span-2">
                <img
                  src="/casados7.jpg"
                  alt="Alma y Mauricio caminando hacia la luz"
                  className="w-full h-[320px] md:h-[400px] object-cover transition-transform duration-500 hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/45 to-transparent px-8 py-6 text-white font-body text-base leading-relaxed">
                  Caminamos de la mano hacia el futuro, sabiendo que cada paso está guiado por la gracia de Dios.
                </figcaption>
              </figure>

              <figure className="relative overflow-hidden rounded-3xl border border-invitation-border shadow-invitation">
                <img
                  src="/casados8.jpg"
                  alt="Alma y Mauricio compartiendo una sonrisa"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6 py-5 text-white font-body text-sm leading-relaxed">
                  Sonrisas que nacen del alma y se convierten en recuerdos eternos.
                </figcaption>
              </figure>

              <figure className="relative overflow-hidden rounded-3xl border border-invitation-border shadow-invitation">
                <img
                  src="/casados9.jpg"
                  alt="Alma y Mauricio disfrutando de un atardecer"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6 py-5 text-white font-body text-sm leading-relaxed">
                  Entre atardeceres y promesas, agradecemos el amor que nos sostiene.
                </figcaption>
              </figure>

              <figure className="relative overflow-hidden rounded-3xl border border-invitation-border shadow-invitation md:col-span-2">
                <img
                  src="/casados10.jpg"
                  alt="Alma y Mauricio celebrando su compromiso"
                  className="w-full h-[320px] md:h-[400px] object-cover transition-transform duration-500 hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-8 py-6 text-white font-body text-base leading-relaxed">
                  Hoy celebramos rodeados de quienes amamos, agradecidos por este amor que florece en cada nuevo comienzo.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Dress Code Section */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-[0.3em] text-invitation-text mb-8">
              Vestimenta sugerida
            </h2>
            <Card className="p-10 bg-invitation-surface border-invitation-border shadow-invitation">
              <div className="space-y-8">
                <div className="rounded-3xl border border-invitation-border/80 shadow-lg overflow-hidden bg-invitation-surface">
                  <img
                    src="/vestimenta.jpeg"
                    alt="Propuesta de vestimenta elegante para la boda de Alma y Mauricio"
                    className="w-full h-[260px] md:h-auto md:max-h-[420px] object-cover md:object-contain md:object-center"
                  />
                </div>
                <p className="font-body text-lg md:text-xl text-invitation-muted leading-relaxed">
                  Deseamos crear un ambiente elegante y lleno de estilo. Tu presencia hará que la celebración sea inolvidable.
                </p>
                <div className="grid md:grid-cols-2 gap-6 text-left md:text-center">
                  <div className="p-6 rounded-2xl border border-invitation-border/70 bg-invitation-surface/70">
                    <h3 className="font-serif text-xl uppercase tracking-[0.28em] text-invitation-text mb-3">Mujeres</h3>
                    <p className="font-body text-base text-invitation-muted">Vestido largo con detalles elegantes.</p>
                  </div>
                  <div className="p-6 rounded-2xl border border-invitation-border/70 bg-invitation-surface/70">
                    <h3 className="font-serif text-xl uppercase tracking-[0.28em] text-invitation-text mb-3">Hombres</h3>
                    <p className="font-body text-base text-invitation-muted">Traje y corbata en tonos formales.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Gratitude Section */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <Card className="relative overflow-hidden p-12 bg-gradient-to-b from-invitation-surface to-invitation-surface/92 border border-invitation-border shadow-invitation text-center">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom,rgba(149,114,75,0.5),transparent_60%)]" />
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="w-10 h-px bg-invitation-accent/50" />
                  <span className="font-body text-xs uppercase tracking-[0.38em] text-invitation-accent-dark">
                    Gratitud infinita
                  </span>
                  <span className="w-10 h-px bg-invitation-accent/50" />
                </div>
                <p className="font-body text-xl md:text-2xl text-invitation-muted italic mb-6">
                  "Que el amor que hoy celebramos se multiplique en cada uno de sus hogares. Gracias por acompañarnos."
                </p>
                <cite className="font-body text-sm uppercase tracking-[0.18em] text-invitation-accent-dark not-italic block">
                  Filipenses 1:3 - "Doy gracias a mi Dios cada vez que me acuerdo de ustedes."
                </cite>
                <p className="font-body text-sm text-invitation-muted/80 mt-5">
                  Nos sentimos bendecidos por su cariño, por las oraciones compartidas y por la alegría de caminar juntos
                  esta nueva etapa.
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
