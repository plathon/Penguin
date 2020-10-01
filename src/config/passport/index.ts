import passport from 'passport'
import JwtStrategy from './JwtStrategy'

passport.use(JwtStrategy)

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

export default passport
