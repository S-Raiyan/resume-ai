import { useEffect, useState } from "react"

export default function ScoreCircle({ score = 0 }) {

const [animatedScore, setAnimatedScore] = useState(0)

const radius = 70
const stroke = 10
const normalizedRadius = radius - stroke * 2
const circumference = normalizedRadius * 2 * Math.PI

useEffect(() => {

let start = 0

const interval = setInterval(() => {

  start += 1

  if(start >= score){
    start = score
    clearInterval(interval)
  }

  setAnimatedScore(start)

},20)

return () => clearInterval(interval)

},[score])

const strokeDashoffset =
circumference - (animatedScore / 100) * circumference

// Dynamic color based on score
let color = "#ef4444" // red
if(animatedScore >= 50) color = "#f59e0b" // yellow
if(animatedScore >= 75) color = "#22c55e" // green

return (

<div className="relative flex flex-col items-center justify-center">

  <svg
    height={radius * 2}
    width={radius * 2}
    className="rotate-[-90deg]"
  >

    {/* Background circle */}

    <circle
      stroke="#e5e7eb"
      fill="transparent"
      strokeWidth={stroke}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
    />

    {/* Animated progress */}

    <circle
      stroke={color}
      fill="transparent"
      strokeWidth={stroke}
      strokeDasharray={circumference}
      strokeDashoffset={strokeDashoffset}
      strokeLinecap="round"
      r={normalizedRadius}
      cx={radius}
      cy={radius}
      style={{transition:"stroke-dashoffset 0.3s"}}
    />

  </svg>

  {/* Score number */}

  <div
    className="absolute text-3xl font-bold"
    style={{color:color}}
  >
    {animatedScore}
  </div>

  <p className="mt-3 text-sm text-gray-500">
    Resume Score
  </p>

</div>

)
}