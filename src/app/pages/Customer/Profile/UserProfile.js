import React from 'react'
import ProfileCard from './ProfileCard'
import TabSection from './TabSection'
import { Box } from '@mui/material'
import Header from '../../../layouts/Header'
import Footer from '../../../layouts/Footer'

const UserProfile = () => {
  return (
    <Box sx={{
      width: '100vw'
    }}>
      <Header />
      <ProfileCard />
      <TabSection />
      <Footer />
    </Box>
  )
}

export default UserProfile