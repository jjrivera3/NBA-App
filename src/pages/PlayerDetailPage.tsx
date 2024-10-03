import { useLocation, useNavigate } from "react-router-dom";

const PlayerDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const player = location.state?.player; // Access the passed player data

  if (!player) {
    return <div>No player data found</div>;
  }

  // Function to go back to the team page
  const handleBack = () => {
    navigate(-1); // Go back to the previous page (team page)
  };

  return (
    <div>
      <h1>{player.espnName}</h1>
      <p>Points: {player.stats.pts}</p>
      <p>Rebounds: {player.stats.reb}</p>
      <p>Assists: {player.stats.ast}</p>

      <button onClick={handleBack}>Back to Team</button>
    </div>
  );
};

export default PlayerDetailPage;
