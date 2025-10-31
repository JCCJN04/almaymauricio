"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, Plus, ExternalLink } from "lucide-react"

export function PersonalizationForm() {
  const [guests, setGuests] = useState<string[]>([""])
  const [generatedLinks, setGeneratedLinks] = useState<Array<{ name: string; url: string }>>([])

  const addGuest = () => {
    setGuests((prev) => [...prev, ""])
  }

  const removeGuest = (index: number) => {
    setGuests((prev) => prev.filter((_, i) => i !== index))
  }

  const updateGuest = (index: number, value: string) => {
    setGuests((prev) => prev.map((guest, i) => (i === index ? value : guest)))
  }

  const generateInvitations = () => {
    const validGuests = guests.filter((guest) => guest.trim() !== "")
    const links = validGuests.map((name) => ({ name, url: `/invitacion/${encodeURIComponent(name)}` }))
    setGeneratedLinks(links)
  }

  const copyToClipboard = (url: string) => {
    const fullUrl = `${window.location.origin}${url}`
    navigator.clipboard.writeText(fullUrl)
  }

  return (
    <div className="w-full space-y-8">
      <Card className="w-full gap-6 border-invitation-border bg-invitation-surface p-6 shadow-invitation sm:p-8">
        <h2 className="font-serif text-2xl text-invitation-text">Lista de Invitados</h2>

        <div className="space-y-4">
          {guests.map((guest, index) => (
            <div key={index} className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Input
                value={guest}
                onChange={(event) => updateGuest(index, event.target.value)}
                placeholder="Nombre del invitado o familia"
                className="border-invitation-border bg-white focus:border-invitation-accent"
              />
              {guests.length > 1 && (
                <Button
                  onClick={() => removeGuest(index)}
                  variant="outline"
                  size="icon"
                  className="border-invitation-border hover:bg-destructive hover:text-white self-end sm:self-auto"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button
            onClick={addGuest}
            variant="outline"
            className="w-full border-invitation-accent text-invitation-accent hover:bg-invitation-accent hover:text-invitation-surface bg-transparent sm:flex-1"
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar Invitado
          </Button>

          <Button
            onClick={generateInvitations}
            disabled={guests.every((guest) => guest.trim() === "")}
            className="w-full bg-invitation-accent text-invitation-surface hover:bg-invitation-accent-dark sm:flex-1"
          >
            Generar Invitaciones
          </Button>
        </div>
      </Card>

      {generatedLinks.length > 0 && (
        <Card className="w-full gap-6 border-invitation-border bg-invitation-surface p-6 shadow-invitation sm:p-8">
          <h2 className="font-serif text-2xl text-invitation-text">Invitaciones Generadas</h2>

          <div className="space-y-3">
            {generatedLinks.map((link, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 rounded-lg border border-invitation-border bg-invitation-bg p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-2"
              >
                <div className="w-full min-w-0 sm:flex-1">
                  <p className="font-body font-semibold text-invitation-text">{link.name}</p>
                  <p className="font-body text-sm text-invitation-muted break-words sm:truncate">
                    {window.location.origin}
                    {link.url}
                  </p>
                </div>

                <div className="flex w-full gap-2 sm:w-auto sm:justify-end">
                  <Button
                    onClick={() => copyToClipboard(link.url)}
                    variant="outline"
                    size="sm"
                    className="w-full border-invitation-border hover:bg-invitation-accent hover:text-invitation-surface sm:w-auto"
                  >
                    Copiar
                  </Button>

                  <Button
                    asChild
                    size="sm"
                    className="w-full bg-invitation-accent text-invitation-surface hover:bg-invitation-accent-dark sm:w-auto"
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-invitation-accent/30 bg-invitation-accent/10 p-4">
            <p className="font-body text-sm text-invitation-muted">
              <strong className="text-invitation-text">Tip:</strong> Puedes copiar los enlaces y compartirlos por
              WhatsApp, email o redes sociales. Cada invitado verá su nombre personalizado en la invitación.
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}
