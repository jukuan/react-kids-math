export default function StarDisplay({ totalStars }) {
  return (
    <div className="star-display">
      <span className="star-icon">⭐</span>
      <span className="star-count">{totalStars}</span>
    </div>
  );
}
