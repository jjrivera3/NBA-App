import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const PlayerCardSkeleton = () => {
  return (
    <Card>
      <Skeleton height="350px" />
      <CardBody>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default PlayerCardSkeleton;
