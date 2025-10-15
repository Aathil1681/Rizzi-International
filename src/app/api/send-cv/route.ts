import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import nodemailer from "nodemailer";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end("Method not allowed");

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: err.message });

    try {
      const { name, email, message } = fields;

      // Safe type assertion
      const cvFileRaw = files?.cv as File | File[] | undefined;

      // Handle if no file
      if (!cvFileRaw) {
        return res.status(400).json({ error: "CV file is required" });
      }

      // Normalize array vs single file
      const cvFile: File = Array.isArray(cvFileRaw) ? cvFileRaw[0] : cvFileRaw;

      // Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: "your-receiving-email@example.com",
        subject: `New CV Submission from ${name}`,
        text: `${name} (${email}) sent a message:\n\n${message}`,
        attachments: [
          {
            filename: cvFile.originalFilename || "CV.pdf",
            path: cvFile.filepath, // Nodemailer accepts path
          },
        ],
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Nodemailer error:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });
}
