import axios, { AxiosError } from 'axios';
import { TableData, MatchesData } from '../types';

const API_TOKEN = 'b4a2262bad274fb2a104f1a4159f3814';
const BASE_URL = '/api/v4'; // Updated to use relative path for proxy
const BRASILEIRAO_ID = 2013;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-Auth-Token': API_TOKEN
  },
  timeout: 10000 // Add timeout
});

const handleApiError = (error: AxiosError) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    switch (error.response.status) {
      case 401:
        throw new Error('Erro de autenticação. Verifique o token da API.');
      case 403:
        throw new Error('Acesso negado. Verifique as permissões do token.');
      case 404:
        throw new Error('Dados não encontrados.');
      case 429:
        throw new Error('Limite de requisições excedido. Tente novamente mais tarde.');
      case 500:
        throw new Error('Erro interno do servidor. Tente novamente mais tarde.');
      default:
        throw new Error(`Erro ${error.response.status}: ${error.response.data?.message || 'Erro desconhecido'}`);
    }
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão.');
  } else {
    // Something happened in setting up the request that triggered an Error
    throw new Error('Erro ao processar a requisição.');
  }
};

export const getStandings = async (): Promise<TableData> => {
  try {
    const response = await api.get(`/competitions/${BRASILEIRAO_ID}/standings`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar classificação:', error);
    handleApiError(error as AxiosError);
    throw error;
  }
};

export const getMatches = async (matchday?: number): Promise<MatchesData> => {
  try {
    const url = matchday 
      ? `/competitions/${BRASILEIRAO_ID}/matches?matchday=${matchday}` 
      : `/competitions/${BRASILEIRAO_ID}/matches`;
    
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar jogos:', error);
    handleApiError(error as AxiosError);
    throw error;
  }
};

export const getTeamMatches = async (teamId: number): Promise<MatchesData> => {
  try {
    const response = await api.get(`/teams/${teamId}/matches`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar jogos do time ${teamId}:`, error);
    handleApiError(error as AxiosError);
    throw error;
  }
};