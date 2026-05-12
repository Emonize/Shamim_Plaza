import React, { useState, useEffect } from 'react'
import { Card, Container, Heading, Flex, Box, Text, Select, Spinner, Grid, Badge } from '@sanity/ui'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts'
import { MapPin, Users, Globe, Smartphone, Monitor, Activity } from 'lucide-react'
import { useClient } from 'sanity'
import styled from 'styled-components'

const DashboardContainer = styled(Container)`
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`

const StyledCard = styled(Card)`
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
  background: #ffffff;

  &:hover {
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$bg || 'rgba(15, 15, 17, 0.04)'};
  color: ${props => props.$color || '#0f0f11'};
`

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#ffffff',
        padding: '12px 16px',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{label}</p>
        <p style={{ margin: 0, fontSize: '14px', color: '#0f0f11', fontWeight: 700 }}>
          {payload[0].value} visitors
        </p>
      </div>
    );
  }
  return null;
};

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
    const day = dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    acc[day] = (acc[day] || 0) + 1
    return acc
  }, {})
  
  const timelineData = Object.entries(timelineCount)
    .map(([name, count]) => ({ name, count, fullDate: name }))
    // Sort chronologically using a dummy year if needed, assuming current year for simplicity in display
    .sort((a, b) => new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime())

  // Default empty state timeline if no data
  const chartData = timelineData.length > 0 ? timelineData : [
    { name: 'No Data', count: 0 }
  ]

  return (
    <DashboardContainer padding={[3, 4, 5]}>
      <Flex direction="column" gap={5}>
        
        {/* Header Section */}
        <Flex justify="space-between" align={['flex-start', 'center']} direction={['column', 'row']} gap={3}>
          <Box>
            <Heading as="h1" size={4} style={{ fontWeight: 800, color: '#0f0f11', letterSpacing: '-0.02em' }}>
              Traffic Overview
            </Heading>
            <Text size={2} muted style={{ marginTop: '8px' }}>
              Monitor your property portfolio's global reach and visitor engagement.
            </Text>
          </Box>
          <Box>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.currentTarget.value)}
              style={{ 
                padding: '10px 16px', 
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">Last 12 Months</option>
            </Select>
          </Box>
        </Flex>

        {loading ? (
          <Flex justify="center" align="center" style={{ minHeight: '400px' }}>
            <Spinner muted />
          </Flex>
        ) : (
          <Flex direction="column" gap={5}>
            
            {/* Top Metrics Cards */}
            <Grid columns={[1, 1, 3]} gap={4}>
              <StyledCard padding={4}>
                <Flex align="center" gap={4}>
                  <IconWrapper $bg="rgba(212, 175, 55, 0.1)" $color="#d4af37">
                    <Users size={24} strokeWidth={2.5} />
                  </IconWrapper>
                  <Box>
                    <Text size={1} style={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Total Visitors
                    </Text>
                    <Heading size={4} style={{ marginTop: '4px', fontWeight: 700 }}>
                      {totalVisits.toLocaleString()}
                    </Heading>
                  </Box>
                </Flex>
              </StyledCard>

              <StyledCard padding={4}>
                <Flex align="center" gap={4}>
                  <IconWrapper $bg="rgba(15, 15, 17, 0.04)" $color="#0f0f11">
                    <Monitor size={24} strokeWidth={2.5} />
                  </IconWrapper>
                  <Box>
                    <Text size={1} style={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Desktop Views
                    </Text>
                    <Heading size={4} style={{ marginTop: '4px', fontWeight: 700 }}>
                      {(deviceCount['Desktop'] || 0).toLocaleString()}
                    </Heading>
                  </Box>
                </Flex>
              </StyledCard>

              <StyledCard padding={4}>
                <Flex align="center" gap={4}>
                  <IconWrapper $bg="rgba(15, 15, 17, 0.04)" $color="#0f0f11">
                    <Smartphone size={24} strokeWidth={2.5} />
                  </IconWrapper>
                  <Box>
                    <Text size={1} style={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Mobile & Tablet
                    </Text>
                    <Heading size={4} style={{ marginTop: '4px', fontWeight: 700 }}>
                      {((deviceCount['Mobile'] || 0) + (deviceCount['Tablet'] || 0)).toLocaleString()}
                    </Heading>
                  </Box>
                </Flex>
              </StyledCard>
            </Grid>

            {/* Main Chart */}
            <StyledCard padding={4}>
              <Flex align="center" gap={2} style={{ marginBottom: '24px' }}>
                <Activity size={20} color="#d4af37" />
                <Heading as="h3" size={2} style={{ fontWeight: 700 }}>Visitor Activity</Heading>
              </Flex>
              <Box style={{ height: '320px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={12} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tickMargin={12} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="count" stroke="#d4af37" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" activeDot={{ r: 6, strokeWidth: 0, fill: '#0f0f11' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </StyledCard>

            {/* Bottom Row */}
            <Grid columns={[1, 1, 2]} gap={4}>
              
              {/* Top Countries Bar Chart */}
              <StyledCard padding={4}>
                <Flex align="center" gap={2} style={{ marginBottom: '24px' }}>
                  <Globe size={20} color="#d4af37" />
                  <Heading as="h3" size={2} style={{ fontWeight: 700 }}>Top Countries</Heading>
                </Flex>
                <Box style={{ height: '280px', width: '100%' }}>
                  {countryData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={countryData} layout="vertical" margin={{ left: 0, right: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#0f0f11', fontSize: 13, fontWeight: 500 }} width={90} />
                        <Tooltip cursor={{fill: 'rgba(15,15,17,0.02)'}} content={<CustomTooltip />} />
                        <Bar dataKey="count" fill="#0f0f11" radius={[0, 4, 4, 0]} barSize={24} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <Flex justify="center" align="center" style={{ height: '100%' }}>
                      <Text muted>No location data available yet.</Text>
                    </Flex>
                  )}
                </Box>
              </StyledCard>

              {/* Recent Feed */}
              <StyledCard padding={4}>
                <Flex align="center" justify="space-between" style={{ marginBottom: '24px' }}>
                  <Flex align="center" gap={2}>
                    <MapPin size={20} color="#d4af37" />
                    <Heading as="h3" size={2} style={{ fontWeight: 700 }}>Live Visitor Feed</Heading>
                  </Flex>
                  <Badge mode="outline" tone="primary" padding={2} style={{ borderRadius: '6px' }}>
                    Real-time
                  </Badge>
                </Flex>
                <Box style={{ overflowY: 'auto', maxHeight: '280px', paddingRight: '8px' }}>
                  {data.length > 0 ? data.slice(0, 15).map((visit, idx) => (
                    <Flex key={idx} justify="space-between" align="center" paddingY={3} style={{ borderBottom: idx !== Math.min(data.length, 15) - 1 ? '1px solid #f1f5f9' : 'none' }}>
                      <Box>
                        <Text style={{ fontWeight: 600, color: '#0f0f11', fontSize: '14px' }}>
                          {visit.city && visit.city !== 'Unknown' ? `${visit.city}, ` : ''}{visit.country || 'Unknown'}
                        </Text>
                        <Text muted style={{ marginTop: '4px', fontSize: '12px', fontFamily: 'monospace' }}>
                          {visit.path}
                        </Text>
                      </Box>
                      <Text muted style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>
                        {new Date(visit.visitedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Text>
                    </Flex>
                  )) : (
                    <Flex justify="center" align="center" style={{ height: '200px' }}>
                      <Text muted>Waiting for new visitors...</Text>
                    </Flex>
                  )}
                </Box>
              </StyledCard>

            </Grid>
          </Flex>
        )}
      </Flex>
    </DashboardContainer>
  )
}
