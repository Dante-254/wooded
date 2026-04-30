import { useState } from 'react'

interface ImageUploadProps {
  onUpload: (url: string) => void
}

const ImageUpload = ({ onUpload }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body: formData }
    )

    const data = await res.json()
    onUpload(data.secure_url)
    setUploading(false)
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        className="form-control"
        onChange={handleFile}
        disabled={uploading}
      />
      {uploading && (
        <p className="text-muted mt-1" style={{ fontSize: '0.8rem' }}>
          Uploading...
        </p>
      )}
    </div>
  )
}

export default ImageUpload