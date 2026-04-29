import axios from 'axios';
import { API_URL } from './constant';

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

export const FileService = {
  async uploadFile(file: File): Promise<FileUploadResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post<FileUploadResponse>(`${API_URL}/api/files`, formData, {
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
