import { api } from './axiosInstance';

export type FileUploadResponse = {
  id: string;
  key: string;
  userId: string;
  filename: string;
  size: number;
  mimeType: string;
  contentType: string;
  createdAt: string;
  updatedAt: string;
};

export const getPublicFileUrl = (key: string) => {
  const publicPath = `/api/files/public?key=${encodeURIComponent(key)}`;

  if (typeof window === 'undefined') {
    return publicPath;
  }

  return new URL(publicPath, window.location.origin).toString();
};

export const FileService = {
  async uploadFile(file: File): Promise<FileUploadResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post<FileUploadResponse>('/api/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Failed to upload file:', error);
      throw error;
    }
  },
};
