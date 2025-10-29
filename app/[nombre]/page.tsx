import { InvitationTemplate } from "@/components/invitation-template"
import { getGuestProfile } from "@/lib/guest-profiles"

interface InvitacionPersonalizadaPageProps {
  params: Promise<{ nombre: string }>
}

export default async function InvitacionPersonalizadaPage({ params }: InvitacionPersonalizadaPageProps) {
  const { nombre } = await params
  const slug = decodeURIComponent(nombre ?? "").toLowerCase()
  const profile = getGuestProfile(slug)

  const fallbackName = slug ? slug.replace(/[-_]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) : undefined

  return (
    <InvitationTemplate
      guestName={profile?.name ?? fallbackName}
      guestMessage={profile?.message}
      guestDetails={profile?.details}
    />
  )
}
