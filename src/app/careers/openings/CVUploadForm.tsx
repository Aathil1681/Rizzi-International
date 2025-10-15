"use client";

import { useRef, useState } from "react";
import { toast, Toaster } from "sonner";
import { Send } from "lucide-react";

export function CVUploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Replace with your Web3Forms Access Key
  const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    const loadingToast = toast.loading("Submitting your application...");

    try {
      const formData = new FormData(formRef.current);
      formData.append("access_key", "7592de58-a002-41d1-9278-e2d42c5eb114");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      toast.dismiss(loadingToast);

      if (result.success) {
        toast.success("Your application has been sent successfully!");
        formRef.current.reset();
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      console.error(error);
      toast.dismiss(loadingToast);
      toast.error("Failed to send application. Please try again.");
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

        {/* Portfolio / CV Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Portfolio / CV Link (Upload your CV to Google Drive and paste the
            link )
          </label>
          <input
            type="url"
            name="cv_link"
            placeholder="Paste your portfolio or Google Drive CV link here"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-600 focus:border-blue-600"
          />
          <p className="text-xs text-gray-500 mt-2">
            Example: https://drive.google.com/your-cv-link or your portfolio
            URL.
          </p>
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
            disabled={isSubmitting}
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
