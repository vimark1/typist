import React from 'react';
import ReactGA from 'react-ga';
import firebase from 'firebase/app'

class ScoreBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            top10 : [
                //{user: (user object), score: "12"}
            ]
        }
    }

    componentDidMount() {
      ReactGA.pageview('/scoreboard');
        const topScorersRef = firebase.database().ref('top-scorers');
        topScorersRef.on('value', snapshot => {
            this.setState({
                top10: snapshot.val()
            })
        })
    }

    render() {
        let tableData = this.state.top10.map((row, idx) => {
            return {rank: idx+1, name: row.user.displayName, score: row.score};
        });

        let rows = tableData.map((row, idx) => {
            return (<tr key={idx}>
                <td>{row.rank}</td>
                <td>{row.name}</td>
                <td>{row.score}</td>
            </tr>)
        })

        return (<table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>);
    }
}

export default ScoreBoard;
