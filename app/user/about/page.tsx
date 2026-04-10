import DashboardLayout from "@/components/DashboardLayout";

export default function GenericPage({ title }: { title: string }) {
  return (
    <DashboardLayout type="user" title={title}>
      <div className="bg-white rounded-2xl border p-8 text-center">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-500 mt-2">This is a placeholder for the {title} page.</p>
      </div>
    </DashboardLayout>
  );
}
