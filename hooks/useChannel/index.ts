import React, { useState, useEffect, useRef } from 'react'

// Needed for @rails/actioncable
global.addEventListener = () => {};
global.removeEventListener = () => {};

export default function useChannel(actionCable: any) {
  const [connected, setConnected] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const channelRef = useRef()

  const subscribe = (data: any, callbacks: any) => {
    console.log(`useChannel - INFO: Connecting to ${data.channel}`)
    const channel = actionCable.subscriptions.create(data, {
      received: (data: any) => {
        if (callbacks.received) callbacks.received(data)
      },
      initialized: () => {
        console.log('useChannel - INFO: Init ' + data.channel)
        setSubscribed(true)
        if (callbacks.initialized) callbacks.initialized()
      },
      connected: () => {
        console.log('useChannel - INFO: Connected to ' + data.channel)
        setConnected(true)
        if (callbacks.connected) callbacks.connected()
      },
      disconnected: () => {
        console.log('useChannel - INFO: Disconnected')
        setConnected(false)
        if (callbacks.disconnected) callbacks.disconnected()
      }
    })
    channelRef.current = channel
  }

  const unsubscribe = () => {
    setSubscribed(false)
    if(channelRef.current) {
      console.log('useChannel - INFO: Unsubscribing from ' + channelRef.current.identifier)
      actionCable.subscriptions.remove(channelRef.current)
      channelRef.current = null
    }
  }

  const send = (type: any, payload: any) => {
    if (subscribed && !connected) throw 'useChannel - ERROR: not connected'
    if (!subscribed) throw 'useChannel - ERROR: not subscribed'
    try {
      channelRef.current.perform(type, payload)
    } catch (e) {
      throw 'useChannel - ERROR: ' + e
    }
  }

  useEffect(() => {
    return () => {
      unsubscribe()
    }
  }, [])

  return {
    subscribe,
    unsubscribe,
    send,
    subscribed
  }
}
