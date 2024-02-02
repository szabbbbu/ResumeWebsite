
import React from 'react'
import AccordionItem from './AccordionItem'
type Props = {}

export default function Accordion({}: Props) {
  return (
    <div className="bg-rose-400 w-full h-full grid grid-cols-1 grid-rows-3 mt-4">
    <AccordionItem title="title 1" body="body1"/>
    <AccordionItem title="title 2" body="body 2"/> 
    <AccordionItem title="title 3" body="body 3"/> 
</div>
  )
}