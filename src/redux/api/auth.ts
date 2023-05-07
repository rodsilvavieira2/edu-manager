import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { User } from '../../@types'
import { baseApi } from './base'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    onEmailLogin: builder.mutation<User, { email: string; password: string }>({
      queryFn: async ({ email, password }) => {
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
          return {
            data: null,
          }
        }
      },
    }),

    onGoogleLogin: builder.mutation<User, undefined>({
      async queryFn() {
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
          return {
            data: null,
          }
        }
      },
    }),
  }),
})

export const { useOnEmailLoginMutation, useOnGoogleLoginMutation } = authApi
