import React, { createContext, useContext, useState, useEffect } from 'react'
import { createContextualCan } from '@casl/react'
import { createMongoAbility } from '@casl/ability'
import { useAuth } from '@hooks/useAuth'

export const AbilityContext = createContext()
export const Can = createContextualCan(AbilityContext.Consumer)

export function AbilityProvider(props) {
  const { isLoggedIn, abilities } = useAuth()
  const [userAbilities, setUserAbilities] = useState()

  useEffect(() => {
    if (isLoggedIn) {
      setUserAbilities([{ action: 'manage', subject: 'all' }])
    }
  }, [isLoggedIn, abilities])

  return <AbilityContext.Provider value={createMongoAbility(userAbilities)} {...props} />
}

export function useAbilityContext() {
  const context = useContext(AbilityContext)
  if (context === undefined) {
    throw new Error('useAbilityContext must be used in AbilityProvider')
  }

  return context
}
