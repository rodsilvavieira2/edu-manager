import { BOTTOM_BAR_HEIGHT } from '../../../src/components/bottom-bar'
import { Container } from '../../../src/components/container'
import { ScreenHeader } from '../../../src/components/screen-header'

export default function NewClass() {
  return (
    <>
      <ScreenHeader title="Nova classe" />

      <Container style={{ paddingBottom: BOTTOM_BAR_HEIGHT }}></Container>
    </>
  )
}
