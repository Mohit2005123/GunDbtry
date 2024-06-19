import gun from './Gun.jsx';

// Function to clear GunDB
export const clearDatabase = async () => {
  try {
    // Iterate over all nodes in the 'messages' node and delete them
    gun.get('messages').map().once((data, key) => {
      gun.get('messages').get(key).put(null);
    });

    console.log('Database cleared successfully.');
  } catch (error) {
    console.error('Error clearing database:', error);
  }
};
