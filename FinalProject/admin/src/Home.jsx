import React, { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import controller from './services/api/requests';
import { endpoints } from './services/api/constants';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useGetMenusQuery } from './services/redux/procektApi';
import { Table } from 'antd';

const Dashboard = () => {
  const token = Cookies.get('token');
  const userRedux = useSelector((state) => state.admin);
  const [orders, setOrders] = useState([]);
  const [productSales, setProductSales] = useState([]);
  const [userMetrics, setUserMetrics] = useState([]);
  const [monthlyInterestSales, setMonthlyInterestSales] = useState(0);
  const [dailyInterestSales, setDailyInterestSales] = useState(0);
  const { data: menus, refetch } = useGetMenusQuery();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await controller.getAll(endpoints.orders, token);
        setOrders(response.data);

        const today = new Date().getDate();
        const thisMonth = new Date().getMonth() + 1;

        const dailySales = response.data
          .filter((order) => new Date(order.createdAt).getDate() === today)
          .reduce((sum, order) => sum + order.totalPrice, 0);

        const monthlySales = response.data
          .filter((order) => new Date(order.createdAt).getMonth() + 1 === thisMonth)
          .reduce((sum, order) => sum + order.totalPrice, 0);

        setDailyInterestSales(dailySales);
        setMonthlyInterestSales(monthlySales);

    
        const productsSold = {};
        response.data.forEach((order) => {
          order.items.forEach((item) => {
            if (productsSold[item.itemName]) {
              productsSold[item.itemName].count += item.count;
              productsSold[item.itemName].users.add(order.username);
            } else {
              productsSold[item.itemName] = {
                count: item.count,
                users: new Set([order.username]),
              };
            }
          });
        });

        const productSalesData = Object.keys(productsSold).map((product, index) => ({
          product,
          sales: productsSold[product].count,
          users: Array.from(productsSold[product].users),
          color: COLORS[index % COLORS.length],
        }));

        setProductSales(productSalesData);

        const userMetricsData = response.data.reduce((acc, order) => {
          if (acc[order.username]) {
            acc[order.username].orders++;
            acc[order.username].totalSpent += order.totalPrice;
          } else {
            acc[order.username] = {
              orders: 1,
              totalSpent: order.totalPrice,
            };
          }
          return acc;
        }, {});

        setUserMetrics(Object.entries(userMetricsData).map(([username, metrics]) => ({
          username,
          orders: metrics.orders,
          totalSpent: metrics.totalSpent,
        })));

      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [token]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6633'];

  return (
    <main className="main-container">
      
      <div className="charts">
        <div className="chart-container">
          <div className="chart">
            <h3 style={{color:' rgb(251, 178, 0)'}}>Product Sales</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={productSales}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Legend />
                {productSales.map((product, index) => (
                  <Bar key={index} dataKey="sales" fill={product.color} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="chart">
            <h3 style={{color:' rgb(251, 178, 0)'}}>User Metrics</h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={userMetrics}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={(entry) => `${entry.username} (${entry.orders})`}
                  dataKey="orders"
                  animationBegin={0}
                  animationDuration={1500}
                >
                  {userMetrics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart">
            <h3 style={{color:' rgb(251, 178, 0)'}}>Daily Sales</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={[{ name: 'Daily Sales', sales: dailyInterestSales }]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="chart">
            <h3 style={{color:' rgb(251, 178, 0)'}}>Monthly Sales</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={[{ name: 'Monthly Sales', sales: monthlyInterestSales }]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
