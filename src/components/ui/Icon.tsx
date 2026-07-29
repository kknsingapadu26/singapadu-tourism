import {
  ArrowLeft,
  ArrowRight,
  Backpack,
  Baby,
  Calendar,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Globe,
  Hammer,
  Home,
  Landmark,
  Mail,
  Map,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  Sun,
  Ticket,
  Trees,
  Wallet,
  X,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react';

const ICONS = {
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  backpack: Backpack,
  baby: Baby,
  calendar: Calendar,
  car: Car,
  check: Check,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  clock: Clock,
  'external-link': ExternalLink,
  globe: Globe,
  hammer: Hammer,
  home: Home,
  landmark: Landmark,
  mail: Mail,
  map: Map,
  'map-pin': MapPin,
  menu: Menu,
  'message-circle': MessageCircle,
  moon: Moon,
  phone: Phone,
  sun: Sun,
  ticket: Ticket,
  trees: Trees,
  wallet: Wallet,
  x: X,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconName;
  title?: string;
}

export function Icon({ name, size = 24, strokeWidth = 1.8, title, ...props }: IconProps) {
  const LucideIcon = ICONS[name];

  return (
    <LucideIcon
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    >
      {title ? <title>{title}</title> : null}
    </LucideIcon>
  );
}
