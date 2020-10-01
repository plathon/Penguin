import { Strategy as LocalStrategy } from 'passport-local'

export default new LocalStrategy({
  usernameField: 'email',
  session: false
}, (email, password, done) => {
  const user = { email, password }
  if (!user) done(null, false)
  console.log(user)
  done(null, user)
})
