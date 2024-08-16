import { type ClassValue, clsx } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const showToast = (message: any, key: string, isReload = false) => {
    toast.dismiss();
    if (key === 'error') {
        toast.error(message, {
            style: {
                border: '1px solid #fafafa',
                padding: '16px',
                fontSize: '12px',
                textAlign: 'justify',
            },
        });
    }
    else if (key === 'success') {
        toast.success(message, {
            style: {
                border: '1px solid #fafafa',
                padding: '16px',
                fontSize: '12px',
                textAlign: 'justify',
            },
        });
    }
    if (isReload) {
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
};


export function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}
