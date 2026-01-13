import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AnnouncementBanner() {
  return (
    <Link href="/blog" className="mb-6 inline-flex items-center">
      <div className="bg-muted/50 hover:bg-muted flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium transition-colors">
        <span className="bg-primary flex h-2 w-2 shrink-0 rounded-full" />
        <span className="text-muted-foreground">
          New: We&apos;ve launched our new blog!
        </span>
        <ArrowRight className="text-muted-foreground size-3.5" />
      </div>
    </Link>
  );
}
