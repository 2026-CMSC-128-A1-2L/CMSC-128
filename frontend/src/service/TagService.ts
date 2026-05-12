import type { CreateTagBody, EnrichTagsBody, UpdateTagBody } from '../interface/tag';
import { api } from './axiosInstance';

export const TagService = {
  async getTags() {
    try {
      const response = await api.get('/api/tags');
      return response.data;
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  },

  async createTag(body: CreateTagBody) {
    try {
      const response = await api.post('/api/tags', body);
      return response.data;
    } catch (error) {
      console.error('Error creating tag:', error);
      throw error;
    }
  },

  async enrichTags(body: EnrichTagsBody) {
    try {
      const response = await api.post('/api/tags/enrich', body);
      return response.data;
    } catch (error) {
      console.error('Error enriching tags:', error);
      throw error;
    }
  },

  async updateTag(tagName: string, body: UpdateTagBody) {
    try {
      const response = await api.patch(`/api/tags/${tagName}`, body);
      return response.data;
    } catch (error) {
      console.error('Error updating tag:', error);
      throw error;
    }
  },

  async deleteTag(tagName: string) {
    try {
      const response = await api.delete(`/api/tags/${tagName}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting tag:', error);
      throw error;
    }
  },
};
