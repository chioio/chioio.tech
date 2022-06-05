import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from 'tailwind.config'
import { TailwindConfigDefault } from 'tailwindcss/tailwind-config-default'

export default resolveConfig(
  // @ts-ignore
  tailwindConfig
) as TailwindConfigDefault & {
  theme: {
    colors: {
      main: {
        [key: string]: string
      }
    }
  }
}
