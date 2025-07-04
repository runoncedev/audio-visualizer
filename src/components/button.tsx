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
      className="text-slate-300 hover:text-slate-500 hover:border-slate-400 dark:text-slate-600 dark:hover:text-slate-400 transition border border-transparent dark:hover:border-slate-500 py-2 px-4 rounded-lg"
    >
      {children}
    </button>
  );
}
