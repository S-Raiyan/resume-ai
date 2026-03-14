export default function CleanBackground({ children }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white">

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(#ffffff10_1px,transparent_1px),linear-gradient(to_right,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Soft glow */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full blur-[120px] opacity-30"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500 rounded-full blur-[120px] opacity-30"></div>

      {/* Page content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        {children}
      </div>

    </div>
  )
}