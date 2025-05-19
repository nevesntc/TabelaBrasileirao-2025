import React, { useState, useEffect } from 'react';
import { getStandings } from '../services/api';
import { Standing } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import TeamLogo from '../components/TeamLogo';

const TablesPage: React.FC = () => {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        setLoading(true);
        const data = await getStandings();
        // Assumindo que queremos a primeira tabela (geralmente a tabela geral)
        setStandings(data.standings[0]?.table || []);
        setError(null);
      } catch (err) {
        setError('Não foi possível carregar a tabela de classificação.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  const getPositionColor = (position: number) => {
    // Libertadores (G6)
    if (position <= 6) return 'bg-blue-100 text-blue-800';
    // Pré-Libertadores (G8)
    if (position <= 8) return 'bg-green-100 text-green-800';
    // Sul-Americana
    if (position <= 12) return 'bg-yellow-100 text-yellow-800';
    // Zona de rebaixamento (Z4)
    if (position >= 17) return 'bg-red-100 text-red-800';
    // Demais posições
    return '';
  };

  if (loading) return <LoadingSpinner size="large" />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Tabela do Brasileirão</h1>
      <p className="text-gray-600 mb-6">Classificação atualizada do Campeonato Brasileiro</p>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12 text-center">Pos</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clube</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12">PTS</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12">J</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12">V</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12">E</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12">D</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12">GP</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12">GC</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12">SG</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {standings.map((team) => (
              <tr 
                key={team.team.id} 
                className="hover:bg-gray-50 transition-colors"
              >
                <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium text-center ${getPositionColor(team.position)}`}>
                  {team.position}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <TeamLogo src={team.team.crest} alt={team.team.name} size="small" />
                    <span className="ml-3 text-sm font-medium text-gray-900">
                      {team.team.shortName || team.team.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-center">{team.points}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-center">{team.playedGames}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-center">{team.won}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-center">{team.draw}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-center">{team.lost}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-center">{team.goalsFor}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-center">{team.goalsAgainst}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-center">{team.goalDifference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3 rounded-md bg-blue-100 border-l-4 border-blue-500">
          <p className="text-sm font-medium text-blue-800">Libertadores</p>
        </div>
        <div className="p-3 rounded-md bg-green-100 border-l-4 border-green-500">
          <p className="text-sm font-medium text-green-800">Pré-Libertadores</p>
        </div>
        <div className="p-3 rounded-md bg-yellow-100 border-l-4 border-yellow-500">
          <p className="text-sm font-medium text-yellow-800">Sul-Americana</p>
        </div>
        <div className="p-3 rounded-md bg-red-100 border-l-4 border-red-500">
          <p className="text-sm font-medium text-red-800">Zona de Rebaixamento</p>
        </div>
      </div>
    </div>
  );
};

export default TablesPage;