"use client";
type Props = { rating: any; size: string; colour: string; name: string };
const StarRating = ({ rating, size, colour, name }: Props) => {
  const getCheckedIndex = () => {
    if (rating == null || rating === 0) return 0;
    return Math.round(rating * 2) - 1;
  };
  const checkedIndex = getCheckedIndex();
  console.log(rating);
  return (
    <div className={`rating rating-half rating-${size}`}>
      {Array.from({ length: 10 }, (_, index) => (
        <input
          key={index}
          type="radio"
          name={name}
          className={`mask mask-star-2 bg-${colour} border-none text-${colour} shadow-none ${index % 2 === 0 ? "mask-half-1" : index === null ? "" : "mask-half-2"} `}
          checked={checkedIndex === index}
          readOnly
        />
      ))}
    </div>
  );
};

export default StarRating;
