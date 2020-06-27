import firebase from 'firebase/app';
import React from 'react';
import ReactGA from 'react-ga';
import LineChart from 'react-linechart';
import '../../../node_modules/react-linechart/dist/styles.css';

class LineChartStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top10: [],
    };
  }

  componentDidMount() {
    ReactGA.pageview('/chart');
    const topScorersRef = firebase.database().ref('top-scorers');
    topScorersRef.on('value', snapshot => {
      this.setState({
        top10: snapshot.val(),
      });
    });
  }

  render() {
    const tableData = ((this.state as any).top10 || []).map((row, idx) => {
      return { x: idx + 1, y: row.score };
    });
    const data = [
      {
        color: 'steelblue',
        points: tableData,
      },
    ];
    return (
      <div>
        <div className="App">
          <h1>My First LineChart</h1>
          <LineChart width={600} height={400} data={data} />
        </div>
      </div>
    );
  }
}

export default LineChartStat;
