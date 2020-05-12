package microservices.book.gamification.game;

import java.util.List;

import microservices.book.gamification.game.domain.LeaderBoardRow;

public interface LeaderBoardService {

    /**
     * @return the current leader board ranked from high to low score
     */
    List<LeaderBoardRow> getCurrentLeaderBoard();
}
