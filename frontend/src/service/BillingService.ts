// frontend/src/service/BillingService.ts
import type z from 'zod';
import type { GetBillingsQuerySchema } from 'shared';
import type {
  CreateBillingBody,
  GetBillingsQuery,
  SubmitBillingPaymentArguments,
  UpdateBillingPaymentRequestBody,
  UpdateBillingRequestBody,
} from '../interface/billing';
import { api } from './axiosInstance';
import { FacilityService } from './FacilityService';
import { UnitService } from './UnitService';

export const BillingService = {
  async getLandlordSummary() {
    try {
      const response = await api.get('/api/billings/landlord/summary');
      return response.data;
    } catch (error) {
      console.error('Error fetching landlord billing summary:', error);
      throw error;
    }
  },

  async getFacilitySummary(facilityId: string) {
    try {
      const response = await api.get(`/api/billings/facility/${facilityId}/summary`);
      return response.data;
    } catch (error) {
      console.error('Error fetching facility billing summary:', error);
      throw error;
    }
  },

  async getUserBillingDashboard(userId: string) {
    try {
      const response = await api.get(`/api/billings/users/${userId}/dashboard`);
      return response.data;
    } catch (error) {
      const status = (error as { response?: { status?: number } })?.response?.status;
      if (status !== 404) {
        console.error('Error fetching user billing dashboard:', error);
      }
      throw error;
    }
  },

  async getBillings(params: z.infer<typeof GetBillingsQuerySchema>): Promise<GetBillingsQuery> {
    const response = await api.get<GetBillingsQuery>('/api/billings', {
      params: { q: JSON.stringify(params) },
    });
    return response.data;
  },

  async createBilling(body: CreateBillingBody) {
    const response = await api.post('/api/billings', body);
    return response.data;
  },

  async getBilling(billingId: string) {
    const response = await api.get(`/api/billings/${billingId}`);
    return response.data;
  },

  async updateBilling(billingId: string, body: UpdateBillingRequestBody) {
    const response = await api.patch(`/api/billings/${billingId}`, body);
    return response.data;
  },

  async updateBillingPayment(billingId: string, body: UpdateBillingPaymentRequestBody) {
    const response = await api.post(`/api/billings/${billingId}/verify`, body);
    return response.data;
  },

  async submitBillingPayment(billingId: string, body: SubmitBillingPaymentArguments) {
    const response = await api.post(`/api/billings/${billingId}/submit-payment`, body);
    return response.data;
  },

  async getUnitBillings(unitId: string) {
    try {
      const response = await api.get(`/api/units/${unitId}/billings`);
      return response.data;
    } catch (error) {
      console.warn(`Failed to fetch billings for unit ${unitId}:`, error);
      return { data: [] };
    }
  },

  async getAllBillingsForListings(listingIds: string[]): Promise<any[]> {
    if (listingIds.length === 0) return [];

    const unitsByListing = await Promise.all(
      listingIds.map(async (listingId) => {
        try {
          const res = await UnitService.getUnitsByListing(listingId);
          if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;
          if (res.data && Array.isArray(res.data)) return res.data;
          if (Array.isArray(res)) return res;
          return [];
        } catch (err) {
          console.warn(`Failed to fetch units for listing ${listingId}:`, err);
          return [];
        }
      }),
    );

    const allUnits: any[] = unitsByListing.flat();

    const billingsByUnit = await Promise.all(
      allUnits.map(async (unit: any) => {
        const unitId = unit._id ?? unit.id;
        if (!unitId) return [];
        try {
          const res = await this.getUnitBillings(unitId);
          let billings: any[] = [];
          if (res.data?.data && Array.isArray(res.data.data)) billings = res.data.data;
          else if (res.data && Array.isArray(res.data)) billings = res.data;
          else if (Array.isArray(res)) billings = res;

          const activeRentals: any[] = (unit.currentRentals ?? []).filter(
            (r: any) => r.status === 'active',
          );

          const stampedRentalId = activeRentals[0]?._id ?? null;
          const stampedTenantName = activeRentals
            .map((r: any) => {
              const u = r.userId;
              return typeof u === 'object' ? `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim() : '';
            })
            .filter(Boolean)
            .join(', ');

          return billings.map((b: any) => ({
            ...b,
            roomNumber: b.roomNumber || unit.roomNumber || '',
            _stampedRentalId: stampedRentalId,
            _stampedTenantName: stampedTenantName,
          }));
        } catch (err) {
          console.warn(`Failed to fetch billings for unit ${unitId}:`, err);
          return [];
        }
      }),
    );

    return billingsByUnit.flat();
  },

  async getAllBillingsForFacility(facilityId: string): Promise<any[]> {
    try {
      const facilityRes = await FacilityService.getFacility(facilityId);
      const facility = facilityRes.data ?? facilityRes;
      const listings: any[] = facility.listings || [];
      const listingIds = listings.map((l: any) => l.id).filter(Boolean);
      const billings = await this.getAllBillingsForListings(listingIds);
      billings.forEach((b: any) => {
        b.facilityId = b.facilityId ?? facilityId;
      });
      return billings;
    } catch (err) {
      console.error('Failed to fetch all billings for facility:', err);
      return [];
    }
  },

  async downloadBilling(userId: string) {
    try {
      const response = await api.get(`/api/billings/download/${userId}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement('a');
      link.href = url;

      const contentDisposition = response.headers['content-disposition'];
      let fileName = `billing_${userId}.pdf`;
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch?.[1]) fileName = fileNameMatch[1];
      }

      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);

      return response.data;
    } catch (error) {
      console.error('Error downloading billing PDF:', error);
      throw error;
    }
  },
};
