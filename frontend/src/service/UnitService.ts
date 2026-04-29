import axios from 'axios';
import z from 'zod';
import { GetUnitsRequestQuerySchema } from 'shared';
import type { GetUnitsRequestQuery } from '../interface/unit';
import { API_URL } from './constant';

export const UnitService = {
  async getUnits(
    params: z.infer<typeof GetUnitsRequestQuerySchema>
  ): Promise<GetUnitsRequestQuery> {
    try {
      const kv = new URLSearchParams({
        q: encodeURIComponent(JSON.stringify(params)),
      }).toString();

      const response = await axios.get(
        `${API_URL}/api/units?q=${kv}`,
      );

      return response.data();

    } catch (error) {
      console.error("Failed to fetch units: ", error);
      throw error;
    }

  },

  async getUnit(unitId: string) {
    try {
      const response = await axios.get(
        `${API_URL}/api/units/${unitId}`
      )

      return response.data()
    } catch (error) {
      console.error("Failed to fectch unit: ", error);
      throw (error);
    }
  },

  async updateUnit(unitId: string) {
    try {
      const response = await axios.patch(
        `${API_URL}/api/units/${unitId}`
      )

      return response.data()
    } catch (error) {
      console.error("Failed to update unit: ", error);
      throw error;
    }
  },

  async deleteUnit(unitId: string) {
    try {
      const response = await axios.delete(
        `${API_URL}/api/units/${unitId}`
      )

      return response.data()
    } catch (error) {
      console.error("Failed to update unit: ", error);
      throw error;
    }
  },

  //routeGetRentalsByUnit
  //routeGetUnitBillings



}

