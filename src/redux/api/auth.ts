import auth from '@react-native-firebase/auth'
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import { User } from '../../@types'
import { addSnackbar } from '../slices'
import { baseApi } from './base'

export const authApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    onCreateAccount: builder.mutation<
      User,
      { email: string; password: string }
    >({
      queryFn: async ({ email, password }, { dispatch }) => {
        try {
          const { user } = await auth().createUserWithEmailAndPassword(
            email,
            password
          )

          return {
            data: {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              profile_url: user.photoURL,
              created_at: user.metadata.creationTime,
              updated_at: user.metadata.lastSignInTime,
            },
          }
        } catch (error) {
          switch (error?.code) {
            case 'auth/email-already-in-use':
              dispatch(
                addSnackbar({
                  message: 'Email já está em uso',
                  status: 'error',
                })
              )

              break

            case 'auth/invalid-email':
              dispatch(
                addSnackbar({
                  message: 'Email inválido',
                  status: 'error',
                })
              )

              break

            case 'auth/weak-password':
              dispatch(
                addSnackbar({
                  message: 'Senha fraca',
                  status: 'error',
                })
              )

              break

            default:
              dispatch(
                addSnackbar({
                  message: 'Erro ao criar conta',
                  status: 'error',
                })
              )
          }

          return {
            data: null,
          }
        }
      },
    }),

    onEmailLogin: builder.mutation<User, { email: string; password: string }>({
      queryFn: async ({ email, password }, { dispatch }) => {
        try {
          const { user } = await auth().signInWithEmailAndPassword(
            email,
            password
          )

          return {
            data: {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              profile_url: user.photoURL,
              created_at: user.metadata.creationTime,
              updated_at: user.metadata.lastSignInTime,
            },
          }
        } catch (error) {
          switch (error?.code) {
            case 'auth/invalid-email':
              dispatch(
                addSnackbar({
                  message: 'Email inválido',
                  status: 'error',
                })
              )

              break
            case 'auth/user-disabled':
              dispatch(
                addSnackbar({
                  message: 'Usuário desabilitado',
                  status: 'error',
                })
              )

              break

            case 'auth/user-not-found':
              dispatch(
                addSnackbar({
                  message: 'Usuário não encontrado',
                  status: 'error',
                })
              )

              break

            case 'auth/wrong-password':
              dispatch(
                addSnackbar({
                  message: 'Senha incorreta',
                  status: 'error',
                })
              )

              break

            default:
              dispatch(
                addSnackbar({
                  message: 'Erro ao fazer login',
                  status: 'error',
                })
              )
          }

          return {
            data: null,
          }
        }
      },
    }),

    onGoogleLogin: builder.mutation<User, undefined>({
      async queryFn(arg, { dispatch }) {
        try {
          const hasPlay = await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true,
          })

          if (!hasPlay) {
            return {
              data: null,
            }
          }

          const { idToken } = await GoogleSignin.signIn()

          const googleCredential = auth.GoogleAuthProvider.credential(idToken)

          const { user } = await auth().signInWithCredential(googleCredential)

          return {
            data: {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              profile_url: user.photoURL,
              created_at: user.metadata.creationTime,
              updated_at: user.metadata.lastSignInTime,
            },
          }
        } catch (error) {
          switch (error?.code) {
            case statusCodes.SIGN_IN_CANCELLED:
              dispatch(
                addSnackbar({
                  message: 'Google login cancelado',
                  status: 'warning',
                })
              )

              break
            case statusCodes.IN_PROGRESS:
              dispatch(
                addSnackbar({
                  message: 'Google login em progresso',
                  status: 'warning',
                })
              )
              break

            case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
              dispatch(
                addSnackbar({
                  message: 'Google play services não disponível',
                  status: 'error',
                })
              )
              break

            default:
              dispatch(
                addSnackbar({
                  message: 'Erro ao fazer login com o Google',
                  status: 'error',
                })
              )
              break
          }

          return {
            data: null,
          }
        }
      },
    }),
  }),
})

export const {
  useOnEmailLoginMutation,
  useOnGoogleLoginMutation,
  useOnCreateAccountMutation,
} = authApi
