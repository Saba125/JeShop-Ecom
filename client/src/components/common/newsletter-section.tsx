import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { CButton } from './custom-button';

const NewsLetterSection = () => {
    return (
        <section className="container mx-auto px-4 py-16">
            <Card className="bg-gradient-to-r from-primary to-primary/80 border-0">
                <CardContent className="p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">გამოიწერე სიახლეები</h2>
                    <p className="mb-8 text-white/90 max-w-2xl mx-auto">
                        მიიღე ინფორმაცია ახალი პროდუქტების, ფასდაკლებების და სპეციალური
                        შეთავაზებების შესახებ
                    </p>
                    <div className="flex gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="შენი ელ-ფოსტა"
                            className="flex-1 px-4 py-3 rounded-lg text-foreground"
                        />
                        <CButton size="lg" text='გამოწერა' variant="secondary" />
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};

export default NewsLetterSection;
