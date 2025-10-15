import { Doughnut, Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Col, Row } from 'reactstrap'

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend)

function App() {
  const data = {
    labels: ['موفق', 'ناموفق'],
    datasets: [
      {
        label: 'تعداد پرداخت',
        data: [42846, 517],
        backgroundColor: ['#637AB9', '#4FB7B3'],
        borderColor: ['#637AB9', '#4FB7B3'],
        borderWidth: 2,
        hoverOffset: 8
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          color: '#0f172a',
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: true,
        text: 'نمودار پرداخت‌های موفق و ناموفق',
        color: '#0f172a',
        font: { size: 18, weight: '600' },
        padding: 16
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#fff',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(148, 163, 184, 0.35)',
        borderWidth: 1,
        padding: 12
      }
    },
    cutout: '60%'
  }

  // Registration charts (Bar + Line)
  const registrationLabels = ['کارت صادر شده', 'دانلود کارت', 'پرداختی‌ها']
  const registrationValues = [42846, 37593, 42846]

  const registrationBarData = {
    labels: registrationLabels,
    datasets: [
      {
        label: 'ثبت‌نامی‌ها',
        data: registrationValues,
        backgroundColor: ['#60a5fa', '#67C090', '#FF9A00'],
        borderColor: ['#3b82f6', '#67C090', '#FF9A00'],
        borderWidth: 2,
        borderRadius: 10
      }
    ]
  }

  const registrationBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#0f172a' } },
      title: {
        display: true,
        text: 'نمودار ثبت‌نامی‌ها - ستونی',
        color: '#0f172a',
        font: { size: 18, weight: '600' },
        padding: 16
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#fff',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(148, 163, 184, 0.35)',
        borderWidth: 1,
        padding: 12
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#475569' } },
      y: { grid: { color: 'rgba(148,163,184,0.2)' }, ticks: { color: '#475569' }, beginAtZero: true }
    }
  }

  const registrationLineData = {
    labels: registrationLabels,
    datasets: [
      {
        label: 'ثبت‌نامی‌ها',
        data: registrationValues,
        borderColor: 'rgba(99, 102, 241, 1)',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: '#fff',
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.35,
        fill: true
      }
    ]
  }

  const registrationLineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#0f172a' } },
      title: {
        display: true,
        text: 'نمودار ثبت‌نامی‌ها - خطی',
        color: '#0f172a',
        font: { size: 18, weight: '600' },
        padding: 16
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#fff',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(148, 163, 184, 0.35)',
        borderWidth: 1,
        padding: 12
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#475569' } },
      y: { grid: { color: 'rgba(148,163,184,0.2)' }, ticks: { color: '#475569' }, beginAtZero: true }
    }
  }

  // Defect Requests - Bar chart
  const defectLabels = [
    'تعداد کل',
    'وضعیت تاهل',
    'ثبت نام',
    'سهمیه',
    'شغل',
    'کارت ورود به جلسه',
    'محل برگزاری آزمون',
    'معدل',
    'نام خانوادگی',
    'نام'
  ]
  const defectValues = [1290, 49, 243, 84, 12, 310, 104, 118, 14, 104]

  const defectBackgrounds = defectLabels.map((_, idx) => (idx === 0 ? '#9ECAD6' : '#154D71'))
  const defectBorders = defectLabels.map((_, idx) => (idx === 0 ? '#9ECAD6' : '#154D71'))

  const defectBarData = {
    labels: defectLabels,
    datasets: [
      {
        label: 'درخواست رفع نقص',
        data: defectValues,
        backgroundColor: defectBackgrounds,
        borderColor: defectBorders,
        borderWidth: 2,
        borderRadius: 8
      }
    ]
  }

  const defectBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#0f172a' } },
      title: {
        display: true,
        text: 'نمودار درخواست رفع نقص - ستونی',
        color: '#0f172a',
        font: { size: 18, weight: '600' },
        padding: 16
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#fff',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(148, 163, 184, 0.35)',
        borderWidth: 1,
        padding: 12
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#475569' } },
      y: { grid: { color: 'rgba(148,163,184,0.2)' }, ticks: { color: '#475569' }, beginAtZero: true }
    }
  }

  return (
    <Row>
      <Col lg={6} className='d-flex justify-content-center'>
        <div
          style={{
            width: 'min(920px, 92%)',
            height: 460,
            background: '#ffffff',
            borderRadius: 16,
            padding: 20,
            boxShadow: '0 10px 30px rgba(2, 6, 23, 0.08)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            marginTop: '3rem'
          }}
          dir='rtl'
        >
          <Bar data={registrationBarData} options={registrationBarOptions} />
        </div>
      </Col>
      <Col lg={6} className='d-flex justify-content-center'>
        <div
          style={{
            width: 'min(920px, 92%)',
            height: 460,
            background: '#ffffff',
            borderRadius: 16,
            padding: 20,
            boxShadow: '0 10px 30px rgba(2, 6, 23, 0.08)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            marginTop: '3rem'
          }}
          dir='rtl'
        >
          <Doughnut data={data} options={options} />
        </div>
      </Col>
      <Col lg={6} className='d-flex justify-content-center'>
        <div
          style={{
            width: 'min(920px, 92%)',
            height: 460,
            background: '#ffffff',
            borderRadius: 16,
            padding: 20,
            boxShadow: '0 10px 30px rgba(2, 6, 23, 0.08)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            marginTop: '3rem'
          }}
          dir='rtl'
        >
          <Line data={registrationLineData} options={registrationLineOptions} />
        </div>
      </Col>

      <Col lg={6} className='d-flex justify-content-center'>
        <div
          style={{
            width: 'min(920px, 92%)',
            height: 460,
            background: '#ffffff',
            borderRadius: 16,

            padding: 20,
            boxShadow: '0 10px 30px rgba(2, 6, 23, 0.08)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            marginTop: '3rem'
          }}
          dir='rtl'
        >
          <Bar data={defectBarData} options={defectBarOptions} />
        </div>
      </Col>
    </Row>
  )
}

export default App
