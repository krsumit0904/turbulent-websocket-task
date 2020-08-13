import { initEventRoutes } from './event.route'

export const initRoutes = (app: any) => {
  app.use('/events', initEventRoutes())
}
