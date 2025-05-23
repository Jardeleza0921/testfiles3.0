import React from 'react';

const AboutUsSection = () => {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <section className="mb-8">
        <h2 className="text-3xl font-bold text-black-900 mb-3 border-b-2 border-red-600 pb-1">Our Story</h2>
        <p className="text-lg text-black-800 leading-tight">We started with a passion for crafting high-quality bags that combine style, durability, and functionality. Inspired by the needs of modern individuals, we set out to create a collection that caters to diverse lifestyles...</p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">Our Mission</h2>
        <p className="text-lg text-black-800 leading-tight">Our mission is to provide exceptional bags that empower our customers to navigate their daily lives with confidence and ease. We are committed to sustainable practices and ethical sourcing, ensuring that our products not only look good but also do good...</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-black-900 mb-3 border-b-2 border-green-600 pb-1">Our Values</h2>
        <ul className="list-disc pl-6 text-lg text-black-800">
          <li className="mb-1">Quality Craftsmanship: We believe in meticulous attention to detail and using premium materials.</li>
          <li className="mb-1">Customer Focus: Our customers' satisfaction is at the heart of everything we do.</li>
          <li className="mb-1">Sustainability: We are dedicated to minimizing our environmental impact.</li>
          <li>Innovation: We continuously strive to design and create bags that meet evolving needs.</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUsSection;