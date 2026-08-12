'use client';

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation'; 
import { FormEvent } from 'react';
import toast from 'react-hot-toast'; 

export default function UploadForm() {
 const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    setFile(e.target.files[0]);
  }
};

const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();

    if (!file) {
      toast.error('Please select a file to download');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file); // назва поля можу бути інша
    // додайте інші дані реєстрації, якщо вони беруться з кекі/сторіджу/стейту

    try {
      const response = await fetch('/api/register', { // замініть на свій URL
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error during enrolment or download');
      }

      const data = await response.json();

      toast.success('Succesfull enrolment');
      router.push('/home-authorised'); 
    } catch (error) {
      toast.error((error as Error).message || 'Something went wrong...');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2>Upload your photo</h2>
      
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
      />

      <button type="submit">
        Save
      </button>
    </form>
  );
}