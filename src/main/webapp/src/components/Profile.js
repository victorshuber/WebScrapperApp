import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    // Пример API запроса для получения данных пользователя
    axios.get('https://api.example.com/profile')
      .then(response => {
        setProfileData(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении данных профиля:', error);
      });
  }, []);

  return (
    <div>
      <h1>Личный кабинет</h1>
      <p>Имя: {profileData.name}</p>
      <p>Email: {profileData.email}</p>
      {/* Добавьте другие поля профиля */}
    </div>
  );
};

export default Profile;