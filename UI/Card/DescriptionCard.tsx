import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import { faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import styles from "./DescriptionCard.module.scss";
import AlbumCarousel from "../Carousel/AlbumCarousel";
import { IdolAlbumType } from "@/utils/interface/interface";

interface DescriptionCardProps {
  albumData: IdolAlbumType;
  idolData: any;
}

const DescriptionCard = ({ albumData, idolData }: DescriptionCardProps) => {
  const idolImg = idolData?.group_profile || idolData.solo_profile;
  const name = idolData?.groupname || idolData.idol_name_kr;
  const debut = idolData.group_debut || idolData.solo_debut;
  const instaLink = idolData.group_insta || idolData.solo_insta;
  const youtubeLink = idolData.group_youtube || idolData.solo_youtube;

  return (
    <Card
      as="article"
      w={["100%", "100%", "90%"]}
      h={"100%"}
      padding={5}
      borderLeft={"8px solid black"}
      flexDir={["column", "column", "row"]}
      justifyContent={"space-around"}
    >
      {idolImg && (
        <Image
          src={idolImg}
          className={styles.groupImg}
          alt="아티스트 이미지"
          width={1000}
          height={1000}
          priority
          blurDataURL="blur"
        />
      )}
      <Stack w={["100%", "100%", "50%"]}>
        <CardHeader>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={["xl", "2xl", "4xl"]}>{name}</Text>
            <Flex>
              <Text as={"a"} href={instaLink} target="_blank" width={"40px"}>
                <FontAwesomeIcon icon={faInstagram} size="2xl" />
              </Text>
              <Text as={"a"} href={youtubeLink} target="_blank" width={"40px"}>
                <FontAwesomeIcon icon={faYoutube} size="2xl" />
              </Text>
            </Flex>
          </Flex>
          <Text fontSize={["md", "xl", "2xl"]}>{idolData.enter}</Text>
          <Text>Debut : {debut}</Text>
        </CardHeader>
        <CardBody>
          <AlbumCarousel albumData={albumData} />
        </CardBody>
      </Stack>
    </Card>
  );
};

export default DescriptionCard;
