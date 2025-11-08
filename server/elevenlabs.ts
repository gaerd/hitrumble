import type { Song } from '../shared/types';

export class ElevenLabsService {
  private apiKey: string;
  private voiceId = '38yEkwjgqOwvn7qykcx3'; // Custom voice

  constructor() {
    this.apiKey = process.env.ELEVENLABS_API_KEY || '';
    if (!this.apiKey) {
      console.warn('ELEVENLABS_API_KEY is not set - DJ voice will be disabled');
    }
  }

  private generateDJScript(song: Song): string {
    const year = song.year;
    const decade = Math.floor(year / 10) * 10;
    
    // Swedish fun facts about decades
    const funFacts: Record<number, string[]> = {
      1950: ['året då rock and roll började', 'tiden för soda fountains och drive-in biografer'],
      1960: ['flower power-eran', 'tiden för Beatles och minikjolar'],
      1970: ['discokungen regerade', 'tubsockorna var som högst'],
      1980: ['tiden för neonljus och kassettband', 'året då tubsockorna var så populära'],
      1990: ['grunge-eran', 'tiden för flanellskjortor och baggy jeans'],
      2000: ['millennieskiftet', 'tiden då alla fick mobiltelefoner'],
      2010: ['Instagram-eran', 'tiden för selfies och hipsters'],
      2020: ['streamingkungen regerade', 'tiden då alla fick hemmakontor']
    };

    const facts = funFacts[decade] || ['en fantastisk tid för musik'];
    const randomFact = facts[Math.floor(Math.random() * facts.length)];

    const templates = [
      `Och den där jättehitten var "${song.title}" med ${song.artist} från ${year}, ${randomFact}! Nu kommer nästa låt!`,
      `Vilken klassiker! "${song.title}" av ${song.artist}, ${year} - ${randomFact}. Dags för nästa hit!`,
      `Wow, "${song.title}" med ${song.artist}! Från ${year}, ${randomFact}. Fortsätter vi!`,
      `Fantastiskt! ${song.artist}s "${song.title}" från ${year} - ${randomFact}. Nästa låt på gång!`
    ];

    return templates[Math.floor(Math.random() * templates.length)];
  }

  async generateDJCommentary(song: Song): Promise<Buffer | null> {
    if (!this.apiKey) {
      console.log('ElevenLabs: API key not set, skipping DJ commentary');
      return null;
    }

    const script = this.generateDJScript(song);
    console.log(`ElevenLabs: Generating DJ commentary: "${script}"`);

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${this.voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey
        },
        body: JSON.stringify({
          text: script,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.5,
            use_speaker_boost: true
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('ElevenLabs: API error:', response.status, errorText);
        return null;
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      console.log(`ElevenLabs: Generated ${buffer.length} bytes of audio`);
      return buffer;

    } catch (error: any) {
      console.error('ElevenLabs: Error generating commentary:', error.message || error);
      return null;
    }
  }
}

export const elevenLabsService = new ElevenLabsService();
