import { Background } from "@/components/background";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Background>
      <div className="py-28 lg:py-32">
        {children}
      </div>
    </Background>
  );
}