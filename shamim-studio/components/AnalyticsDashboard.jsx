import React, { useState, useEffect } from 'react'
import { Card, Container, Heading, Flex, Box, Text, Select, Spinner, Grid } from '@sanity/ui'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts'
import { MapPin, Users, Globe, Smartphone, Monitor } from 'lucide-react'
import { useClient } from 'sanity'

export function AnalyticsDashboard() {
  const client = useClient({ apiVersion: '2023-01-01' })
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        let dateFilter = ''
        const now = new Date()
        
        if (filter === 'today') {
          now.setHours(0, 0, 0, 0)
          dateFilter = `&& visitedAt >= "${now.toISOString()}"`
        } else if (filter === 'week') {
          now.setDate(now.getDate() - 7)
          dateFilter = `&& visitedAt >= "${now.toISOString()}"`
        } else if (filter === 'month') {
          now.setMonth(now.getMonth() - 1)
          dateFilter = `&& visitedAt >= "${now.toISOString()}"`
        } else if (filter === 'year') {
          now.setFullYear(now.getFullYear() - 1)
          dateFilter = `&& visitedAt >= "${now.toISOString()}"`
        }

        const query = `*[_type == "siteVisit" ${dateFilter}] | order(visitedAt desc) {
          visitedAt, country, city, device, path
        }`
        const result = await client.fetch(query)
        setData(result || [])
      } catch (error) {
        console.error('Failed to fetch analytics:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [filter, client])

  // Aggregate Data
  const totalVisits = data.length

  const countryCount = data.reduce((acc, visit) => {
    const c = visit.country || 'Unknown'
    acc[c] = (acc[c] || 0) + 1
    return acc
  }, {})
  
  const countryData = Object.entries(countryCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5) // Top 5

  const deviceCount = data.reduce((acc, visit) => {
    const d = visit.device || 'Desktop'
    acc[d] = (acc[d] || 0) + 1
    return acc
  }, {})

  // Process timeline data by Day
  const timelineCount = data.reduce((acc, visit) => {
    const dateObj = new Date(visit.visitedAt)
    const day = dateObj.toLocaleDateString()
    acc[day] = (acc[day] || 0) + 1
    return acc
  }, {})
  const timelineData = Object.entries(timelineCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime())

  return (
    <Container width={3} padding={4}>
      <Flex justify="space-between" align="center" paddingBottom={4}>
        <Heading as="h1" size={4}>Site Analytics</Heading>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.currentTarget.value)}
          style={{ width: '150px' }}
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="year">Last 12 Months</option>
        </Select>
      </Flex>

      {loading ? (
        <Flex justify="center" align="center" style={{ height: '300px' }}>
          <Spinner muted />
        </Flex>
      ) : (
        <Flex direction="column" gap={4}>
          <Grid columns={3} gap={4}>
            <Card padding={4} shadow={1} radius={2}>
              <Flex align="center" gap={3}>
                <Box style={{ background: '#f0f4f8', padding: '12px', borderRadius: '50%' }}>
                  <Users color="#0051c3" />
                </Box>
                <Box>
                  <Text size={1} muted>Total Visitors</Text>
                  <Heading size={3}>{totalVisits}</Heading>
                </Box>
              </Flex>
            </Card>

            <Card padding={4} shadow={1} radius={2}>
              <Flex align="center" gap={3}>
                <Box style={{ background: '#f0f4f8', padding: '12px', borderRadius: '50%' }}>
                  <Monitor color="#0051c3" />
                </Box>
                <Box>
                  <Text size={1} muted>Desktop</Text>
                  <Heading size={3}>{deviceCount['Desktop'] || 0}</Heading>
                </Box>
              </Flex>
            </Card>

            <Card padding={4} shadow={1} radius={2}>
              <Flex align="center" gap={3}>
                <Box style={{ background: '#f0f4f8', padding: '12px', borderRadius: '50%' }}>
                  <Smartphone color="#0051c3" />
                </Box>
                <Box>
                  <Text size={1} muted>Mobile</Text>
                  <Heading size={3}>{(deviceCount['Mobile'] || 0) + (deviceCount['Tablet'] || 0)}</Heading>
                </Box>
              </Flex>
            </Card>
          </Grid>

          <Card padding={4} shadow={1} radius={2}>
            <Heading as="h3" size={2} style={{ marginBottom: '20px' }}>Visits Over Time</Heading>
            <div style={{ height: '300px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} />
                  <YAxis axisLine={false} tickLine={false} tickMargin={10} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#0051c3" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Grid columns={2} gap={4}>
            <Card padding={4} shadow={1} radius={2}>
              <Flex align="center" gap={2} style={{ marginBottom: '20px' }}>
                <Globe size={20} />
                <Heading as="h3" size={2}>Top Countries</Heading>
              </Flex>
              <div style={{ height: '250px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={countryData} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} />
                    <Tooltip cursor={{fill: '#f8fafc'}} />
                    <Bar dataKey="count" fill="#d4af37" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card padding={4} shadow={1} radius={2}>
              <Flex align="center" gap={2} style={{ marginBottom: '20px' }}>
                <MapPin size={20} />
                <Heading as="h3" size={2}>Recent Visitors</Heading>
              </Flex>
              <Box style={{ overflowY: 'auto', maxHeight: '250px' }}>
                {data.slice(0, 10).map((visit, idx) => (
                  <Flex key={idx} justify="space-between" paddingY={3} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <Box>
                      <Text weight="semibold">{visit.city || 'Unknown City'}, {visit.country}</Text>
                      <Text size={1} muted style={{ marginTop: '4px' }}>Path: {visit.path}</Text>
                    </Box>
                    <Text size={1} muted>
                      {new Date(visit.visitedAt).toLocaleString()}
                    </Text>
                  </Flex>
                ))}
              </Box>
            </Card>
          </Grid>
        </Flex>
      )}
    </Container>
  )
}
