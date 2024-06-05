'use client';

// 1. Import Dependencies
import { FormEvent, useEffect, useRef, useState, useCallback, use } from 'react';
import { useActions, readStreamableValue } from 'ai/rsc';
import { type AI } from './action';
import { ChatScrollAnchor } from '@/lib/hooks/chat-scroll-anchor';
import Textarea from 'react-textarea-autosize';
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit';
import { Tooltip, TooltipContent, TooltipTrigger, } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
// Main components 
// Sidebar components
// Function calling components

// 2. Set up types


export default function Home() {

  // 3. Set up action that will be used to stream all the messages
  // 4. Set up form submission handling
  // 5. Set up state for the messages
  // 6. Set up state for the CURRENT LLM response (for displaying in the UI while streaming)
  // 7. Set up handler for when the user clicks on the follow up button
  // 8. For the form submission, we need to set up a handler that will be called when the user submits the form
  // 9. Set up handler for when a submission is made, which will call the myAction function



  return (
    <>
      <h1>Hello llm</h1>
    </>
  );
}
