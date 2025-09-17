import { Facebook, Github,  Instagram, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
   <footer className=" bg-primary dark:bg-gray-800 text-white dark:text-gray-300 py-8 px-6">
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Branding & Description */}
          <div>
            <div className="text-white font-bold text-lg">IAR-WalletPro</div>

            <p className="mt-4 max-w-xs text-primary-foreground">
        Tap, Pay, Done. Fast!
            </p>

            {/* Social Media Icons */}
            <ul className="mt-8 flex gap-6">
              {[
                { label: 'Facebook' , icon:<Facebook />},
                { label: 'Instagram' , icon:<Instagram /> },
                { label: 'Twitter',icon:<Twitter /> },
                { label: 'GitHub', icon:<Github />  },
                { label: 'Linkedin',icon:<Linkedin /> }
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className="drak:text-muted-foreground transition hover:text-fuchsia-600"
                  >
                    <span className="sr-only">{item.label}</span>
                    {/* Replace with icon */}
                    {item.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4 gap-8 text-sm">
            {[
              {
                title: 'Services',
                items: ['1on1 Coaching', 'Company Review', 'Accounts Review', 'HR Consulting', 'SEO Optimisation'],
              },
              {
                title: 'Company',
                items: ['About', 'Meet the Team', 'Accounts Review'],
              },
              {
                title: 'Helpful Links',
                items: ['Contact', 'FAQs', 'Live Chat'],
              },
              {
                title: 'Legal',
                items: ['Accessibility', 'Returns Policy', 'Refund Policy', 'Hiring-3 Statistics'],
              },
            ].map((section, i) => (
              <div key={i}>
                <p className="font-medium text-white">{section.title}</p>
                <ul className="mt-6 space-y-4">
                  {section.items.map((item, idx) => (
                    <li key={idx}>
                      <a href="#" className="text-oklch transition hover:text-secondary dark:hover:text-primary">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <p className="text-xs text-muted">
          &copy; 2025 IAR-WalletPro. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
