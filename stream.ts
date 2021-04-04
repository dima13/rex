import xmlhttprequest from 'xhr2'
global.XMLHttpRequest = xmlhttprequest

import { Subject } from 'rxjs'
import { ajax } from 'rxjs/ajax'
const wait = (ms: number): Promise<void> => new Promise(res => setTimeout(res, ms))

ajax.getJSON<Object>('https://jsonplaceholder.typicode.com/users').subscribe(v => console.log(v[0].id))

const stream$ = new Subject<string>()
console.log('Aaaaaa!')

// stream$.subscribe(v => console.log(v))

export { stream$ }


async function start() {
    while (true) {
        stream$.next(Date.now() + '\n')
        await wait(3000)
    }
}

start()

