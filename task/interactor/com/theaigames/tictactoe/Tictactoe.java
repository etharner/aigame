package com.theaigames.tictactoe;

import java.util.ArrayList;
import java.util.List;

import com.theaigames.engine.io.IOPlayer;
import com.theaigames.game.AbstractGame;
import com.theaigames.tictactoe.field.Field;
import com.theaigames.tictactoe.moves.Move;
import com.theaigames.tictactoe.player.Player;

public class Tictactoe extends AbstractGame {

	private final int TIMEBANK_MAX = 10000;
	private final int TIME_PER_MOVE = 500;
	private List<Player> players;

	@Override
	public void setupGame(ArrayList<IOPlayer> ioPlayers) throws Exception {

		//System.out.println("Setting up game...");

		// create all the players and everything they need
		this.players = new ArrayList<>();

		// create the playing field
		Field mField = new Field();

		for(int i=0; i<ioPlayers.size(); i++) {
			// create the player
			String playerName = String.format("player%d", i+1);
			Player player = new Player(playerName, ioPlayers.get(i), TIMEBANK_MAX, TIME_PER_MOVE, i+1);
			this.players.add(player);

		}
		this.players.forEach(this::sendSettings);

		// create the processor
		super.processor = new Processor(this.players, mField);
	}

	private void sendSettings(Player player) {
		String playerString = this.players.get(0).getName() + "," + this.players.get(1).getName();

		player.sendSetting("timebank", TIMEBANK_MAX);
		player.sendSetting("time_per_move", TIME_PER_MOVE);
		player.sendSetting("player_names", playerString);
		player.sendSetting("your_bot", player.getName());
		player.sendSetting("your_botid", player.getId());
	}

	@Override
	protected void runEngine() throws Exception {
		super.engine.setLogic(this);
		super.engine.start();
	}

	@Override
	public void saveGame() {
		List<Move> moves = this.processor.getMoves();
		/*String[][] gameField = new String[9][9];
		for (String[] row : gameField) {
			Arrays.fill(row, "0");
		}*/

		for (Player player : players) {
			System.out.println(player.getName());
		}

		System.out.println(this.processor.getRoundNumber());

		for (Move move : moves) {
			System.out.format("[%d %d]\n", move.getRow(), move.getColumn());
			/*gameField[move.getRow()][move.getColumn()] = move.getPlayer().getName();

        	for (int x = 0; x < 9; x++) {
        		for (int y = 0; y < 9; y++) {
					System.out.print(gameField[x][y]);
					System.out.print(" ");
					if (y % 3 == 2) {
						System.out.print(" ");
					}
				}
				System.out.println();
				if (x % 3 == 2) {
					System.out.println();
				}
			}*/
		}
		System.out.println(this.processor.getWinner().getName());
	}

	public static void main(String args[]) throws Exception {
		Tictactoe game = new Tictactoe();

		game.TEST_BOT = "java bot.BotStarter";

		game.setupEngine(args);
		game.runEngine();
	}
}
