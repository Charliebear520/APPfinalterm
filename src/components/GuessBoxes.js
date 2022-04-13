import React from "react";
import { Box, HStack, VStack, AspectRatio, Text, Image, Pressable,Center, useColorModeValue } from "native-base"

const GuessDetail = ({ boxdata, navigation }) => {
  const bgColor1=useColorModeValue("#FFF1CD","#EEEEEE")
  return (
    <Center mb={7} mx={2} w="80px" h="60px"borderRadius={12} bgColor={bgColor1} shadow={7}> 
     <Pressable onPress={() => {console.log("asdasdasda")}}>    
          <Text  
        _dark={{ color: "warmGray.700"}}
        _light={{ color:"warmGray.700" }} fontSize={16}>{boxdata.label}</Text>
      </Pressable>
    </Center>
  )};

export default GuessDetail;
