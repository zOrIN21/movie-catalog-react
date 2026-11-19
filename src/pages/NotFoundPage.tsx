import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <div className="message">
      <p>Такой страницы нет.</p>
      <Link to="/">Перейти к поиску</Link>
    </div>
  );
}
