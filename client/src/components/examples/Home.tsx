import Home from '../Home'

export default function HomeExample() {
  return (
    <Home 
      onSelectMaster={() => console.log('Master selected')}
      onSelectPlayer={() => console.log('Player selected')}
    />
  )
}
