import {LOGIN, REGISTER} from './loaders'

export default {
      Mutation: {
              login: (_, args) => LOGIN(_, args),
             register: (_, args, context) => REGISTER(_, args, context)
      }
}