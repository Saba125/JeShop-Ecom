import React from 'react';
import { Card, CardContent } from '../ui/card';
import { CButton } from './custom-button';
import { Mail, Sparkles } from 'lucide-react';

const NewsLetterSection = () => {
    return (
        <section className="container mx-auto px-4 py-16">
            <Card className="relative overflow-hidden border-2 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
                
                <CardContent className="relative p-12 text-center">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                        <Mail className="w-8 h-8 text-primary" />
                    </div>

                    {/* Heading with accent */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="w-6 h-6 text-primary" />
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            გამოიწერე სიახლეები
                        </h2>
                        <Sparkles className="w-6 h-6 text-primary" />
                    </div>

                    <p className="mb-8 text-muted-foreground max-w-2xl mx-auto text-lg">
                        მიიღე ინფორმაცია ახალი პროდუქტების, ფასდაკლებების და სპეციალური
                        შეთავაზებების შესახებ
                    </p>

                    {/* Input group */}
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <div className="relative flex-1">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="email"
                                placeholder="შენი ელ-ფოსტა"
                                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>
                        <CButton 
                            size="lg" 
                            text='გამოწერა' 
                            className="whitespace-nowrap px-8"
                        />
                    </div>

                    {/* Trust badge */}
                    <p className="mt-6 text-xs text-muted-foreground">
                        ✓ უფასო გამოწერა · ✓ ნებისმიერ დროს გამოწერის გაუქმება
                    </p>
                </CardContent>
            </Card>
        </section>
    );
};

export default NewsLetterSection;