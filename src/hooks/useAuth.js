import { useSelector } from 'react-redux'

export const useAuth = () => {

  const { token, tokenExpiryTime, isLoggedIn, role, abilities, userData, firstName, lastName, panelTypeTitle,panelTypeId  } = useSelector((state) => state.auth)

  return { token, tokenExpiryTime, isLoggedIn, role, abilities, userData, firstName, lastName, panelTypeTitle,panelTypeId}

}
