import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Globe,
  Mail,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { emailOf, footerHref, navHref, phonesOf, telHref, websiteOf } from "../lib/site";

export function Logo({ cms, compact = false }) {
  const src = cms.logoUrl;
  return (
    <Link to="/" className="flex items-center gap-2 no-underline hover:no-underline">
      {src ? (
        <img
          src={src}
          alt={`${cms.brandName} logo`}
          className={`${compact ? "h-9 w-9 md:h-11 md:w-11" : "h-9 w-9 sm:h-10 sm:w-10 md:h-14 md:w-14"} shrink-0 object-contain`}
        />
      ) : null}
      <span className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-teal">
        {cms.brandName}
      </span>
    </Link>
  );
}

export function HeaderPhones({ cms }) {
  const phones = phonesOf(cms);
  return (
    <div className="flex flex-col items-end gap-1 shrink-0">
      {phones.map((phone) => (
        <a
          key={phone}
          href={telHref(phone)}
          aria-label={`Call ${phone}`}
          className="font-bold text-[10px] sm:text-xs md:text-sm flex items-center gap-1 sm:gap-1.5 no-underline text-navy hover:text-teal"
        >
          <Phone className="w-3.5 h-3.5 text-orange shrink-0" />
          <span className="leading-none whitespace-nowrap">{phone}</span>
        </a>
      ))}
    </div>
  );
}

export function ContactList({ cms, tone = "dark" }) {
  const phones = phonesOf(cms);
  const email = emailOf(cms);
  const website = websiteOf(cms);
  const linkClass =
    tone === "dark"
      ? "text-white hover:text-orange no-underline font-bold break-all"
      : "text-teal hover:underline no-underline font-bold break-all";
  const iconClass = tone === "dark" ? "w-4 h-4 text-orange shrink-0" : "w-5 h-5 text-orange shrink-0";
  return (
    <div className={tone === "dark" ? "space-y-3 text-sm font-sans" : "space-y-4 text-base font-sans"}>
      {phones.map((phone) => (
        <p key={phone} className="flex items-center gap-2">
          <Phone className={iconClass} />
          <a href={telHref(phone)} className={linkClass}>
            {phone}
          </a>
        </p>
      ))}
      <p className="flex items-center gap-2">
        <Mail className={iconClass} />
        <a href={`mailto:${email}`} className={linkClass}>
          {email}
        </a>
      </p>
      <p className="flex items-center gap-2">
        <Globe className={iconClass} />
        <a href={website} className={linkClass}>
          {website}
        </a>
      </p>
    </div>
  );
}

export function Header({ cms, showTopBar = false }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      {showTopBar ? (
        <div className="bg-navy text-white py-2 hidden md:block">
          <div className="container flex justify-end gap-6 text-xs font-sans">
            <a href="#" className="hover:text-orange no-underline">
              Medical & Community Partners
            </a>
            <a href="#" className="hover:text-orange no-underline">
              Franchise Opportunities
            </a>
          </div>
        </div>
      ) : null}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container py-3 md:py-4 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Logo cms={cms} />
            <div className="text-[10px] md:text-xs text-gray-600 leading-tight hidden sm:block uppercase tracking-wider font-bold">
              {cms.companyDescriptor}
            </div>
          </div>
          <nav className="hidden lg:flex gap-8 items-center">
            {(cms.navItems ?? []).map((item) => (
              <Link
                key={item}
                to={navHref(item, cms)}
                className="text-gray-700 font-sans font-bold hover:text-teal no-underline text-sm uppercase tracking-wide"
              >
                {item}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 text-navy"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <HeaderPhones cms={cms} />
          </div>
        </div>
        {open ? (
          <nav className="lg:hidden border-t border-gray-100 bg-white">
            <div className="container py-4 flex flex-col gap-4">
              {(cms.navItems ?? []).map((item) => (
                <Link
                  key={item}
                  to={navHref(item, cms)}
                  onClick={close}
                  className="text-gray-700 font-sans font-bold hover:text-teal no-underline text-sm uppercase tracking-wide"
                >
                  {item}
                </Link>
              ))}
            </div>
          </nav>
        ) : null}
      </header>
      <div className={showTopBar ? "h-[72px] md:h-[104px]" : "h-[72px] md:h-[88px]"} />
    </>
  );
}

export function Footer({ cms, variant = "home" }) {
  if (variant === "home") {
    return (
      <footer className="bg-navy text-white pt-20 pb-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1">
              <div className="text-3xl font-serif font-bold mb-6 text-white">{cms.brandName}</div>
              <ContactList cms={cms} />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold mb-8 text-gray-500">Quick Links</h4>
              <div className="space-y-4">
                {cms.footerLinks.map((item) => (
                  <Link
                    key={item}
                    to={footerHref(item)}
                    className="block text-orange hover:text-white no-underline font-bold text-sm transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold mb-8 text-gray-500">Our Services</h4>
              <div className="space-y-4">
                {cms.services.map((service) => (
                  <Link
                    key={service.title}
                    to={`/services/${slugifyTitle(service.title)}`}
                    className="block text-gray-400 hover:text-white no-underline text-sm transition-colors"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold mb-8 text-gray-500">Connect</h4>
              <div className="flex gap-4">
                {["F", "T", "L"].map((mark) => (
                  <div
                    key={mark}
                    className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-orange transition-colors cursor-pointer"
                  >
                    {mark}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500 font-sans">
            <p>© 2026 {cms.brandName}. All rights reserved. Personalized in-home care and assistance.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white no-underline">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white no-underline">
                Accessibility
              </a>
              <a href="#" className="hover:text-white no-underline">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-navy text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <div className="text-2xl font-serif font-bold mb-6 text-white">{cms.brandName}</div>
            <ContactList cms={cms} />
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-8 text-gray-500">Quick Links</h4>
            <div className="space-y-4">
              {cms.footerLinks.map((item) => (
                <Link
                  key={item}
                  to={footerHref(item)}
                  className="block text-orange hover:text-white no-underline font-bold text-sm transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-xs">
          © 2026 {cms.brandName}. All rights reserved. Personalized in-home care and assistance.
        </div>
      </div>
    </footer>
  );
}

function slugifyTitle(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function LearnMore({ children = "Learn More" }) {
  return (
    <>
      {children} <ChevronRight className="w-4 h-4" />
    </>
  );
}
