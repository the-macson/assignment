import React from 'react'
import { Spinner , Box} from '@chakra-ui/react'
const SmallLoader = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="40vh"
    >
      <Spinner size={"xl"} />
    </Box>
  )
}

export default SmallLoader