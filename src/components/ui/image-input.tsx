import { ChangeEvent, forwardRef, useState } from 'react'
import { Input, InputProps } from './input'
import { ImageIcon } from 'lucide-react'
import { trasformImgToBlobURL } from '@/lib/utils/img'
import { cn } from '@/lib/style/utils'

interface ImageInputProps extends InputProps {
  ref: never
  defaultValue?: string
}

const ImageInput = forwardRef<React.ElementRef<'input'>, ImageInputProps>(
  ({ className, defaultValue = null, ...props }, ref) => {
    const [preview, setPreview] = useState<string | null>(defaultValue)

    const handleUploadedFile = (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) {
        setPreview(defaultValue)
        return
      }

      const urlImage = trasformImgToBlobURL(event.target.files)

      setPreview(urlImage)
    }

    return (
      <div>
        <Input
          className={cn('hidden', className)}
          type="file"
          accept="image/*"
          {...props}
          onChange={(e) => {
            handleUploadedFile(e)
            props.onChange?.(e)
          }}
          ref={ref}
        />

        {preview ? (
          <img
            src={preview}
            alt="Pré-visualização da imagem"
            className="max-h-56 min-h-44 object-contain mx-auto"
          />
        ) : (
          <ImageIcon className="max-h-56 min-h-44 w-full mx-auto text-muted" />
        )}
      </div>
    )
  },
)

ImageInput.displayName = 'ImageInput'

export default ImageInput
