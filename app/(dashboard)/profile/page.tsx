import { PersonalInformationForm } from '@/components/profile/PersonalInformation'
import ProfileCard from '@/components/profile/ProfileCard'
import React from 'react'

const page = () => {
  return (
    <div>
        <div className="flex justify-between py-6 gap-10">
            <ProfileCard />
            <PersonalInformationForm />
        </div>
        
    </div>
  )
}

export default page