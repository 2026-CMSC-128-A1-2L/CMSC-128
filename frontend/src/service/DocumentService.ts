import type { AddDocumentBody } from "../interface/document";
import { api } from "./axiosInstance";

export const DocumentService = {
  async getDocuments(parentRoute: string, parentId: string) {
    try {
      const response = await api.get(
        `/api/${parentRoute}/${parentId}/documents`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching documents:", error);
      throw error;
    }
  },

  async addDocument(
    parentRoute: string,
    parentId: string,
    docId: string,
    body: AddDocumentBody,
  ) {
    try {
      const response = await api.post(
        `/api/${parentRoute}/${parentId}/documents/${docId}`,
        body,
      );
      return response.data;
    } catch (error) {
      console.error("Error adding document:", error);
      throw error;
    }
  },

  async deleteDocument(
    parentRoute: string,
    parentId: string,
    docId: string,
    fileId: string,
  ) {
    try {
      const response = await api.delete(
        `/api/${parentRoute}/${parentId}/documents/${docId}/${fileId}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting document:", error);
      throw error;
    }
  },

  async acceptDocument(parentRoute: string, parentId: string, docId: string) {
    try {
      const response = await api.post(
        `/api/${parentRoute}/${parentId}/documents/${docId}/accept`,
      );
      return response.data;
    } catch (error) {
      console.error("Error accepting document:", error);
      throw error;
    }
  },

  async rejectDocument(
    parentRoute: string,
    parentId: string,
    docId: string,
    message: string,
  ) {
    try {
      const response = await api.post(
        `/api/${parentRoute}/${parentId}/documents/${docId}/reject`,
        {
          message,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error rejecting document:", error);
      throw error;
    }
  },

  async downloadDocument(filePath: string, fileName?: string) {
    try {
      const response = await api.get<{
        url: string;
        filename: string;
        mimeType: string;
      }>("/api/files/download", {
        params: { path: filePath },
      });
      const link = document.createElement("a");
      link.href = response.data.url;
      link.download = fileName || response.data.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading document:", error);
      throw error;
    }
  },
};
