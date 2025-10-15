"use client";

import { useRef, useState } from "react";
import { toast, Toaster } from "sonner";
import { Upload, Send } from "lucide-react";

export function CVUploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    if (!formRef.current.cv.files?.length) {
      toast.error("Please upload your CV before submitting.");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Submitting your application...");

    try {
      const formData = new FormData(formRef.current);
      const res = await fetch("/api/send-cv", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to send application");

      toast.dismiss(loadingToast);
      toast.success("Your application has been sent successfully!");
      formRef.current.reset();
      setFileName("");
    } catch (error: any) {
      toast.dismiss(loadingToast);
      console.error(error);
      toast.error("Failed to send application. Check console for details.", {
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Toaster position="top-right" richColors />
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Name & Email */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-600 focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-600 focus:border-blue-600"
            />
          </div>
        </div>

        {/* CV Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload your CV
          </label>
          <label className="relative flex items-center justify-center w-full px-4 py-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-600">
            <div className="text-center">
              <Upload className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-1 text-sm text-gray-600">
                <span className="font-semibold text-blue-700">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PDF, DOC, DOCX (MAX. 10MB)
              </p>
              {fileName && (
                <p className="text-sm text-green-600 mt-2">{fileName}</p>
              )}
            </div>
            <input
              type="file"
              name="cv"
              required
              accept=".pdf,.doc,.docx"
              className="sr-only"
              onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
            />
          </label>
        </div>

        {/* Optional Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message (Optional)
          </label>
          <textarea
            name="message"
            rows={4}
            placeholder="Tell us what you are passionate about..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-600 focus:border-blue-600"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting || !fileName}
            className="w-full flex justify-center items-center gap-2 bg-blue-950 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <Send size={18} /> Submit Application
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
