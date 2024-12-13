import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h2>Profil</h2>
      {user ? (
        <div>
          <p>E-posta: {user.email}</p>
          {/* Diğer kullanıcı bilgilerini burada gösterebilirsiniz */}
        </div>
      ) : (
        <p>Kullanıcı bilgileri yükleniyor...</p>
      )}
    </div>
  );
};

export default Profile;