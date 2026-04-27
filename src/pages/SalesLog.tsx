// import { useProducts } from '../hooks/useProducts'

const SalesLog = ({ products }: any) => {


  // const { products } = useProducts()

  const sold = products.filter(p => p.status === 'sold')

  const totalRevenue = sold.reduce((sum, p) => sum + Number(p.price), 0)

  return (
    <div>
      <h4 className="mb-1">Sales Log</h4>
      <p className="text-muted mb-4">All products marked as sold</p>

      <div className="card p-3 shadow-sm mb-4 col-md-3">
        <p className="text-muted mb-1">Total Revenue</p>
        <h2 className="fw-bold mb-0">KES {totalRevenue.toLocaleString()}</h2>
      </div>

      {sold.length === 0 ? (
        <p className="text-muted">No products sold yet.</p>
      ) : (
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {sold.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.type}</td>
                <td>KES {p.price.toLocaleString()}</td>
                <td className="text-muted">{p.note || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  )
}

export default SalesLog