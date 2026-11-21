export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 items-center justify-center bg-linear-to-b from-secondary/70 via-background to-background px-4 py-12">
      <div className="w-full max-w-md">
        {children}
        </div>
    </main>
  );
}
