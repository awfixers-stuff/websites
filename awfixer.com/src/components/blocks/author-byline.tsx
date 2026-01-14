import Image from "next/image";
import type { Author } from "@/lib/authors";

interface AuthorBylineProps {
  author: Author;
  date?: string;
  showAvatar?: boolean;
}

export function AuthorByline({ author, date, showAvatar = false }: AuthorBylineProps) {
  return (
    <div className="flex items-center gap-3">
      {showAvatar && author.avatar && (
        <Image
          src={author.avatar}
          alt={author.name}
          width={32}
          height={32}
          className="rounded-full"
        />
      )}
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <span className="font-medium">{author.name}</span>
        {date && (
          <>
            <span aria-hidden="true">•</span>
            <time dateTime={date}>{date}</time>
          </>
        )}
      </div>
    </div>
  );
}
