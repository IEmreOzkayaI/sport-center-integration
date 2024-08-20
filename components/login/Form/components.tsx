// components/LoginButton.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFormStatus } from 'react-dom';

export function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button aria-disabled={pending} type="submit" className={`mt-4 w-full ${pending ? 'opacity-80' : ''}`}>
            {pending ? 'Giriş Yap...' : 'Giriş Yap'}
        </Button>
    );
}

export function InputField({ id, name, type = "text", placeholder }: { id: string, name: string, type?: string, placeholder: string }) {
    return (
        <div className="mt-4">
            <Input
                id={id}
                type={type}
                name={name}
                placeholder={placeholder}
            />
        </div>
    );
}
