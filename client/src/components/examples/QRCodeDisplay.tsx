import QRCodeDisplay from '../QRCodeDisplay'

export default function QRCodeDisplayExample() {
  return (
    <QRCodeDisplay 
      gameCode="ABC123" 
      playerCount={3}
      onStartGame={() => console.log('Starting game')}
    />
  )
}
