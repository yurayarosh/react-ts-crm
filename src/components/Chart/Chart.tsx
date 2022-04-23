import { FC, useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { ChartType } from 'chart.js'

Chart.register(...registerables)

export interface IChartData {
  labels: string[]
  datasets: Array<{
    data: number[] | string[]
    borderWidth?: number
    backgroundColor: string[]
  }>
}

interface HistoryChartProps {
  data: IChartData
}

const HistoryChart: FC<HistoryChartProps> = ({ data }) => {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvas.current) {
      const type: ChartType = 'pie'
      const config = {
        type,
        data,
      }

      console.log({ data })

      const chart = new Chart(canvas.current, config)

      return () => {
        chart.destroy()
      }
    }
  }, [])

  return <canvas ref={canvas} />
}

export default HistoryChart
