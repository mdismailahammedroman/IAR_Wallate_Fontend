import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto py-12">
      {/* Service Story */}
      <section className="mb-20 text-center p-10">
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Our Service Story
        </motion.h2>
        <motion.p
          className="text-lg text-muted-foreground px-20 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          We started with a simple idea: to provide a seamless and secure way to manage your digital wallet and financial transactions. 
          Through hard work and dedication, we have grown into a trusted platform that millions of customers rely on.
        </motion.p>
      </section>

      {/* Mission Section */}
      <section className="mb-20 text-center bg-primary text-white py-12">
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Our Mission
        </motion.h2>
        <motion.p
          className="text-lg px-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          Our mission is to empower individuals and businesses with the tools they need to manage their finances securely and efficiently.
          We believe in creating a future where financial freedom is accessible to everyone, everywhere.
        </motion.p>
      </section>

      {/* Team Section */}
      <section className="text-center">
        <motion.h2
          className="text-3xl font-bold mb-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Meet Our Team
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {/* Team Member - John */}
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://res.cloudinary.com/dfn1s2ysa/image/upload/v1761323380/wallet/hero/John_Doe1_lkk25b.jpg"
              alt="John Doe"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-foreground">John Doe</h3>
            <p className="text-muted-foreground">CEO & Founder</p>
            <p className="mt-2 text-sm text-muted-foreground">
              John is the visionary behind the platform. With over 15 years in the tech industry, he strives to make financial management simple and accessible for all.
            </p>
          </motion.div>

          {/* Team Member - Jane */}
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="https://res.cloudinary.com/dfn1s2ysa/image/upload/v1761323379/wallet/hero/Jane_Smith_fy3tgh.jpg"
              alt="Jane Smith"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-foreground">Jane Smith</h3>
            <p className="text-muted-foreground">Chief Operating Officer</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Jane ensures that everything runs smoothly behind the scenes. With a background in operations and logistics, she plays a key role in scaling our platform.
            </p>
          </motion.div>

          {/* Team Member - Sara */}
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img
              src="https://res.cloudinary.com/dfn1s2ysa/image/upload/v1761323379/wallet/hero/Sara_Lee_ihotno.jpg"
              alt="Sara Lee"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-foreground">Sara Lee</h3>
            <p className="text-muted-foreground">Chief Technology Officer</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Sara is the technical genius behind our platform's architecture. With a passion for innovation, she ensures our platform remains secure and ahead of the curve.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
