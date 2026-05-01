import axios from 'axios';
import type { AddDocumentBody } from '../interface/document';
import { API_URL } from './constant';

export const DocumentService = {

  async getDocuments(parentRoute: string, parentId: string) {
    try {
      const response = await axios.get(
        `${API_URL}/api/${parentRoute}/${parentId}/documents`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching documents:', error);
      throw error;
    }
  },

  async addDocument(parentRoute: string, parentId: string, docId: string, body: AddDocumentBody) {
    try {
      const response = await axios.post(
        `${API_URL}/api/${parentRoute}/${parentId}/documents/${docId}`,
        {
          ...body,
        },
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error adding document:', error);
      throw error;
    }
  },

  async deleteDocument(parentRoute: string, parentId: string, docId: string) {
    try {
      const response = await axios.delete(
        `${API_URL}/api/${parentRoute}/${parentId}/documents/${docId}`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  },

  async acceptDocument(parentRoute: string, parentId: string, docId: string) {
    try {
      const response = await axios.post(
        `${API_URL}/api/${parentRoute}/${parentId}/documents/${docId}/accept`,
        {},
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error accepting document:', error);
      throw error;
    }
  },

  async rejectDocument(parentRoute: string, parentId: string, docId: string, message: string) {
    try {
      const response = await axios.post(
        `${API_URL}/api/${parentRoute}/${parentId}/documents/${docId}/reject`,
        {
          message,
        },
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error rejecting document:', error);
      throw error;
    }
  },
};
