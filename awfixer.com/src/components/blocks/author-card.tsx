import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter, Globe } from "lucide-react";
import type { Author } from "@/lib/authors";

interface AuthorCardProps {
  author: Author;
  variant?: "compact" | "full";
}

export function AuthorCard({ author, variant = "compact" }: AuthorCardProps) {
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-3">
        {author.avatar && (
          <Image
            src={author.avatar}
            alt={author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        <div className="flex flex-col">
          <span className="font-medium">{author.name}</span>
          <span className="text-muted-foreground text-sm">{author.role}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="border-border rounded-lg border bg-card p-6">
      <div className="flex items-start gap-4">
        {author.avatar && (
          <Image
            src={author.avatar}
            alt={author.name}
            width={80}
            height={80}
            className="rounded-full"
          />
        )}
        <div className="flex-1 space-y-2">
          <div>
            <h3 className="text-xl font-semibold">{author.name}</h3>
            <p className="text-muted-foreground text-sm">{author.role}</p>
          </div>
          {author.bio && (
            <p className="text-muted-foreground text-sm">{author.bio}</p>
          )}
          {author.social && (
            <div className="flex gap-3 pt-2">
              {author.social.twitter && (
                <Link
                  href={author.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={`${author.name} on Twitter`}
                >
                  <Twitter className="size-5" />
                </Link>
              )}
              {author.social.github && (
                <Link
                  href={author.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={`${author.name} on GitHub`}
                >
                  <Github className="size-5" />
                </Link>
              )}
              {author.social.linkedin && (
                <Link
                  href={author.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={`${author.name} on LinkedIn`}
                >
                  <Linkedin className="size-5" />
                </Link>
              )}
              {author.social.website && (
                <Link
                  href={author.social.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={`${author.name}'s website`}
                >
                  <Globe className="size-5" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
