import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };

const BaseIcon: React.FC<IconProps & { children: React.ReactNode }> = ({ className = 'w-4 h-4', children, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...rest}
  >
    {children}
  </svg>
);

export const ShieldCheck: React.FC<IconProps> = p => (
  <BaseIcon {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></BaseIcon>
);
export const Users: React.FC<IconProps> = p => (
  <BaseIcon {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></BaseIcon>
);
export const Lock: React.FC<IconProps> = p => (
  <BaseIcon {...p}><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></BaseIcon>
);
export const User: React.FC<IconProps> = p => (
  <BaseIcon {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></BaseIcon>
);
export const Server: React.FC<IconProps> = p => (
  <BaseIcon {...p}><rect width="20" height="8" x="2" y="2" rx="2" /><rect width="20" height="8" x="2" y="14" rx="2" /><line x1="6" x2="6.01" y1="6" y2="6" /><line x1="6" x2="6.01" y1="18" y2="18" /></BaseIcon>
);
export const Building2: React.FC<IconProps> = p => (
  <BaseIcon {...p}><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" /></BaseIcon>
);
export const AlertCircle: React.FC<IconProps> = p => (
  <BaseIcon {...p}><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></BaseIcon>
);
export const LayoutDashboard: React.FC<IconProps> = p => (
  <BaseIcon {...p}><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></BaseIcon>
);
export const Award: React.FC<IconProps> = p => (
  <BaseIcon {...p}><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></BaseIcon>
);
export const Briefcase: React.FC<IconProps> = p => (
  <BaseIcon {...p}><rect width="20" height="14" x="2" y="7" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></BaseIcon>
);
export const HeartPulse: React.FC<IconProps> = p => (
  <BaseIcon {...p}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" /></BaseIcon>
);
export const DollarSign: React.FC<IconProps> = p => (
  <BaseIcon {...p}><line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></BaseIcon>
);
export const Settings: React.FC<IconProps> = p => (
  <BaseIcon {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></BaseIcon>
);
export const LogOut: React.FC<IconProps> = p => (
  <BaseIcon {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></BaseIcon>
);
export const Database: React.FC<IconProps> = p => (
  <BaseIcon {...p}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14a9 3 0 0 0 18 0V5" /><path d="M3 12a9 3 0 0 0 18 0" /></BaseIcon>
);
export const FileCheck2: React.FC<IconProps> = p => (
  <BaseIcon {...p}><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="m3 15 2 2 4-4" /></BaseIcon>
);
export const Layers: React.FC<IconProps> = p => (
  <BaseIcon {...p}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></BaseIcon>
);
export const ArrowRight: React.FC<IconProps> = p => (
  <BaseIcon {...p}><line x1="5" x2="19" y1="12" y2="12" /><polyline points="12 5 19 12 12 19" /></BaseIcon>
);
export const Search: React.FC<IconProps> = p => (
  <BaseIcon {...p}><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></BaseIcon>
);
export const FileText: React.FC<IconProps> = p => (
  <BaseIcon {...p}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /></BaseIcon>
);
export const FileWarning: React.FC<IconProps> = p => (
  <BaseIcon {...p}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><path d="M12 9v4" /><path d="M12 17h.01" /></BaseIcon>
);
export const PlusCircle: React.FC<IconProps> = p => (
  <BaseIcon {...p}><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="16" /><line x1="8" x2="16" y1="12" y2="12" /></BaseIcon>
);
export const Download: React.FC<IconProps> = p => (
  <BaseIcon {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></BaseIcon>
);
export const Eye: React.FC<IconProps> = p => (
  <BaseIcon {...p}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></BaseIcon>
);
export const CheckCircle2: React.FC<IconProps> = p => (
  <BaseIcon {...p}><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></BaseIcon>
);
export const Clock: React.FC<IconProps> = p => (
  <BaseIcon {...p}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></BaseIcon>
);
export const X: React.FC<IconProps> = p => (
  <BaseIcon {...p}><line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" /></BaseIcon>
);
export const BookOpen: React.FC<IconProps> = p => (
  <BaseIcon {...p}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></BaseIcon>
);
export const TrendingUp: React.FC<IconProps> = p => (
  <BaseIcon {...p}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></BaseIcon>
);
export const CalendarCheck: React.FC<IconProps> = p => (
  <BaseIcon {...p}><rect width="18" height="18" x="3" y="4" rx="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path d="m9 16 2 2 4-4" /></BaseIcon>
);
export const Sun: React.FC<IconProps> = p => (
  <BaseIcon {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></BaseIcon>
);
export const Calculator: React.FC<IconProps> = p => (
  <BaseIcon {...p}><rect width="16" height="20" x="4" y="2" rx="2" /><line x1="8" x2="16" y1="6" y2="6" /><line x1="16" x2="16" y1="14" y2="18" /><path d="M16 10h.01" /><path d="M12 10h.01" /><path d="M8 10h.01" /><path d="M12 14h.01" /><path d="M8 14h.01" /><path d="M12 18h.01" /><path d="M8 18h.01" /></BaseIcon>
);
export const CreditCard: React.FC<IconProps> = p => (
  <BaseIcon {...p}><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></BaseIcon>
);
export const FileSpreadsheet: React.FC<IconProps> = p => (
  <BaseIcon {...p}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M8 13h2" /><path d="M8 17h2" /><path d="M14 13h2" /><path d="M14 17h2" /></BaseIcon>
);
export const Printer: React.FC<IconProps> = p => (
  <BaseIcon {...p}><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect width="12" height="8" x="6" y="14" /></BaseIcon>
);
export const Star: React.FC<IconProps> = p => (
  <BaseIcon {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></BaseIcon>
);
export const HeartHandshake: React.FC<IconProps> = p => (
  <BaseIcon {...p}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></BaseIcon>
);
