import React, { useMemo } from 'react'
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'

export default function ModalBackDrop ({ animatedIndex, style }: BottomSheetBackdropProps) {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolate.CLAMP
    )
  }))

  const containerStyle = useMemo(() => [
    style,
    { backgroundColor: "#00000090" },
    containerAnimatedStyle,
  ], [style, containerAnimatedStyle])

  // @ts-ignore
  return <Animated.View style={containerStyle} />
}
