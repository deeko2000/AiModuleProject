import { Avatar, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import rehypeHighlight from "rehype-highlight";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { motion } from "framer-motion";

const Chat = ({ message, user }: { message: string; user: "me" | "gpt" }) => {
  const [gptMessage, setGptMessage] = useState("");

  useEffect(() => {
    setGptMessage(message);
  }, [message]);

  return (
    <motion.div
      style={{
        alignSelf: user === "gpt" ? "flex-start" : "flex-end",
        width: "auto",
        maxWidth: "90%",
      }}
      initial={{
        opacity: 0,
        translateY: "100%",
      }}
      animate={{ opacity: 1, translateY: 0, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, translateY: 0 }}
    >
      <Flex gap="5px" w="full" flexDir={user === "gpt" ? "row" : "row-reverse"}>
        <Avatar
          name={user === "me" ? "Me" : "GPT"}
          size="sm"
          bg="border-color"
          mt="-6px"
        />
        <Flex
          borderWidth={1}
          borderColor="blue.400"
          bg="main-bg"
          p="0.5rem 1rem"
          w="auto"
          rounded={user === "gpt" ? "0 20px 20px 20px" : "20px 0 20px 20px"}
          fontSize="18px"
          flexDir="column"
        >
          {user === "gpt" && (
            <Flex
              alignSelf="flex-end"
              fontStyle="italic"
              opacity={0.4}
              fontSize="10px"
              as="small"
              fontWeight={500}
            >
              GPT
            </Flex>
          )}
          {user === "me" && (
            <Flex
              alignSelf="flex-start"
              fontStyle="italic"
              opacity={0.4}
              fontSize="10px"
              as="small"
              fontWeight={500}
            >
              Me
            </Flex>
          )}
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {gptMessage}
          </ReactMarkdown>
        </Flex>
      </Flex>
    </motion.div>
  );
};

export default Chat;
