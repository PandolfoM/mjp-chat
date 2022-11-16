import { faArrowUpFromBracket, faPaperclip, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  FileButton,
  Flex,
  Textarea,
} from "@mantine/core";
import React from "react";

const Input = () => {
  return (
    <Flex align={"center"} justify="space-between">
      <Textarea
      w={"100%"}
        radius={"xs"}
        placeholder="Message"
        autosize
        minRows={1}
        variant="unstyled"
      />
      <Flex align={"center"} justify="space-between">
      <FileButton>
          {(props) => (
            <Button {...props} size={"sm"} variant="subtle">
              <FontAwesomeIcon icon={faPaperclip} />
            </Button>
          )}
        </FileButton>
        <FileButton accept="image/png,image/jpeg">
          {(props) => (
            <Button {...props} size={"sm"} variant="subtle">
              <FontAwesomeIcon icon={faArrowUpFromBracket} />
            </Button>
          )}
        </FileButton>
        <Button size={"sm"} variant="subtle">
          <FontAwesomeIcon icon={faPaperPlane}/>
        </Button>
      </Flex>
    </Flex>
  );
};

export default Input;
