import { motion } from 'framer-motion';
import { useState } from 'react';

export const FAQ = () => {
  const faqData = [
    { question: 'What is a Digital Wallet?', answer: 'A digital wallet securely stores payment info for easy transactions on websites and apps.' },
    { question: 'How do I create an account?', answer: 'Download the app, sign up with your phone/email, and start using the wallet.' },
    { question: 'Is my money safe?', answer: 'Yes, digital wallets use advanced encryption and two-factor authentication.' },
    { question: 'Can I use it internationally?', answer: 'Yes, you can transfer funds worldwide, depending on your wallet provider.' },
    { question: 'How do I add funds?', answer: 'You can link your bank account or credit/debit card to add funds instantly.' },
    { question: 'What fees are involved?', answer: 'Fees vary by provider and transaction type. Domestic transfers are usually free.' },
    { question: 'Can I link multiple accounts?', answer: 'Yes, you can link multiple bank accounts and cards for easy access.' },
    { question: 'How do I withdraw funds?', answer: 'You can withdraw funds to your linked bank account or use supported ATMs.' },
    { question: 'How do I contact support?', answer: 'You can contact support through the app, email, or live chat.' },
    { question: 'Are digital wallets better than traditional banks?', answer: 'Digital wallets offer faster transactions, lower fees, and greater accessibility.' },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <motion.h2
        className="text-4xl font-extrabold mb-8 text-center text-primary"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Frequently Asked Questions
      </motion.h2>

      <div className="space-y-6">
        {faqData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
          >
            <div
              className="flex justify-between items-center py-4 px-6 cursor-pointer hover:bg-primary-100"
              onClick={() => toggleAnswer(index)}
            >
              <h3 className="text-lg font-semibold text-foreground">{item.question}</h3>
              <span className={`transition transform ${activeIndex === index ? 'rotate-180' : ''}`}>
                &#9660;
              </span>
            </div>

            {activeIndex === index && (
              <motion.p
                className="py-4 px-6 text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {item.answer}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
