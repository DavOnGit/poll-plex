import { Component, default as React } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts'
import { scaleOrdinal, schemeCategory10 } from 'd3-scale'
import noVotesImg from '../../resources/novotes_img.png'

const colors = scaleOrdinal(schemeCategory10).range()

const renderActiveShape = (props) => {
  const RADIANTS = Math.PI / 180
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent } = props
  const sin = Math.sin(-RADIANTS * midAngle)
  const cos = Math.cos(-RADIANTS * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor='middle' fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill='none' />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill='#333'>
        {`Count ${payload.value}`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill='#999'>
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  )
}

class Chart extends Component {
  state = { activeIndex: 0 }
  _onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
    })
  }

  render () {
    const {options} = this.props
    const sumVotes = options.reduce((a, b) => a + b.value, 0)

    const _render = () => {
      if (sumVotes === 0) {
        return (
          <div className='align-self-middle no-votes'>
            <h4 className='text-center'>No votes yet!</h4>
          </div>
        )
      }
      return (
        <ResponsiveContainer>
          <PieChart onMouseEnter={this._onPieEnter}>
            <Pie
              data={options}
              innerRadius='45%'
              outerRadius='70%'
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape}>
              {
                options.map((entry, index) => (
                  <Cell key={`slice-${index}`}
                    name={entry.name}
                    value={entry.value}
                    fill={colors[index % 10]} />
                ))
              }
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )
    }

    return _render()
  }
}

export default Chart
