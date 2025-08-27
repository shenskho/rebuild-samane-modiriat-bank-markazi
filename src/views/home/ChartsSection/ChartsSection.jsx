import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import { Col, Row } from 'reactstrap'
import { toPersianDigits } from '@utility'
const ChartsSection = () => {
  const chartRef1 = useRef(null)
  const chartRef2 = useRef(null)
  const chartRef3 = useRef(null)
  const chartRef4 = useRef(null)
  const chartInstance1 = useRef(null)
  const chartInstance2 = useRef(null)
  const chartInstance3 = useRef(null)
  const chartInstance4 = useRef(null)
  Chart.defaults.font.family = 'Vazirmatn'

  useEffect(() => {
    const ctx1 = chartRef1.current?.getContext('2d')
    const ctx2 = chartRef2.current?.getContext('2d')
    const ctx3 = chartRef3.current?.getContext('2d')
    const ctx4 = chartRef4.current?.getContext('2d')

    ;[chartInstance1, chartInstance2, chartInstance3, chartInstance4].forEach((instance) => {
      if (instance.current) {
        instance.current.destroy()
      }
    })

    if (ctx1) {
      chartInstance1.current = new Chart(ctx1, {
        type: 'line',
        data: {
          labels: ['1400', '1401', '1402', '1403'].map(toPersianDigits),
          datasets: [
            {
              label: 'تعداد استخدام‌ها',
              data: [150, 220, 300, 400],
              borderColor: '#04364a',
              backgroundColor: 'rgba(4, 54, 74, 0.2)',
              borderWidth: 2,
              pointBackgroundColor: '#e55604',
              pointRadius: 4,
              fill: true,
              tension: 0.3
            }
          ]
        },
        options: {
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: (context) => `${context.dataset.label}: ${toPersianDigits(context.raw)}`
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => toPersianDigits(value)
              }
            },
            x: {
              ticks: {
                font: {
                  size: 12
                }
              }
            }
          }
        }
      })
    }

    if (ctx2) {
      chartInstance2.current = new Chart(ctx2, {
        type: 'pie',
        data: {
          labels: ['زن', 'مرد'].map(toPersianDigits),
          datasets: [
            {
              label: 'استخدام به تفکیک جنسیت',
              data: [350, 450],
              backgroundColor: ['#e55604', '#04364A']
            }
          ]
        },
        options: {
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: (context) => `${context.label}: ${toPersianDigits(context.raw)}`
              }
            }
          }
        }
      })
    }

    if (ctx3) {
      chartInstance3.current = new Chart(ctx3, {
        type: 'bar',
        data: {
          labels: ['جهاد دانشگاهی', 'سازمان سنجش', 'آزمون گستر', 'رایانگان'].map(toPersianDigits),
          datasets: [
            {
              label: 'تعداد آزمون‌ها',
              data: [50, 70, 30, 100],
              backgroundColor: '#23486A'
            }
          ]
        },
        options: {
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: (context) => `${context.dataset.label}: ${toPersianDigits(context.raw)}`
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => toPersianDigits(value)
              }
            }
          }
        }
      })
    }

    if (ctx4) {
      chartInstance4.current = new Chart(ctx4, {
        type: 'polarArea',
        data: {
          labels: ['سهمیه 25%', 'سهمیه 5%', 'سهمیه 3%', 'آزاد'].map(toPersianDigits),
          datasets: [
            {
              label: 'سهمیه‌ها',
              data: [100, 150, 50, 300],
              backgroundColor: ['#dafffb', '#64ccc5', '#e55604', '#26577c']
            }
          ]
        },
        options: {
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: (context) => `${context.label}: ${toPersianDigits(context.raw)}`
              }
            }
          }
        }
      })
    }

    return () => {
      ;[chartInstance1, chartInstance2, chartInstance3, chartInstance4].forEach((instance) => {
        if (instance.current) {
          instance.current.destroy()
        }
      })
    }
  }, [])

  return (
    <Row className='charts'>
      <Col lg={3} md={3} className='mt-1'>
        <div className='chart-box'>
          <h3>استخدام به تفکیک سال</h3>
          <canvas ref={chartRef1}></canvas>
        </div>
      </Col>
      <Col lg={3} md={3} className='mt-1'>
        <div className='chart-box'>
          <h3>استخدام به تفکیک جنسیت</h3>
          <canvas ref={chartRef2}></canvas>
        </div>
      </Col>
      <Col lg={3} md={3} className='mt-1'>
        <div className='chart-box'>
          <h3>استخدام به تفکیک سهمیه</h3>
          <canvas ref={chartRef4}></canvas>
        </div>
      </Col>
      <Col lg={3} md={3} className='mt-1'>
        <div className='chart-box'>
          <h3>آزمون‌های برگزار شده</h3>
          <canvas ref={chartRef3}></canvas>
        </div>
      </Col>
    </Row>
  )
}

export default ChartsSection
