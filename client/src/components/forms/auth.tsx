import { Card } from '../ui/card';

interface AuthFormProps {
    title: string;
    subtitle: string;
    body: React.ReactElement;
}

const AuthForm = ({ title, subtitle, body }: AuthFormProps) => {
    return (
        <Card className="w-full max-w-lg border-0 shadow-lg rounded-2xl">
            <div className="px-8 py-10">
                <div className="mb-7">
                    <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
                    <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
                </div>
                <div>{body}</div>
            </div>
        </Card>
    );
};

export default AuthForm;