import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import FinancialData from './FinancialData';

const Profile = () => {
  const [profiles, setProfiles] = useState([]);
  const [profileName, setProfileName] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name')
        .eq('user_id', user.id);
      if (error) console.log('error', error);
      else setProfiles(data);
    }
  };

  const createProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from('profiles')
        .insert([{ name: profileName, user_id: user.id }])
        .select();
      if (error) console.log('error', error);
      else {
        setProfiles([...profiles, ...data]);
        setProfileName('');
      }
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (selectedProfile) {
    return <FinancialData profile={selectedProfile} />;
  }

  return (
    <div>
      <h2>Profile Management</h2>
      <input
        type="text"
        placeholder="Profile Name"
        value={profileName}
        onChange={(e) => setProfileName(e.target.value)}
      />
      <button onClick={createProfile}>Create Profile</button>
      <hr />
      {profiles.length > 0 ? (
        <ul>
          {profiles.map((profile) => (
            <li key={profile.id} onClick={() => setSelectedProfile(profile)}>
              {profile.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>Click + to add profiles.</p>
      )}
      <hr />
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Profile;