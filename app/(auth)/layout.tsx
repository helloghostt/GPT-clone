export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center h-full dark:bg-background dark:text-foreground">
      {children}
    </div>
  );
}
