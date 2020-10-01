import passport from 'passport'
import localStrategy from '@services/authentication/authUserLocal/localPassportStrategy'

passport.use(localStrategy)

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

export default passport
