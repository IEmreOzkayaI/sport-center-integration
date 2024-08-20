// components/SignupButton.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFormStatus } from 'react-dom';

export function SignupButton() {
    const { pending } = useFormStatus();

    return (
        <Button aria-disabled={pending} type="submit" className={`mt-4 w-full ${pending ? 'opacity-80' : ''}`}>
            {pending ? 'Kayıt Ol...' : 'Kayıt Ol'}
        </Button>
    );
}

export function InputField({ id, name, type = "text", placeholder, onChange, onKeyDown }: any) {
    return (
        <div className="mt-4">
            <Input
                id={id}
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
        </div>
    );
}
