import Rating from 'react-rating'
import { Star } from 'react-feather'

const RatingStars = ({ rating }) => {
  return (
    <Rating
      readonly
      direction='ltr'
      start={0}
      stop={5}
      initialRating={rating}
      emptySymbol={<Star size={16} fill='#babfc7' stroke='#babfc7' />}
      fullSymbol={<Star size={16} fill='#FFD700' stroke='#FFD700' />}
    />
  )
}

export default RatingStars
