export interface GuestProfile {
  name: string
  message?: string
  details?: string[]
}

const GUEST_PROFILES: Record<string, GuestProfile> = {
  invitados1: {
    name: "Familia Hernández Castillo",
    message:
      "Les reservamos un lugar muy especial para celebrar juntos. Por favor confirma tu asistencia a la brevedad.",
    details: [
      "Pases asignados: 2 adultos",
      "Mesa reservada: Mesa 2, cerca de los novios",
      "Fecha límite de confirmación: 1 de noviembre de 2025",
      "Contacto para dudas: Alma (81 1234 5678)",
    ],
  },
  // Agrega más invitados siguiendo este formato:
  // "invitados2": {
  //   name: "Nombre de tus invitados",
  //   message: "Mensaje opcional para personalizar su invitación.",
  // },
}

export function getGuestProfile(slug: string): GuestProfile | null {
  return GUEST_PROFILES[slug.toLowerCase()] ?? null
}
