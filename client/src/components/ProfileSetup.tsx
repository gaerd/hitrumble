import { useEffect } from 'react';

interface PlayerProfile {
  id: string;
  displayName: string;
  avatarColor: string;
  artistName?: string;
  musicStyle?: string;
  profileImage?: string;
  originalPhoto?: string;
  createdAt: string;
  lastUsedAt: string;
}

interface ProfileSetupProps {
  onProfileReady: (profile: PlayerProfile | null) => void;
}

export default function ProfileSetup({ onProfileReady }: ProfileSetupProps) {
  useEffect(() => {
    onProfileReady(null);
  }, [onProfileReady]);

  return null;
}