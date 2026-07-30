import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DestinationDetailRoute } from '@/components/routes/DestinationDetailRoute';
import { DESTS } from '@/data';

interface DestinationPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return DESTS.map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = DESTS.find((item) => item.slug === slug);

  if (!destination) {
    return { title: 'Destination not found' };
  }

  return {
    title: destination.en.title,
    description: destination.en.blurb,
    alternates: { canonical: `/destinations/${destination.slug}` },
    openGraph: {
      title: destination.en.title,
      description: destination.en.blurb,
      images: destination.img ? [{ url: destination.img }] : undefined,
    },
  };
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = DESTS.find((item) => item.slug === slug);

  if (!destination) notFound();

  return <DestinationDetailRoute destKey={destination.key} />;
}
