import Gun from 'gun/gun';
import 'gun/sea';
import 'gun/axe';

// Create a new Gun instance
const gun = Gun({
  peers: ['http://localhost:8765/gun'] // Use your GunDB relay server
});

export default gun;
