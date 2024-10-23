import * as React from 'react'

import { cn } from '@/lib/style/utils'
import { Check, Eye, EyeOff, X } from 'lucide-react'
import { passwordRequirements } from '@/lib/auth/schemas'
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

interface NewPasswordInputProps extends InputProps {
  value: string
}

const NewPasswordInput = React.forwardRef<
  HTMLInputElement,
  NewPasswordInputProps
>(({ className, ...props }, ref) => {
  const [isVisible, setIsVisible] = React.useState(false)

  const { value } = props

  const toggleVisibility = () => setIsVisible(!isVisible)

  const checkStrength = (pass: string) => {
    return passwordRequirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }))
  }

  const strength = checkStrength(value)

  const strengthScore = React.useMemo(() => {
    return strength.filter((req) => req.met).length
  }, [strength])

  const getStrengthColor = (score: number) => {
    if (score === 0) return 'bg-border'
    if (score <= 1) return 'bg-red-500'
    if (score <= 2) return 'bg-orange-500'
    if (score === 3) return 'bg-amber-500'
    return 'bg-emerald-500'
  }

  const getStrengthText = (score: number) => {
    if (score === 0) return 'Digite uma senha'
    if (score <= 2) return 'Senha fraca'
    if (score === 3) return 'Senha média'
    return 'Senha forte'
  }

  return (
    <div>
      <div className="space-y-2">
        <div className="relative">
          <Input
            {...props}
            ref={ref}
            className={cn('pr-9', className)}
            placeholder="Password"
            type={isVisible ? 'text' : 'password'}
            value={value}
            aria-invalid={strengthScore < 4}
            aria-describedby="password-strength"
          />
          <button
            className="absolute inset-y-px right-px flex h-full w-9 items-center justify-center rounded-r-lg text-muted-foreground/80 transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? 'Esconder senha' : 'Mostrar senha'}
            aria-pressed={isVisible}
            aria-controls="password"
          >
            {isVisible ? (
              <EyeOff
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                role="presentation"
              />
            ) : (
              <Eye
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                role="presentation"
              />
            )}
          </button>
        </div>
      </div>

      <div
        className="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={strengthScore}
        aria-valuemin={0}
        aria-valuemax={4}
        aria-label="Força da senha"
      >
        <div
          className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
          style={{ width: `${(strengthScore / 4) * 100}%` }}
        ></div>
      </div>

      <p
        id="password-strength"
        className="mb-2 text-sm font-medium text-foreground"
      >
        {getStrengthText(strengthScore)}. Deve conter:
      </p>

      <ul className="space-y-1.5" aria-label="Requisitos da senha">
        {strength.map((req, index) => (
          <li key={index} className="flex items-center space-x-2">
            {req.met ? (
              <Check
                size={16}
                className="text-emerald-500"
                aria-hidden="true"
              />
            ) : (
              <X
                size={16}
                className="text-muted-foreground/80"
                aria-hidden="true"
              />
            )}
            <span
              className={`text-xs ${req.met ? 'text-emerald-600' : 'text-muted-foreground'}`}
            >
              {req.text}
              <span className="sr-only">
                {req.met
                  ? ' - Requisitos atendidos'
                  : ' - Requisitos não atendidos'}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
})

NewPasswordInput.displayName = 'NewPasswordInput'

export { Input, NewPasswordInput }
