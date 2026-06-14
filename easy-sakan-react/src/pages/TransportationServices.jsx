import { useNavigate } from 'react-router-dom';


const services = [
  { slug: 'small-pickup', icon: '🛻', name: 'Small Pickup',  price: 500,  description: 'Light loads, boxes & small items.' },
  { slug: 'light-truck',  icon: '🚛', name: 'Light Truck',   price: 1200, description: 'Medium loads, appliances & furniture.' },
  { slug: 'box-truck',    icon: '🚚', name: 'Box Truck',     price: 2500, description: 'Full apartment or office moves.' },
  { slug: 'crane-truck',  icon: '🏗️', name: 'Crane Truck',   price: 5000, description: 'Heavy & oversized items, machinery.' },
];

export default function TransportationServices() {
  const navigate = useNavigate();

  return (
    <>
     
      <main style={{ minHeight: '70vh', padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Transportation Services</h1>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Choose the moving package that fits your needs.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '1.25rem' }}>
          {services.map((s) => (
            <div
              key={s.slug}
              onClick={() => navigate('/transportation')}
              style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 14,
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{s.icon}</div>
              <h3 style={{ marginBottom: '0.5rem' }}>{s.name}</h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1rem' }}>{s.description}</p>
              <p style={{ fontWeight: 700, color: '#1876d3' }}>From EGP {s.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </main>
   
    </>
  );
}
