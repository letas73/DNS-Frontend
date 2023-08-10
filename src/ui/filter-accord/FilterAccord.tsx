import React, { FC } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './FilterAccord.scss'

interface FilterAccordProps {
  title: string
  children: React.ReactNode
}

const FilterAccord: FC<FilterAccordProps> = ({ title, children }) => {
  return (
    <Accordion className='filter-accord'>
      <AccordionSummary
        className='filter-accord__title'
        expandIcon={<ExpandMoreIcon className='filter-accord__title-icon' />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {title}
      </AccordionSummary>
      <AccordionDetails className='filter-accord__details'>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}

export default FilterAccord