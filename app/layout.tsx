import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Cinzel, Lora, Raleway } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Alma y Mauricio - Invitación de boda",
  description: "Invitación boda ALMA Y MAURICIO",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${cinzel.variable} ${lora.variable} ${raleway.variable}`}>
      <body className={`font-sans antialiased`}>
        {children}
        <Toaster />
        <audio id="background-music" src="/ElvisPresleyCantHelpFallingInLove.mp4" autoPlay loop playsInline preload="auto" />
        <Script id="background-music-autoplay" strategy="afterInteractive">
          {`
            (() => {
              const audio = document.getElementById("background-music");
              if (!audio || typeof audio.play !== "function") {
                return;
              }

              const interactionEvents = ["pointerdown", "touchstart", "mousedown", "keydown", "click"];
              let resumeRequested = false;

              const removeInteractionListeners = () => {
                interactionEvents.forEach((eventName) => {
                  window.removeEventListener(eventName, resumePlayback);
                });
              };

              const resumePlayback = () => {
                audio.play().then(() => {
                  removeInteractionListeners();
                  resumeRequested = false;
                }).catch(() => {
                  // keep listeners if playback still fails
                });
              };

              const requestResumeOnInteraction = () => {
                if (resumeRequested) {
                  return;
                }
                resumeRequested = true;
                interactionEvents.forEach((eventName) => {
                  window.addEventListener(eventName, resumePlayback, { once: true });
                });
              };

              const startPlayback = () => {
                const playPromise = audio.play();
                if (playPromise && typeof playPromise.catch === "function") {
                  playPromise.catch(() => {
                    requestResumeOnInteraction();
                  });
                } else {
                  requestResumeOnInteraction();
                }
              };

              const handleEnded = () => {
                audio.currentTime = 0;
                startPlayback();
              };

              const handleVisibilityChange = () => {
                if (!document.hidden && audio.paused) {
                  startPlayback();
                }
              };

              startPlayback();
              audio.addEventListener("ended", handleEnded);
              document.addEventListener("visibilitychange", handleVisibilityChange);

              window.addEventListener("pagehide", () => {
                audio.removeEventListener("ended", handleEnded);
                document.removeEventListener("visibilitychange", handleVisibilityChange);
                removeInteractionListeners();
              }, { once: true });
            })();
          `}
        </Script>
        <Analytics />
      </body>
    </html>
  )
}
