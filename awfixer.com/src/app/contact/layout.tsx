import { Background } from "@/components/background";

interface ContactLayoutProps {
  children: React.ReactNode;
}

export default function ContactLayout({ children }: ContactLayoutProps) {
  return <Background>{children}</Background>;
}
