export default function Button({
  children,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  onClick: () => void;
} & React.ComponentProps<"button">) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg border border-transparent px-4 py-2 text-slate-300 transition hover:border-slate-400 hover:text-slate-500 disabled:border-transparent disabled:text-slate-300 dark:text-slate-600 dark:hover:border-slate-500 dark:hover:text-slate-400"
      {...props}
    >
      {children}
    </button>
  );
}
