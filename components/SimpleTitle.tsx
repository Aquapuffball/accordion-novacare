export default function SimpleTitle({ title }: { title: string }) {
  return (
    <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-[#fff7ca] mb-6">
      {title}
    </h2>
  );
}
