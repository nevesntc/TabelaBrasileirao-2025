import React, { useState, useEffect } from 'react';
import { getMatches } from '../services/api';
import { Match } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import TeamLogo from '../components/TeamLogo';
import { Calendar, Clock } from 'lucide-react';

const MatchesPage: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentMatchday, setCurrentMatchday] = useState<number>(1);

  useEffect(() => {
    const fetchMatchday = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMatches(currentMatchday);
        setMatches(data.matches || []);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Não foi possível carregar os jogos.');
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchday();
  }, [currentMatchday]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const renderScore = (match: Match) => {
    if (match.status === 'FINISHED') {
      return (
        <div className="text-center font-bold text-xl px-3">
          {match.score.fullTime.home} x {match.score.fullTime.away}
        </div>
      );
    }
    return (
      <div className="text-center font-light text-gray-600 text-sm px-3">VS</div>
    );
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Agendado
          </span>
        );
      case 'FINISHED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Finalizado
          </span>
        );
      case 'IN_PLAY':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 animate-pulse">
            Em Andamento
          </span>
        );
      case 'PAUSED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            Intervalo
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  const handleMatchdayChange = (newMatchday: number) => {
    if (newMatchday >= 1 && newMatchday <= 38) {
      setCurrentMatchday(newMatchday);
    }
  };

  if (loading) return <LoadingSpinner size="large" />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Jogos do Brasileirão</h1>
      <p className="text-gray-600 mb-6">Calendário de partidas do Campeonato Brasileiro</p>

      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-xl font-semibold">Rodada {currentMatchday}</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleMatchdayChange(currentMatchday - 1)}
              disabled={currentMatchday <= 1}
              className="px-3 py-1 bg-green-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
            >
              Anterior
            </button>
            <select
              value={currentMatchday}
              onChange={(e) => handleMatchdayChange(Number(e.target.value))}
              className="border border-gray-300 rounded-md p-1 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {Array.from({ length: 38 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Rodada {i + 1}
                </option>
              ))}
            </select>
            <button
              onClick={() => handleMatchdayChange(currentMatchday + 1)}
              disabled={currentMatchday >= 38}
              className="px-3 py-1 bg-green-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
            >
              Próxima
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {matches.length > 0 ? (
          matches.map((match) => (
            <div
              key={match.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-green-700 text-white px-4 py-2 text-sm font-semibold flex justify-between items-center">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>{formatDate(match.utcDate)}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>{formatTime(match.utcDate)}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-gray-600">Rodada {match.matchday}</div>
                  {getStatusLabel(match.status)}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center flex-1">
                    <TeamLogo src={match.homeTeam.crest} alt={match.homeTeam.name} />
                    <span className="ml-2 font-medium">{match.homeTeam.shortName || match.homeTeam.name}</span>
                  </div>
                  {renderScore(match)}
                  <div className="flex items-center flex-1 justify-end">
                    <span className="mr-2 font-medium">{match.awayTeam.shortName || match.awayTeam.name}</span>
                    <TeamLogo src={match.awayTeam.crest} alt={match.awayTeam.name} />
                  </div>
                </div>
                {match.venue && (
                  <div className="text-xs text-gray-500 mt-2">
                    Local: {match.venue}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-8">
            <p className="text-gray-500">Nenhum jogo encontrado para esta rodada.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesPage;