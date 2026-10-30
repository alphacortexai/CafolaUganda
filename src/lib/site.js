export function slugify(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
}

export function shorten(text, words) {
  const value = String(text ?? "");
  const parts = value.trim().split(/\s+/);
  if (parts.length <= words) return value;
  return `${parts.slice(0, words).join(" ")}...`;
}

const DEFAULT_PHONES = ["+256 730 728080", "+256 782 512703"];

export function phonesOf(cms) {
  const phones = (cms?.phones ?? []).map((phone) => phone.trim()).filter(Boolean);
  return phones.length > 0 ? phones : DEFAULT_PHONES;
}

export function emailOf(cms) {
  return cms?.email?.trim() || "service@cafolauganda.com";
}

export function websiteOf(cms) {
  return cms?.website?.trim() || "http://cafolauganda.com";
}

export function telHref(phone) {
  return `tel:${String(phone).replace(/[^\d+]/g, "")}`;
}

export function navHref(label, cms) {
  if (label === "Services") return "/#services";
  if (label === "Resources") return "/articles";
  if (label === "About Us") return "/about";
  if (label === "Careers") return "/#careers";
  if (label === "Contact" || label === "Contacts") return "/#contact";
  const page = (cms?.customPages ?? []).find((item) => item.title === label);
  return page ? `/pages/${page.slug}` : "#";
}

export function footerHref(label) {
  if (label === "Find Care") return "/#services";
  if (label === "Contact Us") return "/#contact";
  if (label === "Find Jobs") return "/#contact";
  return "#";
}

const HERO = {
  src: "/images/home-hero.webp",
  srcSet: "/images/home-hero-960.webp 960w, /images/home-hero.webp 1536w",
};

export function heroImage(url) {
  const value = String(url ?? "").trim() || HERO.src;
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    decoded = value;
  }
  if (
    value === HERO.src ||
    decoded.includes("/images/home-hero") ||
    decoded.includes("wsYsqfTvfhPHNFhG")
  ) {
    return HERO;
  }
  return { src: value };
}

export function sendInquiry({ email, subject, fields }) {
  const body = Object.entries(fields)
    .filter(([, value]) => String(value ?? "").trim())
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
  const href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = href;
}
