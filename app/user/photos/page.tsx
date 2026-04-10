import DashboardLayout from "@/components/DashboardLayout";

export default function PhotosPage() {
  return (
    <DashboardLayout type="user" title="Photo Gallery">
      <div className="bg-white rounded-2xl border p-8 text-center">
        <h2 className="text-xl font-bold">Photo Gallery</h2>
        <p className="text-gray-500 mt-2">Beautiful views of project galleries will appear here.</p>
      </div>
    </DashboardLayout>
  );
}
