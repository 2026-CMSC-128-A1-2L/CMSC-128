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

  async getBillingDetail(billingId: string): Promise<{
    tenantName: string;
    documents: { file: string; paymentMethod?: string; submittedAt?: string }[];
  }> {
    const res = await api.get(`/api/billings/${billingId}`);
    const b = res.data?.data ?? res.data ?? res;

    const documents: { file: string; paymentMethod?: string; submittedAt?: string }[] = [];
    for (const doc of b.documents ?? []) {
      const files: string[] = Array.isArray(doc.files) ? doc.files : [];
      for (const fileKey of files) {
        if (fileKey) {
          documents.push({
            file: fileKey,
            paymentMethod: doc.message?.match(/payment method:\s*(\S+)/i)?.[1] ?? undefined,
            submittedAt: doc.createdAt ?? undefined,
          });
        }
      }
    }

    let tenantName = b.tenantName ?? '';
    if (!tenantName && b.userId && typeof b.userId === 'object') {
      tenantName = `${b.userId.firstName ?? ''} ${b.userId.lastName ?? ''}`.trim();
    }
    if (!tenantName && b.rentalId && typeof b.rentalId === 'object') {
      const rUser = b.rentalId.userId;
      if (rUser && typeof rUser === 'object') {
        tenantName = `${rUser.firstName ?? ''} ${rUser.lastName ?? ''}`.trim();
      } else if (b.rentalId.tenantName) {
        tenantName = b.rentalId.tenantName;
      }
    }

    return { tenantName, documents };
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

          const activeRental = Array.isArray(unit.currentRentals)
            ? unit.currentRentals.find((r: any) => r.status === 'active') ?? unit.currentRentals[0]
            : null;
          const unitTenantName =
            activeRental?.userId && typeof activeRental.userId === 'object'
              ? `${activeRental.userId.firstName ?? ''} ${activeRental.userId.lastName ?? ''}`.trim()
              : '';

          return billings.map((b: any) => ({
            ...b,
            roomNumber: b.roomNumber || unit.roomNumber || '',
            tenantName: b.tenantName || unitTenantName,
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
      for (const b of billings) {
        b.facilityId = b.facilityId ?? facilityId;
      }
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
      link.remove();
      window.URL.revokeObjectURL(url);

      return response.data;
    } catch (error) {
      console.error('Error downloading billing PDF:', error);
      throw error;
    }
  },
};