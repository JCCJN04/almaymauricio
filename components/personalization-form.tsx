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
    setGuests([...guests, ""])
  }

  const removeGuest = (index: number) => {
    setGuests(guests.filter((_, i) => i !== index))
  }

  const updateGuest = (index: number, value: string) => {
    const newGuests = [...guests]
    newGuests[index] = value
    setGuests(newGuests)
  }

  const generateInvitations = () => {
    const validGuests = guests.filter((g) => g.trim() !== "")
    const links = validGuests.map((name) => ({
      name,
      url: `/invitacion/${encodeURIComponent(name)}`,
    }))
    setGeneratedLinks(links)
  }

  const copyToClipboard = (url: string) => {
    const fullUrl = `${window.location.origin}${url}`
    navigator.clipboard.writeText(fullUrl)
  }

  return (
    <div className="space-y-8">
      <Card className="p-8 bg-invitation-surface border-invitation-border shadow-invitation">
        <h2 className="font-serif text-2xl mb-6 text-invitation-text">Lista de Invitados</h2>

        <div className="space-y-4 mb-6">
          {guests.map((guest, index) => (
            <div key={index} className="flex gap-3">
              <Input
                value={guest}
                onChange={(e) => updateGuest(index, e.target.value)}
                placeholder="Nombre del invitado o familia"
                className="flex-1 bg-white border-invitation-border focus:border-invitation-accent"
              />
              {guests.length > 1 && (
                <Button
                  onClick={() => removeGuest(index)}
                  variant="outline"
                  size="icon"
                  className="border-invitation-border hover:bg-destructive hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <Button
            onClick={addGuest}
            variant="outline"
            className="flex-1 border-invitation-accent text-invitation-accent hover:bg-invitation-accent hover:text-invitation-surface bg-transparent"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Invitado
          </Button>

          <Button
            onClick={generateInvitations}
            disabled={guests.filter((g) => g.trim() !== "").length === 0}
            className="flex-1 bg-invitation-accent hover:bg-invitation-accent-dark text-invitation-surface"
          >
            Generar Invitaciones
          </Button>
        </div>
      </Card>

      {generatedLinks.length > 0 && (
        <Card className="p-8 bg-invitation-surface border-invitation-border shadow-invitation">
          <h2 className="font-serif text-2xl mb-6 text-invitation-text">Invitaciones Generadas</h2>

          <div className="space-y-3">
            {generatedLinks.map((link, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-invitation-bg rounded-lg border border-invitation-border"
              >
                <div className="flex-1">
                  <p className="font-body font-semibold text-invitation-text mb-1">{link.name}</p>
                  <p className="font-body text-sm text-invitation-muted truncate">
                    {window.location.origin}
                    {link.url}
                  </p>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button
                    onClick={() => copyToClipboard(link.url)}
                    variant="outline"
                    size="sm"
                    className="border-invitation-border hover:bg-invitation-accent hover:text-invitation-surface"
                  >
                    Copiar
                  </Button>

                  <Button
                    asChild
                    size="sm"
                    className="bg-invitation-accent hover:bg-invitation-accent-dark text-invitation-surface"
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-invitation-accent/10 rounded-lg border border-invitation-accent/30">
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
