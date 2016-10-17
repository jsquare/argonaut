import React, {PropTypes} from 'react';
import {VictoryChart, VictoryAxis, VictoryBar, VictoryStack} from 'victory';

// Note: this is duplicated in _colors.scss
const colorMap = {
    red: 'hsl(0, 100%, 60%)',
    orange: 'hsl(34, 100%, 54%)',
    yellow: 'hsl(51, 100%, 50%)',
    green: 'hsl(76, 78%, 45%)',
    blue: 'hsl(203, 99%, 46%)',
    purple: 'hsl(271, 68%, 32%)',
    black: 'hsl(0, 0, 30%)',
};

const StatsChart = props => {
    const climbedBars = props.data.map(difficultyGroup => (
        {
            x: difficultyGroup.difficulty,
            y: difficultyGroup.climbedCount,
            fill: colorMap[difficultyGroup.color],
        }
    ));

    const remainingBars = props.data.map(difficultyGroup => {
        const {climbedCount, routesCount, color, difficulty} = difficultyGroup;
        const label = (
            (climbedCount === routesCount) ?
            '⭐' :
            `${Math.round(climbedCount / routesCount * 100)}%`
        );
        return {
            x: difficulty,
            y: routesCount - climbedCount,
            fill: colorMap[color],
            opacity: 0.5,
            label,
        };
    });

    const difficultyTicks = props.data.map(difficultyGroup => difficultyGroup.difficulty);

    return (
        <VictoryChart
            domain={{x: [0.5, (props.data.length + 0.5)]}}
            padding={60}
        >
            <VictoryAxis dependentAxis
                label="Climbs"
                style={{
                    tickLabels: {fontSize: 14},
                    grid: {
                        stroke: 'lightgrey',
                        strokeWidth: 1,
                    },
                    axis: {stroke: 'transparent'},
                    ticks: {stroke: 'transparent'},
                }}
            />
            <VictoryAxis
                label="Difficulty"
                tickLabels={difficultyTicks}
                style={{tickLabels: {fontSize: 14}}}
            />
            <VictoryStack
              style={{
                  data: {width: 30},
                  labels: {fontSize: 16},
              }}
            >
              <VictoryBar data={climbedBars} />
              <VictoryBar data={remainingBars} />
            </VictoryStack>
        </VictoryChart>
    );
};

StatsChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            difficulty: PropTypes.string.isRequired,
            color: PropTypes.string.isRequired,
            climbedCount: PropTypes.number.isRequired,
            routesCount: PropTypes.number.isRequired,
        })
    ),
};

export default StatsChart;
