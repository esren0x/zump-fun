import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ImageUpload from './ImageUpload';
import { Transaction, WalletAdapterNetwork, WalletNotConnectedError } from '@demox-labs/aleo-wallet-adapter-base';
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react';

interface FormValues {
  name: string;
  symbol: string;
  image?: File;
  description: string;
}

const schema = yup.object({
  name: yup.string().required('Name is required'),
  symbol: yup.string().max(5, 'Symbol should be at most 5 characters').required('Symbol is required'),
  image: yup
    .mixed<File>()
    .test('fileSize', 'Image size is too large', (value) => !value || (value && value.size <= 5000000)) // 5MB limit
    .test('fileType', 'Unsupported file format', (value) => !value || (value && ['image/jpeg', 'image/png'].includes(value.type))),
  description: yup.string().required('Description is required'),
});

const MyForm: React.FC = () => {
  const { publicKey, requestTransaction, transactionStatus } = useWallet();

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      symbol: '',
      image: undefined,
      description: '',
    },
  });

  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const uploadToPinata = async (image: File) => {
    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmMjZjNDJiMS1iY2I2LTRhZTktYjVjOC05ZTMwMjFiODM4MDQiLCJlbWFpbCI6InN0cmFkbGVkQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI2NzcyN2E1Mjg3ZTk5MGMxYjBmZiIsInNjb3BlZEtleVNlY3JldCI6IjI3MGM0ZWQ0NGM3M2YxNGI5YTRiMDUxOTYzM2ZlYzZkNjM5ZDI5YjZkODIyOTE3MGJkZTI1ODkxNGUwNDkzOWYiLCJleHAiOjE3NjU0ODYyODl9.jraCrpvYpPohUwtbshclG8jJAJhibVsO_rJ7SQzIFvM`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!data.IpfsHash) {
        throw new Error('Failed to upload image to Pinata');
      }

      return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
    } catch (error) {
      console.error('Error uploading to Pinata:', error);
      throw new Error('Failed to upload image');
    }
  };

  const CreateTransaction = async (method: string, values: Array<any>, success_message: string) => {
    if (!publicKey) throw new WalletNotConnectedError();

    const tx = Transaction.createTransaction(
      publicKey,
      WalletAdapterNetwork.TestnetBeta,
      "zump8_v0_1_0.aleo",
      method,
      // values,
      ["8247332739920914798u128","1297241166u128"],
      42441,
      false,
    );

    if (requestTransaction) {
      const result = await requestTransaction(tx);

      if (transactionStatus) {
        const status = await transactionStatus(result);
        if (status === 'Completed') {
          alert(success_message);
        }
      }
    }
  };

  const RegisterToken = async (imageUrl: string, name: string, symbol: string) => {
    try {
      console.log('Registering Token with data:', { imageUrl, name, symbol });
      await CreateTransaction(
        'register_token',
        [imageUrl, name, symbol],
        `Token registered successfully with image: ${imageUrl}`
      );
    } catch (error) {
      console.error('Error registering token:', error);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setUploading(true);
      let imageUrl = '';

      if (data.image) {
        imageUrl = await uploadToPinata(data.image);
        setUploadedUrl(imageUrl);
      }

      console.log('Form Submitted:', { ...data, imageUrl });

      await RegisterToken(imageUrl, data.name, data.symbol);
    } catch (error) {
      console.error('Error in submission process:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '400px', margin: '0 auto' }}>
      <div>
        <label>Name</label>
        <input {...register('name')} placeholder="Enter Name" />
        <p>{errors.name?.message}</p>
      </div>

      <div>
        <label>Symbol</label>
        <input {...register('symbol')} placeholder="Enter Symbol" />
        <p>{errors.symbol?.message}</p>
      </div>

      <div>
        <label>Image</label>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <ImageUpload
              onImageDrop={(file) => setValue('image', file)}
              error={errors.image?.message}
            />
          )}
        />
      </div>

      <div>
        <label>Description</label>
        <textarea {...register('description')} placeholder="Enter Description" />
        <p>{errors.description?.message}</p>
      </div>

      <div>
        <button type="submit" style={{ backgroundColor: '#FE8E3E' }} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Submit'}
        </button>
      </div>

      {uploadedUrl && (
        <div>
          <p>Token Created!</p>
          <img src={uploadedUrl} alt="Uploaded Token" crossOrigin="anonymous" />
        </div>
      )}
    </form>
  );
};

export default MyForm;
