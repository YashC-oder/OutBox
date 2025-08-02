export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
       <div className="max-w-7xl mx-auto p-6">
            {children}
      </div>
    </div>
  );
}