interface StatCardProps {
  label: string
  value: number
  color: 'success' | 'danger' | 'warning' | 'primary'
  icon: string
}

const StatCard = ({ label, value, color, icon }: StatCardProps) => {
  return (
    <div className="card p-3 shadow-sm h-100">
      <p className="text-muted mb-1">{label}</p>
      <h2 className="fw-bold mb-0">{value}</h2>
    </div>
  )
}

export default StatCard