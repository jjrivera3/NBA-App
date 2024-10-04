import { useState } from "react";
import playerAvatar from "../assets/player_avatar.png";

const useAvatarSrc = (player: { espnID: any }) => {
  const [avatarSrc, setAvatarSrc] = useState(
    player?.espnID
      ? `https://a.espncdn.com/i/headshots/nba/players/full/${player.espnID}.png`
      : playerAvatar
  );

  return [avatarSrc, setAvatarSrc] as const;
};

export default useAvatarSrc;
