interface RatingProps {
  rating: number
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const percentage = (rating / 5) * 100

  return (
    <div className="flex relative">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-gray-300 mr-1">☆</span>
        ))}
      </div>
      <div
        className="flex absolute top-0 left-0 overflow-hidden"
        style={{ width: `${percentage}%` }}
      >
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-yellow-500 mr-1">★</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Rating