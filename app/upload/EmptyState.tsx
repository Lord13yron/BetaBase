export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-10 text-center">
      <p className="font-mono text-xs text-stone">{message}</p>
    </div>
  );
}
