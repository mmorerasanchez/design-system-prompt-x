export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="font-display text-xl font-semibold">{title}</h1>
      <p className="mt-2 font-body text-sm text-muted-foreground">Coming soon.</p>
    </div>
  );
}
