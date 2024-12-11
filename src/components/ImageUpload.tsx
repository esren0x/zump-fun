import React from 'react';
import Dropzone from 'react-dropzone';

interface ImageUploadProps {
  onImageDrop: (file: File) => void;
  error?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageDrop, error }) => {
  return (
    <div>
      <Dropzone
        onDrop={(acceptedFiles) => onImageDrop(acceptedFiles[0])}
        accept={{ 'image/jpeg': [], 'image/png': [] }}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            style={{
              border: '2px dashed gray',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            <input {...getInputProps()} />
            <p>Drag and drop an image, or click to select</p>
          </div>
        )}
      </Dropzone>
      {error && <p>{error}</p>}
    </div>
  );
};

export default ImageUpload;
