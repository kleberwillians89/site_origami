export function getOrigamiWhatsappLink(message?: string): string | null {
  const rawNumber = process.env.NEXT_PUBLIC_ORIGAMI_WHATSAPP;

  if (!rawNumber) return null;

  const digits = rawNumber.replace(/\D/g, "");
  const query = message ? `?text=${encodeURIComponent(message)}` : "";

  return `https://wa.me/${digits}${query}`;
}
