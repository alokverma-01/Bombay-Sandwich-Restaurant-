'use client';

import { Menu as MenuIcon, MapPin, Phone, X } from 'lucide-react';
import { MenuContainer, MenuItem } from '@/components/ui/fluid-menu';
import { InstagramIcon, WhatsAppIcon } from './brand-icons';
import { site } from '@/lib/site';
import { hasWhatsApp, quickOrderText, waLink } from '@/lib/whatsapp';

const open = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

/** Desktop quick-contact dock, using the fluid menu component. */
export function QuickDock() {
  const items: { label: string; icon: React.ReactNode; onClick: () => void }[] = [];
  items.push({
    label: 'Order on WhatsApp',
    icon: <WhatsAppIcon className="size-6 text-wa" />,
    onClick: () => (hasWhatsApp ? open(waLink(quickOrderText)) : (window.location.href = '/order')),
  });
  if (site.phone) items.push({ label: `Call ${site.phone}`, icon: <Phone size={22} strokeWidth={1.8} />, onClick: () => (window.location.href = `tel:${site.phone.replace(/\s/g, '')}`) });
  items.push({ label: 'Get directions', icon: <MapPin size={22} strokeWidth={1.8} />, onClick: () => open(site.directionsUrl) });
  if (site.instagram) items.push({ label: 'Instagram', icon: <InstagramIcon className="size-[22px]" />, onClick: () => open(site.instagram) });

  return (
    <div
      className="no-print fixed right-5 top-[38vh] z-40 hidden rounded-full lg:block [&_.bg-gray-100]:bg-ink [&_button]:!text-white [&_.rounded-full.bg-gray-100]:bg-turmeric [&_.rounded-full.bg-gray-100_button]:!text-ink [&_.rounded-full.bg-gray-100]:shadow-[3px_3px_0_var(--ink)] [&_.rounded-full.bg-gray-100]:outline-2 [&_.rounded-full.bg-gray-100]:outline-ink"
      aria-label="Quick contact"
      role="group"
    >
      <MenuContainer>
        <MenuItem
          icon={
            <div className="relative h-6 w-6">
              <div className="absolute inset-0 origin-center rotate-0 scale-100 opacity-100 transition-all duration-300 ease-in-out [div[data-expanded=true]_&]:rotate-180 [div[data-expanded=true]_&]:scale-0 [div[data-expanded=true]_&]:opacity-0">
                <MenuIcon size={24} strokeWidth={2} />
              </div>
              <div className="absolute inset-0 origin-center -rotate-180 scale-0 opacity-0 transition-all duration-300 ease-in-out [div[data-expanded=true]_&]:rotate-0 [div[data-expanded=true]_&]:scale-100 [div[data-expanded=true]_&]:opacity-100">
                <X size={24} strokeWidth={2} />
              </div>
            </div>
          }
        >
          <span className="sr-only">Quick contact options</span>
        </MenuItem>
        {items.map((it) => (
          <MenuItem key={it.label} icon={it.icon} onClick={it.onClick}>
            <span className="sr-only">{it.label}</span>
          </MenuItem>
        ))}
      </MenuContainer>
    </div>
  );
}
