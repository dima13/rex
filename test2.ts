import { stream$ } from './stream'

stream$.subscribe(v => console.log('t2: ' + v))