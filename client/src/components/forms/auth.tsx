import { Keyboard, Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Card } from '../ui/card';
interface AuthFormProps {
    title: string;
    subtitle: string;
    body: React.ReactElement;
}
const AuthForm = ({ title, subtitle, body }: AuthFormProps) => {
    return (
        <Card className="w-full max-w-md">
            <div className="p-4">
                <div className="flex items-center justify-center flex-col">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full mb-4">
                        <Keyboard className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
                </div>
                <div className="mt-3">{body}</div>
            </div>
        </Card>
    );
};

export default AuthForm;
