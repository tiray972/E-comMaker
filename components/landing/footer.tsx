import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Youtube, Github } from 'lucide-react';

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();
  
  const links = [
    {
      title: "Product",
      items: [
        { name: "Features", href: "/features" },
        { name: "Templates", href: "/templates" },
        { name: "Pricing", href: "/pricing" },
        { name: "Updates", href: "/updates" },
      ]
    },
    {
      title: "Resources",
      items: [
        { name: "Blog", href: "/blog" },
        { name: "Documentation", href: "/docs" },
        { name: "Guides", href: "/guides" },
        { name: "Support", href: "/support" },
      ]
    },
    {
      title: "Company",
      items: [
        { name: "About", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
        { name: "Partners", href: "/partners" },
      ]
    },
    {
      title: "Legal",
      items: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
        { name: "Security", href: "/security" },
        { name: "Cookies", href: "/cookies" },
      ]
    }
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    { icon: <Youtube className="h-5 w-5" />, href: "#", label: "YouTube" },
    { icon: <Github className="h-5 w-5" />, href: "#", label: "GitHub" },
  ];

  return (
    <footer className="bg-muted/40 border-t">
      <div className="container px-4 mx-auto">
        <div className="py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <Link href="/" className="text-2xl font-bold flex items-center mb-4">
                <span className="text-primary mr-1">Buildr</span>
                <span className="text-muted-foreground">CMS</span>
              </Link>
              <p className="text-muted-foreground mb-4 max-w-md">
                The easiest way to build professional websites without coding. Create stunning e-commerce sites, portfolios, blogs, and more with our drag-and-drop builder.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="icon"
                    asChild
                    className="h-9 w-9 text-muted-foreground hover:text-foreground"
                  >
                    <Link href={link.href} aria-label={link.label}>
                      {link.icon}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
            
            {links.map((group, index) => (
              <div key={index}>
                <h3 className="font-medium mb-3">{group.title}</h3>
                <ul className="space-y-2">
                  {group.items.map((link, idx) => (
                    <li key={idx}>
                      <Link 
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="py-6 border-t flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} BuildrCMS. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}