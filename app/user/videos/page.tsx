import DashboardLayout from "@/components/DashboardLayout";

export default function VideosPage() {
  return (
    <DashboardLayout type="user" title="Video Gallery">
      <div className="bg-white rounded-2xl border p-8 text-center">
        <h2 className="text-xl font-bold">Video Gallery</h2>
        <p className="text-gray-500 mt-2">Project walkthroughs and media content will appear here.</p>
      </div>
    </DashboardLayout>
  );
}
