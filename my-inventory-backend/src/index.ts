import {TestInterface} from "my-inventory-common"

export const delayMillis = (delayMs: number): Promise<void> => new Promise(resolve => setTimeout(resolve, delayMs));

export const greet = (name: TestInterface): string => `Hello ${name}`

export const foo = async (): Promise<boolean> => {
  console.log(greet('Woreld'))
  await delayMillis(1000)
  console.log('done')
  return true
}

(async () => foo())()