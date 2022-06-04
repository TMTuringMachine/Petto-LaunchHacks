import { Box, Flex, Text } from "@chakra-ui/react";
import { Chip, Rating } from "@mui/material";
import { useNavigate } from "react-router";
import React from "react";
import CustomButton from "../custom-button/customButton.component";
import { ImageContainer } from "./hostPreview.styles";
import { Icon } from "@iconify/react";
import { Fade } from "react-reveal";

const HostPreview = ({ host }) => {
  const navigate = useNavigate();
  return (
    <Fade bottom>
      <Flex
        borderRadius="10px"
        backgroundColor="#f5f5f5"
        boxShadow="0px 7.71233px 19.2808px rgba(35, 35, 35, 0.2)"
        height="250px"
        overflow="hidden"
        margin="10px 0 20px 0"
        padding="10px"
      >
        <ImageContainer url={host.profilePic}>100m</ImageContainer>
        <Flex direction="column" justifyContent="space-between" width="25%">
          <Box>
            <Text fontSize="2em">{host.name}</Text>
            <Rating value={5} readOnly size="large" />
            <Text color="#A5A5A5" margin="5px 0 10px 0">
              88 reviews
            </Text>
            {host?.hostType === "animal" || host?.hostType === "both" ? (
              <Chip
                label="Pets"
                icon={<Icon icon="ic:twotone-pets" />}
                sx={{ marginRight: "20px" }}
              />
            ) : null}
            {host?.hostType === "plants" || host?.hostType === "both" ? (
              <Chip label="Plants" icon={<Icon icon="ri:plant-fill" />} />
            ) : null}
          </Box>
          <CustomButton
            simple
            onClick={() => {
              navigate(`/host/${host._id}`);
            }}
          >
            VIEW PROFILE
          </CustomButton>
        </Flex>
        <Flex
          direction="column"
          justifyContent="space-between"
          marginLeft="auto"
          alignItems="end"
        >
          <Icon
            icon="ic:baseline-verified-user"
            color="#FF9800"
            fontSize="2.5em"
          />
          <Flex direction="row" alignItems="baseline">
            {/* <Icon icon="bx:rupee" fontSize="2em" /> */}

            <Text fontSize="2em" color="#4CAF50" fontWeight={600}>
              {" "}
              &#x20B9; 500
            </Text>
            <Text color="#4CAF50">/day</Text>
          </Flex>
        </Flex>
      </Flex>
    </Fade>
  );
};

export default HostPreview;
