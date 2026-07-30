import type { Metadata } from 'next';
import { AboutRoute } from '@/components/routes/AboutRoute';

export const metadata: Metadata = {
  title: 'About the village',
  description: 'Meet Singapadu Village in Sukawati, Gianyar—its living traditions, community and place in Bali.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return <AboutRoute />;
}
