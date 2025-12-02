import { cn } from "@/lib/utils";

export default function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "prose prose-neutral max-w-none dark:prose-invert",
        className
      )}
    >
      {children}
    </div>
  );
}
