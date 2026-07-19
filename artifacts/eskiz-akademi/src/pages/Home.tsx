import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { WhyUs } from '@/components/WhyUs';
import { Programs } from '@/components/Programs';
import { Gallery } from '@/components/Gallery';
import { Events } from '@/components/Events';
import { StudentWorks } from '@/components/StudentWorks';
import { Achievements } from '@/components/Achievements';
import { Instructors } from '@/components/Instructors';
import { BlogSection } from '@/components/BlogSection';
import { ContactCTA } from '@/components/ContactCTA';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { AnnouncementBar } from '@/components/AnnouncementBar';

export default function Home() {
  return (
    <div className="w-full bg-eskiz-dark text-eskiz-light overflow-x-hidden">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <WhyUs />
      <Programs />
      <Gallery />
      <Events />
      <StudentWorks />
      <Achievements />
      <Instructors />
      <BlogSection />
      <ContactCTA />
      <Contact />
      <Footer />
    </div>
  );
}
