export function Wrap({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="block py-4 px-8 h-[22rem] sm:flex sm:gap-x-6">
      {children}
    </div>
  );
}
