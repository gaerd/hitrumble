import { useState } from 'react';
import Home from '@/components/Home';
import { useLocation } from 'wouter';

export default function HomePage() {
  const [, setLocation] = useLocation();

  return (
    <Home
      onSelectMaster={() => setLocation('/master')}
      onSelectPlayer={() => setLocation('/player')}
    />
  );
}
