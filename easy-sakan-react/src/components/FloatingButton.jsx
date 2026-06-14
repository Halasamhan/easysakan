import { useNavigate } from 'react-router-dom';
import '../styles/floating-button.css';

export default function FloatingButton() {
  const navigate = useNavigate();

  return (
    <div className="floating-sell-btn" onClick={() => navigate('/seller', { state: { openForm: true } })} title="Create a listing">
      ➕
    </div>
  );
}
