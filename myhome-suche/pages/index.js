import dynamic from 'next/dynamic'

const ImmobilienSuche = dynamic(
  () => import('../lib/ImmobilienSuche'),
  { ssr: false }
)

export default function Home() {
  return <ImmobilienSuche />
}
