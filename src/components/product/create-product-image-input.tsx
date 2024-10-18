import { ChangeEvent, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { UseFormRegister } from 'react-hook-form'
import { ImageIcon, ImageUp } from 'lucide-react'
import { trasformImgToBlobURL } from '@/lib/utils/img'
import { CreateProductFormType } from '@/lib/product/types'

interface CreateProductImageInputProps {
  register: UseFormRegister<CreateProductFormType>
}

const CreateProductImageInput = ({
  register,
}: CreateProductImageInputProps) => {
  const hiddenInputRef = useRef<HTMLInputElement | null>(null)

  const [preview, setPreview] = useState<string | null>()

  const { ref: registerRef, ...rest } = register('image')

  const handleUploadedFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      setPreview(null)
      return
    }

    const urlImage = trasformImgToBlobURL(event.target.files)

    setPreview(urlImage)
  }

  const onUpload = () => {
    hiddenInputRef.current?.click()
  }

  const uploadButtonLabel = preview ? 'Mudar imagem' : 'Selecionar imagem'

  return (
    <>
      <Button
        type="button"
        onClick={onUpload}
        aria-label={uploadButtonLabel}
        className="w-full"
      >
        {uploadButtonLabel} <ImageUp className="size-5 ml-1" />
      </Button>

      <Input
        className="hidden"
        type="file"
        accept="image/*"
        {...rest}
        onChange={(e) => {
          handleUploadedFile(e)
          rest.onChange(e)
        }}
        ref={(e) => {
          registerRef(e)
          hiddenInputRef.current = e
        }}
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
    </>
  )
}

export default CreateProductImageInput
