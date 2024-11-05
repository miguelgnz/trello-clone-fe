import AddCardButton from './AddCardButton';

interface ColumnProps {
  title: string;
  children: React.ReactNode;
}

export default function Column({ title, children }: ColumnProps) {
  return (
    <div className="flex flex-col gap-3 p-4 bg-column rounded-xl h-min min-h-36">
      <h2 className="text-white font-sans text-sm font-semibold">{title}</h2>
      {children}
      <AddCardButton />
    </div>
  );
}
