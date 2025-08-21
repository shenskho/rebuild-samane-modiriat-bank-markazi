import { useState, useMemo } from 'react'
import Mapir from 'mapir-react-component'
import './index.css'

// prettier-ignore
const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImEyZGY5NmZmN2VmY2M1NDUzM2IyZDg3MjA0N2Y3ZWVkMmM0MTA0NmEwNDc0ZTViNjBmNTQyYWEzZjg3MWQ5YjQ0YjNmM2VlOGJhZTI2MzE4In0.eyJhdWQiOiIxNzU1OSIsImp0aSI6ImEyZGY5NmZmN2VmY2M1NDUzM2IyZDg3MjA0N2Y3ZWVkMmM0MTA0NmEwNDc0ZTViNjBmNTQyYWEzZjg3MWQ5YjQ0YjNmM2VlOGJhZTI2MzE4IiwiaWF0IjoxNjQ5MTYzODU2LCJuYmYiOjE2NDkxNjM4NTYsImV4cCI6MTY1MTc1NTg1Niwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.XGhxevW3rDswqkQTC2rIRKujWMoceDaC2qv_RYnw90LKkRjXlD1lKzBtbg__cSAfgb3eZHJh9mJ0aiq27IvZwirA1DDuJhbslypAz5x7pzedIY1VuqkD2ey4Fg8RFfEdkGaJkAL0QJrA7Y-ynyT-N63gIuuqI38Mvn7SirLBAOFv3Tfj3dLxXPWS-KpKhymImBzvKLZj-Mnai-17uBUq-28635jDGICcc3mPS1VgZ_9LehZ8RmlBUIjcnq0Lo3eKRO3riwwEo8TRyDBNlU4Q0-91HELja2QI8s5IaE7lXRk_mD3bHfhl0MdwQUz-LKwID5_1y4bAzSRJZnmwkg6LNw';

export default function MapIR({ interactive, selectedCoordinates, handleClickOnMap }) {
  const [markerCoordinates, setMarkerCoordinates] = useState(selectedCoordinates || [])
  const defaultCoordinates = useMemo(() => [51.338054, 35.699732], [])
  const mapContainerStyle = useMemo(() => ({ height: 400 }), [])

  const Map = useMemo(() => {
    return Mapir.setToken({
      interactive,
      scrollZoom: false,
      doubleClickZoom: false,
      transformRequest: (url) => {
        return {
          url,
          headers: {
            'x-api-key': API_KEY,
            'Mapir-SDK': 'reactjs'
          }
        }
      }
    })
  }, [interactive])

  // const reverseFunction = async (map, e) => {
  //   if (!interactive) {
  //     return
  //   }
  //   if (!e.lngLat.lat || !e.lngLat.lng) {
  //     return
  //   }

  //   const url = `https://map.ir/reverse/no?lat=${e.lngLat.lat}&lon=${e.lngLat.lng}`
  //   await fetch(url, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'x-api-key': API_KEY
  //     }
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       handleClickOnMap(data)
  //     })

  //   setMarkerCoordinates([e.lngLat.lng, e.lngLat.lat])
  // }

  const handleClick = (map, e) => {
    if (interactive) {
      const coordinates = [e.lngLat.lng, e.lngLat.lat]
      handleClickOnMap(coordinates)
      setMarkerCoordinates(coordinates)
    }
  }

  return (
    <div id='mapir' className='w-100 h-100'>
      <Mapir
        Map={Map}
        center={markerCoordinates.length > 0 ? markerCoordinates : defaultCoordinates}
        zoom={markerCoordinates.length > 0 ? [16] : [11]}
        containerStyle={mapContainerStyle}
        onClick={handleClick}
        // userLocation
      >
        <Mapir.ZoomControl position='top-left' />
        {markerCoordinates.length > 0 && <Mapir.Marker coordinates={markerCoordinates} anchor='bottom' />}
      </Mapir>
    </div>
  )
}
