import { Game } from './game';

class GameManager {
  private games: Map<string, Game> = new Map();
  private socketToGame: Map<string, string> = new Map();

  createGame(masterSocketId: string): Game {
    const game = new Game(masterSocketId);
    this.games.set(game.getId(), game);
    this.socketToGame.set(masterSocketId, game.getId());
    return game;
  }

  getGame(gameId: string): Game | undefined {
    return this.games.get(gameId);
  }

  getGameBySocket(socketId: string): Game | undefined {
    const gameId = this.socketToGame.get(socketId);
    return gameId ? this.games.get(gameId) : undefined;
  }

  addPlayerToGame(gameId: string, socketId: string): boolean {
    const game = this.games.get(gameId);
    if (!game) return false;
    
    this.socketToGame.set(socketId, gameId);
    return true;
  }

  removePlayer(socketId: string): { game: Game; wasPlayer: boolean; wasMaster: boolean } | null {
    const gameId = this.socketToGame.get(socketId);
    if (!gameId) return null;

    const game = this.games.get(gameId);
    if (!game) return null;

    this.socketToGame.delete(socketId);

    if (game.getMasterSocketId() === socketId) {
      game.markMasterDisconnected();
      return { game, wasPlayer: false, wasMaster: true };
    }

    game.removePlayer(socketId);
    return { game, wasPlayer: true, wasMaster: false };
  }

  deleteGame(gameId: string): void {
    const game = this.games.get(gameId);
    if (game) {
      this.socketToGame.delete(game.getMasterSocketId());
      game.getPlayers().forEach(p => this.socketToGame.delete(p.id));
      this.games.delete(gameId);
    }
  }

  reconnectMaster(gameCode: string, masterPersistentId: string, newSocketId: string): Game | null {
    const game = this.games.get(gameCode);
    if (!game) return null;

    if (game.getMasterPersistentId() !== masterPersistentId) {
      return null;
    }

    const success = game.reconnectMaster(newSocketId);
    if (success) {
      this.socketToGame.set(newSocketId, gameCode);
      return game;
    }

    return null;
  }

  getAllGames(): Game[] {
    return Array.from(this.games.values());
  }

  cleanupExpiredGames(): number {
    let cleanedCount = 0;

    for (const [gameId, game] of Array.from(this.games.entries())) {
      if (game.isExpired()) {
        game.markAsAbandoned();
        console.log(`Game ${gameId} marked as abandoned (grace period expired)`);
        
        this.socketToGame.delete(game.getMasterSocketId());
        game.getPlayers().forEach((p: { id: string }) => this.socketToGame.delete(p.id));
        this.games.delete(gameId);
        cleanedCount++;
      }
    }

    return cleanedCount;
  }
}

export const gameManager = new GameManager();
