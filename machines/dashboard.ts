import { Machine, assign } from 'xstate'
import jwtDecode from 'jwt-decode'
import fetch from 'unfetch'

import isServer from '../utils/isServer'

async function logIn(event) {
  const { username, password } = event.payload
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  const { token, error } = await res.json()
  if (error) throw new Error(error)
  localStorage.setItem('token', token)
  return { username }
}

interface User {
  username: string
  iat?: number
}

interface Context {
  userInfo: User
  error: string
}

interface Schema {
  states: {
    auth: {
      states: {
        initializing: {}
        loggedOut: {}
        loggingIn: {
          states: {
            loading: {}
            failed: {}
            final: {}
          }
        }
        loggedIn: {}
      }
    }
  }
}

export default Machine<Context, Schema>(
  {
    id: 'dashboard',
    type: 'parallel',
    context: {
      userInfo: null,
      error: null,
    },
    states: {
      auth: {
        initial: 'initializing',
        states: {
          initializing: {
            on: {
              '': [
                {
                  target: 'loggedIn',
                  cond: 'hasUserInfo',
                  actions: 'setUserInfo',
                },
                {
                  target: 'loggedOut',
                },
              ],
            },
          },
          loggedOut: {
            on: {
              LOG_IN: 'loggingIn',
            },
          },
          loggingIn: {
            initial: 'loading',
            states: {
              loading: {
                invoke: {
                  id: 'logIn',
                  src: (_, event) => logIn(event),
                  onDone: {
                    target: 'final',
                    actions: assign({
                      userInfo: (_, event) => event.data,
                    }),
                  },
                  onError: {
                    target: 'failed',
                    actions: assign({
                      error: (_, event) => event.data.message,
                    }),
                  },
                },
              },
              failed: {
                on: {
                  LOG_IN: 'loading',
                },
              },
              final: { type: 'final' },
            },
            onDone: 'loggedIn',
          },
          loggedIn: {},
        },
      },
    },
  },
  {
    actions: {
      setUserInfo: assign({
        userInfo: _ => {
          const token = localStorage.getItem('token')
          return jwtDecode(token)
        },
      }),
    },
    guards: {
      hasUserInfo: () => {
        if (isServer) return false
        const token = localStorage.getItem('token')
        if (!token) return false
        const userInfo = jwtDecode(token)
        const isEmpty =
          Object.keys(userInfo).length === 0 && userInfo.constructor === Object
        return !isEmpty
      },
    },
  }
)
