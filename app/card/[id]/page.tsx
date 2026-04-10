'use client';

import MKGroupApp from '@/app/page';

type CardPageProps = {
  params: {
    id: string;
  };
};

export default function CardPage({ params }: CardPageProps) {
  void params.id;
  return <MKGroupApp showAccessPanel={false} />;
}
