export const WHATSAPP_NUMBER = "254732277459";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function whatsappHref(message) {
  const text = String(message || "").trim();
  return text ? `${WHATSAPP_URL}?text=${encodeURIComponent(text)}` : WHATSAPP_URL;
}
