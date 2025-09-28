import { useState } from 'react';
import { motion } from 'framer-motion';

 const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 bg-muted">
      <motion.h2
        className="text-4xl font-extrabold text-center mb-8 text-primary"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Get In Touch
      </motion.h2>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-xl mx-auto">
        <div className="space-y-4">
          <motion.input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full py-4 px-6 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Your Name"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            required
          />

          <motion.input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full py-4 px-6 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Your Email"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            required
          />

          <motion.textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="w-full py-4 px-6 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Your Message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            required
          />
        </div>

        <motion.button
          type="submit"
          className="w-full py-4 px-6 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {isSubmitted ? 'Sending...' : 'Submit'}
        </motion.button>
      </form>

      {isSubmitted && (
        <motion.div
          className="mt-6 text-center text-lg font-semibold text-green-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Thank you for contacting us! We'll get back to you shortly.
        </motion.div>
      )}
    </div>
  );
};
export default Contact