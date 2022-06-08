import React, { useEffect, useMemo } from 'react'
// @ts-ignore
import { createConsumer } from '@rails/actioncable'

export default function useActionCable(url: string) {
  const actionCable = useMemo(() => createConsumer(url), [url])

  useEffect(() => {
    return () => {
      console.log('Disconnect Action Cable')
      actionCable.disconnect()
    }
  }, [])

  return { actionCable }
}
