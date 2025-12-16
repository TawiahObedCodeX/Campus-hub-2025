import { webDevGigs } from './webDevGigs';
import { writingGigs } from './writingGigs';
import  { designGigs }  from './designGigs'
import {researchGigs }  from './researchGigs'
import { marketingGigs } from './marketingGigs'
 // import others...

export const allGigs = [
  ...webDevGigs,
  ...writingGigs,
   ...designGigs,
   ...researchGigs,
   ...marketingGigs
];