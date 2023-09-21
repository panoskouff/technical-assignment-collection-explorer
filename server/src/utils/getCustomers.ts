import fs from 'fs'

const __dirname = fs.realpathSync('./staticData/')
const filename = 'customers.json'

export const getCustomers = () => {
  return fs.readFileSync(`${__dirname}/${filename}`, {
    encoding: 'utf-8',
  })
}
