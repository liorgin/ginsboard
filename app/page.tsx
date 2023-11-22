"use client";

import { Box } from '@mui/material';
// import useSpeechRecognition from './hooks/useSpeechRecognition';
import nlp from 'compromise';
import BackgroundImage from './components/widgets/BackgroundImage';
import Clock from './components/widgets/clock/Clock';

export default function Home() {

  console.log(nlp('who are you').verbs().toGerund().all().text())
  console.log(nlp(`what can you do`).verbs().toInfinitive().all().text())

  return (


    <Box>
      <BackgroundImage />  
      <Clock />
      {/* <Button variant='contained' onClick={() => startListening()}>Recognition</Button> */}
      
    </Box>
  )
}
