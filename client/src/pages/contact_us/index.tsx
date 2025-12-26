import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    MessageCircle,
    Facebook,
    Instagram,
    Twitter, 
} from 'lucide-react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen  dark:bg-slate-950 py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">დაგვიკავშირდით</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        გვაქვს შეკითხვები? ჩვენ აქ ვართ დასახმარებლად!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="bg-white dark:bg-slate-900">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-6">საკონტაქტო ინფორმაცია</h2>
                                
                                <div className="flex gap-4 mb-6">
                                    <div className="w-12 h-12 bg-[#006FEAFF] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">მისამართი</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            ა.კაზბეგის 115
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            მერაბ კოსტავას 73
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            თბილისი, საქართველო
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 mb-6">
                                    <div className="w-12 h-12 bg-[#006FEAFF] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-white " />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">ტელეფონი</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            +995 555 123 456
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            +995 555 123 457
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 mb-6">
                                    <div className="w-12 h-12 bg-[#006FEAFF] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">ელ-ფოსტა</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            info@example.ge
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            support@example.ge
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-[#006FEAFF] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">სამუშაო საათები</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            ორშაბათი - შაბათი
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            11:00 - 20:00
                                        </p>
                                        <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                                            კვირა: დახურულია
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white dark:bg-slate-900">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-4">სოციალური ქსელები</h2>
                                <div className="flex gap-3">
                                    <button className="w-12 h-12 bg-[#006FEAFF] bg-opacity-10 hover:bg-[#006FEAFF] hover:text-white rounded-lg flex items-center justify-center transition-colors">
                                        <Facebook className="w-5 h-5" />
                                    </button>
                                    <button className="w-12 h-12 bg-[#006FEAFF] bg-opacity-10 hover:bg-[#006FEAFF] hover:text-white rounded-lg flex items-center justify-center transition-colors">
                                        <Instagram className="w-5 h-5" />
                                    </button>
                                    <button className="w-12 h-12 bg-[#006FEAFF] bg-opacity-10 hover:bg-[#006FEAFF] hover:text-white rounded-lg flex items-center justify-center transition-colors">
                                        <Twitter className="w-5 h-5" />
                                    </button>
                                    <button className="w-12 h-12 bg-[#006FEAFF] bg-opacity-10 hover:bg-[#006FEAFF] hover:text-white rounded-lg flex items-center justify-center transition-colors">
                                        <MessageCircle className="w-5 h-5" />
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Card className="bg-white dark:bg-slate-900">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-[#006FEAFF] bg-opacity-10 rounded-lg flex items-center justify-center">
                                        <MessageCircle className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-semibold">გამოგვიგზავნეთ შეტყობინება</h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            შეავსეთ ფორმა და ჩვენ დაგიკავშირდებით
                                        </p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name and Email */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                სახელი და გვარი *
                                            </label>
                                            <Input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="თქვენი სახელი"
                                                required
                                                className="h-12"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                ელ-ფოსტა *
                                            </label>
                                            <Input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="example@email.com"
                                                required
                                                className="h-12"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone and Subject */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                ტელეფონი
                                            </label>
                                            <Input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+995 555 123 456"
                                                className="h-12"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                თემა *
                                            </label>
                                            <Input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                placeholder="შეტყობინების თემა"
                                                required
                                                className="h-12"
                                            />
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            შეტყობინება *
                                        </label>
                                        <Textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="დაწერეთ თქვენი შეტყობინება აქ..."
                                            required
                                            rows={6}
                                            className="resize-none"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        className="w-full h-12 bg-[#006FEAFF] hover:bg-[#0056cc] text-white text-base"
                                    >
                                        <Send className="w-5 h-5 mr-2" />
                                        გაგზავნა
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-8">
                    <Card className="bg-white dark:bg-slate-900 overflow-hidden">
                        <div className="h-96 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                            <div className="text-center">
                                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">რუკა</p>
                                <p className="text-sm text-gray-400 mt-2">
                                    ა.კაზბეგის 115, თბილისი
                                </p>
                            </div>
                            {/* Replace this with actual Google Maps iframe or map component */}
                        </div>
                    </Card>
                </div>

                {/* FAQ Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-center mb-8">ხშირად დასმული კითხვები</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-white dark:bg-slate-900">
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-2">რა არის მიწოდების დრო?</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    მიწოდება თბილისში ხდება 1-2 სამუშაო დღის განმავლობაში. რეგიონებში 3-5 სამუშაო დღე.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white dark:bg-slate-900">
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-2">შემიძლია პროდუქტის დაბრუნება?</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    დიახ, შეგიძლიათ პროდუქტის დაბრუნება 14 დღის განმავლობაში შესყიდვიდან.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white dark:bg-slate-900">
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-2">რა გადახდის მეთოდები გაქვთ?</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    ვიღებთ საბანკო ბარათებს, ონლაინ გადახდას და ნაღდი ანგარიშსწორებას მიწოდებისას.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white dark:bg-slate-900">
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-2">გაქვთ გარანტია პროდუქტებზე?</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    კი, ყველა პროდუქტს აქვს 1 წლიანი გარანტია მწარმოებლის მხრიდან.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;