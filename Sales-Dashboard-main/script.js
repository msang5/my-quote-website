// Sample sales data
let salesData = [
    { month: 'January', product: 'Apple iPhone 14', sales: 1200 },
    { month: 'January', product: 'Samsung Galaxy S23', sales: 800 },
    { month: 'February', product: 'Apple iPhone 14', sales: 1100 },
    { month: 'February', product: 'Samsung Galaxy S23', sales: 850 },
    { month: 'March', product: 'Apple iPhone 14', sales: 1300 },
    { month: 'March', product: 'Samsung Galaxy S23', sales: 900 }
  ];
  
  // Initialize chart instances to store references
  let salesChartInstance = null;
  let categoryChartInstance = null;
  
  // Update the charts and table with the current sales data
  function updateDashboard() {
    // Update sales chart
    const salesChartData = {
      labels: [...new Set(salesData.map(item => item.month))],
      datasets: [{
        label: 'Apple iPhone 14 Sales',
        data: salesData.filter(item => item.product === 'Apple iPhone 14').map(item => item.sales),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
      {
        label: 'Samsung Galaxy S23 Sales',
        data: salesData.filter(item => item.product === 'Samsung Galaxy S23').map(item => item.sales),
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      }]
    };
  
    const salesCtx = document.getElementById('salesChart').getContext('2d');
  
    // Destroy the existing sales chart before creating a new one
    if (salesChartInstance) {
      salesChartInstance.destroy();
    }
  
    salesChartInstance = new Chart(salesCtx, {
      type: 'line',
      data: salesChartData,
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  
    // Update category chart (pie chart)
    const categoryData = {
      labels: ['Apple iPhone 14', 'Samsung Galaxy S23'],
      datasets: [{
        data: [
          salesData.filter(item => item.product === 'Apple iPhone 14').reduce((acc, curr) => acc + curr.sales, 0),
          salesData.filter(item => item.product === 'Samsung Galaxy S23').reduce((acc, curr) => acc + curr.sales, 0)
        ],
        backgroundColor: ['#36A2EB', '#FF6384'],
      }]
    };
  
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
  
    // Destroy the existing category chart before creating a new one
    if (categoryChartInstance) {
      categoryChartInstance.destroy();
    }
  
    categoryChartInstance = new Chart(categoryCtx, {
      type: 'pie',
      data: categoryData,
    });
  
    // Update sales table
    const salesTableBody = document.querySelector('#salesTable tbody');
    salesTableBody.innerHTML = ''; // Clear existing table
    salesData.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.month}</td>
        <td>${item.product}</td>
        <td>${item.sales}</td>
      `;
      salesTableBody.appendChild(row);
    });
  
    // Initialize DataTable
    $('#salesTable').DataTable();
  }
  
  // Add new sales data from form
  document.getElementById('salesForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const month = document.getElementById('month').value;
    const product = document.getElementById('product').value;
    const sales = parseInt(document.getElementById('sales').value);
  
    if (month && product && sales) {
      salesData.push({ month, product, sales });
      updateDashboard();
  
      // Clear form inputs
      document.getElementById('salesForm').reset();
    }
  });
  
  // Initial dashboard update
  updateDashboard();
  