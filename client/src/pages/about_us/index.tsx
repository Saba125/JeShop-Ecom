import {
    Users,
    Heart,
    Award,
    TrendingUp,
    Shield,
    Truck,
    Clock,
    Star,
    MapPin,
    Phone,
    Mail,
    Target,
    Zap,
    Package,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AboutUs = () => {
    const stats = [
        { icon: Users, value: '10,000+', label: 'კმაყოფილი მომხმარებელი' },
        { icon: Package, value: '50,000+', label: 'მიწოდებული პროდუქტი' },
        { icon: Award, value: '5+', label: 'წლიანი გამოცდილება' },
        { icon: Star, value: '4.9', label: 'საშუალო შეფასება' },
    ];

    const values = [
        {
            icon: Shield,
            title: 'ხარისხი',
            description: 'ვთავაზობთ მხოლოდ მაღალი ხარისხის პროდუქტებს და გარანტირებულ მომსახურებას',
        },
        {
            icon: Heart,
            title: 'მომხმარებელზე ზრუნვა',
            description: 'თქვენი კმაყოფილება არის ჩვენი პრიორიტეტი. ყოველთვის მზად ვართ დაგეხმაროთ',
        },
        // {
        //     icon: Zap,
        //     title: 'სიჩქარე',
        //     description: 'სწრაფი მიწოდება და ეფექტური მომსახურება მთელი საქართველოს მასშტაბით',
        // },
        {
            icon: TrendingUp,
            title: 'ინოვაცია',
            description: 'მუდმივად ვავითარებთ ჩვენს სერვისს და ვთავაზობთ სიახლეებს',
        },
    ];

    const team = [
        {
            name: 'გიორგი მამულაშვილი',
            role: 'დამმმფუძნებელი & CEO',
            image: null,
            color: 'from-blue-500 to-cyan-500',
        },
        {
            name: 'ნინო ბერიძე',
            role: 'მარკეტინგის ხელმძღვანელი',
            image: null,
            color: 'from-purple-500 to-pink-500',
        },
        {
            name: 'დავით ქარჩავა',
            role: 'ტექნიკური დირექტორი',
            image: null,
            color: 'from-orange-500 to-red-500',
        },
        {
            name: 'ანა გელაშვილი',
            role: 'კლიენტთა მხარდაჭერა',
            image: null,
            color: 'from-green-500 to-teal-500',
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent py-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <Badge className="mb-4 text-sm px-4 py-1">
                            ჩვენს შესახებ
                        </Badge>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            გაიცანით ჩვენი გუნდი
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            ჩვენ ვართ თანამედროვე ელექტრონული კომერციის პლატფორმა, რომელიც
                            უზრუნველყოფს მაღალი ხარისხის პროდუქტებით მომარაგებას მთელი
                            საქართველოს მასშტაბით. ჩვენი მისიაა გავხადოთ ონლაინ შოპინგი
                            მარტივი, სწრაფი და სანდო.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            {/* <section className="py-16 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <Card
                                    key={index}
                                    className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
                                >
                                    <CardContent className="p-6 text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                                            <Icon className="w-8 h-8 text-primary" />
                                        </div>
                                        <div className="text-4xl font-bold mb-2 text-primary">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {stat.label}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section> */}

            {/* Mission & Vision */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        <Card className="border-2 hover:border-primary/50 transition-all duration-300">
                            <CardContent className="p-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full mb-6">
                                    <Target className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">ჩვენი მისია</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    ჩვენი მისიაა შევქმნათ საუკეთესო ონლაინ შოპინგის გამოცდილება
                                    საქართველოში, სადაც თითოეული მომხმარებელი იგრძნობს თავს
                                    განსაკუთრებულად. ვცდილობთ მივაწოდოთ ხარისხიანი პროდუქტები
                                    ხელმისაწვდომ ფასებში და უზრუნველვყოთ შესანიშნავი
                                    მომსახურება.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 hover:border-primary/50 transition-all duration-300">
                            <CardContent className="p-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-6">
                                    <TrendingUp className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">ჩვენი ხედვა</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    ვისწრაფვით გავხდეთ საქართველოს წამყვანი ელექტრონული
                                    კომერციის პლატფორმა, რომელიც ცნობილი იქნება თავისი
                                    სანდოობით, ინოვაციებით და მომხმარებელზე ორიენტირებული
                                    მიდგომით. ვგეგმავთ მუდმივ განვითარებას და სიახლეების
                                    დანერგვას.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">ჩვენი ღირებულებები</h2>
                        <p className="text-xl text-muted-foreground">
                            ის პრინციპები, რომლებზეც დაფუძნებულია ჩვენი კომპანია
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <Card
                                    key={index}
                                    className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group"
                                >
                                    <CardContent className="p-6">
                                        <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                                            <Icon className="w-7 h-7 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {value.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            {/* <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">ჩვენი გუნდი</h2>
                        <p className="text-xl text-muted-foreground">
                            გაიცანით ადამიანები, რომლებიც ქმნიან ჩვენს წარმატებას
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {team.map((member, index) => (
                            <Card
                                key={index}
                                className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group overflow-hidden"
                            >
                                <CardContent className="p-6">
                                    <div className="relative mb-6">
                                        <div
                                            className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-4xl font-bold group-hover:scale-110 transition-transform shadow-xl`}
                                        >
                                            {member.name.charAt(0)}
                                        </div>
                                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                                            <Badge className="shadow-lg">
                                                <Star className="w-3 h-3 mr-1 fill-current" />
                                                Team
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {member.role}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Why Choose Us */}
            {/* <section className="py-20 bg-gradient-to-br from-primary/5 via-blue-500/5 to-transparent">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">რატომ ჩვენ?</h2>
                        <p className="text-xl text-muted-foreground">
                            რას ვთავაზობთ ჩვენს მომხმარებლებს
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <Card className="border-2 hover:border-primary/50 transition-all duration-300">
                            <CardContent className="p-8 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4">
                                    <Truck className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">უფასო მიწოდება</h3>
                                <p className="text-muted-foreground">
                                    100₾-ზე მეტი შეძენისას უფასო მიწოდება მთელს საქართველოში
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 hover:border-primary/50 transition-all duration-300">
                            <CardContent className="p-8 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-4">
                                    <Shield className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">გარანტია</h3>
                                <p className="text-muted-foreground">
                                    ყველა პროდუქტზე მინიმუმ 1 წლიანი ოფიციალური გარანტია
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 hover:border-primary/50 transition-all duration-300">
                            <CardContent className="p-8 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-full mb-4">
                                    <Clock className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">24/7 მხარდაჭერა</h3>
                                <p className="text-muted-foreground">
                                    ჩვენი გუნდი ყოველთვის მზადაა დაგეხმაროთ და უპასუხოს
                                    კითხვებს
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section> */}

            {/* Contact CTA */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <Card className="max-w-4xl mx-auto border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-blue-500/5">
                        <CardContent className="p-12 text-center">
                            <h2 className="text-3xl font-bold mb-4">
                                გაქვთ კითხვები? დაგვიკავშირდით!
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                ჩვენი გუნდი მზადაა დაგეხმაროთ ნებისმიერ საკითხში
                            </p>

                            <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                                <div className="flex flex-col items-center">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                                        <MapPin className="w-6 h-6 text-primary" />
                                    </div>
                                    <p className="text-sm font-semibold">მისამართი</p>
                                    <p className="text-xs text-muted-foreground">
                                        ქუთაისი, საქართველო
                                    </p>
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                                        <Phone className="w-6 h-6 text-primary" />
                                    </div>
                                    <p className="text-sm font-semibold">ტელეფონი</p>
                                    <p className="text-xs text-muted-foreground">
                                        +995 571 13 48 44
                                    </p>
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <p className="text-sm font-semibold">ელ-ფოსტა</p>
                                    <p className="text-xs text-muted-foreground">
                                        jiadzeb@gmail.com
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;