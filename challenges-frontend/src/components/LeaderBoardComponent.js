import * as React from 'react';
import GameApiClient from '../services/GameApiClient';

class LeaderBoardComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            leaderboard: [],
            serverError: false
        }
    }

    componentDidMount() {
        this.refreshLeaderBoard();
        // sets a timer to refresh the leaderboard every 5 seconds
        setInterval(this.refreshLeaderBoard.bind(this), 5000);
    }

    refreshLeaderBoard() {
        GameApiClient.leaderBoard().then(
            res => {
                if (res.ok) {
                    res.json().then(
                        data => this.setState({
                            leaderboard: data,
                            // reset the flag
                            serverError: false
                        })
                    );
                } else {
                    this.setState({ serverError: true });
                }
            }
        ).catch(reason => {
            this.setState({ serverError: true });
            console.log('Gamification server error', reason);
        })
    }

    render() {
        if (this.state.serverError) {
            return (
                <div>We're sorry, but we can't display game statistics at this
                    time.</div>
            );
        }
        return (
            <div>
                <h3>Leaderboard {this.props.userId ?
                        `(your id: ${this.props.userId})` : ""}
                </h3>
                <table>
                    <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Score</th>
                        <th>Badges</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.leaderboard.map(row => <tr key={row.userId}>
                        <td>{row.userId}</td>
                        <td>{row.totalScore}</td>
                        <td>{row.badges.map(
                            b => <span className="badge" key={b}>{b}</span>)}
                        </td>
                    </tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default LeaderBoardComponent;
