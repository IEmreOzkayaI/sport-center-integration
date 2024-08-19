export const getNewStatus = (currentStatus: string) => {
    switch (currentStatus) {
        case "pending":
            return "active";
        case "active":
            return "inactive";
        default:
            return "pending";
    }
};

export const getToastMessage = (status: string) => {
    switch (status) {
        case "pending":
            return "talep";
        case "active":
            return "aktif";
        default:
            return "pasif";
    }
};
