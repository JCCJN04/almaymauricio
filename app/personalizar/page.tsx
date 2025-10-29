import { PersonalizationForm } from "@/components/personalization-form"

export default function PersonalizarPage() {
  return (
    <div className="min-h-screen bg-invitation-bg py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl text-center mb-4 text-invitation-text tracking-wide">
          Crear Invitaciones Personalizadas
        </h1>
        <p className="text-center text-invitation-muted font-body mb-12 text-lg">
          Ingresa los nombres de tus invitados para generar versiones personalizadas
        </p>
        <PersonalizationForm />
      </div>
    </div>
  )
}
