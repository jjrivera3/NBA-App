import { useState, useEffect } from "react";
import playerAvatar from "../assets/player_avatar.png";

const useAvatarSrc = (player: { espnID: any } | null) => {
  const [avatarSrc, setAvatarSrc] = useState(playerAvatar); // Default avatar

  useEffect(() => {
    if (player?.espnID) {
      setAvatarSrc(
        `https://a.espncdn.com/i/headshots/nba/players/full/${player.espnID}.png`
      );
    } else {
      setAvatarSrc(playerAvatar); // Fallback to default avatar
    }
  }, [player]);

  return [avatarSrc] as const;
};

export default useAvatarSrc;
