"use client";

import DashboardLayout from "@/components/DashboardLayout";
import CommonTable from "@/components/CommonTable";
import { Plus, LayoutDashboard, Trash2, X, Image as ImageIcon } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { formatPhoneNumber, cleanPhoneNumber } from "@/lib/phoneUtils";
import Cropper, { Area } from 'react-easy-crop';

const getCroppedImg = (
  imageSrc: string,
  pixelCrop: Area
): Promise<Blob | null> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(null);

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      // IMPORTANT: use image/png to keep transparent background
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/png');
    };
    image.onerror = (error) => reject(error);
  });
};

const inputCls = "w-full border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg shadow-sm";
const labelCls = "text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5";

export default function SebaSponsorsPage() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [formData, setFormData] = useState({ type: "sponsor", image: null as File | null, adImage: null as File | null, nfcNumber: "" });

  // Cropper states
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const fetchSponsors = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/seba/sponsor`);
      if (data.status === "Success") {
        setSponsors(data.data);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch sponsors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setOriginalImage(reader.result as string);
        setShowCropper(true);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCrop = async () => {
    if (!originalImage || !croppedAreaPixels) return;
    try {
      const blob = await getCroppedImg(originalImage, croppedAreaPixels);
      if (blob) {
        // use .png extension since we crop to image/png
        const file = new File([blob], "sponsor.png", { type: "image/png" });
        setFormData({ ...formData, image: file });
        setShowCropper(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      toast.error("Please upload an image");
      return;
    }
    setLoading(true);
    try {
      const form = new FormData();
      form.append("type", formData.type);
      form.append("image", formData.image);
      if (formData.adImage) form.append("adImage", formData.adImage);
      if (formData.nfcNumber) form.append("nfcNumber", cleanPhoneNumber(formData.nfcNumber));

      const response = await api.post('/seba/sponsor', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.status === "Success") {
        toast.success("Created successfully!");
        setFormData({ type: "sponsor", image: null, adImage: null, nfcNumber: "" });
        setIsDrawerOpen(false);
        fetchSponsors();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    try {
      const response = await api.delete(`/seba/sponsor/${id}`);
      if (response.data.status === "Success") {
        toast.success("Deleted successfully");
        fetchSponsors();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete");
    }
  };

  const columns = [
    {
      header: "Image", accessor: "image",
      render: (row: any) => (
        <div className="h-16 w-32 bg-gray-100 border border-gray-200 overflow-hidden shadow-sm rounded-lg flex items-center justify-center">
          <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/builder/${row.image}`} alt={row.type} className="max-h-full max-w-full object-contain" />
        </div>
      )
    },
    {
      header: "Type", accessor: "type",
      render: (row: any) => (
        <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-md ${
          row.type === 'sponsor' ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-100 text-amber-700'
        }`}>
          {row.type}
        </span>
      )
    },
    {
      header: "Actions", accessor: "_id",
      render: (row: any) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleDelete(row._id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )
    },
  ];

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-gray-900 rounded-xl flex items-center justify-center shadow">
              <ImageIcon size={16} className="text-white" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">SEBA Sponsors</h3>
          </div>
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 text-xs font-bold rounded-xl hover:bg-indigo-700 shadow-md transition-all"
          >
            <Plus size={16} className="stroke-[2.5]" /> Add Sponsor
          </button>
        </div>

        {isDrawerOpen && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex justify-end transition-all">
            <div className="w-[450px] bg-white h-screen max-h-screen shadow-2xl p-6 flex flex-col border-l border-gray-100 animate-slide-in">
              <div className="flex items-center justify-between border-b pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 bg-gray-900 rounded-xl flex items-center justify-center">
                    <ImageIcon size={16} className="text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">Add New Sponsor</h3>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)} 
                  className="p-1.5 hover:bg-gray-100 text-gray-400 hover:text-gray-900 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCreate} className="flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <label className={labelCls}>Type *</label>
                    <select 
                      required 
                      value={formData.type} 
                      onChange={(e) => setFormData({ ...formData, type: e.target.value, image: null })} 
                      className={inputCls}
                    >
                      <option value="sponsor">Sponsor</option>
                      <option value="co-sponsor">Co-Sponsor</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Image *</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      required={!formData.image} 
                      onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
                      onChange={handleImageSelect} 
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all border border-gray-200 px-3 py-2.5 rounded-lg bg-white shadow-sm" 
                    />
                    {formData.image && <p className="text-xs text-green-600 mt-2 font-bold">✓ Image cropped and ready</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Ad Image (Optional)</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setFormData({ ...formData, adImage: file });
                      }}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all border border-gray-200 px-3 py-2.5 rounded-lg bg-white shadow-sm" 
                    />
                    {formData.adImage && <p className="text-xs text-green-600 mt-2 font-bold">✓ Ad Image selected</p>}
                  </div>
                  <div>
                    <label className={labelCls}>NFC Number (Optional)</label>
                    <input 
                      type="text"
                      placeholder="e.g. 98765 43210"
                      value={formData.nfcNumber}
                      onChange={(e) => setFormData({ ...formData, nfcNumber: formatPhoneNumber(e.target.value) })}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="border-t pt-4 flex gap-3 justify-end">
                  <button 
                    type="button" 
                    onClick={() => setIsDrawerOpen(false)} 
                    className="px-4 py-2.5 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading || !formData.image} 
                    className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2.5 text-xs font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-md disabled:opacity-60"
                  >
                    {loading ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Plus size={16} className="stroke-[2.5]" /> Add</>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">Sponsors List</h3>
          </div>
          <div className="p-6">
            <CommonTable
              columns={columns}
              data={sponsors}
              isLoading={loading}
              totalRecords={sponsors.length}
              currentPage={1}
              limit={100}
              onPageChange={() => {}}
              onSearch={() => {}}
            />
          </div>
        </div>

        {showCropper && originalImage && (
          <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full flex flex-col items-center shadow-2xl">
              <h3 className="text-gray-900 text-sm font-extrabold uppercase tracking-wider mb-4">Adjust Image</h3>
              
              <div className="relative w-full h-[300px] bg-gray-900 rounded-lg overflow-hidden shadow-inner">
                <Cropper
                  image={originalImage}
                  crop={crop}
                  zoom={zoom}
                  aspect={16 / 9}
                  restrictPosition={false}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>

              <p className="text-[10px] text-gray-500 font-bold mt-3">Pinch or drag to crop like mobile apps</p>

              <div className="w-full mt-4 flex items-center gap-3">
                <span className="text-xs text-gray-400 font-bold">Zoom</span>
                <input 
                  type="range" 
                  min="1" 
                  max="3" 
                  step="0.1" 
                  value={zoom} 
                  onChange={(e) => setZoom(parseFloat(e.target.value))} 
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <span className="text-xs text-gray-700 font-bold w-8">{zoom.toFixed(1)}x</span>
              </div>

              <div className="flex gap-3 mt-6 w-full">
                <button 
                  type="button" 
                  onClick={() => setShowCropper(false)} 
                  className="flex-1 bg-gray-100 text-gray-500 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-200 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  onClick={handleCrop} 
                  className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-md cursor-pointer"
                >
                  Apply Crop
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
