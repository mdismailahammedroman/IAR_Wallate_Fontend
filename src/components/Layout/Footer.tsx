export const Footer = () => {
  return (
   <footer className=" bg-primary dark:bg-gray-800 text-white dark:text-gray-300 py-8 px-6">
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Branding & Description */}
          <div>
            <div className="text-white font-bold text-lg">Company Name</div>

            <p className="mt-4 max-w-xs text-primary-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse non cupiditate quae nam
              molestias.
            </p>

            {/* Social Media Icons */}
            <ul className="mt-8 flex gap-6">
              {[
                { label: 'Facebook' },
                { label: 'Instagram' },
                { label: 'Twitter' },
                { label: 'GitHub' },
                { label: 'Dribbble' }
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground transition hover:text-foreground"
                  >
                    <span className="sr-only">{item.label}</span>
                    {/* Replace with icon */}
                    <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
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
                      <a href="#" className="text-secondary-foreground transition hover:text-secondary dark:hover:text-primary">
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
        <p className="text-xs text-foreground">
          &copy; 2025 Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
