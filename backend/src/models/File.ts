import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema(
  {
    // Unique key of the file
    key: { type: String, required: true, unique: true },

    // User ID of the uploader
    userId: { type: String, required: true },

    // Original filename of the file
    filename: { type: String, required: true },

    // Size of the file in bytes
    size: { type: Number, required: true },

    // MIME Type of the file.
    mimeType: { type: String, required: true },

    // Content Type of the file. This is for the HTTP Response sending the file.
    contentType: { type: String, required: true },

    // NOTE: Uploading to object storage also returns an ETag, but because files cannot be
    // updated, only created and delete, it is not stored.
  },
  { timestamps: true },
);

export const File = mongoose.model('File', fileSchema);
