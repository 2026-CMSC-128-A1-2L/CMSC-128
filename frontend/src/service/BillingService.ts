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
import { RentalService } from './RentalService';
import { UnitService } from './UnitService';

export const BillingService = {
  async getLandlordSummary() {
    const response = await api.get('/api/billings/landlord/summary');
    return response.data;
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
    const response = await api.get(`/api/units/${unitId}/billings`);
    return response.data;
  },

  async getFacilityBillings(facilityId: string): Promise<GetBillingsQuery> {
    return this.getBillings({ facilityId });
  },

  async getFacilitySummary(facilityId: string) {
    const facilityRes = await FacilityService.getFacility(facilityId);
    const facility = facilityRes.data;

    const billingsRes = await this.getFacilityBillings(facilityId);
    const billings = billingsRes.data; // array of billing objects

    const unitsRes = await UnitService.getUnits({ facilityId });
    const totalUnits = unitsRes.data.length;

    const occupiedUnits = await this.getOccupiedUnitCount(facilityId);

    const totalIncome = billings
      .filter((b: any) => b.paymentStatus === 'paid')
      .reduce((sum: number, b: any) => sum + b.totalAmount, 0);

    const totalOutstanding = billings
      .filter((b: any) => b.paymentStatus !== 'paid')
      .reduce((sum: number, b: any) => sum + b.totalAmount, 0);

    const collectionRate =
      totalIncome + totalOutstanding === 0
        ? 0
        : Math.round((totalIncome / (totalIncome + totalOutstanding)) * 100);

    const occupancyRate = totalUnits === 0 ? 0 : Math.round((occupiedUnits / totalUnits) * 100);

    const breakdownMap = new Map<string, number>();
    billings
      .filter((b: any) => b.paymentStatus === 'paid')
      .forEach((b: any) => {
        b.breakdown.forEach((item: { name: string; amount: number }) => {
          breakdownMap.set(item.name, (breakdownMap.get(item.name) || 0) + item.amount);
        });
      });
    const incomeBreakdown = Array.from(breakdownMap.entries()).map(([name, value]) => ({
      name,
      value,
    }));

    return {
      data: {
        facilityInfo: {
          id: facility._id,
          name: facility.name,
          address: facility.location?.text ?? 'Unknown Address',
        },
        overview: {
          occupancyRate,
          collectionRate,
        },
        breakdown: {
          monthlyIncome: totalIncome,
          incomeBreakdown,
        },
      },
    };
  },

  async getOccupiedUnitCount(facilityId: string): Promise<number> {
    const rentalsRes = await RentalService.getRentals({ facilityId, status: 'active' });
    const occupiedUnitIds = new Set(
      (rentalsRes.data as any[]).map((r: any) => r.unitId?._id ?? r.unitId)
    );
    return occupiedUnitIds.size;
  },
};