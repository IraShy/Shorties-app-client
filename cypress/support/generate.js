import { build, fake } from '@jackfranklin/test-data-bot'

const userBuilder = build('User', {
  fields: {
    username: fake((f) => f.name.findName()),
    email: fake((f) => f.internet.email()),
    password: fake((f) => f.internet.password())
  }
})

export {
  userBuilder
}