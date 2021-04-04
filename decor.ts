export function test(n: number): Function {
    return function <T extends { new(...args: any[]): {}}> (constructor: T) {
        return class extends constructor {
            newProperty: string
            hello: any = n
            constructor(...args: any[]) {
                super(...arguments)
                this.newProperty = "new property"
            }
        }
    }
}

@test(5)
class Decor {
    constructor(public name: string) {}

    go(n: number) {}
}

const t = new Decor('Arra')
console.log(t)