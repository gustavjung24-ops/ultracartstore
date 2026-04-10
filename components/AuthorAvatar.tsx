import Image from "next/image";
import type { AuthorProfile } from "@/data/authors";
import { getAuthorInitials } from "@/lib/authors";

type AuthorAvatarSize = "sm" | "md" | "lg";

type AuthorAvatarProps = {
  author: Pick<AuthorProfile, "avatar" | "displayName">;
  size?: AuthorAvatarSize;
  className?: string;
};

const SIZE_CLASSES: Record<AuthorAvatarSize, { wrapper: string; initials: string }> = {
  sm: {
    wrapper: "h-10 w-10",
    initials: "text-xs",
  },
  md: {
    wrapper: "h-14 w-14",
    initials: "text-sm",
  },
  lg: {
    wrapper: "h-20 w-20",
    initials: "text-2xl",
  },
};

export default function AuthorAvatar({ author, size = "md", className = "" }: AuthorAvatarProps) {
  const sizeClass = SIZE_CLASSES[size];
  const wrapperClass = `${sizeClass.wrapper} ${className}`.trim();

  if (author.avatar) {
    return (
      <div className={`relative overflow-hidden rounded-full border border-slate-200 bg-white ${wrapperClass}`}>
        <Image src={author.avatar} alt={author.displayName} fill className="object-cover" unoptimized />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full border border-slate-200 bg-slate-100 font-semibold text-slate-600 ${sizeClass.initials} ${wrapperClass}`.trim()}
    >
      {getAuthorInitials(author.displayName)}
    </div>
  );
}
