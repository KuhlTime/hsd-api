import rateLimit from 'express-rate-limit'
import env from '@env'

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB or API Gateway, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const inDevelopment = env.nodeEnv === 'development'

const windowMilliseconds = inDevelopment ? 15 * 60 * 1000 : 60 * 1000 // 15 minutes in production, 1 minute in development
const maxRequests = inDevelopment ? 100 : 1000 // 100 requests in production, 1000 requests in development

const limiter = rateLimit({
  windowMs: windowMilliseconds,
  max: maxRequests,
  message: 'To many requests'
})

export default limiter
