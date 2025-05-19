export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

export interface Standing {
  position: number;
  team: Team;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export interface TableData {
  standings: Standing[];
}

export interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  utcDate: string;
  status: string;
  matchday: number;
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
  };
  venue?: string;
}

export interface MatchesData {
  matches: Match[];
}