import { stream$ } from './stream'
import './test'
import './test2'

stream$.subscribe(v => console.log('i: ' + v))