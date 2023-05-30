import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

export function useKeyboardChange() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const subs = [
      Keyboard.addListener('keyboardDidShow', () => setIsOpen(true)),

      Keyboard.addListener('keyboardDidHide', () => setIsOpen(false)),
    ]

    return () => {
      subs.forEach((sub) => sub.remove())
    }
  }, [])

  return {
    isOpen,
  }
}
