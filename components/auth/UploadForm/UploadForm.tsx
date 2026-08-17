<<<<<<< HEAD
'use client';


import css from "./UploadForm.module.css";
import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation'; 
import toast from 'react-hot-toast'; 
import  Button  from '@/components/common/Button/Button';

export default function UploadForm() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
 const [file, setFile] = useState<File | null>(null);
 const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

const handleClose = () => {
  router.back();
};
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!file) {
    toast.error('Please select a photo');
    return;
  }

  const savedDataString = localStorage.getItem('registerData');
  const savedData = savedDataString ? JSON.parse(savedDataString) : {};

  try {
    // Крок 1 — реєстрація (без файлу, звичайний JSON)
    const registerResponse = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // важливо — щоб браузер прийняв і зберіг cookie сесії
      body: JSON.stringify({
        name: savedData.name,
        email: savedData.email,
        password: savedData.password,
      }),
    });

    const registerData = await registerResponse.json();

    if (!registerResponse.ok) {
      throw new Error(registerData.message || 'Registration failed');
    }

    // Крок 2 — завантаження аватарки (окремий запит, вже під сесією з кроку 1)
    const avatarFormData = new FormData();
    avatarFormData.append('avatar', file);

    const avatarResponse = await fetch(`${baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include', // обов'язково — щоб cookie сесії пішла разом із запитом
      body: avatarFormData,
    });

    if (!avatarResponse.ok) {
      const avatarData = await avatarResponse.json();
      throw new Error(avatarData.message || 'Avatar upload failed');
    }

    localStorage.removeItem('registerData');
    toast.success('Successfully registered!');
    router.push('/home-authorised');
  } catch (error) {
    toast.error((error as Error).message || 'Something went wrong...');
  }
};

  return (
    <form onSubmit={handleSubmit} className={css.formContainer}>
      <h2 className={css.title}>Upload your photo</h2>

<button 
        className={css.closeBtn} 
        type="button" 
        onClick={handleClose} 
        aria-label="Close"
      >
        <svg width="13.5" height="13.5" viewBox="0 0 32 32" className={css['icon-close']}>
          <path 
            stroke="black" 
            strokeWidth="1" 
            d="M7 7l9 9M16 16l-9 9M16 16l9 9M16 16l9 9M16 16l9-9" 
          />
        </svg>
      </button>

      <input 
        id="avatar-upload"
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        className={css.hiddenInput}
      />

      <label htmlFor="avatar-upload" className={css.avatarLabel}>
        {preview ? (
          
          <img src={preview} alt="Avatar preview" className={css.avatarImage} />
        ) : (
          <div className={css.placeholderCircle}>
<svg width="69" height="58" viewBox="0 0 98 82" fill="none" xmlns="http://www.w3.org/2000/svg">
<path  strokeWidth="3"  d="M67.0063 47.0865C67.0063 55.6629 58.7352 62.6154 48.5323 62.6154C38.3294 62.6154 30.0584 55.6629 30.0584 47.0865C30.0584 38.5102 38.3294 31.5577 48.5323 31.5577C58.7352 31.5577 67.0063 38.5102 67.0063 47.0865Z" stroke="#070707"/>
<path  strokeWidth="3"  d="M0.5 68.5L0.500002 30.6514C0.500002 24.2908 6.63417 19.1346 14.2011 19.1346C19.3906 19.1346 24.1348 16.6699 26.4557 12.7682L29.5608 7.54802C32.1301 3.22851 37.3823 0.499982 43.1276 0.5L53.9372 0.500035C59.6824 0.500053 64.9345 3.22859 67.5039 7.54807L70.609 12.7683C72.9299 16.6701 77.674 19.1347 82.8636 19.1347C90.4305 19.1347 96.5647 24.2909 96.5647 30.6515V68.5C96.5647 75.5416 89.7737 81.25 81.3966 81.25H15.6681C7.29099 81.25 0.5 75.5416 0.5 68.5Z" stroke="#070707"/>
</svg>
          </div>
        )}
      </label>

<Button 
  type="submit" 
  disabled={!file} 
  className={`${css.buttonSave} ${!file ? css.buttonDisabled : css.buttonActive}`}
>
  Save
</Button>
=======
"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { updateAvatar } from "@/lib/api/users";
import { useAuthStore } from "@/store/authStore";
import styles from "./UploadForm.module.css";
import Image from "next/image";

export default function UploadForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Please select an image");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const file = inputRef.current?.files?.[0];

    if (!file) {
      setError("Please select a photo");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      const updatedUser = await updateAvatar(file);

      if (user) {
        setUser({
          ...user,
          avatarUrl: updatedUser.avatarUrl,
        });
      }

      router.push("/profile");
    } catch (error) {
      console.error("Failed to upload avatar:", error);
      setError("Failed to upload photo");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSkip = () => {
    router.push("/");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        hidden
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
      >
        {preview ? (
          <Image src={preview} alt="Selected avatar" width={200} height={200} />
        ) : (
          "Choose photo"
        )}
      </button>

      {error && <p>{error}</p>}

      <button type="submit" disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload photo"}
      </button>

      <button type="button" onClick={handleSkip} disabled={isUploading}>
        Skip
      </button>
>>>>>>> 63162fe2129cc9f2f351018b25bd2a33989a7d8e
    </form>
  );
}
