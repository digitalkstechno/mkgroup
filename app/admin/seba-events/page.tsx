"use client";

import DashboardLayout from "@/components/DashboardLayout";
import CommonTable from "@/components/CommonTable";
import { Plus, Trash2, X, Calendar, Pencil, MessageSquare } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";

const inputCls = "w-full border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg shadow-sm";
const labelCls = "text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5";

export default function SebaEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    dateText: "",
    status: "active"
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [eventRes, msgRes] = await Promise.all([
        api.get(`/seba/event/all`),
        api.get(`/seba/event/messages`)
      ]);
      if (eventRes.data.status === "Success") {
        setEvents(eventRes.data.data);
      }
      if (msgRes.data.status === "Success") {
        setMessages(msgRes.data.data);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch events data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const body = new FormData();
    body.append("title", formData.title);
    body.append("subtitle", formData.subtitle);
    body.append("dateText", formData.dateText);
    body.append("status", formData.status);
    if (imageFile) {
      body.append("image", imageFile);
    }

    try {
      if (isEditing && editingId) {
        const response = await api.put(`/seba/event/${editingId}`, body, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        if (response.data.status === "Success") {
          toast.success("Event updated successfully!");
          closeDrawer();
          fetchData();
        }
      } else {
        const response = await api.post("/seba/event", body, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        if (response.data.status === "Success") {
          toast.success("Event created successfully!");
          closeDrawer();
          fetchData();
        }
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || `Failed to ${isEditing ? "update" : "create"} event`);
    } finally {
      setLoading(false);
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setIsEditing(false);
    setEditingId(null);
    setFormData({ title: "", subtitle: "", dateText: "", status: "active" });
    setImageFile(null);
  };

  const handleEdit = (event: any) => {
    setIsEditing(true);
    setEditingId(event._id);
    setFormData({
      title: event.title || "",
      subtitle: event.subtitle || "",
      dateText: event.dateText || "",
      status: event.status || "active"
    });
    setImageFile(null);
    setIsDrawerOpen(true);
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      const response = await api.delete(`/seba/event/${id}`);
      if (response.data.status === "Success") {
        toast.success("Event deleted successfully");
        fetchData();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete event");
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const response = await api.delete(`/seba/event/message/${id}`);
      if (response.data.status === "Success") {
        toast.success("Message deleted successfully");
        fetchData();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete message");
    }
  };

  const eventColumns = [
    {
      header: "BANNER IMAGE",
      accessor: "image",
      render: (row: any) => (
        row.image ? (
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/builder/${row.image}`}
            alt="Event Banner"
            className="w-24 h-12 object-contain bg-gray-50 border rounded p-1"
          />
        ) : (
          <span className="text-gray-400 italic text-xs">No image</span>
        )
      )
    },
    { header: "TITLE", accessor: "title" },
    { header: "SUBTITLE", accessor: "subtitle" },
    { header: "DATE TEXT", accessor: "dateText" },
    {
      header: "STATUS",
      accessor: "status",
      render: (row: any) => (
        <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${row.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
          {row.status || 'active'}
        </span>
      )
    },
    {
      header: "ACTIONS",
      accessor: "_id",
      render: (row: any) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEdit(row)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit Event"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteEvent(row._id)}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Event"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const messageColumns = [
    {
      header: "ATTACHED IMAGE",
      accessor: "image",
      render: (row: any) => (
        row.image ? (
          <a
            href={`${process.env.NEXT_PUBLIC_IMAGE_URL}/builder/${row.image}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/builder/${row.image}`}
              alt="Attached Image"
              className="w-20 h-18 object-contain bg-gray-50 rounded p-1 hover:opacity-80 transition-opacity"
            />
          </a>
        ) : (
          <span className="text-gray-400 italic text-xs">No image</span>
        )
      )
    },
    { header: "SUBMITTED MESSAGE", accessor: "message" },
    {
      header: "DATE & TIME",
      accessor: "createdAt",
      render: (row: any) => (
        <span className="text-xs text-gray-500 font-mono">
          {row.createdAt ? new Date(row.createdAt).toLocaleString() : "N/A"}
        </span>
      )
    },
    {
      header: "ACTIONS",
      accessor: "_id",
      render: (row: any) => (
        <button
          onClick={() => handleDeleteMessage(row._id)}
          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete Message"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )
    }
  ];

  return (
    <DashboardLayout type="admin">
      <div className="space-y-8">
        {/* Submitted User Messages Section */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <h4 className="text-base font-bold text-gray-900 uppercase tracking-tight flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-green-600" />
              <span>Submitted User Text Messages ({messages.length})</span>
            </h4>
          </div>
          <CommonTable 
            columns={messageColumns} 
            data={messages} 
            isLoading={loading}
            totalRecords={messages.length}
            currentPage={1}
            limit={100}
            onPageChange={() => {}}
            onSearch={() => {}}
            searchPlaceholder="Search messages..."
          />
        </div>

        {/* Drawer Modal */}
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden bg-gray-900/50 backdrop-blur-xs flex justify-end">
            <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">
                  {isEditing ? "Edit SEBA Event" : "Create SEBA Event"}
                </h3>
                <button
                  onClick={closeDrawer}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
                <div>
                  <label className={labelCls}>Event Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Property Show - April 2026"
                    className={inputCls}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className={labelCls}>Subtitle / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Anthem Circle, Valthan-Punagam Road, Outer Ring Road, Surat"
                    className={inputCls}
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  />
                </div>

                <div>
                  <label className={labelCls}>Date Text</label>
                  <input
                    type="text"
                    placeholder="e.g. April 24-26, 2026"
                    className={inputCls}
                    value={formData.dateText}
                    onChange={(e) => setFormData({ ...formData, dateText: e.target.value })}
                  />
                </div>

                <div>
                  <label className={labelCls}>Event Banner Image {isEditing ? "(Optional)" : "*"}</label>
                  <input
                    type="file"
                    accept="image/*"
                    required={!isEditing}
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>Status</label>
                  <select
                    className={inputCls}
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t">
                  <button
                    type="button"
                    onClick={closeDrawer}
                    className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium disabled:opacity-50"
                  >
                    {loading ? "Saving..." : isEditing ? "Update Event" : "Create Event"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
