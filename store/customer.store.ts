import { create } from "zustand";

const customerStore = create((set) => ({
    customer: {
        customers: {
            id: null,
            fullName: null,
            phone: null,
            status: null,
            userId: null,
            createdAt: null,
            updatedAt: null,
            deletedAt: null
        },
        invoices: {
            id: null,
            customerId: null,
            packageName: null,
            packageStartDate: null,
            packageEndDate: null,
            sportCenterName: null,
            sportCenterPrice: null,
            commissionPercentage: null,
            adminPrice: null,
            createdAt: null
        }
    } as Customer,
    setCustomer: (customer: Customer) => set({ customer }),
    clearCustomer: () => set({ customer: {
        customers: {
            id: null,
            fullName: null,
            phone: null,
            status: null,
            userId: null,
            createdAt: null,
            updatedAt: null,
            deletedAt: null
        },
        invoices: {
            id: null,
            customerId: null,
            packageName: null,
            packageStartDate: null,
            packageEndDate: null,
            sportCenterName: null,
            sportCenterPrice: null,
            commissionPercentage: null,
            adminPrice: null,
            createdAt: null
        }
    } }),
}));

export default customerStore;

type Customer = {
    customers: {
        id: number | null;
        fullName: string | null;
        phone: string | null;
        status: string | null;
        userId: number | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        deletedAt: Date | null;
    },
    invoices: {
        id: number | null;
        customerId: number | null;
        packageName: string | null;
        packageStartDate: Date | null;
        packageEndDate: Date | null;
        sportCenterName: string | null;
        sportCenterPrice: string | null;
        commissionPercentage: string | null;
        adminPrice: string | null;
        createdAt: Date | null;
    }
};
