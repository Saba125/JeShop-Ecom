import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Globe, CreditCard, Archive, Weight, BookX } from 'lucide-react';
import { cn } from '@/lib/utils';
import UnitSettings from './unit';
import BrandSettings from './brands';

interface SettingsSection {
    id: string;
    label: string;
    icon: React.ElementType;
}

const settingsSections: SettingsSection[] = [
    { id: 'profile', label: 'პროფილი', icon: User },
    { id: 'notifications', label: 'შეტყობინებები', icon: Bell },
    { id: 'unit', label: 'წონის ერთეულები', icon: Weight },
    { id: 'brands', label: 'ბრენდები', icon: BookX },


    
];

const SettingsLayout = () => {
    const [activeSection, setActiveSection] = useState('profile');

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <aside className="w-64 border-r bg-card">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">პარამეტრები</h1>
                  
                </div>

                <nav className="space-y-1">
                    {settingsSections.map((section) => {
                        const Icon = section.icon;
                        const isActive = activeSection === section.id;

                        return (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={cn(
                                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{section.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main className=" overflow-y-auto w-full  ">
                <div className="px-5">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold capitalize">{settingsSections.find((item) => item.id === activeSection)?.label}</h2>
                    </div>

                    <div className=" w-full space-y-6">
                        {activeSection === 'profile' && <ProfileSettings />}
                        {activeSection === 'notifications' && <NotificationSettings />}
                        {activeSection === "unit" && <UnitSettings />}
                        {activeSection === "brands" && <BrandSettings />}

                    </div>
                </div>
            </main>
        </div>
    );
};

// Example Settings Components
const ProfileSettings = () => (
    <div className="space-y-6">
        <SettingsCard title="Personal Information" description="Update your personal details">
            <div className="space-y-4">
                <InputField label="Full Name" placeholder="John Doe" />
                <InputField label="Email" placeholder="john@example.com" type="email" />
                <InputField label="Bio" placeholder="Tell us about yourself" multiline />
            </div>
        </SettingsCard>

        <SettingsCard title="Profile Photo" description="Update your profile picture">
            <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                    <User className="w-10 h-10 text-muted-foreground" />
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
                    Upload Photo
                </button>
            </div>
        </SettingsCard>
    </div>
);

const NotificationSettings = () => (
    <div className="space-y-6">
        <SettingsCard title="Email Notifications" description="Manage your email preferences">
            <div className="space-y-3">
                <ToggleOption label="Marketing emails" description="Receive updates about new features" />
                <ToggleOption label="Order updates" description="Get notified about your orders" defaultChecked />
                <ToggleOption label="Security alerts" description="Important security notifications" defaultChecked />
            </div>
        </SettingsCard>

        <SettingsCard title="Push Notifications" description="Manage push notification preferences">
            <div className="space-y-3">
                <ToggleOption label="Desktop notifications" description="Show notifications on desktop" />
                <ToggleOption label="Mobile notifications" description="Push notifications to your phone" defaultChecked />
            </div>
        </SettingsCard>
    </div>
);
const SettingsCard = ({ 
    title, 
    description, 
    children 
}: { 
    title: string; 
    description: string; 
    children: React.ReactNode 
}) => (
    <div className="border rounded-lg p-6 bg-card">
        <div className="mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        {children}
    </div>
);

const InputField = ({ 
    label, 
    placeholder, 
    type = 'text',
    multiline = false 
}: { 
    label: string; 
    placeholder?: string; 
    type?: string;
    multiline?: boolean;
}) => (
    <div>
        <label className="block text-sm font-medium mb-2">{label}</label>
        {multiline ? (
            <textarea 
                placeholder={placeholder}
                className="w-full px-3 py-2 border rounded-md bg-background min-h-[100px]"
            />
        ) : (
            <input
                type={type}
                placeholder={placeholder}
                className="w-full px-3 py-2 border rounded-md bg-background"
            />
        )}
    </div>
);

const ToggleOption = ({ 
    label, 
    description,
    defaultChecked = false 
}: { 
    label: string; 
    description: string;
    defaultChecked?: boolean;
}) => (
    <div className="flex items-center justify-between py-2">
        <div>
            <p className="font-medium">{label}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
            <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
    </div>
);



export default SettingsLayout;