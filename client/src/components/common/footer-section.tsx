import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, CreditCard, Truck, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Logo from '@/components/common/logo';

export default function Footer() {
  const quickLinks = [
    { title: 'მთავარი', url: '/' },
    { title: 'კლავიატურები', url: '/products/category/keyboards' },
    { title: 'მაუსები', url: '/products/category/mouses' },
    { title: 'ყურსასმენები', url: '/products/category/headsets' },
    { title: 'მაუსპადები', url: '/products/category/mousepads' },
    { title: 'ბრენდები', url: '/products/category/brands' },
  ];

  const customerService = [
    { title: 'ჩვენს შესახებ', url: '/about-us' },
    { title: 'კონტაქტი', url: '/contact-us' },
    { title: 'მიწოდების პირობები', url: '/shipping' },
    { title: 'დაბრუნების პოლიტიკა', url: '/returns' },
    { title: 'გარანტია', url: '/warranty' },
    { title: 'ხშირად დასმული კითხვები', url: '/faq' },
  ];

  const myAccount = [
    { title: 'ჩემი პროფილი', url: '/profile' },
    { title: 'ჩემი შეკვეთები', url: '/orders' },
    { title: 'სურვილების სია', url: '/wishlist' },
    { title: 'პარამეტრები', url: '/settings' },
  ];

  const paymentMethods = [
    { name: 'Visa', icon: '💳' },
    { name: 'Mastercard', icon: '💳' },
    { name: 'TBC', icon: '🏦' },
    { name: 'BOG', icon: '🏦' },
  ];

  return (
    <footer className="bg-muted/50 border-t">
      {/* Trust Badges */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">უფასო მიწოდება</h4>
                <p className="text-xs text-muted-foreground">100₾+ შეკვეთაზე</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">12 თვე გარანტია</h4>
                <p className="text-xs text-muted-foreground">ყველა პროდუქტზე</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">უსაფრთხო გადახდა</h4>
                <p className="text-xs text-muted-foreground">დაცული ტრანზაქციები</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">24/7 მხარდაჭერა</h4>
                <p className="text-xs text-muted-foreground">ყოველთვის ხელმისაწვდომი</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-5">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Logo />
            <p className="text-muted-foreground mb-6 max-w-sm">
              საქართველოს წამყვანი გეიმინგ აქსესუარების მაღაზია. 
              ჩვენ გთავაზობთ მხოლოდ ორიგინალურ პროდუქტებს საუკეთესო ფასებად.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+995555123456" className="hover:text-primary transition-colors">
                  +995 571 13 48 44
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@jeshop.ge" className="hover:text-primary transition-colors">
                  info@jeshop.ge
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  ქუთაისი, საქართველო<br />
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <Button size="icon" variant="outline" className="hover:bg-primary hover:text-white hover:border-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="hover:bg-primary hover:text-white hover:border-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="hover:bg-primary hover:text-white hover:border-primary transition-colors">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="hover:bg-primary hover:text-white hover:border-primary transition-colors">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">სწრაფი ლინკები</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <a 
                    href={link.url} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">მომხმარებელთა სერვისი</h3>
            <ul className="space-y-3">
              {customerService.map((link) => (
                <li key={link.title}>
                  <a 
                    href={link.url} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h3 className="font-semibold text-lg mb-4">ჩემი ანგარიში</h3>
            <ul className="space-y-3 mb-6">
              {myAccount.map((link) => (
                <li key={link.title}>
                  <a 
                    href={link.url} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-3">სიახლეების გამოწერა</h4>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="ელ-ფოსტა" 
                  className="h-9 text-sm"
                />
                <Button size="sm" className="flex-shrink-0">
                  გაწევრიანება
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            © 2025 <span className="font-semibold text-foreground">Jeshop</span>. ყველა უფლება დაცულია.
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">გადახდის მეთოდები:</span>
            <div className="flex gap-2">
              {paymentMethods.map((method) => (
                <div 
                  key={method.name}
                  className="h-8 px-3 rounded border bg-background flex items-center justify-center text-lg"
                  title={method.name}
                >
                  {method.icon}
                </div>
              ))}
            </div>
          </div>
          {/* Legal Links */}
          <div className="flex gap-4 text-sm">
            <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              კონფიდენციალურობა
            </a>
            <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              წესები და პირობები
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}