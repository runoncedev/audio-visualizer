export default function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="text-slate-600 hover:text-slate-400 transition border border-transparent hover:border-slate-500 py-2 px-4 rounded-lg"
    >
      {children}
    </button>
  );
}
