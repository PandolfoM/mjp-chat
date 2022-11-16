import { Avatar, Flex, Text } from '@mantine/core'
import React from 'react'

const Chats = () => {
  return (
    <div>
      <Flex align={"center"} gap="0.5rem" p="0.5rem" sx={{cursor: "pointer"}}>
        <Avatar src={null} radius="xl">MP</Avatar>
        <div>
          <Text >Matthew</Text>
          <Text>Hello World</Text>
        </div>
      </Flex>
      <Flex align={"center"} gap="0.5rem" p="0.5rem" sx={{cursor: "pointer"}}>
        <Avatar src={null} radius="xl">MP</Avatar>
        <div>
          <Text >Matthew</Text>
          <Text>Hello World</Text>
        </div>
      </Flex>
      <Flex align={"center"} gap="0.5rem" p="0.5rem" sx={{cursor: "pointer"}}>
        <Avatar src={null} radius="xl">MP</Avatar>
        <div>
          <Text >Matthew</Text>
          <Text>Hello World</Text>
        </div>
      </Flex>
    </div>
  )
}

export default Chats