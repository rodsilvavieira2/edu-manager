import { Button, Stack, Text } from 'native-base'
import { useCallback, useEffect } from 'react'
import Animated, { FadeOut, SlideInDown } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { closeSnackbar, selectSnackbar } from '../redux/slices'

export function SnackbarDispatcher() {
  const data = useSelector(selectSnackbar).reverse()

  const dispatch = useDispatch()

  const onClose = useCallback(
    (id: string) => {
      dispatch(closeSnackbar(id))
    },
    [dispatch]
  )

  return (
    <Stack
      space={2}
      left={0}
      bottom={0}
      right={0}
      zIndex={100}
      position="absolute"
    >
      {data.map((snackbar) => (
        <Snackbar
          key={snackbar.id}
          id={snackbar.id}
          duration={snackbar.duration}
          message={snackbar.message}
          status={snackbar.status}
          onClose={onClose}
        />
      ))}
    </Stack>
  )
}

const SnackContainer = Animated.createAnimatedComponent(Stack)

interface SnackbarProps {
  id: string
  message: string
  status: 'success' | 'info' | 'warning' | 'error'

  duration?: number
  onClose: (id: string) => void
}

function Snackbar({
  id,
  message,
  status,
  onClose,
  duration = 6000,
}: SnackbarProps) {
  function handleClose() {
    onClose(id)
  }

  useEffect(() => {
    const timeout = setTimeout(handleClose, duration)

    return () => clearTimeout(timeout)
  }, [duration])

  return (
    <SnackContainer
      flexDir="row"
      px="2"
      minH="16"
      alignItems="center"
      bg={statusColors[status]}
      shadow="4"
      space={4}
      py="2"
      entering={SlideInDown}
      exiting={FadeOut}
    >
      <Text flex={1} numberOfLines={3} color="white">
        {message}
      </Text>

      <Button
        variant="outline"
        colorScheme="warmGray"
        size="xs"
        _text={{ color: 'white' }}
        onPress={handleClose}
      >
        fechar
      </Button>
    </SnackContainer>
  )
}

const statusColors = {
  success: 'green.500',
  info: 'blue.500',
  warning: 'yellow.500',
  error: 'red.500',
}
