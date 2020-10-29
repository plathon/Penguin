import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

export default new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.APP_SECRET
  },
  async (payload, done) => {
    if (!payload) {
      return done(null, false)
    }
    done(null, payload)
  }
)
