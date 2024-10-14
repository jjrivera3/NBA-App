import { Image } from "@chakra-ui/react";
import playerAvatar from "../assets/player_avatar.png";

interface PlayerImageProps {
  avatarSrc: string; // Define the type for avatarSrc
  playerName: string; // Define the type for playerName
}

const PlayerImage = ({ avatarSrc, playerName }: PlayerImageProps) => {
  return (
    <Image
      src={avatarSrc}
      alt={`${playerName} Headshot`}
      boxSize={["300px", "300px"]}
      mt={4}
      borderRadius="md"
      objectFit="contain"
      // If the image fails to load, use playerAvatar directly without setAvatarSrc
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = playerAvatar;
      }}
      minW={{ base: "150px", md: "200px", lg: "200px", xl: "320px" }}
      h="auto"
      w="300px"
    />
  );
};

export default PlayerImage;
