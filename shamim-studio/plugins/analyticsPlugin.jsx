import React from 'react'
import { definePlugin } from 'sanity'
import { BarChart2 } from 'lucide-react'
import { AnalyticsDashboard } from '../components/AnalyticsDashboard'

export const analyticsPlugin = definePlugin({
  name: 'analytics-plugin',
  tools: (prev) => {
    return [
      ...prev,
      {
        name: 'analytics',
        title: 'Analytics',
        icon: BarChart2,
        component: AnalyticsDashboard,
      },
    ]
  },
})
