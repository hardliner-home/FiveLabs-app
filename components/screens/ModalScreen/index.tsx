import React, {useCallback, useRef, useMemo, ReactNode} from 'react'
import { Icon, IconButton } from 'native-base'
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { FontAwesome } from '@expo/vector-icons'

// src
import ModalBackDrop from '../../atoms/ModalBackDrop'

interface Props {
  iconName: string,
  children?: ReactNode,
  snaps?: string[]
}

export default function ModalScreen({ children, iconName, snaps = ['80%'] }: Props) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => snaps, [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const closeModal = () => {
    bottomSheetModalRef.current?.close()
  }

  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log('handleSheetChanges', index)
  // }, [])

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { closeModal })
    }
    return child
  })

  return (
    <>
      <IconButton
        borderRadius="full"
        onPress={handlePresentModalPress}
      >
        <Icon as={FontAwesome} size={6} name={iconName} />
      </IconButton>

      <BottomSheetModal
        index={0}
        snapPoints={snapPoints}
        ref={bottomSheetModalRef}
        // onChange={handleSheetChanges}
        backdropComponent={ModalBackDrop}
      >
        {childrenWithProps}
      </BottomSheetModal>
    </>
  )
}
