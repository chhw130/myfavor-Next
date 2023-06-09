"use client";
import { Avatar, HStack, Text } from "@chakra-ui/react";
import { memo } from "react";

const IdolInform = ({ idolData }: any) => {
  return (
    <HStack spacing={2}>
      <Avatar src={idolData.idol_profile} />
      <Text fontSize={[30, 30, 40]}>{idolData?.idol_name_kr}</Text>
    </HStack>
  );
};

export default memo(IdolInform);
