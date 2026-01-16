import {
  Briefcase,
  Building2,
  HelpCircle,
  MessageSquare,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface ContactType {
  id: string;
  title: string;
  description: string;
  email: string;
  icon: LucideIcon;
  showCompanyField?: boolean;
  showEmployeesField?: boolean;
}

export const CONTACT_TYPES: Record<string, ContactType> = {
  general: {
    id: "general",
    title: "General Inquiries",
    description: "Questions, feedback, or anything else",
    email: "hello@awfixer.com",
    icon: MessageSquare,
    showCompanyField: true,
    showEmployeesField: false,
  },
  sales: {
    id: "sales",
    title: "Sales",
    description: "Enterprise solutions, pricing, and partnerships",
    email: "sales@awfixer.com",
    icon: Building2,
    showCompanyField: true,
    showEmployeesField: true,
  },
  careers: {
    id: "careers",
    title: "Careers",
    description: "Job opportunities and working at AWFixer",
    email: "careers@awfixer.com",
    icon: Briefcase,
    showCompanyField: false,
    showEmployeesField: false,
  },
  support: {
    id: "support",
    title: "Technical Support",
    description: "Help with our products and services",
    email: "support@awfixer.com",
    icon: HelpCircle,
    showCompanyField: true,
    showEmployeesField: false,
  },
  press: {
    id: "press",
    title: "Press & Media",
    description: "Media inquiries and press coverage",
    email: "press@awfixer.com",
    icon: Users,
    showCompanyField: true,
    showEmployeesField: false,
  },
};

export const getContactType = (id: string): ContactType | undefined => {
  return CONTACT_TYPES[id];
};

export const getAllContactTypes = (): ContactType[] => {
  return Object.values(CONTACT_TYPES);
};
