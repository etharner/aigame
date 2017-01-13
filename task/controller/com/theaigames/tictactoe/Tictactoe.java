package com.theaigames.tictactoe;

import java.util.ArrayList;
import java.util.List;
import java.io.PrintWriter;
import java.io.IOException;

import com.theaigames.engine.io.IOPlayer;
import com.theaigames.game.AbstractGame;
import com.theaigames.tictactoe.field.Field;
import com.theaigames.tictactoe.moves.Move;
import com.theaigames.tictactoe.player.Player;

public class Tictactoe extends AbstractGame {

	private final int TIMEBANK_MAX = 100000;
	private final int TIME_PER_MOVE = 5000;
	private List<Player> players;

	@Override
	public void setupGame(ArrayList<IOPlayer> ioPlayers) throws Exception {
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
		try {
    		PrintWriter pr = new PrintWriter("out.txt", "UTF-8");

			List<Move> moves = this.processor.getMoves();

			for (Player player : players) {
				pr.println(player.getName());
			}

			pr.println(moves.size());

			for (Move move : moves) {
				pr.format("[%d %d]\n", move.getColumn(), move.getRow());
			}
			pr.println(this.processor.getWinner().getName());

    		pr.close();
		} catch (IOException ex) {
   			throw new RuntimeException(ex);
		}
	}

	public static void main(String args[]) throws Exception {
		Tictactoe game = new Tictactoe();

		game.setupEngine(args);
		game.runEngine();
	}
}
